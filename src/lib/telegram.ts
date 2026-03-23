const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8064044229';

export async function sendTelegram(message: string, prefix: string = '🎨 TEM'): Promise<boolean> {
  if (!BOT_TOKEN) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: `<b>${prefix}</b>\n${message}`.slice(0, 4096), parse_mode: 'HTML' }),
    });
    return res.ok;
  } catch { return false; }
}
