# ☕ Kopi Nusantara — Coffee Store

Website landing page & toko untuk kedai kopi "Kopi Nusantara", dibangun dengan HTML, CSS, dan JavaScript murni (tanpa framework).

## Fitur
- **Landing page lengkap**: Hero, Tentang, Menu, Toko Biji Kopi, Testimoni, CTA Newsletter, Kontak, Footer.
- **Keranjang belanja interaktif**: tambah item, ubah jumlah, hapus, total otomatis dalam format Rupiah, tersimpan di `localStorage`.
- **Responsive**: mobile menu (hamburger), grid adaptif untuk tablet & ponsel.
- **Animasi**: reveal on scroll (IntersectionObserver), marquee asal kopi, floating cards, hover effects.
- **Toast notification** untuk feedback aksi (tambah keranjang, checkout, submit form).

## Struktur File
```
/
├── index.html      # Struktur halaman
├── css/
│   └── style.css   # Seluruh styling (tema kopi: cokelat & karamel)
└── js/
    └── main.js     # Interaksi: navbar, cart drawer, reveal, forms
```

## Menjalankan
Buka `index.html` langsung di browser, atau jalankan server lokal:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## Font & Gambar
- Font: Playfair Display & Poppins via Google Fonts.
- Foto: dari Unsplash (membutuhkan koneksi internet).