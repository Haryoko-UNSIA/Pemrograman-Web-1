const ChallengeView = (function () {
  function renderChallengeHubPage(container, state) {
    const queryPillar = new URLSearchParams(window.location.search).get('pillar');
    const recommended = queryPillar || state.assessment?.lowestPillar || 'hydration';
    const ch = state.challenge || {};
    const hasActive = !!ch.activeChallengeId;
    const progress = hasActive ? Math.round((ch.completedDaysCount / ch.targetDays) * 100) : 0;
    const adaptive = state.adaptive || {};

    container.innerHTML = `
      <div class="mb-4">
        <h2 class="fw-bold mb-1">🏆 Challenge Hub</h2>
        <p class="text-muted mb-0">Pilih satu kebiasaan kecil untuk dilatih selama 7 hari.</p>
      </div>
      ${hasActive ? `
        <div class="vitabyte-card-mint border-emerald mb-4">
          <span class="eyebrow-label">CHALLENGE AKTIF</span>
          <h4 class="fw-bold mt-1 mb-2">${ch.title}</h4>
          <p class="text-secondary mb-2">Target awal: <strong>${ch.targetLabel}</strong></p>
          <div class="d-flex justify-content-between small mb-1"><span>${ch.completedDaysCount}/${ch.targetDays} hari selesai</span><span>${progress}%</span></div>
          <div class="gauge-bar-container bg-white"><div class="gauge-bar-fill bg-success" style="width:${progress}%"></div></div>
          <div class="mt-3 small text-secondary">💡 ${adaptive.recommendation || 'Fokus pada konsistensi, bukan kesempurnaan.'}</div>
          <a href="daily-tracking.html" class="btn btn-emerald mt-3">Lanjut Tracking Hari Ini →</a>
        </div>` : ''}
      <div class="vitabyte-card mb-4">
        <h5 class="fw-bold mb-1">🎯 Rekomendasi awal</h5>
        <p class="small text-muted">Pilar fokus dari assessment: <strong>${state.assessment?.lowestPillarName || 'belum ada'}</strong>. Challenge tidak wajib dimulai dari target besar.</p>
      </div>
      <div class="row g-4">
        ${CHALLENGES_DATA.map(c => {
          const isRecommended = c.pillarId === recommended;
          const isActive = c.id === ch.activeChallengeId;
          const target = VitabyteStore.adaptiveTarget(c.pillarId, state);
          return `<div class="col-md-6"><div class="vitabyte-card h-100 d-flex flex-column justify-content-between ${isRecommended ? 'border-emerald' : ''}">
            <div><div class="d-flex justify-content-between align-items-center mb-2"><span class="fw-bold"><i class="bi ${c.icon} me-1"></i>${c.title}</span>${isRecommended ? '<span class="badge bg-success">Direkomendasikan</span>' : ''}</div>
            <p class="small text-secondary mb-2">${c.description}</p><div class="small text-muted">Target awal personal: <strong>${target.label}</strong></div></div>
            <button class="btn ${isActive ? 'btn-outline-emerald' : 'btn-emerald'} w-100 mt-3" onclick="ChallengeView.switchChallenge('${c.id}')">${isActive ? 'Lanjut Challenge →' : 'Pilih Challenge Ini →'}</button>
          </div></div>`;
        }).join('')}
      </div>`;
  }

  function renderDailyTrackingPage(container, state) {
    const ch = state.challenge;
    if (!ch) { window.location.href = 'challenge-hub.html'; return; }
    const totalDays = ch.targetDays || 7;
    const currentIndex = Math.min(totalDays - 1, Math.max(0, (ch.currentDay || 1) - 1));
    const day = ch.days[currentIndex] || ch.days[0];
    const inputType = 'number';
    const step = ch.targetUnit === 'jam' ? '0.5' : '1';
    const trackedCount = ch.days.filter(d => d.value !== null && d.value !== '').length;
    const progress = Math.round((trackedCount / totalDays) * 100);
    const targetSuccessCount = ch.days.filter(d => d.completed).length;
    const lastFeedback = ch.lastFeedback || '';

    container.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-4"><div><h2 class="fw-bold mb-1">📅 Daily Tracking</h2><p class="text-muted mb-0">${ch.title}</p></div><a href="challenge-hub.html" class="btn btn-outline-secondary btn-sm rounded-pill">← Hub</a></div>
      <div class="vitabyte-card-mint border-emerald mb-4">
        <div class="d-flex justify-content-between small mb-1"><span>Progress 7 Hari</span><strong>${progress}%</strong></div>
        <div class="gauge-bar-container bg-white"><div class="gauge-bar-fill bg-success" style="width:${progress}%"></div></div>
        <p class="small text-secondary mt-3 mb-1">Target personal: <strong>${ch.targetLabel}</strong></p><p class="small text-secondary mb-0">Target tercapai: <strong>${targetSuccessCount}/${totalDays} hari</strong></p>
      </div>

      <div class="vitabyte-card mb-4">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <div>
            <span class="badge bg-success-subtle text-success border mb-2">Hari ${day.day} / ${totalDays}</span>
            <h4 class="fw-bold mb-0">Catat kebiasaan hari ini</h4>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-secondary btn-sm" ${currentIndex <= 0 ? 'disabled' : ''} onclick="ChallengeView.changeDemoDay(-1)">← Hari Sebelumnya</button>
            <button class="btn btn-outline-emerald btn-sm" ${currentIndex >= totalDays - 1 ? 'disabled' : ''} onclick="ChallengeView.changeDemoDay(1)">Hari Berikutnya →</button>
          </div>
        </div>
        <p class="text-secondary">Masukkan nilai yang benar-benar dilakukan. <strong>Target yang belum tercapai tetap disimpan</strong> agar perjalananmu tetap tercatat.</p>
        <div class="row g-3 align-items-end">
          <div class="col-md-6"><label class="form-label fw-semibold">Pencapaian (${ch.targetUnit})</label><input id="tracking-value" type="${inputType}" step="${step}" min="0" class="form-control form-control-lg" value="${day.value !== null ? day.value : ''}" placeholder="Target ${ch.targetValue}"></div>
          <div class="col-md-6"><label class="form-label fw-semibold">Catatan singkat (opsional)</label><input id="tracking-note" type="text" class="form-control form-control-lg" value="${day.note || ''}" placeholder="Contoh: dilakukan setelah makan siang"></div>
        </div>
        <button class="btn btn-emerald w-100 py-3 mt-4" onclick="ChallengeView.submitTracking(${currentIndex})">💾 Simpan Tracking Hari ${day.day}</button>
        <div id="tracking-feedback" class="mt-3">${lastFeedback && ch.lastFeedbackDay === day.day ? lastFeedback : ''}</div>
      </div>

      <div class="vitabyte-card"><h5 class="fw-bold mb-3">Riwayat 7 Hari</h5>${ch.days.map(d => `<div class="checklist-item ${d.completed ? 'completed' : ''}"><div><strong>Hari ${d.day}</strong><div class="small text-muted">${d.value !== null ? `${d.value} ${ch.targetUnit}` : 'Belum dicatat'}${d.note ? ` • ${d.note}` : ''}</div></div><span class="badge ${d.completed ? 'bg-success' : 'bg-secondary-subtle text-secondary'}">${d.completed ? 'Selesai' : d.status}</span></div>`).join('')}</div>
      ${trackedCount >= totalDays ? '<a href="post-test.html" class="btn btn-emerald w-100 py-3 mt-4">🎉 Challenge selesai — lanjut Re-Check →</a>' : ''}
    `;
  }

  function switchChallenge(challengeId) {
    const cData = CHALLENGES_DATA.find(c => c.id === challengeId);
    if (!cData) return;
    VitabyteStore.selectChallenge(cData);
    window.location.href = 'daily-tracking.html';
  }

  function changeDemoDay(direction) {
    const state = VitabyteStore.moveChallengeDay(direction);
    renderDailyTrackingPage(document.getElementById('app-container'), state);
  }

  function submitTracking(dayIndex) {
    const value = document.getElementById('tracking-value')?.value;
    const note = document.getElementById('tracking-note')?.value || '';
    if (value === '' || value === null) { alert('Isi pencapaian hari ini terlebih dahulu.'); return; }
    const state = VitabyteStore.checkInChallengeDay(dayIndex, value, note);
    const ch = state.challenge;
    const day = ch.days[dayIndex];
    const feedback = document.getElementById('tracking-feedback');
    const html = day.completed
      ? '<div class="vitabyte-card-mint border-emerald"><strong class="text-success">✅ Target tercapai!</strong><div class="small text-secondary mt-1">Bagus! Pertahankan ritme yang sama dan lanjutkan ke langkah berikutnya.</div></div>'
      : '<div class="vitabyte-card-warning"><strong class="text-danger">🌱 Target belum tercapai, tetapi data tetap tersimpan.</strong><div class="small text-secondary mt-1">Tidak masalah. Fokus pada langkah kecil yang realistis. Coba pertahankan kebiasaan ini dan lanjutkan lagi besok.</div></div>';
    if (feedback) feedback.innerHTML = html;
    renderDailyTrackingPage(document.getElementById('app-container'), state);
  }

  return { renderChallengeHubPage, renderDailyTrackingPage, switchChallenge, changeDemoDay, submitTracking };
})();
