VITAGROW v1.5 — REVISION BUILD

Basis:
- Backbone: Anggota 2 (HTML/CSS/JS + Bootstrap + localStorage)
- Referensi UI/ide Landing: Anggota 1
- Assessment & Learning Center: Anggota 3
- Knowledge Check question pool: Anggota 2 + Anggota 4
- Challenge/Tracking/Re-check: dibangun ulang agar terhubung ke adaptive flow jika hasil Anggota 5 belum tersedia.

FLOW FINAL:
Landing -> Profile -> Dashboard -> Assessment 16 -> Result 4 Pilar -> Learning Center -> Knowledge Check (optional) -> Challenge -> Daily Tracking -> Adaptive Tip -> Re-Check -> Progress/Badge.

4 PILAR:
1. Hidrasi
2. Istirahat & Recovery
3. Gerak & Aktivitas Fisik
4. Bahan Bakar Tubuh / Nutrition

PRINSIP:
- Assessment = profiling kondisi awal.
- Knowledge Check = pemahaman, optional, 1 soal acak berdasarkan topik.
- Challenge = tindakan/kebiasaan, bukan quiz.
- Tracking = mencatat pencapaian nyata.
- Adaptive = target awal dibuat realistis dari profil/assessment dan tidak menghukum kegagalan.
- BMI hanya konteks tambahan, bukan diagnosis.
- Re-check menggunakan jawaban user sebenarnya; tidak ada skor hard-coded.

CATATAN VIDEO:
Tidak ada video edukasi lokal yang valid dari paket anggota yang diterima. Video A1 tidak diimpor karena sumbernya tidak layak dijadikan materi edukasi. Tambahkan video lokal/URL yang sudah dipilih kelompok pada bagian Learning Center jika diperlukan.

CARA MENJALANKAN:
1. Ekstrak folder.
2. Buka index.html dengan Live Server / hosting statis.
3. Gunakan Reset Session jika ingin mengulang dari awal.
4. Bootstrap dan Bootstrap Icons menggunakan CDN sehingga koneksi internet diperlukan untuk tampilan komponen Bootstrap jika tidak disediakan lokal.

CHECKLIST PENGUJIAN:
[ ] Landing -> Profile
[ ] Profile -> Dashboard
[ ] Assessment 16 soal wajib dijawab
[ ] Result menampilkan 4 skor dan lowest pillar
[ ] Learning Center mengikuti lowest pillar
[ ] Knowledge Check random sesuai pillar dan optional
[ ] Challenge mendapat target personal
[ ] Tracking menyimpan nilai dan status
[ ] Progress bergerak berdasarkan hari yang benar-benar selesai
[ ] Re-check memakai 16 jawaban baru
[ ] Before vs After memakai hasil nyata
[ ] Badge terbuka berdasarkan progress


REVISION 2:
- Progress 7 Hari sekarang menghitung hari yang benar-benar dicatat, bukan hari yang targetnya tercapai.
- Target tercapai ditampilkan sebagai metrik terpisah.
- Setelah menyimpan hari yang targetnya belum tercapai, user tetap dapat melanjutkan ke hari berikutnya.
- Setelah 7 hari tercatat, tombol Re-Check muncul.
- Link Re-Check diperbaiki ke post-test-result.html.


REVISION NOTE — v1.5 Revisi 3
- Edukasi dan Challenge terkunci sampai Health Assessment selesai. Direct URL juga dilindungi.
- YouTube embed dipindahkan ke youtube.com/embed dengan origin dan fallback Watch on YouTube untuk mengurangi Error 153.


VitaGrow v1.5 Revisi 4: menambahkan meta referrer strict-origin-when-cross-origin pada halaman HTML dan menyederhanakan URL embed YouTube agar tidak bergantung pada parameter origin yang dinamis. Fallback Watch on YouTube tetap tersedia.

REVISION 6 NOTES
- Health Assessment: 16 questions are shuffled once per assessment session.
- Assessment question order is stored in sessionStorage so refresh/back navigation keeps the same order during the active session.
- Assessment scoring remains based on question IDs/pillars, so random order does not affect results.
- Re-Assessment (Re-Check): 16 questions are shuffled independently for each re-check session.
- Re-Assessment scoring remains based on question IDs/pillars.
- Known issue retained for next revision: YouTube embedded video Error 153.
- UI note retained: the Knowledge Check explanatory sentence below "Buka Materi Lengkap" is removed.

Landing Hero Carousel: 4 themed visuals (Hydration, Sleep, Activity, Nutrition) with auto-rotation, arrows, dots, and pause-on-hover.


REVISION NOTE — ARTWORK INTEGRATION
- Landing hero memakai 4 artwork VitaGrow: hydration, sleep, activity, nutrition.
- Artwork disimpan sebagai WebP untuk ukuran file lebih ringan.
- Slide pertama diprioritaskan (preload/fetchpriority) agar visual hero lebih cepat tampil.
- Tidak ada perubahan pada halaman Education.

Revisi 13: setelah Challenge 7 hari, user diarahkan ke post-test.html (Re-Check), lalu baru ke post-test-result.html. Dashboard Re-Check terkunci sebelum semua 7 hari tercatat. Headline landing diperkecil agar lebih seimbang dengan artwork hero tanpa memperbesar gambar.
