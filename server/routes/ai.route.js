const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const { enhanceWithGemini } = require('../utils/gemini');

const router = Router();

const Input = z.object({
  text: z.string().min(10).max(2000),
  tone: z.enum(['warm','elegant','minimalist']).optional(),
  audience: z.enum(['global','local']).optional(),
  length: z.enum(['short','medium','long']).optional(),
});

router.post(
  '/enhance-description',
  rateLimit({ windowMs: 60_000, max: 20 }),
  async (req, res) => {
    const parsed = Input.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'INVALID_INPUT', details: parsed.error.errors });
    }

    try {
      const result = await enhanceWithGemini(parsed.data);
      return res.json(result); // { title, bullets[], paragraph, hashtags[] }
    } catch (e) {
      return res.status(500).json({
        error: 'ENHANCE_FAILED',
        details: e?.message || 'unknown'
      });
    }
  }
);

module.exports = router;
