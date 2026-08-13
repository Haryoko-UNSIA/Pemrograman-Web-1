// 🧬 VitaGrow — Main MPA Controller & Global Shared Module

const VitabyteApp = (function () {
  let state = {};

  function init() {
    state = VitabyteStore.getState();
    const currentPath = window.location.pathname;
    const isLanding = currentPath.endsWith('/') || currentPath.endsWith('index.html');
    
    renderNavbar(isLanding);
    renderFooter();
  }

  function renderNavbar(isLanding) {
    const navbarContainer = document.getElementById('navbar-container');
    const userName = state.user ? state.user.name : 'User';
    const hasData = VitabyteStore.hasUserData();

    const path = window.location.pathname;
    const isDashboard = path.includes('dashboard.html');
    const isEducation = path.includes('education.html') || path.includes('learn') || path.includes('quiz');
    const isChallenge = path.includes('challenge') || path.includes('daily-tracking');

    if (isLanding) {
      navbarContainer.innerHTML = `
        <nav class="navbar navbar-vitabyte sticky-top">
          <div class="container d-flex justify-content-between align-items-center">
            <a class="navbar-brand-vitabyte" href="index.html">
              <img src="assets/images/logo.png" class="navbar-logo-img" alt="VitaGrow Logo" style="height:32px;width:auto;margin-right:8px;">
              <span class="fw-extrabold text-dark">VitaGrow</span>
            </a>
            <div class="d-flex align-items-center gap-3">
              ${state.assessment?.isCompleted ? `
                <a href="education.html" class="nav-link-vitabyte">Edukasi</a>
              ` : `
                <a href="javascript:void(0)" class="nav-link-vitabyte nav-link-disabled-vitabyte" aria-disabled="true" title="Selesaikan Health Assessment terlebih dahulu" onclick="VitabyteApp.requireAssessmentAccess('education')">Edukasi 🔒</a>
              `}
              <a href="profile-setup.html" class="btn btn-emerald btn-sm py-2 px-3 fw-bold">Start</a>
            </div>
          </div>
        </nav>
      `;
    } else {
      navbarContainer.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-vitabyte sticky-top">
          <div class="container">
            <a class="navbar-brand-vitabyte me-4" href="dashboard.html">
              <img src="assets/images/logo.png" class="navbar-logo-img" alt="VitaGrow Logo" style="height:32px;width:auto;margin-right:8px;">
              <span class="fw-extrabold text-dark">VitaGrow</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navMenu">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-1">
                <li class="nav-item">
                  <a class="nav-link-vitabyte ${isDashboard ? 'active' : ''}" href="dashboard.html">
                    Dashboard
                  </a>
                </li>
                <li class="nav-item">
                  ${state.assessment?.isCompleted ? `
                    <a class="nav-link-vitabyte ${isEducation ? 'active' : ''}" href="education.html">Edukasi</a>
                  ` : `
                    <a class="nav-link-vitabyte nav-link-disabled-vitabyte" href="javascript:void(0)" aria-disabled="true" title="Selesaikan Health Assessment terlebih dahulu" onclick="VitabyteApp.requireAssessmentAccess('education')">Edukasi 🔒</a>
                  `}
                </li>
                <li class="nav-item">
                  ${state.assessment?.isCompleted ? `
                    <a class="nav-link-vitabyte ${isChallenge ? 'active' : ''}" href="challenge-hub.html">Challenge</a>
                  ` : `
                    <a class="nav-link-vitabyte nav-link-disabled-vitabyte" href="javascript:void(0)" aria-disabled="true" title="Selesaikan Health Assessment terlebih dahulu" onclick="VitabyteApp.requireAssessmentAccess('challenge')">Challenge 🔒</a>
                  `}
                </li>
              </ul>
              <div class="d-flex align-items-center gap-3">
                <div class="dropdown">
                  <button class="btn btn-light rounded-pill px-3 py-1 dropdown-toggle border d-flex align-items-center gap-2" 
                          type="button" data-bs-toggle="dropdown">
                    <span class="fw-semibold text-dark">👤 ${userName}</span>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                    <li><a class="dropdown-item" href="profile-setup.html">Edit Profil &amp; Analisis</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="javascript:void(0)" onclick="VitabyteStore.resetToDemo()">Reset Session</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      `;
    }
  }

  function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    footerContainer.innerHTML = `
      <footer class="footer-vitabyte">
        <div class="container d-flex justify-content-between align-items-center">
          <div>
            <button onclick="VitabyteStore.resetToDemo()" class="btn btn-sm btn-outline-danger px-3 rounded-pill fw-semibold">
              <i class="bi bi-arrow-counterclockwise me-1"></i> Reset Session
            </button>
          </div>
          <div class="text-end text-muted small">
            © 2026 VitaGrow. All rights reserved.
          </div>
        </div>
      </footer>
    `;
  }

  function requireAssessmentAccess(destination) {
    const current = VitabyteStore.getState();
    if (current.assessment?.isCompleted) return true;
    if (!current.user?.isProfileSetup) {
      alert('Akses terkunci: isi profil dan kebiasaan harian terlebih dahulu.');
      window.location.href = 'profile-setup.html';
      return false;
    }
    alert('Akses terkunci: selesaikan Health Assessment terlebih dahulu agar VitaGrow dapat menentukan rekomendasi yang sesuai.');
    window.location.href = 'assessment.html';
    return false;
  }

  function handleRestrictedEducationAccess() {
    return requireAssessmentAccess('education');
  }

  return { init, handleRestrictedEducationAccess, requireAssessmentAccess };
})();

document.addEventListener('DOMContentLoaded', () => {
  VitabyteApp.init();
});
