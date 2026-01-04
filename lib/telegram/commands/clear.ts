import { Telegraf } from 'telegraf';

export function registerClearCommand(bot: Telegraf) {
  bot.command('clear', async (ctx) => {
    try {
      // Telegram messages have a character limit, but a series of newlines works well.
      // We send a tiny dot, followed by ~100 newlines, then another dot.
      const clearMessage = '.\n' + '\u200b\n'.repeat(100) + '✅ **Chat cleared!**\nSent by GitWatch';
      
      await ctx.reply(clearMessage, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Error clearing chat:', error);
      await ctx.reply('❌ Failed to clear chat.');
    }
  });
}
