import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { checkUserRateLimit } from '../../../../../lib/rate-limiter';

// Sign state with HMAC to prevent manipulation
function signState(data: object): string {
  const payload = JSON.stringify(data);
  const signature = crypto
    .createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET || 'fallback-secret')
    .update(payload)
    .digest('hex');
  
  return Buffer.from(JSON.stringify({ payload, signature })).toString('base64');
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const telegramId = searchParams.get('telegram_id');

  if (!telegramId) {
    return NextResponse.json({ error: 'Missing telegram_id' }, { status: 400 });
  }

  // Rate limit: 3 OAuth attempts per 5 minutes per user
  const rateLimit = checkUserRateLimit(telegramId, 'oauth', { 
    maxRequests: 3, 
    windowMs: 5 * 60 * 1000 
  });
  
  if (!rateLimit.allowed) {
    return NextResponse.json({ 
      error: 'Too many authentication attempts. Please try again later.' 
    }, { status: 429 });
  }

  // Create signed state with timestamp to prevent replay attacks
  const stateData = { 
    telegramId, 
    timestamp: Date.now(),
    nonce: crypto.randomBytes(8).toString('hex')
  };
  const state = signState(stateData);

  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID!);
  githubAuthUrl.searchParams.set('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github/callback`);
  githubAuthUrl.searchParams.set('scope', 'repo,admin:repo_hook');
  githubAuthUrl.searchParams.set('state', state);

  return NextResponse.redirect(githubAuthUrl.toString());
}
