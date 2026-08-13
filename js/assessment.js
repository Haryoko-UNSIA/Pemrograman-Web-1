// js/assessment.js - Assessment View Controller
const AssessmentView = (function () {
  let currentAssessmentIndex = 0;
  let assessmentAnswers = {};
  let questionOrder = [];
  const ORDER_KEY = 'vitagrow_assessment_question_order_v1';

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
    const qId = order[currentAssessmentIndex];
    return ASSESSMENT_QUESTIONS.find(q => q.id === qId);
  }

  function renderAssessmentPage(container) {
    if (typeof ASSESSMENT_QUESTIONS === 'undefined' || !ASSESSMENT_QUESTIONS.length) {
      container.innerHTML = '<div class="alert alert-danger">Questions dataset missing.</div>';
      return;
    }

    const totalQ = ASSESSMENT_QUESTIONS.length;
    const currentQ = getCurrentQuestion();
    const progressPct = Math.round(((currentAssessmentIndex + 1) / totalQ) * 100);

    const selectedOption = assessmentAnswers[currentQ.id];

    container.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 class="fw-bold mb-0">HEALTH ASSESSMENT (16 SOAL INTERAKTIF)</h3>
          <span class="text-muted small">Pertanyaan ${currentAssessmentIndex + 1} dari ${totalQ}</span>
        </div>
        <span class="badge-pill-mint">${currentQ.pillarName}</span>
      </div>

      <!-- Assessment Progress Bar -->
      <div class="gauge-bar-container mb-4" style="height: 10px;">
        <div class="gauge-bar-fill bg-success" style="width: ${progressPct}%;"></div>
      </div>

      <!-- Question Card -->
      <div class="vitabyte-card mb-4">
        <h5 class="fw-bold text-dark mb-4">
          SOAL ${currentAssessmentIndex + 1} (${currentQ.pillarName.toUpperCase()}):<br>
          ${currentQ.question}
        </h5>

        <div class="d-flex flex-column gap-3 mb-4">
          ${currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            return `
              <div class="option-card ${isSelected ? 'selected' : ''}" onclick="AssessmentView.selectAssessmentOption(${currentQ.id}, ${idx})">
                <input class="form-check-input flex-shrink-0" type="radio" name="q_${currentQ.id}" 
                       id="opt_${currentQ.id}_${idx}" ${isSelected ? 'checked' : ''}>
                <label class="form-check-label w-100 cursor-pointer text-dark fw-semibold" for="opt_${currentQ.id}_${idx}">
                  ${opt.text}
                </label>
                ${isSelected ? '<span class="badge bg-success ms-auto">Selected ✓</span>' : ''}
              </div>
            `;
          }).join('')}
        </div>

        <div class="d-flex justify-content-between align-items-center border-top pt-3">
          <button class="btn btn-outline-secondary px-4" 
                  ${currentAssessmentIndex === 0 ? 'disabled' : ''} 
                  onclick="AssessmentView.prevQuestion()">
            ← Pertanyaan Sebelumnya
          </button>
          
          <button class="btn btn-emerald px-4" 
                  onclick="AssessmentView.nextQuestion()">
            ${currentAssessmentIndex === totalQ - 1 ? 'Selesai &amp; Lihat Hasil Kalkulasi →' : 'Lanjut ke Pertanyaan Berikutnya →'}
          </button>
        </div>
      </div>
    `;
  }

  function selectAssessmentOption(qId, optionIdx) {
    assessmentAnswers[qId] = optionIdx;
    renderAssessmentPage(document.getElementById('app-container'));
  }

  function prevQuestion() {
    if (currentAssessmentIndex > 0) {
      currentAssessmentIndex--;
      renderAssessmentPage(document.getElementById('app-container'));
    }
  }

  function nextQuestion() {
    const totalQ = ASSESSMENT_QUESTIONS.length;
    const currentQ = getCurrentQuestion();

    if (assessmentAnswers[currentQ.id] === undefined) {
      alert('Pilih salah satu jawaban terlebih dahulu.');
      return;
    }

    if (currentAssessmentIndex < totalQ - 1) {
      currentAssessmentIndex++;
      renderAssessmentPage(document.getElementById('app-container'));
    } else {
      // Finished assessment
      VitabyteStore.saveAssessmentAnswers(assessmentAnswers);
      try { sessionStorage.removeItem(ORDER_KEY); } catch (e) { /* storage unavailable */ }
      window.location.href = 'assessment-result.html';
    }
  }

  // Reset function to clear state if user starts over
  function resetAssessment() {
    currentAssessmentIndex = 0;
    assessmentAnswers = {};
    questionOrder = [];
    try { sessionStorage.removeItem(ORDER_KEY); } catch (e) { /* storage unavailable */ }
  }

  return { renderAssessmentPage, selectAssessmentOption, prevQuestion, nextQuestion, resetAssessment };
})();
