// Simple in-memory rate limiter
// For production, consider using Redis for distributed rate limiting

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  maxRequests: number;  // Max requests allowed
  windowMs: number;     // Time window in milliseconds
}

export function checkRateLimit(
  identifier: string, 
  config: RateLimitConfig = { maxRequests: 10, windowMs: 60000 }
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);
  
  // Clean up expired entries periodically
  if (Math.random() < 0.01) {
    cleanupExpiredEntries();
  }
  
  if (!entry || now > entry.resetAt) {
    // First request or window expired
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + config.windowMs,
    });
    return { 
      allowed: true, 
      remaining: config.maxRequests - 1,
      resetIn: config.windowMs
    };
  }
  
  if (entry.count >= config.maxRequests) {
    return { 
      allowed: false, 
      remaining: 0,
      resetIn: entry.resetAt - now
    };
  }
  
  entry.count++;
  return { 
    allowed: true, 
    remaining: config.maxRequests - entry.count,
    resetIn: entry.resetAt - now
  };
}

function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

// Convenience function for Telegram user rate limiting
export function checkUserRateLimit(
  telegramId: string | bigint,
  action: string = 'default',
  config?: RateLimitConfig
): { allowed: boolean; remaining: number; resetIn: number } {
  const identifier = `telegram:${telegramId}:${action}`;
  return checkRateLimit(identifier, config);
}
