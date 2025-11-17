# 🌿 Ruang Aman - Platform Pengaduan Pergaulan Menyimpang

> **Ruang Aman** adalah platform digital yang aman, empati, dan ramah pengguna untuk menerima pengaduan mengenai pergaulan menyimpang, pelecehan, dan trauma. Platform ini dirancang dengan prinsip privasi, keamanan, dan dukungan emosional sebagai prioritas utama.

---

## ✨ Fitur Utama

### 🏠 Halaman Utama
- **Home**: Halaman pembuka yang menampilkan misi platform dengan ilustrasi lembut
- **About**: Informasi mengenai misi, privasi, dan kategori pengaduan yang ditangani
- **Report Form**: Formulir lengkap untuk pengaduan anonim
- **Success Page**: Halaman konfirmasi setelah pengaduan terkirim
- **Contact**: Halaman kontak dan FAQ

### 📋 Form Pengaduan Lengkap
- ✅ **Nama** (opsional, untuk keamanan bisa anonim)
- ✅ **Kategori Masalah** (8 kategori tersedia)
- ✅ **Cerita & Detail** (panjang unlimited)
- ✅ **Upload Bukti** (opsional, maks 10MB)
- ✅ **Email Pengirim** (opsional, untuk follow-up)
- ✅ **Opsi Anonim** (checkbox untuk pengiriman tanpa identitas)

### 🔐 Keamanan & Privasi
- Enkripsi data laporan
- Dukungan pengiriman anonim penuh
- Email tidak dibagikan atau digunakan untuk spam
- Komitmen privasi yang jelas

### 🎨 UI/UX Modern & Ramah Pengguna
- Desain **minimalis** dengan warna lembut (lavender, mint, purple)
- **Rounded corners** dan spacing yang konsisten
- **Responsif mobile-first** (mobile, tablet, desktop)
- **Animasi halus** (fade-in, float, bounce)
- **Typography Poppins/Inter** untuk keterbacaan optimal
- CTA utama "Kirim Cerita" yang mencolok namun tenang

---

## 🚀 Cara Instalasi & Setup

### Prerequisites
- **Node.js** v14+ dan **npm**
- Akun email dengan SMTP (Gmail, SendGrid, Mailtrap, dll)

### 1. Clone atau Download Project
```bash
cd c:\Users\acer\OneDrive\Pictures\Documents\genproo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables

Copy `.env.example` ke `.env`:
```bash
copy .env.example .env
```

Edit `.env` dengan informasi SMTP Anda:
```env
RECIPIENT_EMAIL=your-email@gmail.com

# Gmail SMTP (contoh)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Atau jika menggunakan SendGrid
# SMTP_HOST=smtp.sendgrid.net
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=apikey
# SMTP_PASS=SG.xxxxxxxxxxxxx

