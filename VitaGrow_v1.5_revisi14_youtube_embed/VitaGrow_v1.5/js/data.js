// Data gabungan (Questions, Modules, Challenges, Badges)
// 16 Health Assessment Questions (4 questions per pillar x 4 pillars) + Post-Test questions
const ASSESSMENT_QUESTIONS = [
  // --- PILAR 1: HIDRASI ---
  {
    id: 1,
    pillarId: 'hydration',
    pillarName: '💧 Hidrasi (Hydration)',
    question: 'Berapa rata-rata konsumsi air putih kamu dalam sehari?',
    options: [
      { text: 'A. Kurang dari 4 gelas (< 1 Liter per hari)', score: 25 },
      { text: 'B. 4 - 6 gelas (1 - 1.5 Liter per hari)', score: 50 },
      { text: 'C. 7 - 8 gelas (± 2 Liter per hari)', score: 85 },
      { text: 'D. Lebih dari 8 gelas (> 2 Liter per hari secara teratur)', score: 100 }
    ]
  },
  {
    id: 2,
    pillarId: 'hydration',
    pillarName: '💧 Hidrasi (Hydration)',
    question: 'Bagaimana warna urin kamu di pertengahan hari?',
    options: [
      { text: 'A. Kuning pekat / kecokelatan (Tanda dehidrasi berat)', score: 25 },
      { text: 'B. Kuning tua keruh (Dehidrasi sedang)', score: 50 },
      { text: 'C. Kuning jernih kehijauan (Terhidrasi baik)', score: 85 },
      { text: 'D. Bening transparan (Sangat terhidrasi)', score: 100 }
    ]
  },
  {
    id: 3,
    pillarId: 'hydration',
    pillarName: '💧 Hidrasi (Hydration)',
    question: 'Berapa kali kamu mengonsumsi minuman manis atau berkafein (kopi/boba/soda) dalam seminggu?',
    options: [
      { text: 'A. Setiap hari (> 5 kali seminggu)', score: 25 },
      { text: 'B. Sering (3 - 4 kali seminggu)', score: 50 },
      { text: 'C. Jarang (1 - 2 kali seminggu)', score: 85 },
      { text: 'D. Hampir tidak pernah / Air putih adalah minuman utama', score: 100 }
    ]
  },
  {
    id: 4,
    pillarId: 'hydration',
    pillarName: '💧 Hidrasi (Hydration)',
    question: 'Bagaimana cara kamu memastikan asupan air harian tetap terpenuhi di hari yang sibuk?',
    options: [
      { text: 'A. Tidak punya kebiasaan khusus, minum hanya kalau ingat saja', score: 25 },
      { text: 'B. Kadang mencoba mengingatkan diri, hasilnya tidak konsisten', score: 50 },
      { text: 'C. Membawa botol minum ke mana-mana sebagai pengingat visual', score: 85 },
      { text: 'D. Alarm pengingat + botol 1L di meja kerja/sekolah setiap hari', score: 100 }
    ]
  },

  // --- PILAR 2: ISTIRAHAT & PEMULIHAN ---
  {
    id: 5,
    pillarId: 'sleep',
    pillarName: '💤 Istirahat & Pemulihan (Sleep & Recovery)',
    question: 'Berapa jam rata-rata durasi tidur malam kamu?',
    options: [
      { text: 'A. Kurang dari 5 jam semalam (Kurang kronis)', score: 25 },
      { text: 'B. 5 - 6 jam semalam (Kurang optimal)', score: 50 },
      { text: 'C. 7 - 8 jam semalam (Optimal & ideal)', score: 90 },
      { text: 'D. 8 - 9 jam teratur dengan kualitas nyenyak', score: 100 }
    ]
  },
  {
    id: 6,
    pillarId: 'sleep',
    pillarName: '💤 Istirahat & Pemulihan (Sleep & Recovery)',
    question: 'Seberapa sering kamu menggunakan gadget (HP/Laptop) di tempat tidur sebelum tidur?',
    options: [
      { text: 'A. Setiap malam hingga tertidur (Screen time tinggi)', score: 25 },
      { text: 'B. Sering (Membuat sulit tidur nyenyak)', score: 50 },
      { text: 'C. Jarang (Hanya cek pesan sebentar)', score: 85 },
      { text: 'D. Tidak pernah / Menjauhkan HP 30 menit sebelum tidur', score: 100 }
    ]
  },
  {
    id: 7,
    pillarId: 'sleep',
    pillarName: '💤 Istirahat & Pemulihan (Sleep & Recovery)',
    question: 'Bagaimana perasaan kamu saat bangun di pagi hari?',
    options: [
      { text: 'A. Sangat lelah, pusing, dan masih mengantuk berat', score: 25 },
      { text: 'B. Cukup lelah dan butuh kafein untuk fokus', score: 50 },
      { text: 'C. Cukup segar dan siap beraktivitas', score: 85 },
      { text: 'D. Sangat bugar, segar, dan berenergi penuh', score: 100 }
    ]
  },
  {
    id: 8,
    pillarId: 'sleep',
    pillarName: '💤 Istirahat & Pemulihan (Sleep & Recovery)',
    question: 'Apa yang biasanya kamu lakukan dalam 1 jam terakhir sebelum tidur?',
    options: [
      { text: 'A. Main game atau scroll media sosial hingga tertidur sendiri', score: 25 },
      { text: 'B. Nonton film atau serial hingga mengantuk', score: 50 },
      { text: 'C. Membaca buku ringan atau mendengarkan musik tenang', score: 85 },
      { text: 'D. Rutinitas terstruktur: peregangan, matikan layar, pernapasan tenang', score: 100 }
    ]
  },

  // --- PILAR 3: GERAK & POSTUR ---
  {
    id: 9,
    pillarId: 'physical',
    pillarName: '🏃 Gerak & Postur (Physical & Mobility)',
    question: 'Berapa durasi kamu duduk diam (sedentary) tanpa beranjak setiap harinya?',
    options: [
      { text: 'A. Lebih dari 8 jam sehari tanpa stretching', score: 25 },
      { text: 'B. 6 - 8 jam sehari (Jarang berdiri)', score: 50 },
      { text: 'C. 4 - 6 jam sehari (Diselingi stretching ringan)', score: 85 },
      { text: 'D. Kurang dari 4 jam / Rutin bergerak tiap 45 menit', score: 100 }
    ]
  },
  {
    id: 10,
    pillarId: 'physical',
    pillarName: '🏃 Gerak & Postur (Physical & Mobility)',
    question: 'Seberapa sering kamu melakukan olahraga terstruktur (minimal 20-30 menit)?',
    options: [
      { text: 'A. Tidak pernah sama sekali dalam seminggu', score: 25 },
      { text: 'B. 1 kali seminggu (Kadang-kadang)', score: 50 },
      { text: 'C. 2 - 3 kali seminggu (Cukup teratur)', score: 85 },
      { text: 'D. ≥ 4 kali seminggu / Rutin setiap hari', score: 100 }
    ]
  },
  {
    id: 11,
    pillarId: 'physical',
    pillarName: '🏃 Gerak & Postur (Physical & Mobility)',
    question: 'Apakah kamu sering mengalami pegal pada leher, bahu, atau punggung saat beraktivitas?',
    options: [
      { text: 'A. Ya, hampir setiap hari (Postur buruk/ergonomi kurang)', score: 25 },
      { text: 'B. Sering jika bekerja terlalu lama', score: 50 },
      { text: 'C. Kadang-kadang saja saat sangat lelah', score: 85 },
      { text: 'D. Hampir tidak pernah / Postur tubuh baik', score: 100 }
    ]
  },
  {
    id: 12,
    pillarId: 'physical',
    pillarName: '🏃 Gerak & Postur (Physical & Mobility)',
    question: 'Bagaimana kondisi energi fisik kamu setelah menjalani hari penuh aktivitas?',
    options: [
      { text: 'A. Sangat kelelahan, nyeri otot, tidak mampu melakukan apapun', score: 25 },
      { text: 'B. Cukup lelah dan butuh waktu lama untuk pulih', score: 50 },
      { text: 'C. Lelah normal, bisa pulih setelah istirahat singkat', score: 85 },
      { text: 'D. Energi masih cukup, tubuh segar setelah pemulihan aktif', score: 100 }
    ]
  },

  // --- PILAR 4: BAHAN BAKAR TUBUH (NUTRITION) ---
  {
    id: 13,
    pillarId: 'nutrition',
    pillarName: '🍎 Bahan Bakar Tubuh (Nutrition)',
    question: 'Seberapa sering kamu mengonsumsi sayur dan buah-buahan segar?',
    options: [
      { text: 'A. Sangat jarang / Hampir tidak pernah', score: 25 },
      { text: 'B. 1 - 2 kali seminggu', score: 50 },
      { text: 'C. Setiap hari tetapi jumlahnya terbatas', score: 85 },
      { text: 'D. Setiap kali makan utama (Porsi gizi seimbang)', score: 100 }
    ]
  },
  {
    id: 14,
    pillarId: 'nutrition',
    pillarName: '🍎 Bahan Bakar Tubuh (Nutrition)',
    question: 'Bagaimana keteraturan jam makan utama kamu (Sarapan, Makan Siang, Makan Malam)?',
    options: [
      { text: 'A. Sangat tidak teratur / Sering terlewat atau late night snack', score: 25 },
      { text: 'B. Kadang teratur, kadang terlambat jauh', score: 50 },
      { text: 'C. Cukup teratur di jam yang hampir sama', score: 85 },
      { text: 'D. Sangat disiplin dengan jadwal makan teratur', score: 100 }
    ]
  },
  {
    id: 15,
    pillarId: 'nutrition',
    pillarName: '🍎 Bahan Bakar Tubuh (Nutrition)',
    question: 'Seberapa sering kamu mengonsumsi makanan cepat saji (fast food / gorengan tinggi lemak)?',
    options: [
      { text: 'A. Hampir setiap hari (> 4 kali seminggu)', score: 25 },
      { text: 'B. 2 - 3 kali seminggu', score: 50 },
      { text: 'C. Maksimal 1 kali seminggu', score: 85 },
      { text: 'D. Jarang sekali / Menghindari makanan olahan tinggi minyak', score: 100 }
    ]
  },
  {
    id: 16,
    pillarId: 'nutrition',
    pillarName: '🍎 Bahan Bakar Tubuh (Nutrition)',
    question: 'Seberapa sering kamu melewatkan sarapan di pagi hari?',
    options: [
      { text: 'A. Hampir setiap hari, tidak sempat atau tidak terbiasa sarapan', score: 25 },
      { text: 'B. Sering melewatkan, hanya sarapan 2-3 kali seminggu', score: 50 },
      { text: 'C. Kadang-kadang melewatkan jika terburu-buru', score: 85 },
      { text: 'D. Hampir selalu sarapan dengan menu bergizi setiap pagi', score: 100 }
    ]
  }
];

