// utils.js - State Management, Audio Feedback, and BMI/BMR Calculators
const VitabyteAudio = (function () {
  let audioCtx = null;

  function initCtx() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playCorrectChime() {
    try {
      initCtx();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.2);

      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.15);
      gain2.gain.setValueAtTime(0.2, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.45);
    } catch (e) {
      console.log('Audio feedback error:', e);
    }
  }

  function playAlertTone() {
    try {
      initCtx();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(329.63, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.log('Audio feedback error:', e);
    }
  }

  function playFanfare() {
    try {
      initCtx();
      if (!audioCtx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50];
      const now = audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const start = now + (idx * 0.12);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + 0.35);
      });
    } catch (e) {
      console.log('Audio feedback error:', e);
    }
  }

  return { playCorrectChime, playAlertTone, playFanfare };
})();

const VitabyteStore = (function () {
  // Keep the legacy storage key so existing v1.4 user data survives the VitaGrow rename.
  const STORAGE_KEY = 'eduhealth_state_v1_4';

  const emptyState = {
    user: null,
    metrics: { bmi: 0, bmiCategory: '', bmr: 0, earlyWarnings: [] },
    assessment: { answers: {}, pillarScores: {}, lowestPillar: '', lowestPillarName: '', lowestModuleId: '', isCompleted: false },
    knowledgeCheck: { attempts: 0, correct: 0, lastPillar: '', history: [] },
    challenge: null,
    tracking: [],
    adaptive: { level: 'starter', recommendation: '', reason: '' },
    streak: 0,
    unlockedBadges: [],
    postTest: { completed: false, answers: {}, baselineScores: {}, postScores: {}, improvementDelta: 0, status: '' }
  };

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) { saveState(clone(emptyState)); return clone(emptyState); }
      const parsed = JSON.parse(raw);
      return normalize(parsed);
    } catch (e) { console.error(e); return clone(emptyState); }
  }
  function normalize(s) {
    const base = clone(emptyState);
    const merged = { ...base, ...s };
    merged.user = s.user || null;
    merged.metrics = { ...base.metrics, ...(s.metrics || {}) };
    merged.assessment = { ...base.assessment, ...(s.assessment || {}) };
    merged.knowledgeCheck = { ...base.knowledgeCheck, ...(s.knowledgeCheck || {}) };
    merged.postTest = { ...base.postTest, ...(s.postTest || {}) };
    merged.adaptive = { ...base.adaptive, ...(s.adaptive || {}) };
    merged.tracking = Array.isArray(s.tracking) ? s.tracking : [];
    merged.unlockedBadges = Array.isArray(s.unlockedBadges) ? s.unlockedBadges : [];
    return merged;
  }
  function saveState(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

  function computeBMI(heightCm, weightKg) {
    if (!heightCm || !weightKg) return { bmi: 0, category: '' };
    const bmi = Number((weightKg / Math.pow(heightCm / 100, 2)).toFixed(1));
    let category = 'Normal';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    return { bmi, category };
  }

  function computeBMR(heightCm, weightKg, age, gender) {
    if (!heightCm || !weightKg || !age) return 0;
    const s = gender === 'Perempuan' ? -161 : 5;
    return Math.round((10 * weightKg) + (6.25 * heightCm) - (5 * age) + s);
  }

  function computeWarnings(sleepHabit, waterHabit) {
    const warnings = [];
    if (waterHabit === '<3' || waterHabit === '3-5') warnings.push({ id: 'dehydration', title: 'Asupan air masih rendah', desc: 'Coba jadikan air putih lebih mudah dijangkau dan minum berkala.' });
    if (sleepHabit === '<6' || sleepHabit === '6-7') warnings.push({ id: 'sleep', title: 'Durasi tidur perlu perhatian', desc: 'Coba bangun rutinitas tidur yang lebih konsisten.' });
    return warnings;
  }

  function adaptiveTarget(pillarId, state) {
    const user = state.user || {};
    const bmi = Number(state.metrics?.bmi || 0);
    if (pillarId === 'hydration') {
      if (user.waterHabit === '<3') return { value: 4, unit: 'gelas', label: '4 gelas air putih' };
      if (user.waterHabit === '3-5') return { value: 6, unit: 'gelas', label: '6 gelas air putih' };
      return { value: 8, unit: 'gelas', label: '8 gelas air putih' };
    }
    if (pillarId === 'sleep') {
      if (user.sleepHabit === '<6') return { value: 6, unit: 'jam', label: '6 jam tidur sebagai target awal' };
      if (user.sleepHabit === '6-7') return { value: 7, unit: 'jam', label: '7 jam tidur' };
      return { value: 8, unit: 'jam', label: '8 jam tidur' };
    }
    if (pillarId === 'physical') {
      if (bmi >= 30) return { value: 10, unit: 'menit', label: '10 menit gerak ringan' };
      if (bmi >= 25) return { value: 15, unit: 'menit', label: '15 menit gerak ringan' };
      return { value: 20, unit: 'menit', label: '20 menit aktivitas ringan–sedang' };
    }
    return { value: 1, unit: 'porsi', label: '1 pilihan sayur/buah' };
  }

  function saveUserProfile(profileData) {
    const state = loadState();
    state.user = { ...state.user, ...profileData, isProfileSetup: true };
    const bmi = computeBMI(profileData.height, profileData.weight);
    state.metrics = { bmi: bmi.bmi, bmiCategory: bmi.category, bmr: computeBMR(profileData.height, profileData.weight, profileData.age, profileData.gender), earlyWarnings: computeWarnings(profileData.sleepHabit, profileData.waterHabit) };
    saveState(state); return state;
  }

  function calculateScores(answers) {
    const scores = { hydration: 0, sleep: 0, physical: 0, nutrition: 0 };
    const counts = { hydration: 0, sleep: 0, physical: 0, nutrition: 0 };
    ASSESSMENT_QUESTIONS.forEach(q => {
      const idx = answers[q.id];
      if (idx !== undefined && q.options[idx]) {
        scores[q.pillarId] += q.options[idx].score;
        counts[q.pillarId]++;
      }
    });
    const result = {};
    Object.keys(scores).forEach(p => result[p] = counts[p] ? Math.round(scores[p] / counts[p]) : 0);
    return result;
  }

  function saveAssessmentAnswers(answersObj) {
    const state = loadState();
    const scores = calculateScores(answersObj);
    const names = { hydration: '💧 Hidrasi', sleep: '💤 Istirahat & Pemulihan', physical: '🏃 Gerak & Aktivitas Fisik', nutrition: '🍎 Bahan Bakar Tubuh' };
    const lowestPillar = Object.keys(scores).sort((a,b) => scores[a] - scores[b])[0];
    state.assessment = { answers: { ...answersObj }, pillarScores: scores, lowestPillar, lowestPillarName: names[lowestPillar], lowestModuleId: lowestPillar, isCompleted: true };
    state.postTest = { ...emptyState.postTest, baselineScores: { ...scores } };
    if (!state.unlockedBadges.includes('badge-profile')) state.unlockedBadges.push('badge-profile');
    saveState(state); return state;
  }

  function saveKnowledgeCheck(isCorrect, pillar) {
    const state = loadState();
    state.knowledgeCheck.attempts += 1;
    if (isCorrect) state.knowledgeCheck.correct += 1;
    state.knowledgeCheck.lastPillar = pillar || state.knowledgeCheck.lastPillar;
    state.knowledgeCheck.history.push({ date: new Date().toISOString(), pillar: pillar || '', correct: !!isCorrect });
    saveState(state); return state;
  }

  function selectChallenge(challengeObj) {
    const state = loadState();
    const target = adaptiveTarget(challengeObj.pillarId, state);
    state.challenge = {
      activeChallengeId: challengeObj.id, pillarId: challengeObj.pillarId, title: challengeObj.title, subtitle: challengeObj.subtitle,
      targetDays: 7, completedDaysCount: 0, targetSuccessCount: 0, currentDay: 1, targetValue: target.value, targetUnit: target.unit, targetLabel: target.label,
      lastFeedback: '', lastFeedbackDay: null,
      days: Array.from({ length: 7 }, (_, i) => ({ day: i + 1, completed: false, status: i === 0 ? 'HARI INI' : 'Tersedia untuk demo', value: null, note: '' }))
    };
    state.adaptive = { level: 'starter', recommendation: `Mulai dari ${target.label}.`, reason: 'Target awal disesuaikan dengan data profil dan kondisi awal agar lebih realistis.' };
    saveState(state); return state;
  }

  function saveTracking(entry) {
    const state = loadState();
    state.tracking.push({ ...entry, date: new Date().toISOString() });
    saveState(state); return state;
  }

  function checkInChallengeDay(dayIndex, value, note) {
    const state = loadState();
    if (!state.challenge || !state.challenge.days[dayIndex]) return state;
    const day = state.challenge.days[dayIndex];
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || numeric < 0) return state;
    const target = Number(state.challenge.targetValue) || 1;
    const completed = numeric >= target;
    day.value = numeric;
    day.note = note || '';
    day.completed = completed;
    day.status = completed ? 'Completed' : 'Belum mencapai target';
    // "Progress 7 Hari" mengukur konsistensi tracking, bukan keberhasilan target.
    // Jadi hari yang targetnya belum tercapai tetap dihitung sebagai hari yang selesai dicatat.
    const trackedCount = state.challenge.days.filter(d => d.value !== null && d.value !== '').length;
    const targetSuccessCount = state.challenge.days.filter(d => d.completed).length;
    state.challenge.completedDaysCount = trackedCount;
    state.challenge.targetSuccessCount = targetSuccessCount;
    state.streak = Math.max(state.streak || 0, targetSuccessCount);
    state.tracking.push({ date: new Date().toISOString(), pillar: state.challenge.pillarId, value: numeric, unit: state.challenge.targetUnit, target, completed, note: note || '' });
    if (targetSuccessCount >= 5 && !state.unlockedBadges.includes('badge-streak-warrior')) state.unlockedBadges.push('badge-streak-warrior');
    // Habit Complete berarti seluruh 7 hari sudah dicatat, terlepas dari apakah semua target tercapai.
    if (trackedCount >= state.challenge.targetDays && !state.unlockedBadges.includes('badge-habit-complete')) state.unlockedBadges.push('badge-habit-complete');

    // Setelah menyimpan hari apa pun, user boleh maju ke hari berikutnya.
    // Kegagalan target tidak boleh membuat journey buntu.
    state.challenge.currentDay = Math.min(state.challenge.targetDays, dayIndex + 2);
    state.challenge.days.forEach((d, i) => {
      if (d.value === null || d.value === '') d.status = i === state.challenge.currentDay - 1 ? 'HARI INI' : 'Tersedia untuk demo';
    });

    if (completed) {
      state.adaptive = { level: 'progressing', recommendation: 'Kebiasaanmu mulai terbentuk. Pertahankan dulu sebelum menaikkan target.', reason: 'Ada hari yang berhasil mencapai target.' };
      state.challenge.lastFeedback = '<div class="vitabyte-card-mint border-emerald"><strong class="text-success">✅ Target tercapai!</strong><div class="small text-secondary mt-1">Bagus! Pertahankan ritme yang sama dan lanjutkan ke langkah berikutnya.</div></div>';
    } else {
      state.adaptive = { level: 'starter', recommendation: 'Target belum tercapai. Ulangi dengan langkah yang sama atau buat rutinitas lebih mudah.', reason: 'Target harian belum tercapai.' };
      state.challenge.lastFeedback = '<div class="vitabyte-card-warning"><strong class="text-danger">🌱 Target belum tercapai, tetapi data tetap tersimpan.</strong><div class="small text-secondary mt-1">Tidak masalah. Fokus pada langkah kecil yang realistis. Coba pertahankan kebiasaan ini dan lanjutkan lagi besok.</div></div>';
    }
    state.challenge.lastFeedbackDay = day.day;
    saveState(state); return state;
  }

  function moveChallengeDay(direction) {
    const state = loadState();
    if (!state.challenge) return state;
    const total = state.challenge.days.length;
    const current = Math.max(1, Number(state.challenge.currentDay) || 1);
    const next = Math.min(total, Math.max(1, current + Number(direction || 0)));
    state.challenge.currentDay = next;
    state.challenge.days.forEach((d, i) => {
      if (!d.completed) d.status = i === next - 1 ? 'HARI INI' : 'Tersedia untuk demo';
    });
    saveState(state); return state;
  }

  function savePostTestAnswers(answersObj) {
    const state = loadState();
    const postScores = calculateScores(answersObj);
    const baseline = state.postTest.baselineScores || state.assessment.pillarScores || {};
    const baseAvg = Object.values(baseline).reduce((a,b) => a + Number(b || 0), 0) / 4;
    const postAvg = Object.values(postScores).reduce((a,b) => a + Number(b || 0), 0) / 4;
    const delta = Math.round(postAvg - baseAvg);
    state.postTest = { completed: true, answers: { ...answersObj }, baselineScores: { ...baseline }, postScores, improvementDelta: delta, status: delta > 0 ? 'Meningkat' : delta < 0 ? 'Perlu perhatian' : 'Stabil' };
    if (delta > 0 && !state.unlockedBadges.includes('badge-posttest-champion')) state.unlockedBadges.push('badge-posttest-champion');
    saveState(state); return state;
  }

  function unlockBadge(id) { const s = loadState(); if (!s.unlockedBadges.includes(id)) s.unlockedBadges.push(id); saveState(s); return s; }
  function hasUserData() { return !!loadState().user?.isProfileSetup; }
  function getAdaptiveRecommendation() { return loadState().adaptive; }
  function resetToDemo() { localStorage.removeItem(STORAGE_KEY); window.location.href = 'index.html'; }

  return { getState: loadState, saveUserProfile, saveAssessmentAnswers, saveKnowledgeCheck, selectChallenge, saveTracking, checkInChallengeDay, moveChallengeDay, savePostTestAnswers, unlockBadge, hasUserData, adaptiveTarget, getAdaptiveRecommendation, resetToDemo };
})();
