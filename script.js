/**
 * ============================================================================
 * PIXELRUSH - MODERN BROWSER GAMING PORTAL
 * Client-Side Application & Game Catalogue Engine
 * Version: 1.0.0
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. GAME CATALOGUE REPOSITORY (EXPANDABLE DATA ARCHITECTURE)
     -------------------------------------------------------------------------- */
  const GAMES_CATALOGUE = [
    {
      id: 'space-survivor',
      slug: 'space-survivor',
      title: 'Space Survivor',
      category: 'Action',
      subCategory: 'Survival',
      tags: ['Action', 'Survival', 'Space', 'Shooter', 'Sci-Fi'],
      description: 'Pilot an agile combat starship through hostile alien waves. Auto-target hostiles with plasma blasters, deploy EMP shockwaves to clear bullets, and collect XP energy cores to upgrade systems.',
      thumbnail: 'assets/thumbnails/space-survivor.svg',
      pageUrl: 'games/space-survivor.html',
      externalUrl: 'https://space-survivor.pages.dev/',
      status: 'playable', // 'playable' | 'coming-soon'
      featured: true,
      releaseDate: '2026',
      developer: 'Space Survivor Team',
      controlsSummary: 'WASD / Arrows to move, Auto-targeting blasters, Space for EMP blast'
    }
    // Additional original games can be added to this array as they are released.
  ];

  /* --------------------------------------------------------------------------
     2. HELPER UTILITIES
     -------------------------------------------------------------------------- */
  /**
   * Determine relative path prefix to root based on current URL path
   */
  function getPathPrefix() {
    const pathname = window.location.pathname.toLowerCase().replace(/\\/g, '/');
    if (pathname.includes('/games/') || pathname.includes('/pages/')) {
      return '../';
    }
    return '';
  }

  /**
   * Escape HTML to prevent injection
   */
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* --------------------------------------------------------------------------
     3. TOAST NOTIFICATION SYSTEM
     -------------------------------------------------------------------------- */
  function showToast(message, type = 'info', duration = 3500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
    } else if (type === 'warning') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    } else {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }

    toast.innerHTML = `${iconSvg}<span>${escapeHTML(message)}</span>`;
    container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, duration);
  }

  /* --------------------------------------------------------------------------
     4. COMING SOON MODAL
     -------------------------------------------------------------------------- */
  function openComingSoonModal(game) {
    const prefix = getPathPrefix();
    let modalBackdrop = document.getElementById('coming-soon-modal');
    
    if (!modalBackdrop) {
      modalBackdrop = document.createElement('div');
      modalBackdrop.id = 'coming-soon-modal';
      modalBackdrop.className = 'modal-backdrop';
      modalBackdrop.setAttribute('role', 'dialog');
      modalBackdrop.setAttribute('aria-modal', 'true');
      modalBackdrop.innerHTML = `
        <div class="modal-dialog">
          <button type="button" class="modal-close-btn" id="modal-close-btn" aria-label="Close dialog">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div style="display: flex; flex-direction: column; gap: 1rem; text-align: center; align-items: center;">
            <div style="width: 58px; height: 58px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); display: flex; align-items: center; justify-content: center; color: #FBBF24;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div class="badge badge-warning" id="modal-status-badge">COMING SOON</div>
            <h3 id="modal-game-title" style="font-size: 1.5rem; font-weight: 800; color: #FFFFFF;">Game Title</h3>
            <p id="modal-game-desc" style="color: var(--text-secondary); font-size: 0.925rem; line-height: 1.6; max-width: 400px;">
              This game is currently in active development.
            </p>
            <div style="background: var(--bg-surface-elevated); padding: 0.85rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); width: 100%; font-size: 0.875rem;">
              <span style="color: var(--text-muted);">Expected Release: </span>
              <strong id="modal-release-date" style="color: var(--cyan-primary);">Q2 2026</strong>
            </div>
            <div style="display: flex; gap: 0.75rem; width: 100%; margin-top: 0.5rem; flex-wrap: wrap;">
              <a href="${prefix}games/space-survivor.html" class="btn btn-primary" id="modal-play-space-btn" style="flex: 1; min-width: 180px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Play Space Survivor
              </a>
              <button type="button" class="btn btn-secondary" id="modal-dismiss-btn" style="flex: 1; min-width: 100px;">
                Got It
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalBackdrop);

      // Event listeners for close
      const closeBtn = modalBackdrop.querySelector('#modal-close-btn');
      const dismissBtn = modalBackdrop.querySelector('#modal-dismiss-btn');
      
      const closeModal = () => {
        modalBackdrop.classList.remove('open');
      };

      closeBtn.addEventListener('click', closeModal);
      dismissBtn.addEventListener('click', closeModal);
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
          closeModal();
        }
      });
    }

    // Populate game data
    document.getElementById('modal-game-title').textContent = game.title;
    document.getElementById('modal-game-desc').textContent = game.description;
    document.getElementById('modal-release-date').textContent = game.releaseDate || 'Upcoming in Version 1.1';
    
    const playBtn = modalBackdrop.querySelector('#modal-play-space-btn');
    if (playBtn) {
      playBtn.href = `${prefix}games/space-survivor.html`;
    }
    
    // Show modal
    modalBackdrop.classList.add('open');
  }

  /* --------------------------------------------------------------------------
     5. DYNAMIC GAME CARD RENDERING
     -------------------------------------------------------------------------- */
  /**
   * Render individual game card element
   */
  function createGameCardElement(game) {
    const prefix = getPathPrefix();
    const card = document.createElement('article');
    card.className = `game-card ${game.status === 'playable' ? 'playable' : 'coming-soon'}`;
    card.setAttribute('data-id', game.id);
    card.setAttribute('data-category', game.category);
    card.setAttribute('data-status', game.status);

    const isPlayable = game.status === 'playable';
    const destinationUrl = isPlayable ? `${prefix}${game.pageUrl}` : 'javascript:void(0)';
    const thumbUrl = `${prefix}${game.thumbnail}`;

    card.innerHTML = `
      <div class="game-card-media">
        <img 
          src="${thumbUrl}" 
          alt="${escapeHTML(game.title)} gameplay thumbnail" 
          class="game-card-thumb"
          loading="lazy"
          onerror="this.onerror=null; this.src='${prefix}assets/thumbnails/space-survivor.svg';"
        >
        
        <div class="badge-top-left">
          <span class="badge ${isPlayable ? 'badge-purple' : 'badge-cyan'}">
            ${escapeHTML(game.category)}
          </span>
        </div>

        <div class="badge-top-right">
          ${
            isPlayable 
              ? `<span class="badge badge-success"><span class="badge-dot"></span>PLAYABLE</span>`
              : `<span class="badge badge-warning">COMING SOON</span>`
          }
        </div>

        <div class="game-card-hover-overlay" aria-hidden="true">
          <div class="play-circle-btn">
            ${
              isPlayable 
                ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>`
                : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
            }
          </div>
        </div>
      </div>

      <div class="game-card-body">
        <div class="game-card-header">
          <h3 class="game-card-title">${escapeHTML(game.title)}</h3>
          <span class="badge badge-purple" style="font-size: 0.7rem;">${escapeHTML(game.subCategory || game.category)}</span>
        </div>

        <p class="game-card-desc">${escapeHTML(game.description)}</p>

        <div class="game-card-footer">
          <span class="game-card-meta">${escapeHTML(game.developer || 'Original Game')}</span>
          ${
            isPlayable 
              ? `<a href="${destinationUrl}" class="btn btn-sm btn-cyan" aria-label="Play ${escapeHTML(game.title)} now">Play Now</a>`
              : `<button type="button" class="btn btn-sm btn-secondary notify-btn" aria-label="Details about ${escapeHTML(game.title)}">Coming Soon</button>`
          }
        </div>
      </div>
    `;

    // Click handler for card
    card.addEventListener('click', (e) => {
      // If clicking inside a direct link, let native link behavior happen
      if (e.target.closest('a')) return;

      if (isPlayable) {
        window.location.href = destinationUrl;
      } else {
        openComingSoonModal(game);
      }
    });

    const notifyBtn = card.querySelector('.notify-btn');
    if (notifyBtn) {
      notifyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openComingSoonModal(game);
      });
    }

    return card;
  }

  /**
   * Render list of games into container
   */
  function renderGamesList(games, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    if (!games || games.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
          <h3 class="empty-state-title">No games found</h3>
          <p class="empty-state-desc">
            We couldn't find any games matching your current search or category filter. Try refining your keywords or reset all filters.
          </p>
          <button type="button" class="btn btn-primary" id="reset-filters-btn">
            Reset Filters & Search
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          resetAllFilters();
        });
      }
      return;
    }

    games.forEach((game) => {
      const card = createGameCardElement(game);
      container.appendChild(card);
    });
  }

  /* --------------------------------------------------------------------------
     6. FILTERING & SEARCH CONTROLLER
     -------------------------------------------------------------------------- */
  let currentCategory = 'all';
  let currentSearchQuery = '';

  function applyFiltersAndSearch() {
    const filtered = GAMES_CATALOGUE.filter((game) => {
      // Category match (checks primary category, subCategory, or tags)
      const matchesCategory = 
        currentCategory === 'all' || 
        game.category.toLowerCase() === currentCategory.toLowerCase() ||
        (game.subCategory && game.subCategory.toLowerCase() === currentCategory.toLowerCase()) ||
        game.tags.some(t => t.toLowerCase() === currentCategory.toLowerCase());

      // Search query match (title, description, category, tags)
      if (!matchesCategory) return false;

      if (!currentSearchQuery.trim()) return true;

      const q = currentSearchQuery.toLowerCase().trim();
      const titleMatch = game.title.toLowerCase().includes(q);
      const descMatch = game.description.toLowerCase().includes(q);
      const catMatch = game.category.toLowerCase().includes(q);
      const tagsMatch = game.tags.some(t => t.toLowerCase().includes(q));

      return titleMatch || descMatch || catMatch || tagsMatch;
    });

    // Update count in UI
    const countEl = document.getElementById('results-count');
    if (countEl) {
      countEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'Game' : 'Games'}`;
    }

    // Render cards
    renderGamesList(filtered, 'games-grid');
  }

  function resetAllFilters() {
    currentCategory = 'all';
    currentSearchQuery = '';

    const searchInput = document.getElementById('game-search-input');
    if (searchInput) searchInput.value = '';

    const searchClearBtn = document.getElementById('search-clear-btn');
    if (searchClearBtn) searchClearBtn.classList.remove('visible');

    // Reset category buttons
    document.querySelectorAll('.category-btn').forEach((btn) => {
      if (btn.getAttribute('data-category') === 'all') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    applyFiltersAndSearch();
  }

  function setupCategoryFilters() {
    // Dynamically calculate and update counts from catalogue
    const counts = { all: GAMES_CATALOGUE.length };
    GAMES_CATALOGUE.forEach((g) => {
      const cat = g.category.toLowerCase();
      counts[cat] = (counts[cat] || 0) + 1;
      if (g.subCategory) {
        const sub = g.subCategory.toLowerCase();
        counts[sub] = (counts[sub] || 0) + 1;
      }
    });

    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach((btn) => {
      const cat = (btn.getAttribute('data-category') || '').toLowerCase();
      const countEl = btn.querySelector('.category-count');
      if (countEl && cat) {
        countEl.textContent = counts[cat] !== undefined ? counts[cat] : '0';
      }

      btn.addEventListener('click', () => {
        const selectedCat = btn.getAttribute('data-category') || 'all';
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = selectedCat;
        applyFiltersAndSearch();
      });
    });
  }

  function setupSearchInput() {
    const searchInput = document.getElementById('game-search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');
    const navSearchBtn = document.getElementById('nav-search-btn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value;
        if (searchClearBtn) {
          if (currentSearchQuery.length > 0) {
            searchClearBtn.classList.add('visible');
          } else {
            searchClearBtn.classList.remove('visible');
          }
        }
        applyFiltersAndSearch();
      });

      if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
          searchInput.value = '';
          currentSearchQuery = '';
          searchClearBtn.classList.remove('visible');
          searchInput.focus();
          applyFiltersAndSearch();
        });
      }
    }

    // Header Quick Search Button triggers focus on search input
    if (navSearchBtn) {
      navSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const browseSection = document.getElementById('browse');
        if (browseSection) {
          browseSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            if (searchInput) searchInput.focus();
          }, 400);
        } else {
          // If on a subpage, redirect to browse anchor
          const prefix = getPathPrefix();
          window.location.href = `${prefix}index.html#browse`;
        }
      });
    }

    // Keyboard shortcut "/" to focus search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        if (searchInput) {
          e.preventDefault();
          searchInput.focus();
          searchInput.select();
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. RESPONSIVE NAVIGATION & MOBILE MENU
     -------------------------------------------------------------------------- */
  function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.mobile-nav-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');

    // Sticky navbar shadow on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    }, { passive: true });

    if (toggle && drawer) {
      const toggleMenu = () => {
        const isOpen = drawer.classList.contains('open');
        if (isOpen) {
          drawer.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        } else {
          drawer.classList.add('open');
          toggle.setAttribute('aria-expanded', 'true');
          document.body.style.overflow = 'hidden';
        }
      };

      toggle.addEventListener('click', toggleMenu);

      // Close mobile drawer when clicking any link
      drawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          drawer.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
          drawer.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* --------------------------------------------------------------------------
     8. GAME PLAYER CONTROLS (`games/space-survivor.html`)
     -------------------------------------------------------------------------- */
  function setupGamePlayer() {
    const playerWrapper = document.getElementById('game-player-wrapper');
    const gameIframe = document.getElementById('game-iframe');
    const loaderOverlay = document.getElementById('game-loader-overlay');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const theaterBtn = document.getElementById('theater-btn');
    const reloadBtn = document.getElementById('reload-btn');

    if (!playerWrapper || !gameIframe) return;

    // Remove loading overlay when iframe loads
    gameIframe.addEventListener('load', () => {
      setTimeout(() => {
        loaderOverlay?.classList.add('hidden');
      }, 500);
    });

    // Fallback: in case load event takes long, hide spinner after 3.5s
    setTimeout(() => {
      loaderOverlay?.classList.add('hidden');
    }, 3500);

    // Fullscreen API implementation
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          // Request fullscreen on player wrapper
          if (playerWrapper.requestFullscreen) {
            playerWrapper.requestFullscreen();
          } else if (playerWrapper.webkitRequestFullscreen) {
            playerWrapper.webkitRequestFullscreen();
          } else if (playerWrapper.msRequestFullscreen) {
            playerWrapper.msRequestFullscreen();
          }
        } else {
          // Exit fullscreen
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
      });

      // Update button icon & text on fullscreen change
      document.addEventListener('fullscreenchange', () => {
        const isFs = !!document.fullscreenElement;
        fullscreenBtn.innerHTML = isFs 
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg><span>Exit Fullscreen</span>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg><span>Fullscreen</span>`;
        if (isFs) {
          showToast('Press ESC to exit fullscreen mode', 'info', 2500);
        }
      });
    }

    // Theater / Wide Mode Toggle
    if (theaterBtn) {
      theaterBtn.addEventListener('click', () => {
        playerWrapper.classList.toggle('theater-mode');
        const isTheater = playerWrapper.classList.contains('theater-mode');
        theaterBtn.classList.toggle('active', isTheater);
        showToast(isTheater ? 'Theater mode activated' : 'Standard mode activated', 'info', 1800);
      });
    }

    // Reload iframe button
    if (reloadBtn) {
      reloadBtn.addEventListener('click', () => {
        loaderOverlay?.classList.remove('hidden');
        const currentSrc = gameIframe.src;
        gameIframe.src = '';
        setTimeout(() => {
          gameIframe.src = currentSrc;
          showToast('Game reloaded', 'info', 1500);
        }, 150);
      });
    }

    // Render related games (excluding Space Survivor)
    const relatedContainer = document.getElementById('related-games-grid');
    if (relatedContainer) {
      const relatedGames = GAMES_CATALOGUE.filter(g => g.id !== 'space-survivor');
      if (relatedGames.length > 0) {
        renderGamesList(relatedGames, 'related-games-grid');
      } else {
        relatedContainer.innerHTML = `
          <div style="grid-column: 1 / -1; background: var(--bg-surface); border: 1px dashed var(--border-medium); border-radius: var(--radius-xl); padding: 3rem 1.5rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.85rem;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--purple-subtle); border: 1px solid var(--purple-border); display: flex; align-items: center; justify-content: center; color: var(--purple-glow);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: #FFFFFF;">More Games in Active Development</h3>
            <p style="color: var(--text-secondary); max-width: 480px; font-size: 0.925rem; line-height: 1.6;">
              Space Survivor is our initial launch title for Version 1.0. Additional original browser titles will be added to this catalogue once released.
            </p>
            <a href="../pages/about.html#roadmap" class="btn btn-secondary btn-sm" style="margin-top: 0.5rem;">
              View Development Roadmap
            </a>
          </div>
        `;
      }
    }
  }

  /* --------------------------------------------------------------------------
     9. CONTACT FORM & FAQ ACCORDION HANDLERS (`pages/contact.html`)
     -------------------------------------------------------------------------- */
  function setupContactAndFAQ() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const questionBtn = item.querySelector('.faq-question');
      questionBtn?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Optional: close other accordions
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });

    // Contact Form handling - explicit honest state (no fake delivery)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Form submission is temporarily disabled while backend integration is in development.', 'warning', 4500);
      });
    }
  }

  /* --------------------------------------------------------------------------
     10. INITIALIZATION
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();

    // If on homepage with browse section
    if (document.getElementById('games-grid')) {
      setupCategoryFilters();
      setupSearchInput();
      applyFiltersAndSearch();
    }

    // If on game player page
    if (document.getElementById('game-player-wrapper')) {
      setupGamePlayer();
    }

    // If on contact page
    if (document.getElementById('contact-form') || document.querySelector('.faq-list')) {
      setupContactAndFAQ();
    }
  });

  // Expose Catalogue to window for easy debugging or future extension
  window.PixelRush = {
    catalogue: GAMES_CATALOGUE,
    showToast: showToast,
    openModal: openComingSoonModal
  };

})();
