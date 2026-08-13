const RecheckView = (function () {
  let index = 0;
  let answers = {};
  let questionOrder = [];
  const ORDER_KEY = 'vitagrow_recheck_question_order_v1';

  function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function getQuestionOrder() {
    if (questionOrder.length === ASSESSMENT_QUESTIONS.length) return questionOrder;

    try {
      const stored = JSON.parse(sessionStorage.getItem(ORDER_KEY) || 'null');
      if (Array.isArray(stored) && stored.length === ASSESSMENT_QUESTIONS.length) {
        const validIds = new Set(ASSESSMENT_QUESTIONS.map(q => q.id));
        if (stored.every(id => validIds.has(id)) && new Set(stored).size === stored.length) {
          questionOrder = stored;
          return questionOrder;
        }
      }
    } catch (e) { /* ignore malformed session data */ }

    questionOrder = shuffle(ASSESSMENT_QUESTIONS.map(q => q.id));
    try { sessionStorage.setItem(ORDER_KEY, JSON.stringify(questionOrder)); } catch (e) { /* storage unavailable */ }
    return questionOrder;
  }

  function getCurrentQuestion() {
    const order = getQuestionOrder();
    const qId = order[index];
    return ASSESSMENT_QUESTIONS.find(q => q.id === qId);
  }

  function renderPostTestPage(container) {
    const state = VitabyteStore.getState();
    const challengeDone = !!state.challenge && Array.isArray(state.challenge.days) && state.challenge.days.length > 0 && state.challenge.days.every(d => d.value !== null && d.value !== '');
    if (!state.assessment?.isCompleted) { window.location.href = 'assessment.html'; return; }
    if (!challengeDone) { window.location.href = 'challenge-hub.html'; return; }
    const q = getCurrentQuestion();
    const pct = Math.round(((index + 1) / ASSESSMENT_QUESTIONS.length) * 100);
    container.innerHTML = `
      <div class="mb-4"><h2 class="fw-bold mb-1">🔄 Re-Check</h2><p class="text-muted">Challenge 7 hari sudah selesai. Jawab kembali 16 pertanyaan untuk mengukur perubahan dari baseline.</p></div>
      <div class="gauge-bar-container mb-4"><div class="gauge-bar-fill bg-success" style="width:${pct}%"></div></div>
      <div class="vitabyte-card"><div class="d-flex justify-content-between align-items-center mb-3"><span class="badge-pill-mint">${q.pillarName}</span><span class="small text-muted">${index + 1}/16</span></div><h5 class="fw-bold mb-4">${q.question}</h5>
      <div class="d-flex flex-column gap-2">${q.options.map((o,i)=>`<button class="option-card text-start ${answers[q.id]===i?'selected':''}" onclick="RecheckView.select(${q.id},${i})">${o.text}</button>`).join('')}</div>
      <div class="d-flex justify-content-between mt-4 pt-3 border-top"><button class="btn btn-outline-secondary" ${index===0?'disabled':''} onclick="RecheckView.prev()">← Sebelumnya</button><button class="btn btn-emerald" onclick="RecheckView.next()">${index===15?'Lihat Perbandingan →':'Lanjut →'}</button></div></div>
    `;
  }
  function select(id, value) { answers[id] = value; renderPostTestPage(document.getElementById('app-container')); }
  function prev() { if(index>0){index--;renderPostTestPage(document.getElementById('app-container'));} }
  function next() {
    const q=getCurrentQuestion();
    if(answers[q.id]===undefined){alert('Pilih salah satu jawaban terlebih dahulu.');return;}
    if(index<15){index++;renderPostTestPage(document.getElementById('app-container'));}
    else { VitabyteStore.savePostTestAnswers(answers); try { sessionStorage.removeItem(ORDER_KEY); } catch (e) { /* storage unavailable */ } window.location.href='post-test-result.html'; }
  }

  function renderPostTestResultPage(container,state) {
    const pt=state.postTest||{}; const base=pt.baselineScores||{}; const post=pt.postScores||{};
    const names={hydration:'💧 Hidrasi',sleep:'💤 Istirahat & Pemulihan',physical:'🏃 Gerak & Aktivitas Fisik',nutrition:'🍎 Bahan Bakar Tubuh'};
    const delta=Number(pt.improvementDelta||0);
    container.innerHTML=`<div class="mb-4"><h2 class="fw-bold mb-1">📈 Perbandingan Sebelum vs Sesudah</h2><p class="text-muted">Hasil dihitung dari jawaban Re-Check yang sebenarnya.</p></div>
      <div class="row g-4 mb-4">${['hydration','sleep','physical','nutrition'].map(p=>`<div class="col-md-6"><div class="vitabyte-card h-100"><div class="d-flex justify-content-between"><strong>${names[p]}</strong><span>${base[p]||0} → <strong>${post[p]||0}</strong></span></div><div class="gauge-bar-container mt-3"><div class="gauge-bar-fill bg-success" style="width:${post[p]||0}%"></div></div></div></div>`).join('')}</div>
      <div class="vitabyte-card-mint border-emerald text-center mb-4"><div class="display-6 fw-bold">${delta>0?'+':''}${delta} poin</div><p class="mb-0 text-secondary">Status: <strong>${pt.status||'Stabil'}</strong></p></div>
      <a href="badge-unlocked.html" class="btn btn-emerald w-100 py-3">Lihat Progress & Badge →</a>`;
  }

  function renderBadgeUnlockedPage(container,state){
    const badges=state.unlockedBadges||[]; const names={ 'badge-profile':'🎖️ Profile Starter','badge-streak-warrior':'🔥 Consistency','badge-habit-complete':'🏆 Habit Complete','badge-posttest-champion':'📈 Re-Check Progress' };
    container.innerHTML=`<div class="text-center py-5"><div class="display-1 mb-3">🏆</div><h1 class="fw-bold">Progress Kamu</h1><p class="text-secondary">Setiap kebiasaan kecil yang konsisten adalah bagian dari perjalanan.</p><div class="vitabyte-card-mint border-emerald mx-auto my-4" style="max-width:600px"><h5 class="fw-bold">Badge yang sudah terbuka</h5><div class="d-flex flex-wrap gap-2 justify-content-center mt-3">${badges.map(id=>`<span class="badge bg-white text-dark border p-2">${names[id]||id}</span>`).join('')}</div></div><a href="dashboard.html" class="btn btn-emerald px-5 py-3">← Kembali ke Dashboard</a></div>`;
  }
  return {renderPostTestPage,renderPostTestResultPage,renderBadgeUnlockedPage,select,prev,next};
})();
