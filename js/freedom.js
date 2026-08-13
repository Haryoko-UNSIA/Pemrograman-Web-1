// js/freedom.js - Education Hub & Badges Gallery Controller
const FreedomView = (function () {
  function renderEducationPage(container, state) {
    const unlocked = state.unlockedBadges || [];

    container.innerHTML = `
      <div class="mb-4">
        <h2 class="fw-bold mb-1">📚 Pusat Edukasi (Katalog 4 Pilar &amp; Galeri Badges)</h2>
        <p class="text-muted">Jelajahi modul kesehatan dan kumpulkan badge pencapaian harianmu.</p>
      </div>

      <!-- Achievement Badges Gallery -->
      <div class="vitabyte-card mb-5">
        <h5 class="fw-bold mb-3 d-flex align-items-center gap-2">
          🏅 GALERI ACHIEVEMENT BADGES
        </h5>
        <div class="row g-3">
          ${BADGES_DATA.map(b => {
            const isUnlocked = unlocked.includes(b.id) || b.unlockedByDefault;
            return `
              <div class="col-lg-3 col-md-4 col-6">
                <div class="badge-gallery-item ${isUnlocked ? '' : 'locked'}">
                  <div class="fs-1 mb-1">${b.icon}</div>
                  <div class="fw-bold small text-dark">${b.name}</div>
                  <div class="small text-muted" style="font-size: 0.75rem;">${b.description}</div>
                  <span class="badge ${isUnlocked ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'} mt-2">
                    ${isUnlocked ? 'Unlocked ✓' : 'Terkunci 🔒'}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- 4 Pillars Educational Modules Catalog -->
      <h4 class="fw-bold mb-3">📚 KATALOG BEBAS MODUL EDUKASI (4 PILAR KESEHATAN):</h4>
      <div class="row g-4">
        ${Object.keys(HEALTH_MODULES).map(pId => {
          const mod = HEALTH_MODULES[pId];
          return `
            <div class="col-md-6">
              <div class="vitabyte-card h-100 d-flex flex-column justify-content-between">
                ${mod.image ? `
                <div class="rounded-3 overflow-hidden mb-3" style="height: 140px;">
                  <img src="${mod.image}" alt="${mod.pillarName}" class="w-100 h-100" style="object-fit: cover; object-position: center;" onerror="this.parentElement.style.display='none'">
                </div>
                ` : ''}
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="badge-pill-mint"><i class="bi ${mod.icon}"></i> ${mod.pillarName}</span>
                    <span class="small text-muted">${mod.readTime}</span>
                  </div>
                  <h5 class="fw-bold text-dark mt-2">${mod.title}</h5>
                  <p class="small text-secondary mb-3">${mod.shortDesc}</p>
                </div>
                <div>
                  <a href="learn-detail.html?pillar=${mod.id}" class="btn btn-emerald w-100">
                    Baca Modul →
                  </a>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  return { renderEducationPage };
})();
