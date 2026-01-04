import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '../../../../../lib/prisma';
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const signature = req.headers.get('x-hub-signature-256');

    if (!process.env.GITHUB_WEBHOOK_SECRET) {
      console.error('GITHUB_WEBHOOK_SECRET is not set');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    if (!signature) {
      return NextResponse.json({ error: 'No signature provided' }, { status: 401 });
    }

    // Verify signature
    const hmac = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = req.headers.get('x-github-event');
    const data = JSON.parse(payload);

    console.log(`Received GitHub event: ${event}`);

    if (event === 'issues') {
      const action = data.action;
      const issue = data.issue;
      const repository = data.repository;
      const owner = repository.owner.login;
      const repo = repository.name;

      // Find users watching this repo
      const watchedRepos = await prisma.watchedRepo.findMany({
        where: {
          owner,
          repo,
          active: true,
        },
        include: {
          user: true,
        },
      });

      console.log(`Found ${watchedRepos.length} users watching ${owner}/${repo}`);

      for (const watched of watchedRepos) {
        let message = '';
        if (action === 'opened') {
          message = `🔔 **New Issue in ${owner}/${repo}**\n\n` +
                    `**${issue.title}**\n` +
                    `By: @${data.sender.login}\n\n` +
                    `[View Issue](${issue.html_url})`;
        } else if (action === 'closed') {
          message = `✅ **Issue Closed in ${owner}/${repo}**\n\n` +
                    `**${issue.title}**\n` +
                    `By: @${data.sender.login}\n\n` +
                    `[View Issue](${issue.html_url})`;
        } else if (action === 'reopened') {
          message = `🔄 **Issue Reopened in ${owner}/${repo}**\n\n` +
                    `**${issue.title}**\n` +
                    `By: @${data.sender.login}\n\n` +
                    `[View Issue](${issue.html_url})`;
        }

        if (message) {
          try {
            console.log(`Sending message to ${watched.user.telegramId}`);
            await bot.telegram.sendMessage(watched.user.telegramId.toString(), message, {
              parse_mode: 'Markdown',
            });
            console.log('Message sent successfully');
          } catch (err) {
            console.error(`Failed to send Telegram message to ${watched.user.telegramId}:`, err);
          }
        }
      }
    }

    // Add handlers for other events as needed (PRs, Pushes, etc.)

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error in GitHub webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
