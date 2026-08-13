const InsightView = (function () {
  function label(score) {
    if (score < 60) return { text: 'Perlu Perbaikan', cls: 'text-danger', bar: 'bg-danger' };
    if (score < 80) return { text: 'Cukup Baik', cls: 'text-warning', bar: 'bg-warning' };
    if (score < 90) return { text: 'Baik', cls: 'text-success', bar: 'bg-success' };
    return { text: 'Sangat Baik', cls: 'text-success', bar: 'bg-success' };
  }
  function renderAssessmentResultPage(container,state){
    const scores=state.assessment?.pillarScores||{}; const lowest=state.assessment?.lowestPillar||'hydration'; const mod=HEALTH_MODULES[lowest]||HEALTH_MODULES.hydration;
    const rows=[['hydration','💧 Hidrasi'],['sleep','💤 Istirahat & Recovery'],['physical','🏃 Gerak & Aktivitas Fisik'],['nutrition','🍎 Bahan Bakar Tubuh']];
    const avg=Math.round(rows.reduce((a,[p])=>a+Number(scores[p]||0),0)/4);
    container.innerHTML=`<div class="mb-4"><h2 class="fw-bold mb-1">📊 Hasil Health Assessment</h2><p class="text-muted">Ringkasan empat pilar kesehatan berdasarkan jawaban assessment Anda.</p></div>
      <div class="vitabyte-card mb-4"><div class="vitabyte-card-mint p-4 mb-4"><span class="eyebrow-label">HEALTH SCORE</span><div class="display-5 fw-bold">${avg}/100</div><span class="badge ${avg<60?'bg-danger-subtle text-danger':'bg-success-subtle text-success'}">${label(avg).text}</span></div><h4 class="fw-bold mb-3">4 Pilar Kesehatan</h4>
      ${rows.map(([p,n])=>{const s=Number(scores[p]||0), l=label(s), low=p===lowest;return `<div class="p-3 border rounded-3 mb-3 ${low?'border-danger-subtle bg-danger-subtle':''}"><div class="d-flex justify-content-between"><strong>${n}</strong><strong class="${l.cls}">${s}/100</strong></div><div class="gauge-bar-container mt-2"><div class="gauge-bar-fill ${l.bar}" style="width:${s}%"></div></div><div class="small ${l.cls} mt-1">${low?'🎯 Area Fokus Utama • ':''}${l.text}</div></div>`}).join('')}</div>
      <div class="vitabyte-card-mint border-emerald mb-4"><h5 class="fw-bold">🎯 Area Fokus Utama: ${mod.pillarName}</h5><p class="text-secondary mb-2">Skor terendah saat ini <strong>${scores[lowest]||0}/100</strong>. Materi berikutnya diarahkan ke pilar ini agar perubahan dimulai dari area yang paling membutuhkan perhatian.</p><a href="learn-specific.html?pillar=${lowest}" class="btn btn-emerald">Buka Learning Center →</a></div>
      <div class="small text-muted text-center">Hasil ini adalah alat edukasi dan refleksi kebiasaan, bukan diagnosis medis.</div>`;
  }
  return {renderAssessmentResultPage};
})();
