// una-lib/validarMensaje.js

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const onlyUrlRegex = /^\s*(https?:\/\/[^\s]+)\s*$/i;
const imageExt = /\.(png|jpe?g|gif|webp|bmp)(\?.*)?$/i;
const videoExt = /\.(mp4|webm|ogg)(\?.*)?$/i;
const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]{4,}/i;

function containsBadPatterns(s) {
  if (!s) return false;
  if (/<\s*script\b/i.test(s)) return true;
  if (/<\s*iframe\b/i.test(s)) return true;
  if (/javascript\s*:/i.test(s)) return true;
  if (/\bon\w+\s*=/i.test(s)) return true; // onload= onclick= etc
  return false;
}

function validateMessage(msg) {
  if (typeof msg !== 'string') return null;
  const t = msg.trim();
  if (!t) return null;

  if (containsBadPatterns(t)) return null;

  const m = t.match(onlyUrlRegex);
  if (m) {
    const url = m[1];
    if (/^javascript:/i.test(url)) return null;
    if (imageExt.test(url)) return { type: 'image', url };
    if (videoExt.test(url)) return { type: 'video', url };
    if (youtubeRegex.test(url)) return { type: 'youtube', url };
    return { type: 'text', content: escapeHtml(url) };
  }

  return { type: 'text', content: escapeHtml(t) };
}

module.exports = { validateMessage };
