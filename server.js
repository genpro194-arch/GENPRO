require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Basic health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// POST /api/report - receive form data and send email
app.post('/api/report', upload.single('evidence'), async (req, res) => {
  try {
    const { name, category, story, email, anonymous } = req.body;

    // Minimal validation
    if (!story || !category) {
      return res.status(400).json({ ok: false, error: 'Kategori dan cerita dibutuhkan.' });
    }

    const recipient = process.env.RECIPIENT_EMAIL;
    if (!recipient) {
      return res.status(500).json({ ok: false, error: 'Recipient email not configured on server.' });
    }

    // Build email content
    const reportedName = anonymous === 'on' || !name ? 'Anonim' : (name || 'Anonim');
    const submitterEmail = email ? email : 'Tidak disertakan';

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #222;">
        <h2>Pengaduan baru dari Ruang Aman</h2>
        <p><strong>Nama:</strong> ${escapeHtml(reportedName)}</p>
        <p><strong>Kategori:</strong> ${escapeHtml(category)}</p>
        <p><strong>Email pengirim (jika ada):</strong> ${escapeHtml(submitterEmail)}</p>
        <h3>Cerita:</h3>
        <p style="white-space:pre-wrap">${escapeHtml(story)}</p>
        <hr/>
        <small>Pesan diterima dari formulir Ruang Aman. Lihat lampiran bila ada bukti.</small>
      </div>
    `;

    // Setup transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || `"Ruang Aman" <no-reply@ruangaman.local>`,
      to: recipient,
      subject: `Pengaduan baru - ${escapeHtml(category)}`,
      html,
      attachments: []
    };

    if (req.file) {
      mailOptions.attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer
      });
    }

    await transporter.sendMail(mailOptions);

    return res.json({ ok: true });
  } catch (err) {
    console.error('Error sending report:', err);
    return res.status(500).json({ ok: false, error: 'Gagal mengirim pengaduan. Coba lagi nanti.' });
  }
});

// Fallback: serve index for unknown routes (so SPA pages still load)
app.get('*', (req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
  return res.status(404).send('Not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ruang Aman server running on port ${PORT}`));

// small helper to escape HTML
function escapeHtml(unsafe) {
  if (!unsafe && unsafe !== 0) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
