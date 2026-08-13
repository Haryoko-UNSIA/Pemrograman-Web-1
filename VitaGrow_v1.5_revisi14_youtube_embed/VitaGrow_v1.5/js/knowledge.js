const KnowledgeView = (function () {
  function pickQuestion(pillarId) {
    const pool = KNOWLEDGE_POOL[pillarId] || KNOWLEDGE_POOL.hydration;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function render(container, pillarId) {
    const question = pickQuestion(pillarId);
    container.innerHTML = `
      <div class="vitabyte-card border-emerald mt-4" id="knowledge-check-card">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="eyebrow-label">KNOWLEDGE CHECK • OPSIONAL</span>
          <span class="badge bg-light text-dark border">1 soal acak</span>
        </div>
        <h5 class="fw-bold text-dark mb-3">🧠 Coba cek pemahamanmu</h5>
        <p class="text-secondary mb-3">${question.question}</p>
        <div class="d-flex flex-column gap-2">
          ${question.options.map((opt, i) => `
            <button type="button" class="option-card text-start" onclick="KnowledgeView.answer(${i}, ${question.correct}, '${escapeAttr(question.feedback)}', '${pillarId}')">
              <span class="fw-semibold">${String.fromCharCode(65 + i)}. ${opt}</span>
            </button>
          `).join('')}
        </div>
        <div id="knowledge-feedback" class="mt-3"></div>
      </div>`;
  }

  function answer(selected, correct, feedback, pillarId) {
    const box = document.getElementById('knowledge-feedback');
    if (!box) return;
    const isCorrect = selected === correct;
    if (isCorrect) {
      VitabyteAudio.playCorrectChime();
      box.innerHTML = `<div class="vitabyte-card-mint border-emerald"><strong class="text-success">✅ Benar!</strong><div class="small text-secondary mt-1">${feedback}</div><div class="small text-muted mt-2">Knowledge Check selesai. Ini hanya untuk memahami materi, bukan ujian wajib.</div><a class="btn btn-outline-emerald btn-sm mt-3" href="challenge-hub.html?pillar=${pillarId}">Rekomendasi berikutnya: coba Challenge →</a></div>`;
    } else {
      VitabyteAudio.playAlertTone();
      box.innerHTML = `<div class="vitabyte-card-warning"><strong class="text-danger">💡 Belum tepat.</strong><div class="small text-secondary mt-1">${feedback}</div><div class="small text-muted mt-2">Tidak apa-apa — baca kembali poin penting di atas dan coba lagi pada kesempatan berikutnya.</div></div>`;
    }
    VitabyteStore.saveKnowledgeCheck(selected === correct, pillarId);
  }

  function escapeAttr(value) {
    return String(value).replace(/'/g, '&#39;').replace(/"/g, '&quot;');
  }

  return { render, answer };
})();