const POST_TEST_QUESTIONS = ASSESSMENT_QUESTIONS.map(q => ({
  ...q,
  question: '[POST-TEST EVALUASI] ' + q.question
}));

// Educational Modules Data for 4 Health Pillars
const HEALTH_MODULES = {
  hydration: {
    id: 'hydration',
    title: 'Modul Hidrasi Optimal & Pencegahan Dehidrasi Harian',
    pillarName: '💧 Hidrasi (Hydration)',
    readTime: '3 Menit Baca',
    icon: 'bi-droplet-fill',
    image: 'assets/images/module-hydration.jpg',
    badge: 'Hidrasi Utama',
    shortDesc: 'Pelajari pentingnya minum 2L air putih per hari, mengenali warna urine, dan membatasi kafein.',
    summary: 'Air merupakan komponen utama organ tubuh manusia (±60%). Kekurangan cairan 2% saja dapat menurunkan tingkat konsentrasi hingga 20% dan memicu kelelahan kronis.',
    sections: [
      {
        heading: '1. Mengapa Tubuh Butuh 2 Liter Air Putih Every Day?',
        content: 'Air berfungsi melarutkan nutrisi, membuang sisa metabolisme melalui ginjal, menjaga suhu tubuh tetap stabil, dan melumasi persendian. Ketika hidrasi kurang, darah mengental sehingga jantung harus bekerja ekstra keras mengalirkan oksigen ke otak.',
        tip: 'Letakkan botol minum 1 liter di tempat yang langsung terlihat (meja belajar/meja makan) agar lebih mudah mengingat untuk minum.'
      },
      {
        heading: '2. Cara Mudah Membaca Warna Urine (Self-Assessment Urine Color)',
        content: 'Warna urine adalah indikator klinis instan tercukupinya cairan tubuh: <br>• <strong>Bening - Kuning Jernih:</strong> Sangat Terhidrasi (Kondisi Ideal).<br>• <strong>Kuning Tua:</strong> Dehidrasi Ringan (Segera minum 2 gelas air).<br>• <strong>Kecokelatan:</strong> Dehidrasi Berat (Segera konsumsi air putih dan tingkatkan asupan harian).',
        tip: 'Perhatikan warna urine sekali hari ini sebagai cek sederhana — ini cara termudah tahu apakah tubuhmu sudah cukup cairan.'
      },
      {
        heading: '3. Hindari Trap Minuman Berkafein & Tinggi Gula',
        content: 'Minuman seperti kopi manis, boba, dan soda memiliki efek diuretik atau meningkatkan kadar gula darah secara mendadak (sugar spike). Selalu imbang setiap 1 cangkir kopi dengan minimal 2 gelas air putih murni!',
        tip: 'Coba ganti satu pembelian minuman manis hari ini dengan air putih — mulai dari langkah kecil yang paling mudah.'
      },
      {
        heading: '4. Waktu Terbaik untuk Minum Air Putih',
        content: 'Minum segelas air (200-250 mL) segera setelah bangun tidur mengaktifkan organ dalam dan membersihkan racun yang terkumpul semalam. Minum sebelum makan membantu mengontrol porsi makan, dan minum setelah olahraga mengganti elektrolit yang hilang bersama keringat.',
        tip: 'Taruh segelas air di meja makan malam ini — langsung minum saat bangun esok pagi sebagai kebiasaan baru.'
      },
      {
        heading: '5. Elektrolit & Hidrasi Saat Olahraga',
        content: 'Saat berolahraga lebih dari 60 menit, keringat membawa serta natrium, kalium, dan magnesium. Minuman isotonik alami seperti air kelapa muda atau larutan gula-garam (ORS) lebih efektif memulihkan keseimbangan elektrolit dibanding air biasa saja.',
        tip: 'Siapkan air kelapa atau larutan ORS untuk sesi olahraga berikutnya yang lebih dari 1 jam.'
      }
    ],
    quickTip: 'Bawa botol minum 1 Liter di meja kerja atau tas sekolah, targetkan habis sebelum jam 14:00 dan isi ulang untuk sore hari!',
    quizQuestion: {
      question: 'Berapa volume konsumsi air putih harian yang direkomendasikan untuk menjaga metabolisme organ secara optimal?',
      options: [
        { text: 'A. Cukup 500 mL per hari', isCorrect: false },
        { text: 'B. Minimal 2 Liter (± 8 Gelas) per hari secara berkala', isCorrect: true },
        { text: 'C. 5 Liter sekaligus di malam hari saja', isCorrect: false },
        { text: 'D. Hanya minum saat tenggorokan sangat haus', isCorrect: false }
      ],
      explanation: 'Menjaga asupan 2 Liter air putih secara berkala membantu ginjal menyaring racun dan mencegah darah mengental.'
    }
  },

  sleep: {
    id: 'sleep',
    title: 'Modul Ritme Sirkadian & Pemulihan Tidur Nyenyak',
    pillarName: '💤 Istirahat & Pemulihan (Sleep & Recovery)',
    readTime: '4 Menit Baca',
    icon: 'bi-moon-stars-fill',
    image: 'assets/images/module-sleep.jpg',
    badge: 'Sleep Quality',
    shortDesc: 'Pahami durasi ideal 7-8 jam, perbaikan sel saat tidur, dan teknik membatasi screen time malam hari.',
    summary: 'Tidur bukan sekadar mematikan fisik, melainkan proses regenerasi seluler, konsolidasi memori otak, dan pembersihan racun metabolik (glymphatic system).',
    sections: [
      {
        heading: '1. Pentingnya Durasi 7-8 Jam & Konsistensi Jam Tidur',
        content: 'Tubuh manusia memiliki jam biologis alami (Ritme Sirkadian). Tidur pada jam yang konsisten (misal jam 22.00 - 06.00) mengoptimalkan pelepasan hormon pertumbuhan (HGH) dan melatonin.',
        tip: 'Tetapkan 1 jam bangun yang sama setiap hari — mulai dari sana untuk membangun ritme tidur yang stabil.'
      },
      {
        heading: '2. Bahaya Blue Light Gadget Sebelum Tidur',
        content: 'Paparan cahaya biru dari layar Smartphone/Laptop menekan produksi hormon Melatonin hingga 50%. Hal ini membuat otak tertipu mengira masih siang hari, memicu insomnia dan kualitas tidur dangkal (non-REM).',
        tip: 'Aktifkan Night Shift / Blue Light Filter di ponselmu mulai jam 20.00 malam ini.'
      },
      {
        heading: '3. Tips Menciptakan Sleep Hygiene Ideal',
        content: 'Matikan layar gadget 30-45 menit sebelum tidur. Redupkan lampu kamar, jaga suhu tetap sejuk (20-23°C), dan hindari makanan berat 2 jam sebelum berbaring.',
        tip: 'Rapikan area tidur sekarang dan pilih 1 aktivitas tenang yang sama setiap malam (membaca, peregangan, atau mendengarkan musik).'
      },
      {
        heading: '4. Power Nap: Senjata Siang Hari yang Sering Diabaikan',
        content: 'Tidur siang 10-20 menit (power nap) antara pukul 13.00-15.00 terbukti meningkatkan kewaspadaan hingga 34% dan performa kognitif hingga 16%. Hindari tidur siang lebih dari 30 menit agar tidak masuk fase tidur dalam yang justru membuat pusing saat bangun.',
        tip: 'Set alarm 20 menit untuk power nap hari ini antara pukul 13.00–14.30 — coba dan rasakan sendiri perbedaannya.'
      },
      {
        heading: '5. Hubungan Tidur & Sistem Imun Tubuh',
        content: 'Selama tidur nyenyak, tubuh memproduksi sitokin — protein yang melawan infeksi dan peradangan. Kurang tidur kronis (<6 jam) menekan produksi sel T (imun adaptif) hingga 70%, membuat tubuh lebih rentan terhadap flu, infeksi, dan pemulihan luka yang lebih lambat.',
        tip: 'Tidur cukup adalah "vaksin alami" — prioritaskan tidur sebelum deadline, bukan setelah semua selesai.'
      }
    ],
    quickTip: 'Gunakan fitur Night Shift/Blue Light Filter di ponselmu mulai jam 20:00 dan taruh HP minimal 1 meter dari tempat tidur.',
    quizQuestion: {
      question: 'Berapa durasi tidur malam ideal bagi dewasa muda untuk regenerasi sel dan konsentrasi optimal?',
      options: [
        { text: 'A. 3 - 4 jam semalam', isCorrect: false },
        { text: 'B. 7 - 8 jam semalam secara rutin', isCorrect: true },
        { text: 'C. 12 jam setiap akhir pekan saja', isCorrect: false },
        { text: 'D. Tidak perlu tidur jika mengonsumsi kafein', isCorrect: false }
      ],
      explanation: 'Durasi 7-8 jam tidur malam teratur memulihkan fungsi kognitif otak dan menjaga kekebalan tubuh.'
    }
  },

  physical: {
    id: 'physical',
    title: 'Modul Anti-Sedentary Lifestyle & Mobilitas Postur Sehat',
    pillarName: '🏃 Gerak & Postur (Physical & Mobility)',
    readTime: '3 Menit Baca',
    icon: 'bi-person-walking',
    image: 'assets/images/module-physical.jpg',
    badge: 'Active Mobility',
    shortDesc: 'Atasi pegal leher/bahu, cegah bahaya duduk berjam-jam, dan tingkatkan langkah kaki harian.',
    summary: 'Duduk diam lebih dari 6 jam sehari (sedentary lifestyle) meningkatkan risiko kekakuan otot, metabolisme lambat, serta nyeri punggung bawah (LBP).',
    sections: [
      {
        heading: '1. Aturan 45/5: Stretching Singkat Tiap Jam',
        content: 'Setiap 45 menit duduk bekerja, luangkan 5 menit untuk berdiri, berjalan mengambil air, atau melakukan peregangan bahu dan leher. Ini mengembalikan sirkulasi darah yang tersumbat.',
        tip: 'Set alarm 45 menit sekarang — saat berbunyi, berdiri dan lakukan 5 gerakan neck stretch & shoulder roll.'
      },
      {
        heading: '2. Target 8,000 Langkah Kaki Harian',
        content: 'Aktivitas fisik ringan seperti berjalan kaki mengaktifkan otot kuadrisep dan betis sebagai pompa sekunder jantung untuk melancarkan aliran darah balik ke dada.',
        tip: 'Aktifkan pedometer di HP dan cek berapa langkah kamu hari ini — lalu coba tambah 500 langkah besok.'
      },
      {
        heading: '3. Ergonomi Kerja & Postur Leher (Text Neck Syndrome)',
        content: 'Saat menatap layar ponsel atau monitor yang terlalu rendah, beban pada tulang leher meningkat hingga 27 kg! Posisikan monitor sejajar mata dan tulang punggung tegak.',
        tip: 'Cek posisi layarmu sekarang — apakah sudah sejajar mata? Perbaiki posisi sebelum melanjutkan baca.'
      },
      {
        heading: '4. Manfaat Micro-Movement dalam Rutinitas Harian',
        content: 'Micro-movement adalah gerakan kecil yang dapat dilakukan di mana saja: mengangkat tumit saat berdiri, memutar pergelangan tangan, atau menggerakkan jari-jari kaki. Studi menunjukkan 30 menit micro-movement tersebar sepanjang hari memiliki manfaat metabolik setara 20 menit jalan santai terus-menerus.',
        tip: 'Pilih 1 micro-movement favorit yang bisa kamu lakukan sambil menonton atau mendengarkan podcast — mulai hari ini.'
      },
      {
        heading: '5. Latihan Pernapasan untuk Relaksasi Otot',
        content: 'Pernapasan diafragma (perut mengembang saat tarik napas, bukan dada) mengaktifkan sistem saraf parasimpatik yang meredakan ketegangan otot. Lakukan teknik 4-7-8: tarik napas 4 detik, tahan 7 detik, hembuskan 8 detik — efektif mengurangi kekakuan bahu dan leher akibat postur buruk.',
        tip: 'Lakukan 3 siklus teknik 4-7-8 sekarang: tarik 4 detik, tahan 7 detik, hembuskan 8 detik — rasakan efeknya langsung.'
      }
    ],
    quickTip: 'Aktifkan alarm pengingat berdiri setiap jam di ponselmu dan sempatkan melakukan 5x neck stretch & shoulder roll!',
    quizQuestion: {
      question: 'Apa langkah pencegahan terbaik terhadap dampak negatif gaya hidup duduk berjam-jam (sedentary)?',
      options: [
        { text: 'A. Duduk tanpa bergerak selama 10 jam nonstop', isCorrect: false },
        { text: 'B. Berdiri dan lakukan peregangan/berjalan singkat setiap 45-60 menit', isCorrect: true },
        { text: 'C. Menggunakan bantal yang sangat tebal', isCorrect: false },
        { text: 'D. Menekuk punggung sekencang mungkin saat bekerja', isCorrect: false }
      ],
      explanation: 'Istirahat bergerak 5 menit tiap 45 menit memulihkan aliran darah dan melatih fleksibilitas sendi.'
    }
  },

  nutrition: {
    id: 'nutrition',
    title: 'Modul Porsi Gizi Seimbang & Pengendalian Fast Food',
    pillarName: '🍎 Bahan Bakar Tubuh (Nutrition)',
    readTime: '4 Menit Baca',
    icon: 'bi-apple',
    image: 'assets/images/module-nutrition.jpg',
    badge: 'Balanced Fuel',
    shortDesc: 'Pahami pola makan Piring Ku, kurangi makanan olahan tinggi minyak, dan jaga jam makan teratur.',
    summary: 'Makanan adalah bahan bakar sel tubuh. Memilih makronutrisi seimbang (karbohidrat kompleks, protein lean, lemak sehat) serta mikronutrisi (serat/vitamin) menjaga gula darah stabil sepanjang hari.',
    sections: [
      {
        heading: '1. Konsep Piring Seimbang (Isi Piringku)',
        content: 'Bagi piring makanmu menjadi: 1/2 porsi sayuran & buah-buahan, 1/4 porsi karbohidrat kompleks (nasi merah/kentang/oat), dan 1/4 porsi protein murni (dada ayam/ikan/tahu/tempe).',
        tip: 'Tambahkan satu jenis sayur atau buah ke salah satu waktu makan hari ini — cukup satu dulu untuk mulai.'
      },
      {
        heading: '2. Hindari Sugar & Trans-Fat Rollercoaster',
        content: 'Makanan cepat saji dan gorengan kaya akan lemak jenuh berlebih dan garam yang menyebabkan rasa kantuk setelah makan (food coma) serta inflamasi pembuluh darah.',
        tip: 'Kurangi 1 pembelian fast food per minggu dan ganti dengan masakan rumah atau pilihan yang lebih sehat.'
      },
      {
        heading: '3. Konsistensi Jam Makan Utama',
        content: 'Menjaga waktu sarapan, makan siang, dan makan malam yang konsisten membantu mengatur hormon lapar (Ghrelin) dan menghindarkan dari binging makan berlebihan di malam hari.',
        tip: 'Atur alarm untuk 3 waktu makan utama hari ini — konsistensi jadwal adalah fondasi pola makan sehat.'
      },
      {
        heading: '4. Protein & Sarapan: Fondasi Energi Sepanjang Hari',
        content: 'Sarapan dengan kandungan protein cukup (telur, tahu, atau susu) menstabilkan kadar gula darah di pagi hari dan mencegah rasa lapar berlebih menjelang siang. Penelitian menunjukkan orang yang sarapan berprotein mengonsumsi rata-rata 400 kalori lebih sedikit sepanjang hari dibanding yang melewatkan sarapan.',
        tip: 'Besok pagi, coba tambahkan 1 butir telur atau segelas susu ke menu sarapanmu — protein pagi itu investasi energi seharian.'
      },
      {
        heading: '5. Micronutrisi yang Sering Terlupakan',
        content: 'Selain makronutrisi, tubuh membutuhkan vitamin D (paparan sinar matahari pagi 10-15 menit), zat besi (bayam, tempe, hati ayam), dan omega-3 (ikan salmon, chia seed, kacang kenari) untuk fungsi otak, kekebalan tubuh, dan manajemen inflamasi yang optimal.',
        tip: 'Jemur diri di bawah sinar matahari pagi (sebelum jam 10) selama 10-15 menit hari ini untuk dosis vitamin D gratis.'
      }
    ],
    quickTip: 'Mulailah menyisipkan minimal 1 porsi buah segar (seperti pisang atau apel) saat sarapan pagi!',
    quizQuestion: {
      question: 'Berapa proporsi serat (sayur dan buah) yang dianjurkan dalam panduan porsi gizi seimbang harian?',
      options: [
        { text: 'A. 0% (tidak perlu buah & sayur)', isCorrect: false },
        { text: 'B. Sekitar 1/2 (50%) dari total porsi piring makan', isCorrect: true },
        { text: 'C. Hanya 5% piring saja', isCorrect: false },
        { text: 'D. Seluruh piring hanya berisi gorengan', isCorrect: false }
      ],
      explanation: 'Memenuhi 50% piring dengan sayur dan buah memberikan serat pangan yang vital bagi mikrobiota usus dan pencegahan inflamasi.'
    }
  }
};

