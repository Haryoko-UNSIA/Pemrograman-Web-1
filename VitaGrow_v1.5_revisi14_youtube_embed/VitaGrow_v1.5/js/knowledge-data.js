// Knowledge Check pool — curated from Anggota 2 & Anggota 4.
// One question is selected randomly inside the current pillar only.
const KNOWLEDGE_POOL = {
  hydration: [
    {
      question: 'Kebiasaan mana yang paling membantu menjaga hidrasi sepanjang hari?',
      options: ['Minum hanya saat sangat haus', 'Membawa botol air dan minum berkala', 'Mengganti air putih dengan minuman manis', 'Minum sebanyak mungkin sekaligus di malam hari'],
      correct: 1,
      feedback: 'Membawa botol dan minum berkala membuat kebiasaan lebih mudah dilakukan secara konsisten.'
    },
    {
      question: 'Bagaimana kebiasaan minum air putih yang lebih baik?',
      options: ['Sangat sedikit', 'Kurang', 'Cukup dan dilakukan berkala', 'Tidak perlu jika tidak haus'],
      correct: 2,
      feedback: 'Asupan cairan perlu dijaga sepanjang hari dan disesuaikan dengan kebutuhan serta aktivitas.'
    },
    {
      question: 'Jika ingin mengurangi minuman manis, langkah kecil yang realistis adalah...',
      options: ['Menghentikan semua minuman dalam sehari', 'Mengganti satu minuman manis hari ini dengan air putih', 'Menambah gula pada kopi agar lebih kenyang', 'Mengganti air putih dengan soda bebas gula sepanjang hari'],
      correct: 1,
      feedback: 'Mengganti satu pilihan terlebih dahulu membuat perubahan terasa lebih mudah dipertahankan.'
    },
    {
      question: 'Apa tujuan utama membawa botol minum saat beraktivitas?',
      options: ['Agar tidak perlu makan', 'Sebagai pengingat visual untuk minum berkala', 'Agar bisa minum sebanyak mungkin sekaligus', 'Untuk menggantikan waktu istirahat'],
      correct: 1,
      feedback: 'Pengingat visual sederhana dapat membantu membentuk kebiasaan hidrasi.'
    }
  ],
  sleep: [
    {
      question: 'Kebiasaan mana yang mendukung tidur lebih teratur?',
      options: ['Jam tidur selalu berubah-ubah', 'Menjaga waktu bangun relatif konsisten', 'Menggunakan gadget sampai tertidur', 'Mengandalkan kafein saat mengantuk'],
      correct: 1,
      feedback: 'Waktu bangun yang konsisten dapat membantu membangun ritme tidur yang lebih teratur.'
    },
    {
      question: 'Apa langkah praktis sebelum tidur yang dapat membantu mengurangi paparan layar?',
      options: ['Menambah waktu scrolling', 'Mematikan atau menjauhkan gadget sekitar 30 menit sebelum tidur', 'Menonton video sampai mengantuk', 'Membawa laptop ke tempat tidur'],
      correct: 1,
      feedback: 'Mengurangi penggunaan layar sebelum tidur adalah langkah sederhana yang dapat dicoba secara bertahap.'
    },
    {
      question: 'Apa arti mendapatkan waktu istirahat yang cukup?',
      options: ['Selalu tidur sepanjang hari', 'Memberi tubuh waktu tidur dan pemulihan yang memadai', 'Tidak perlu memiliki jadwal tidur', 'Mengganti tidur dengan minuman berkafein'],
      correct: 1,
      feedback: 'Istirahat yang cukup membantu tubuh dan pikiran mendapatkan waktu pemulihan.'
    },
    {
      question: 'Jika rutinitas tidur belum teratur, langkah awal yang realistis adalah...',
      options: ['Mengubah semuanya dalam satu malam', 'Memilih satu waktu bangun yang lebih konsisten', 'Tidur hanya saat sangat lelah', 'Menambah screen time malam hari'],
      correct: 1,
      feedback: 'Perubahan kecil yang konsisten lebih realistis daripada mengubah seluruh rutinitas sekaligus.'
    }
  ],
  physical: [
    {
      question: 'Apa kebiasaan sederhana untuk mengurangi duduk terlalu lama?',
      options: ['Duduk terus sampai pekerjaan selesai', 'Berdiri, berjalan sebentar, atau melakukan peregangan secara berkala', 'Mengurangi semua aktivitas fisik', 'Hanya berolahraga sekali sebulan'],
      correct: 1,
      feedback: 'Jeda gerak singkat dapat menjadi langkah praktis untuk memecah waktu duduk yang panjang.'
    },
    {
      question: 'Seberapa sering aktivitas fisik teratur idealnya dibangun?',
      options: ['Tidak perlu teratur', 'Hanya jika sedang sempat', 'Secara rutin sesuai kemampuan', 'Hanya saat berat badan berubah'],
      correct: 2,
      feedback: 'Konsistensi sesuai kemampuan lebih penting daripada langsung memaksakan target besar.'
    },
    {
      question: 'Setelah duduk lama, tindakan sederhana yang bisa dilakukan adalah...',
      options: ['Tetap duduk', 'Melakukan peregangan ringan atau berjalan sebentar', 'Langsung melakukan latihan berat', 'Tidur di meja kerja'],
      correct: 1,
      feedback: 'Peregangan ringan atau berjalan sebentar adalah titik mulai yang mudah dilakukan.'
    },
    {
      question: 'Jika jarang aktif bergerak, pendekatan yang paling realistis adalah...',
      options: ['Langsung membuat target ekstrem', 'Memulai dari aktivitas ringan lalu meningkat bertahap', 'Tidak perlu bergerak', 'Menunggu sampai motivasi datang sendiri'],
      correct: 1,
      feedback: 'Target kecil membantu mengurangi hambatan awal dan membangun konsistensi.'
    }
  ],
  nutrition: [
    {
      question: 'Kebiasaan sarapan yang lebih baik adalah...',
      options: ['Tidak pernah sarapan', 'Sarapan dengan pilihan makanan yang bergizi secara teratur', 'Hanya minum minuman manis', 'Mengganti sarapan dengan makanan cepat saji setiap hari'],
      correct: 1,
      feedback: 'Sarapan yang bergizi dan teratur dapat menjadi bagian dari pola makan yang lebih seimbang.'
    },
    {
      question: 'Seberapa sering sebaiknya sayur dan buah menjadi bagian dari pola makan?',
      options: ['Tidak pernah', 'Hanya saat sakit', 'Secara rutin sesuai kebutuhan', 'Hanya sebulan sekali'],
      correct: 2,
      feedback: 'Sayur dan buah sebaiknya menjadi bagian rutin dari pola makan sehari-hari.'
    },
    {
      question: 'Langkah kecil untuk memperbaiki pola makan adalah...',
      options: ['Mengubah semua menu sekaligus', 'Menambahkan satu pilihan sayur atau buah hari ini', 'Menghilangkan semua makanan favorit', 'Tidak perlu memperhatikan pilihan makanan'],
      correct: 1,
      feedback: 'Menambahkan satu pilihan sehat adalah perubahan kecil yang lebih mudah dipertahankan.'
    },
    {
      question: 'Apa kebiasaan yang dapat membantu mengurangi makanan cepat saji?',
      options: ['Membeli lebih sering', 'Mengganti satu pilihan fast food dengan makanan yang lebih seimbang', 'Tidak makan sama sekali', 'Mengganti semua makanan dengan minuman manis'],
      correct: 1,
      feedback: 'Mengurangi satu kesempatan fast food terlebih dahulu dapat menjadi langkah awal yang realistis.'
    }
  ]
};
