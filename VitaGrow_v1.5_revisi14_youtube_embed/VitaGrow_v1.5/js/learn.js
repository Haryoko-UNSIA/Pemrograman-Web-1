// Learning Center — adaptive, practical, and lightweight.
const LearnView = (function () {
  function renderLearnSpecificPage(container, state) {
    const lowestPillarId = state.assessment?.lowestPillar || 'hydration';
    const mod = HEALTH_MODULES[lowestPillarId] || HEALTH_MODULES.hydration;
    const score = state.assessment?.pillarScores?.[lowestPillarId] || 0;
    const tip = getPracticalTip(lowestPillarId, state);

    container.innerHTML = `
      <div class="mb-4">
        <h2 class="fw-bold mb-1">📚 Learning Center</h2>
        <p class="text-muted mb-0">Materi dipilih berdasarkan area fokus hasil Health Assessment.</p>
      </div>
      <div class="vitabyte-card-mint border-emerald mb-4 p-4">
        <span class="eyebrow-label">REKOMENDASI UNTUK ANDA</span>
        <h3 class="fw-bold text-dark mt-1 mb-2">${mod.title}</h3>
        <p class="text-secondary mb-2">${mod.summary}</p>
        <span class="badge bg-white text-dark border">${mod.pillarName} • Skor ${score}/100</span>
      </div>
      <div class="vitabyte-card mb-4">
        <h5 class="fw-bold mb-3">🎯 Langkah pertama yang realistis</h5>
        <p class="text-secondary mb-3">${tip.text}</p>
        <div class="micro-step-box">${tip.step}</div>
      </div>
      <a href="learn-detail.html?pillar=${mod.id}" class="btn btn-emerald w-100 py-3 mb-3">📖 Buka Materi Lengkap →</a>
    `;
  }

  function getPracticalTip(pillarId, state) {
    const bmi = Number(state.metrics?.bmi || 0);
    const tips = {
      hydration: { text: 'Mulai dengan membuat air putih lebih mudah terlihat dan dijangkau. Tidak perlu langsung mengubah semua kebiasaan.', step: '💧 Langkah kecil: letakkan botol air di meja dan minum satu gelas saat mulai aktivitas.' },
      sleep: { text: 'Kalau jadwal tidur belum konsisten, pilih satu kebiasaan kecil terlebih dahulu daripada mengubah seluruh rutinitas sekaligus.', step: '😴 Langkah kecil: tetapkan satu waktu bangun yang relatif sama besok pagi.' },
      physical: { text: bmi >= 25 ? 'Mulai dari gerakan berdampak rendah dan jeda duduk. BMI hanya konteks, bukan penentu tunggal kemampuan bergerak.' : 'Gunakan aktivitas yang sudah nyaman sebagai dasar, lalu tingkatkan sedikit demi sedikit setelah konsisten.', step: bmi >= 25 ? '🏃 Langkah kecil: berdiri dan berjalan santai 5–10 menit hari ini.' : '🏃 Langkah kecil: tambahkan jalan kaki singkat atau stretching pada waktu yang sama setiap hari.' },
      nutrition: { text: 'Tidak perlu langsung mengganti seluruh menu. Satu tambahan atau satu pengurangan yang konsisten sudah menjadi awal.', step: '🍎 Langkah kecil: tambahkan satu porsi sayur atau buah pada salah satu waktu makan hari ini.' }
    };
    return tips[pillarId] || tips.hydration;
  }

  const EXTERNAL_RESOURCES = {
    hydration: {
      source: 'NHS',
      title: 'Water, drinks and hydration',
      description: 'Panduan tentang pilihan minuman, kebutuhan cairan, dan cara menjaga tubuh tetap terhidrasi.',
      url: 'https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/water-drinks-nutrition/'
    },
    sleep: {
      source: 'NHS Every Mind Matters',
      title: 'Fall asleep faster and sleep better',
      description: 'Panduan praktis tentang sleep hygiene, rutinitas tidur, dan kebiasaan yang mendukung tidur lebih baik.',
      url: 'https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/how-to-fall-asleep-faster-and-sleep-better/'
    },
    physical: {
      source: 'CDC',
      title: 'Adding Physical Activity as an Adult',
      description: 'Panduan memulai aktivitas fisik secara bertahap dan menemukan aktivitas yang sesuai dengan kemampuan.',
      url: 'https://www.cdc.gov/physical-activity-basics/adding-adults/index.html'
    },
    nutrition: {
      source: 'World Health Organization (WHO)',
      title: 'Healthy diet',
      description: 'Informasi berbasis bukti tentang prinsip pola makan sehat, termasuk kecukupan, keseimbangan, moderasi, dan keberagaman.',
      url: 'https://www.who.int/en/news-room/fact-sheets/detail/healthy-diet'
    }
  };

  function renderLearnMore(pillarId) {
    const resource = EXTERNAL_RESOURCES[pillarId];
    if (!resource) return '';
    return `
      <section class="learn-more-card my-4">
        <div class="d-flex flex-wrap justify-content-between align-items-start gap-3">
          <div class="flex-grow-1">
            <span class="eyebrow-label">LEARN MORE</span>
            <h5 class="fw-bold text-dark mt-1 mb-1">🌎 ${resource.title}</h5>
            <p class="small text-muted mb-1">Sumber: <strong>${resource.source}</strong></p>
            <p class="small text-secondary mb-0">${resource.description}</p>
          </div>
          <a class="btn btn-outline-emerald btn-sm rounded-pill px-3 flex-shrink-0" href="${resource.url}" target="_blank" rel="noopener noreferrer">Learn More ↗</a>
        </div>
      </section>`;
  }

  const EDUCATION_VIDEOS = {
    hydration: {
      title: "What would happen if you didn’t drink water?",
      source: 'TED-Ed',
      videoId: '9iMGFqMmUFs',
      embedUrl: 'https://www.youtube.com/embed/9iMGFqMmUFs?si=BXwENcjXE2QEjymZ',
      label: 'Hydration Education'
    },
    sleep: {
      title: "What would happen if you didn’t sleep?",
      source: 'TED-Ed',
      videoId: 'dqONk48l5vY',
      embedUrl: 'https://www.youtube.com/embed/dqONk48l5vY',
      label: 'Sleep Education'
    },
    physical: {
      title: 'Do you really need to take 10,000 steps a day?',
      source: 'TED-Ed',
      videoId: 'eEWa7cpiyD8',
      embedUrl: 'https://www.youtube.com/embed/eEWa7cpiyD8',
      label: 'Physical Activity Education'
    },
    nutrition: {
      title: 'A healthy diet, a healthier world',
      source: 'World Health Organization (WHO)',
      videoId: 'XMcab1MFaLc',
      embedUrl: 'https://www.youtube.com/embed/XMcab1MFaLc',
      label: 'Nutrition Education'
    }
  };

  function renderEducationVideo(pillarId) {
    const video = EDUCATION_VIDEOS[pillarId];
    if (!video) return '';
    return `
      <section class="video-learning-card my-4">
        <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
          <div>
            <span class="eyebrow-label">VIDEO EDUKASI</span>
            <h5 class="fw-bold text-dark mt-1 mb-1">${video.title}</h5>
            <p class="small text-muted mb-0">Source: ${video.source} • ${video.label}</p>
          </div>
          <span class="badge rounded-pill bg-light text-dark border">English</span>
        </div>
        <div class="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm bg-dark video-frame-wrap">
          <iframe
            src="${video.embedUrl}"
            title="${video.title} — ${video.source}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>
        </div>
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-2">
          <p class="small text-muted mb-0">Video berbahasa Inggris. Gunakan subtitle YouTube bila diperlukan.</p>
          <a class="btn btn-outline-emerald btn-sm rounded-pill" href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank" rel="noopener noreferrer">▶ Watch on YouTube ↗</a>
        </div>
      </section>`;
  }

  function renderLearnDetailPage(container, pillarId) {
    const mod = HEALTH_MODULES[pillarId] || HEALTH_MODULES.hydration;
    const state = VitabyteStore.getState();
    const score = state.assessment?.pillarScores?.[pillarId] || 0;
    const practical = getPracticalTip(pillarId, state);

    container.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div><span class="badge-pill-mint"><i class="bi ${mod.icon}"></i> ${mod.pillarName}</span></div>
        <a href="learn-specific.html" class="btn btn-outline-secondary btn-sm rounded-pill px-3">← Kembali</a>
      </div>
      <div class="vitabyte-card mb-4">
        <h2 class="fw-bold text-dark mb-1">${mod.title}</h2>
        <div class="small text-muted mb-4 pb-3 border-bottom">⏱️ ${mod.readTime} • Skor fokus saat ini: ${score}/100</div>
        ${mod.image ? `<img src="${mod.image}" alt="${mod.pillarName}" class="w-100 rounded-3 mb-4 d-block" style="height:auto" onerror="this.remove()">` : ''}
        <p class="lead text-secondary mb-4">${mod.summary}</p>
        ${mod.sections.map(sec => `
          <section class="mb-4">
            <h5 class="fw-bold text-dark mb-2">${sec.heading}</h5>
            <p class="text-secondary mb-0">${sec.content}</p>
            ${sec.tip ? `<div class="tipbox-vitabyte mt-2"><strong class="text-success">💡 Tips Praktis:</strong> ${sec.tip}</div>` : ''}
          </section>`).join('')}
        <div class="vitabyte-card-mint border-emerald my-4">
          <div class="eyebrow-label">PERSONAL PRACTICAL TIP</div>
          <h6 class="fw-bold text-dark mt-1 mb-2">Mulai dari yang terasa mudah</h6>
          <p class="small text-secondary mb-2">${practical.text}</p>
          <div class="micro-step-box">${practical.step}</div>
        </div>
        ${renderEducationVideo(pillarId)}
        ${renderLearnMore(pillarId)}
        <div class="principle-box my-4">
          <span class="eyebrow-label">PRINSIP VITAGROW</span>
          <h6 class="fw-bold text-dark mt-1 mb-2">Mulai kecil → konsisten → tingkatkan bertahap.</h6>
          <p class="small text-muted mb-0">Tips praktis dibuat sebagai langkah awal yang realistis. Jika terasa terlalu berat, target dapat diturunkan kembali.</p>
        </div>
        <div id="knowledge-check-container"></div>
        <div class="d-grid gap-2 mt-4 pt-3 border-top">
          <a href="challenge-hub.html?pillar=${pillarId}" class="btn btn-emerald py-3">🏆 Lanjut ke Challenge Pilar Ini →</a>
          <a href="education.html" class="btn btn-outline-secondary py-3">Kembali ke Semua Materi</a>
        </div>
      </div>
      <p class="text-center text-muted small mt-3">VitaGrow adalah media edukasi, bukan alat diagnosis medis. BMI digunakan sebagai informasi tambahan.</p>
    `;
    const kc = document.getElementById('knowledge-check-container');
    if (kc && typeof KnowledgeView !== 'undefined') KnowledgeView.render(kc, pillarId);
  }

  return { renderLearnSpecificPage, renderLearnDetailPage, getPracticalTip, EDUCATION_VIDEOS, EXTERNAL_RESOURCES };
})();