// 7-Day Health Challenges Data Definitions
const CHALLENGES_DATA = [
  {
    id: 'c-hydration-2l',
    pillarId: 'hydration',
    title: 'Challenge Hidrasi 2L Air Putih',
    subtitle: 'Minum Minimal 2 Liter Air Putih Setiap Hari Selama 7 Hari Berturut-Turut',
    description: 'Bawa botol air 1L, pastikan habis 2 isi ulang setiap hari. Bebaskan diri dari dehidrasi!',
    icon: 'bi-droplet-fill',
    targetDays: 7,
    unit: 'Gelas / Liter',
    dailyTargetText: '8 Gelas / 2 Liter Air Putih',
    color: '#0EA5E9'
  },
  {
    id: 'c-sleep-8h',
    pillarId: 'sleep',
    title: 'Challenge Tidur 8 Jam Nyenyak',
    subtitle: 'Matikan Gadget 30 Menit Sebelum Tidur & Dapatkan Tidur 7-8 Jam',
    description: 'Rapikan tempat tidur, matikan lampu jam 22.00, dan bangun segar berenergi.',
    icon: 'bi-moon-stars-fill',
    targetDays: 7,
    unit: 'Jam Tidur',
    dailyTargetText: '7 - 8 Jam Tidur Malam',
    color: '#8B5CF6'
  },
  {
    id: 'c-steps-8k',
    pillarId: 'physical',
    title: 'Challenge 8,000 Langkah Kaki',
    subtitle: 'Berjalan Minimal 8,000 Langkah Kaki & Stretching Setiap Jam',
    description: 'Pilih tangga dibanding lift, lakukan peregangan setiap 45 menit bekerja.',
    icon: 'bi-person-walking',
    targetDays: 7,
    unit: 'Langkah Kaki',
    dailyTargetText: '8,000 Langkah / 30 Menit Gerak',
    color: '#10B981'
  },
  {
    id: 'c-nutrition-clean',
    pillarId: 'nutrition',
    title: 'Challenge Bebas Fast Food & Sayur',
    subtitle: 'Hindari Makanan Cepat Saji & Tambahkan Sayur/Buah di Makan Siang',
    description: 'Santap masakan rumah / sayuran segar, kurangi minuman gula tinggi selama 7 hari.',
    icon: 'bi-apple',
    targetDays: 7,
    unit: 'Porsi Gizi',
    dailyTargetText: '1 Porsi Sayur/Buah & 0 Fast Food',
    color: '#F59E0B'
  }
];

