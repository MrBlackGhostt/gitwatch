# Polling vs. Webhooks Strategy

This document outlines the trade-offs between aggressive polling (e.g., every 1 minute) and using GitHub Webhooks for real-time notifications.

## The 1-Minute Polling Challenge

While technically possible, increasing the cron job frequency to 1 minute introduces several risks:

### 1. GitHub API Rate Limits
GitHub enforces strict rate limits to prevent service abuse.
- **The Limit:** Authenticated users (via personal access token) are limited to **5,000 requests per hour**.
- **The Math:** If the bot scales to 100 users watching 5 repositories each, polling every 1 minute would require **30,000 requests/hour**, far exceeding the limit.
- **Consequence:** GitHub may block the bot's IP or revoke the access tokens.

### 2. Provider Constraints (Vercel)
If hosting on Vercel:
- **Hobby Plan:** Limited to **1 cron job per day** (frequent polling is not supported).
- **Pro Plan:** Supports frequent cron jobs, but results in high **execution minutes** usage, increasing costs.

### 3. Execution Overlap
As the number of polling repositories grows, the time required to check all of them increases.
- If the total check time exceeds 60 seconds, the next cron job will start before the previous one finishes.
- **Consequence:** This can lead to race conditions, database locks, or duplicate Telegram notifications.

### 4. Reputation & Best Practices
GitHub monitors app behavior. Apps that poll `events` every minute for a large number of repositories instead of using Webhooks are considered "aggressive" and may be flagged.

---

## The Solution: "Manual Webhooks" for Power Users

To provide real-time updates for repositories where the bot lacks admin access, we recommend the **Manual Webhook** approach:

1. **Default:** Use a conservative **2-5 minute polling interval** as a fallback.
2. **Upgrade Path:** For repositories where the user is a contributor/maintainer:
   - Provide the user with a **Payload URL** and **Secret Key**.
   - Guide the user to manually add a Webhook in the GitHub repository settings.
3. **Benefit:** This provides **instant (0s delay)** notifications without taxing the bot's API rate limits or cron execution budget.
