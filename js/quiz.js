// js/quiz.js - Quiz Controller
const QuizView = (function () {
  function renderQuizPage(container, pillarId) {
    const mod = HEALTH_MODULES[pillarId] || HEALTH_MODULES.hydration;
    const quiz = mod.quizQuestion;

    container.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold mb-0">❓ QUIZ EVALUASI PEMAHAMAN: ${mod.pillarName}</h3>
        <a href="education.html" class="btn btn-outline-secondary btn-sm rounded-pill px-3">← Kembali</a>
      </div>

      <div class="vitabyte-card mb-4">
        <h5 class="fw-bold text-dark mb-3">Soal Evaluasi:</h5>
        <p class="fs-5 text-dark mb-4">${quiz.question}</p>

        <div class="d-flex flex-column gap-3 mb-4" id="quiz-options-container">
          ${quiz.options.map((opt, idx) => `
            <div class="option-card" onclick="QuizView.answerQuiz(${idx}, ${opt.isCorrect})">
              <input class="form-check-input" type="radio" name="quiz_opt" id="qopt_${idx}">
              <label class="form-check-label fw-semibold cursor-pointer" for="qopt_${idx}">
                ${opt.text}
              </label>
            </div>
          `).join('')}
        </div>

        <div id="quiz-feedback-box" class="d-none mb-4"></div>

        <div id="quiz-decision-box" class="d-none border-top pt-4">
          <h5 class="fw-bold text-center mb-3">◆ DECISION: LANJUT EKSEKUSI PLAN? ◆</h5>
          <div class="row g-3">
            <div class="col-md-6">
              <a href="daily-tracking.html" class="btn btn-emerald w-100 py-3">
                [✓] YA, LANJUT DAILY TRACK
              </a>
            </div>
            <div class="col-md-6">
              <a href="dashboard.html" class="btn btn-outline-secondary w-100 py-3">
                [✕] TIDAK, KEMBALI KE HUB
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function answerQuiz(optionIdx, isCorrect) {
    const feedbackBox = document.getElementById('quiz-feedback-box');
    const decisionBox = document.getElementById('quiz-decision-box');

    feedbackBox.classList.remove('d-none');
    decisionBox.classList.remove('d-none');

    if (isCorrect) {
      VitabyteAudio.playCorrectChime();
      feedbackBox.innerHTML = `
        <div class="vitabyte-card-mint border-emerald">
          <div class="fw-bold text-success fs-5 mb-1">✅ JAWABAN BENAR!</div>
          <div class="small text-dark mb-2">📊 [ AUDIO FEEDBACK: Instant Beep Sound Activated! ]</div>
          <div class="fw-bold text-dark">📊 LAPORAN EVALUASI: Skor Kuis = 100/100 (Sempurna 🎉)</div>
        </div>
      `;
      VitabyteStore.unlockBadge('badge-quiz-pro');
    } else {
      VitabyteAudio.playAlertTone();
      feedbackBox.innerHTML = `
        <div class="vitabyte-card-warning">
          <div class="fw-bold text-danger mb-1">✕ Jawaban Kurang Tepat</div>
          <div class="small text-muted">Coba tinjau kembali materi sebelumnya.</div>
        </div>
      `;
    }
  }

  return { renderQuizPage, answerQuiz };
})();