// Achievement Badges Definitions
const BADGES_DATA = [
  {
    id: 'badge-profile',
    name: 'Pintis Pertama',
    title: 'Profile Pioneer',
    icon: '🎖️',
    description: 'Menyelesaikan setup data fisik & analisis dini kebiasaan.',
    category: 'General',
    unlockedByDefault: true
  },
  {
    id: 'badge-hydration-hero',
    name: 'Hydration Hero',
    title: 'Hydration Hero',
    icon: '💧',
    description: 'Mencapai skor hidrasi optimal ≥ 80 atau menyelesaikan challenge hidrasi 7 hari.',
    category: 'Hydration',
    unlockedByDefault: false
  },
  {
    id: 'badge-sleep-master',
    name: 'Sleep Master',
    title: 'Sleep Master',
    icon: '💤',
    description: 'Mencapai kualitas tidur nyenyak 7-8 jam & minim screen time.',
    category: 'Sleep',
    unlockedByDefault: false
  },
  {
    id: 'badge-quiz-pro',
    name: 'Quiz Pro',
    title: 'Quiz Master',
    icon: '🧠',
    description: 'Lulus kuis evaluasi pemahaman modul dengan skor sempurna 100.',
    category: 'Education',
    unlockedByDefault: false
  },
  {
    id: 'badge-mobility-king',
    name: 'Mobility King',
    title: 'Mobility King',
    icon: '🏃',
    description: 'Mencapai skor gerak & mobilitas postur tinggi dalam gaya hidup.',
    category: 'Physical',
    unlockedByDefault: false
  },
  {
    id: 'badge-nutrition-ninja',
    name: 'Nutrition Ninja',
    title: 'Nutrition Ninja',
    icon: '🍎',
    description: 'Mempertahankan pola makan gizi seimbang & minim fast food.',
    category: 'Nutrition',
    unlockedByDefault: false
  },
  {
    id: 'badge-streak-warrior',
    name: 'Streak Warrior',
    title: 'Streak Warrior',
    icon: '🔥',
    description: 'Mempertahankan komitmen harian streak kesehatan minimal 5 hari.',
    category: 'Streak',
    unlockedByDefault: false
  },
  {
    id: 'badge-habit-complete',
    name: 'Habit Complete',
    title: 'Habit Complete',
    icon: '🏆',
    description: 'Menyelesaikan challenge kebiasaan selama 7 hari.',
    category: 'Consistency',
    unlockedByDefault: false
  },
  {
    id: 'badge-posttest-champion',
    name: 'Post-Test Champion',
    title: 'Re-Check Champion',
    icon: '🏆',
    description: 'Menyelesaikan re-check 7 hari dan menunjukkan peningkatan skor gaya hidup.',
    category: 'Evaluation',
    unlockedByDefault: false
  }
];