PORT=3000
```

#### 📌 Cara Mendapatkan SMTP Credentials

**Gmail:**
1. Enable "Less secure app access" atau gunakan App Password
2. Buat App Password di: https://myaccount.google.com/apppasswords
3. Gunakan email dan App Password di `.env`

**SendGrid:**
1. Daftar di https://sendgrid.com
2. Buat API Key
3. Gunakan `apikey` sebagai user dan API Key sebagai password

**Mailtrap (Testing):**
1. Daftar di https://mailtrap.io
2. Ambil SMTP credentials dari dashboard
3. Gunakan credentials yang disediakan

### 4. Jalankan Server
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

#### Untuk Development dengan Auto-Reload:
```bash
npm run dev
```
(Memerlukan `nodemon` - sudah terinstall di devDependencies)

---

## 📂 Struktur Project

```
ruang-aman/
├── public/                    # Frontend (static files)
│   ├── index.html            # Halaman Home
│   ├── about.html            # Halaman About
│   ├── report.html           # Form Pengaduan
│   ├── success.html          # Success Page
│   ├── contact.html          # Halaman Kontak
│   ├── css/
│   │   └── style.css         # Stylesheet utama (responsive, soft colors)
│   └── js/
│       └── app.js            # JavaScript client-side (form handling)
├── server.js                 # Express server & API endpoint
├── package.json              # Dependencies
├── .env.example              # Template environment variables
├── .gitignore                # Git ignore file
└── README.md                 # Dokumentasi (file ini)
```

---

## 🔌 API Endpoint

### `POST /api/report`
Endpoint untuk menerima pengaduan.

**Request (multipart/form-data):**
```json
{
  "name": "Opsional",
  "anonymous": "on",
  "category": "pelecehan-seksual",
  "story": "Cerita panjang...",
  "email": "optional@email.com",
  "evidence": "<file>"
}
```

**Response Success (200):**
```json
{
  "ok": true
}
```

**Response Error (4xx/5xx):**
```json
{
  "ok": false,
  "error": "Pesan error"
}
```

---

## 🎯 Kategori Pengaduan

1. **Pelecehan Seksual**
2. **Bullying & Cyberbullying**
3. **Kekerasan Fisik**
4. **Pelecehan Emosional**
5. **Manipulasi & Grooming**
6. **Hubungan Toxic**
7. **Diskriminasi & Prejudice**
8. **Lainnya**

---

## 🔐 Privacy & Security

### Komitmen Kami
- ✅ **Kerahasiaan Dijamin**: Semua cerita dapat dikirim secara anonim
- ✅ **Data Dienkripsi**: Laporan tidak disimpan di database publik, langsung ke email
- ✅ **Tidak Ada Spam**: Email tidak dibagikan atau digunakan untuk keperluan lain
- ✅ **Kontrol Penuh**: User memiliki kontrol penuh atas data yang dibagikan

### Best Practices
- Gunakan HTTPS di production (letseencrypt, Heroku, dsb)
- Jangan commit `.env` ke Git
- Rotate SMTP credentials secara berkala
- Log report untuk audit trail (optional)

---

## 🛠️ Technologies Used

| Tech | Penggunaan |
|------|-----------|
| **Node.js** | Runtime backend |
| **Express.js** | Web framework |
| **Nodemailer** | Email sending |
| **Multer** | File upload handling |
| **CORS** | Cross-origin requests |
| **dotenv** | Environment variables |
| **HTML5** | Frontend structure |
| **CSS3** | Styling (responsive, animations) |
| **JavaScript (ES6+)** | Client-side logic |

---

## 📱 Responsive Design

Website ini dirancang **mobile-first**:
- ✅ **Mobile** (480px - 767px)
- ✅ **Tablet** (768px - 1024px)
- ✅ **Desktop** (1025px+)

Semua elemen responsif dan teruji di berbagai ukuran layar.

---

## 🎨 Design Philosophy

### Warna & Mood
- **Primary**: Lavender (#d4a5e8) - Tenang, empati
- **Accent**: Mint (#a8d5ba) - Segar, optimis
- **Neutral**: Soft gray (#e8e5f0) - Clean, minimalis

### Typography
- **Font**: Poppins, Inter, system fonts
- **Emphasis**: Gradient text untuk heading utama
- **Weight**: 500-600 untuk navigasi, 400 untuk body

### Spacing & Corners
- **Border Radius**: 16px (besar), 8px (kecil)
- **Padding**: Consistent spacing untuk visual harmony
- **Gap**: Responsive gap di grid/flex

### Animasi
- Fade-in saat load halaman
- Float effect pada ilustrasi
- Bounce effect pada success icon
- Smooth hover states
- Slide-in effect pada alerts

---

## 🐛 Troubleshooting

### Email tidak terkirim
1. Cek `.env` - pastikan SMTP credentials benar
2. Cek Gmail: Jika menggunakan Gmail, pastikan App Password telah dibuat
3. Cek firewall: Pastikan port SMTP (587/465) tidak diblock
4. Cek logs: Lihat console server untuk error message

### Form tidak submit
1. Cek browser console (F12) untuk error JavaScript
2. Pastikan server running (`npm start`)
3. Cek CORS di server.js jika berbeda origin

### Styling tidak muncul
1. Hard refresh browser (Ctrl+Shift+R atau Cmd+Shift+R)
2. Cek koneksi CSS di public/css/style.css
3. Periksa console untuk 404 errors

### Server error 500
1. Cek `.env` - pastikan semua required variables ada
2. Cek SMTP configuration
3. Lihat console server untuk error message detail

---

## 📈 Deployment

### Heroku (Recommended)

1. **Install Heroku CLI** dan login:
```bash
heroku login
heroku create ruang-aman
```

2. **Set Environment Variables**:
```bash
heroku config:set RECIPIENT_EMAIL=your-email@gmail.com
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set SMTP_PORT=587
heroku config:set SMTP_SECURE=false
heroku config:set SMTP_USER=your-email@gmail.com
heroku config:set SMTP_PASS=your-app-password
```

3. **Deploy**:
```bash
git push heroku main
```

### DigitalOcean / AWS / VPS

1. SSH ke server
2. Install Node.js
3. Clone repository
4. Setup `.env`
5. Install dependencies: `npm install`
6. Gunakan PM2 untuk keep running: `npm install -g pm2 && pm2 start server.js`

---

## 📝 Lisensi

MIT License - Feel free to use dan modify untuk keperluan Anda.

---

## 📞 Support & Contact

Jika ada pertanyaan atau masalah, hubungi melalui:
- **Email**: info@ruangaman.local (ganti dengan email actual)
- **Issues**: Laporkan bug di GitHub
- **Kontribusi**: Pull requests welcome!

---

## 🙏 Terima Kasih

Terima kasih telah menggunakan **Ruang Aman**. Platform ini dibuat dengan hati untuk mendukung mereka yang membutuhkan.

**Ingat: Anda tidak sendirian. Kami mendengarkan.**

---

**Last Updated**: November 2024  
**Version**: 1.0.0
