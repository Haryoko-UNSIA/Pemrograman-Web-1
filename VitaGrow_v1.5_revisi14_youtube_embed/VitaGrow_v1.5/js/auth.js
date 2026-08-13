// js/auth.js - Auth & Profile Setup Controllers
const AuthView = (function () {
  function renderLandingPage(container) {
    const pillars = [
      {
        title: 'Hydration',
        icon: '💧',
        image: 'assets/images/hero-hydration.webp',
        text: 'Cukupi kebutuhan cairan tubuh setiap hari.',
        tone: 'blue'
      },
      {
        title: 'Sleep',
        icon: '😴',
        image: 'assets/images/hero-sleep.webp',
        text: 'Tidur berkualitas untuk pemulihan tubuh dan pikiran.',
        tone: 'purple'
      },
      {
        title: 'Activity',
        icon: '🏃',
        image: 'assets/images/hero-activity.webp',
        text: 'Aktif bergerak untuk tubuh yang lebih sehat.',
        tone: 'green'
      },
      {
        title: 'Nutrition',
        icon: '🥗',
        image: 'assets/images/hero-nutrition.webp',
        text: 'Makan makanan bergizi untuk energi dan daya tahan tubuh.',
        tone: 'orange'
      }
    ];

    container.innerHTML = `
      <section class="vitagrow-hero-simple mt-3 mb-5" aria-label="VitaGrow health journey">
        <div class="vitagrow-hero-simple-copy">
          <span class="eyebrow-label">🌱 YOUR HEALTH JOURNEY STARTS HERE</span>
          <h1 class="display-4 fw-extrabold text-dark mt-3 mb-3 vitagrow-hero-title">Kenali kesehatanmu.<br><span>Bangun kebiasaan yang lebih sehat.</span></h1>
          <p class="fs-5 text-secondary mb-4 vitagrow-hero-description">VitaGrow membantu kamu memahami kondisi kesehatanmu dan membangun kebiasaan baik setiap hari melalui edukasi, challenge, dan evaluasi personal.</p>
          <div class="d-flex flex-wrap align-items-center gap-3">
            <a href="profile-setup.html" class="btn btn-emerald btn-lg py-3 px-4 fw-bold">🌱 Start Your Journey →</a>
            <span class="vitagrow-hero-note">Gratis • Personal • Berbasis edukasi</span>
          </div>
          <div class="vitagrow-hero-trust mt-4">
            <span>🔒 Aman &amp; Personal<br><small>Data kamu privat</small></span>
            <span>📈 Berbasis Ilmu<br><small>Sumber terpercaya</small></span>
            <span>🎯 Langkah Nyata<br><small>Kebiasaan lebih baik</small></span>
          </div>
        </div>
        <div class="vitagrow-hero-simple-visual">
          <img src="assets/images/hero-vitagrow-composite.webp" alt="VitaGrow: hidrasi, tidur, aktivitas, dan nutrisi dalam satu perjalanan kesehatan" loading="eager" fetchpriority="high" decoding="async">
        </div>
      </section>

      <section id="vitagrow-pillars" class="vitagrow-pillars-section mb-5">
        <div class="text-center mb-4">
          <span class="eyebrow-label">MULAI DARI DIRIMU</span>
          <h3 class="fw-bold mt-2 mb-2">Empat bagian penting dalam perjalanan kesehatanmu.</h3>
          <p class="text-secondary mb-0">Pelajari kebiasaan sehari-hari yang bisa kamu bangun sedikit demi sedikit.</p>
        </div>
        <div class="row g-4">
          ${pillars.map((pillar, i) => `
            <div class="col-xl-3 col-md-6">
              <article class="vitagrow-pillar-card vitagrow-pillar-${pillar.tone} h-100">
                <div class="vitagrow-pillar-image-wrap">
                  <img src="${pillar.image}" alt="Ilustrasi ${pillar.title}" loading="lazy" decoding="async">
                  <span class="vitagrow-pillar-number">${i + 1}</span>
                </div>
                <div class="p-4 d-flex flex-column h-100">
                  <div class="vitagrow-pillar-title"><span>${pillar.icon}</span>${pillar.title}</div>
                  <p class="text-secondary mb-4">${pillar.text}</p>
                  <a href="education.html" class="vitagrow-pillar-link mt-auto">Learn more →</a>
                </div>
              </article>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="vitagrow-journey-cards mb-4">
        <div class="row g-3">
          ${[
            ['🔎','Kenali Dirimu','Lihat gambaran awal kondisi dan kebiasaan kesehatanmu.'],
            ['📚','Belajar','Pahami materi kesehatan melalui penjelasan yang sederhana.'],
            ['🌱','Ambil Langkah Kecil','Dapatkan challenge yang realistis untuk mulai membangun kebiasaan.'],
            ['📈','Lihat Perkembangan','Catat perjalananmu dan lihat perubahan setelah beberapa hari.']
          ].map(x=>`<div class="col-lg-3 col-sm-6"><div class="vitabyte-card h-100 p-3"><div class="fs-2 mb-2">${x[0]}</div><h5 class="fw-bold mb-1">${x[1]}</h5><p class="small text-muted mb-0">${x[2]}</p></div></div>`).join('')}
        </div>
      </section>

      <section class="vitabyte-card-mint border-emerald mt-4 p-4">
        <div class="row align-items-center">
          <div class="col-md-8">
            <span class="eyebrow-label">READY TO START?</span>
            <h5 class="fw-bold mt-1 mb-1">Mulai dari profilmu.</h5>
            <p class="text-secondary mb-0">Isi beberapa data dasar untuk mendapatkan gambaran awal dan melanjutkan perjalanan kesehatanmu bersama VitaGrow.</p>
          </div>
          <div class="col-md-4 text-md-end mt-3 mt-md-0"><a href="profile-setup.html" class="btn btn-outline-emerald">Mulai dari Profil →</a></div>
        </div>
      </section>
    `;
  }

  function renderProfileSetupPage(container, state) {
    const user = state.user || {};
    const metrics = state.metrics || {};

    container.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="fw-bold mb-1">📋 Setup Profil &amp; Analisis Dini</h2>
          <p class="text-muted mb-0">Lengkapi data Anda untuk mendapatkan analisis kesehatan personal instant.</p>
        </div>
        <a href="index.html" class="btn btn-outline-secondary btn-sm rounded-pill px-3">← Kembali</a>
      </div>

      <div class="row g-4">
        <!-- Form Left Column -->
        <div class="col-lg-7">
          <div class="vitabyte-card">
            <h5 class="fw-bold mb-3 d-flex align-items-center gap-2">
              <i class="bi bi-person-badge text-emerald"></i> Identitas Akun &amp; Fisik
            </h5>
            
            <form id="profile-form">
              <div class="mb-3">
                <label class="form-label fw-semibold">Nama Lengkap *</label>
                <input type="text" id="input-name" class="form-control form-control-lg" value="${user.name || ''}" placeholder="Masukkan nama lengkap Anda" required>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-6">
                  <label class="form-label fw-semibold">Umur (Tahun) *</label>
                  <input type="number" id="input-age" class="form-control" value="${user.age || ''}" placeholder="Contoh: 21" required>
                </div>
                <div class="col-6">
                  <label class="form-label fw-semibold">Jenis Kelamin *</label>
                  <div class="d-flex gap-3 mt-1">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="input-gender" id="g-male" value="Laki-laki" ${!user.gender || user.gender === 'Laki-laki' ? 'checked' : ''}>
                      <label class="form-check-label" for="g-male">Laki-laki</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="input-gender" id="g-female" value="Perempuan" ${user.gender === 'Perempuan' ? 'checked' : ''}>
                      <label class="form-check-label" for="g-female">Perempuan</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row g-3 mb-4">
                <div class="col-6">
                  <label class="form-label fw-semibold">Tinggi Badan (cm) *</label>
                  <input type="number" id="input-height" class="form-control" value="${user.height || ''}" placeholder="Contoh: 170" required>
                </div>
                <div class="col-6">
                  <label class="form-label fw-semibold">Berat Badan (kg) *</label>
                  <input type="number" id="input-weight" class="form-control" value="${user.weight || ''}" placeholder="Contoh: 65" required>
                </div>
              </div>

              <h6 class="fw-bold mb-3 border-top pt-3">⚙️ Kebiasaan Awal (Tidur &amp; Minum)</h6>

              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Rata-rata Durasi Tidur Harian *</label>
                  <select id="input-sleep" class="form-select">
                    <option value="<6" ${user.sleepHabit === '<6' ? 'selected' : ''}>Kurang dari 6 jam (Kurang tidur)</option>
                    <option value="6-7" ${user.sleepHabit === '6-7' ? 'selected' : ''}>6 - 7 jam (Cukup)</option>
                    <option value="7-8" ${user.sleepHabit === '7-8' ? 'selected' : ''}>7 - 8 jam (Optimal)</option>
                    <option value=">8" ${user.sleepHabit === '>8' ? 'selected' : ''}>Lebih dari 8 jam</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Rata-rata Air Minum (Gelas) *</label>
                  <select id="input-water" class="form-select">
                    <option value="<3" ${user.waterHabit === '<3' ? 'selected' : ''}>Kurang dari 3 gelas (Dehidrasi berat)</option>
                    <option value="3-5" ${user.waterHabit === '3-5' ? 'selected' : ''}>3 - 5 gelas (Dehidrasi)</option>
                    <option value="6-8" ${user.waterHabit === '6-8' ? 'selected' : ''}>6 - 8 gelas (Ideal 2L)</option>
                    <option value=">8" ${user.waterHabit === '>8' ? 'selected' : ''}>Lebih dari 8 gelas</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Live Instant Analysis Right Column -->
        <div class="col-lg-5">
          <div class="vitabyte-card-mint h-100 d-flex flex-column justify-content-between">
            <div>
              <h5 class="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
                <i class="bi bi-bar-chart-fill text-success"></i> Proses Analisis Dini
              </h5>
              
              <!-- BMI / BMR Card -->
              <div class="bg-white p-3 rounded-3 border mb-3">
                <div class="small text-muted fw-bold mb-1">KALKULASI BMI</div>
                <div class="d-flex align-items-baseline gap-2">
                  <span class="fs-1 fw-extrabold text-dark" id="live-bmi-val">${metrics.bmi || '—'}</span>
                  <span class="badge bg-success" id="live-bmi-cat">${metrics.bmiCategory || '—'}</span>
                </div>
                <div class="gauge-bar-container my-2">
                  <div class="gauge-bar-fill bg-success" id="live-gauge-bar" style="width: 55%;"></div>
                </div>
                <div class="d-flex justify-content-between small text-muted">
                  <span>Informasi BMI:</span>
                  <strong class="text-dark">${metrics.bmiCategory || '—'}</strong>
                </div>
              </div>

              <!-- Warning Badges -->
              <div class="small text-muted fw-bold mb-2">CEK KEBIASAAN TIDUR &amp; MINUM</div>
              <div id="live-warnings-container">
                ${renderWarningsList(metrics.earlyWarnings || [])}
              </div>
            </div>

            <div class="mt-4">
              <button type="button" id="btn-save-profile" class="btn btn-emerald w-100 py-3">
                💾 Simpan ke LocalStorage &amp; Masuk ke Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Dynamic real-time listeners
    const form = document.getElementById('profile-form');
    form.addEventListener('input', updateLiveAnalysis);

    document.getElementById('btn-save-profile').addEventListener('click', () => {
      const name = document.getElementById('input-name').value.trim();
      const age = parseInt(document.getElementById('input-age').value);
      const gender = document.querySelector('input[name="input-gender"]:checked').value;
      const height = parseInt(document.getElementById('input-height').value);
      const weight = parseInt(document.getElementById('input-weight').value);
      const sleepHabit = document.getElementById('input-sleep').value;
      const waterHabit = document.getElementById('input-water').value;

      if (!name || !age || !height || !weight) {
        alert('Mohon lengkapi semua data yang wajib diisi (Nama, Umur, Tinggi, Berat Badan).');
        return;
      }

      VitabyteStore.saveUserProfile({ name, age, gender, height, weight, sleepHabit, waterHabit });
      window.location.href = 'dashboard.html';
    });
  }

  function updateLiveAnalysis() {
    const height = parseInt(document.getElementById('input-height').value) || 0;
    const weight = parseInt(document.getElementById('input-weight').value) || 0;
    const age = parseInt(document.getElementById('input-age').value) || 0;
    const gender = document.querySelector('input[name="input-gender"]:checked').value;
    const sleepHabit = document.getElementById('input-sleep').value;
    const waterHabit = document.getElementById('input-water').value;

    if (!height || !weight || !age) {
      document.getElementById('live-bmi-val').innerText = '—';
      document.getElementById('live-bmi-cat').innerText = '—';
      return;
    }

    const bmiH = height / 100;
    const bmiVal = (weight / (bmiH * bmiH)).toFixed(1);
    let cat = 'Normal';
    if (bmiVal < 18.5) cat = 'Underweight';
    else if (bmiVal >= 25.0 && bmiVal < 30.0) cat = 'Overweight';
    else if (bmiVal >= 30.0) cat = 'Obese';

    document.getElementById('live-bmi-val').innerText = bmiVal;
    document.getElementById('live-bmi-cat').innerText = cat;

    // Warnings
    const warnings = [];
    if (waterHabit === '<3' || waterHabit === '3-5') {
      warnings.push({ title: 'Potensi Dehidrasi (<2L)', desc: 'Tingkatkan konsumsi air putih.' });
    }
    if (sleepHabit === '<6' || sleepHabit === '6-7') {
      warnings.push({ title: 'Kurang Tidur (<6 Jam)', desc: 'Perbaiki pola tidur untuk recovery.' });
    }

    document.getElementById('live-warnings-container').innerHTML = renderWarningsList(warnings);
  }

  function renderWarningsList(warnings) {
    if (!warnings || warnings.length === 0) {
      return `<div class="alert alert-success py-2 px-3 small">✅ Kebiasaan awal dalam batas sangat baik!</div>`;
    }
    return warnings.map(w => `
      <div class="vitabyte-card-warning mb-2">
        <div class="d-flex align-items-center gap-2 text-danger fw-bold small">
          <i class="bi bi-exclamation-triangle-fill"></i> ${w.title}
        </div>
        <div class="small text-muted">${w.desc}</div>
      </div>
    `).join('');
  }

  return { renderLandingPage, renderProfileSetupPage };
})();
