
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const sharp = require('sharp');

function execCmd(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], ...opts });
    let stderr = '';
    p.stderr.on('data', d => (stderr += d.toString()));
    p.on('error', reject);
    p.on('close', code => {
      if (code === 0) resolve(true);
      else reject(new Error(`${cmd} exited with code ${code}: ${stderr}`));
    });
  });
}

async function isInstalled(cmd, args = ['-h']) {
  try {
    await execCmd(cmd, args);
    return true;
  } catch {
    return false;
  }
}

/**
 * Enhance an uploaded image locally (FREE):
 * 1) Remove background (rembg - U2Net)
 * 2) Composite onto modern minimal background (soft neutral gradient)
 * 3) Mild relight (brightness/contrast/gamma) to keep realistic
 * 4) (Optional) 2x upscale via realesrgan-ncnn-vulkan if available
 *
 * @param {{ buffer: Buffer, mimeType: string, aspectRatio?: '1:1'|'4:3'|'3:4'|'16:9', prompt?: string }} params
 * @returns {Promise<{ mimeType: string, base64: string }>}
 */
async function enhanceImage({ buffer, mimeType, aspectRatio = '1:1', prompt }) {
  // ---- temp files
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'artisan-'));
  const inPath = path.join(tmpDir, 'input');
  const cutoutPath = path.join(tmpDir, 'cutout.png');
  const composedPath = path.join(tmpDir, 'composed.png');
  const upscalePath = path.join(tmpDir, 'upscaled.png');

  // write input as PNG/JPEG depending on mime
  const ext = mimeType.includes('png') ? '.png' : '.jpg';
  const inputFile = inPath + ext;
  fs.writeFileSync(inputFile, buffer);

  // ---- 1) Background removal with rembg
  const hasRembg = await isInstalled('rembg', ['-h']);
  if (!hasRembg) {
    cleanup(tmpDir);
    throw new Error('rembg not found. Install with "pip install rembg" and ensure it is in PATH.');
  }
  await execCmd('rembg', ['i', inputFile, cutoutPath]);

  // Load cutout to get dimensions
  const cutoutMeta = await sharp(cutoutPath).metadata();
  const subjectW = cutoutMeta.width || 1024;
  const subjectH = cutoutMeta.height || 1024;

  // ---- target canvas size based on aspect ratio
  const ratio = parseAspect(aspectRatio);
  const baseLongSide = 1200; // reasonable default; Real-ESRGAN can upscale later
  let canvasW, canvasH;
  if (ratio >= 1) { // wide/square
    canvasW = baseLongSide;
    canvasH = Math.round(baseLongSide / ratio);
  } else { // tall
    canvasH = baseLongSide;
    canvasW = Math.round(baseLongSide * ratio);
  }

  // ---- 2) Build modern minimal background (SVG gradient)
  const bgSvg = buildModernBgSVG(canvasW, canvasH);
  const bgBuf = Buffer.from(bgSvg);

  // ---- 3) Relight & composite subject (centered with padding)
  // Resize subject to fit nicely (80% of canvas min dimension)
  const pad = 0.1;
  const targetW = Math.round(canvasW * (1 - 2 * pad));
  const targetH = Math.round(canvasH * (1 - 2 * pad));
  const fitted = await sharp(cutoutPath)
    .resize({ width: targetW, height: targetH, fit: 'inside', withoutEnlargement: true })
    .toBuffer();

  // Mild relight: gamma + modulate (brightness/contrast via linear)
  const relit = await sharp(fitted)
    .gamma(1.05)
    .modulate({ brightness: 1.04, saturation: 1.02 })
    .toBuffer();

  // Compose
  const composed = await sharp(bgBuf, { density: 300 })
    .composite([
      {
        input: relit,
        gravity: 'center'
      }
    ])
    .png({ quality: 95 })
    .toFile(composedPath);

  // ---- 4) Optional upscale with Real-ESRGAN 2x
  const hasESRGAN = await isInstalled('realesrgan-ncnn-vulkan', ['-h']);
  let outPath = composedPath;
  if (hasESRGAN) {
    try {
      await execCmd('realesrgan-ncnn-vulkan', ['-i', composedPath, '-o', upscalePath, '-s', '2']);
      outPath = upscalePath;
    } catch {
      // ignore upscale failure; keep composed
      outPath = composedPath;
    }
  }

  const outBuf = fs.readFileSync(outPath);
  const base64 = outBuf.toString('base64');

  cleanup(tmpDir);
  return { mimeType: 'image/png', base64 };
}

function parseAspect(aspect) {
  const map = { '1:1': 1, '4:3': 4 / 3, '3:4': 3 / 4, '16:9': 16 / 9 };
  return map[aspect] || 1;
}

function buildModernBgSVG(w, h) {
  // soft neutral gradient + subtle shadow plate
  return `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#F6F6F6"/>
      <stop offset="100%" stop-color="#EDEDED"/>
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="20" result="blur"/>
      <feOffset dx="0" dy="8" result="offset"/>
      <feFlood flood-color="#000" flood-opacity="0.15"/>
      <feComposite in2="offset" operator="in"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <!-- subtle floor plate -->
  <ellipse cx="${w/2}" cy="${Math.round(h*0.72)}" rx="${Math.round(w*0.28)}" ry="${Math.round(h*0.06)}" fill="#DCDCDC" opacity="0.28" filter="url(#shadow)"/>
</svg>
`.trim();
}

function cleanup(dir) {
  try {
    fs.readdirSync(dir).forEach(f => fs.unlinkSync(path.join(dir, f)));
    fs.rmdirSync(dir);
  } catch {}
}

module.exports = { enhanceImage };
