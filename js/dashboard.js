/* js/dashboard.js - Dashboard Specific Logic and Interactions
   Implicit Dependency: Relies on main.js for scroll-reveal animations (.reveal-element).
   Features self-healing fallback in case main.js does not execute.
*/

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DOM References Cache
  // ==========================================
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const topbarHamburger = document.getElementById('topbar-hamburger');
  const topbarGreeting = document.getElementById('topbar-greeting');
  const searchInput = document.getElementById('search-input');
  const modulesGrid = document.querySelector('.modules-grid');
  const moduleCards = document.querySelectorAll('.module-card');
  const progressRings = document.querySelectorAll('.progress-ring');
  
  // ==========================================
  // 2. Demo Data and Dashboard Rendering
  // ==========================================
  const demoData = {
    user: {
      name: "Gabriel"
    },
    stats: {
      racha: "12 días",
      ejerciciosHoy: "8 / 15",
      precision: "87%",
      tiempoEstudio: "2h 35m"
    },
    moduloActual: {
      tema: "Ecuaciones Cuadráticas",
      categoria: "Álgebra Lineal",
      progreso: 65,
      ultimaSesion: "Hace 2 horas",
      siguiente: "Resolución por factorización e identificación de coeficientes."
    },
    actividadReciente: [
      { tipo: "success", texto: "Evaluación de Funciones Cuadráticas completada", tiempo: "Hace 2h", datetime: "2026-06-04T18:00" },
      { tipo: "pending", texto: "Práctica de Inecuaciones", tiempo: "Hace 5h", datetime: "2026-06-04T15:00" },
      { tipo: "success", texto: "Lección 'Introducción a Polinomios' vista", tiempo: "Ayer", datetime: "2026-06-03" },
      { tipo: "success", texto: "Reto Semanal de Álgebra completado", tiempo: "Hace 2 días", datetime: "2026-06-02" },
      { tipo: "success", texto: "Evaluación de Límites básicos completada", tiempo: "Hace 3 días", datetime: "2026-06-01" }
    ],
    progresoAreas: {
      algebra: 85,
      calculo: 45,
      geometria: 70,
      estadistica: 30
    },
    modulosDisponibles: [
      { id: "algebra", nombre: "Álgebra Lineal", emoji: "📚", lecciones: 12, ejercicios: 48, progreso: 85, estado: "En progreso", estadoClass: "" },
      { id: "calculo", nombre: "Cálculo Diferencial", emoji: "📈", lecciones: 15, ejercicios: 60, progreso: 45, estado: "Nuevo", estadoClass: "badge-warm" },
      { id: "geometria", nombre: "Geometría Analítica", emoji: "📐", lecciones: 10, ejercicios: 40, progreso: 70, estado: "En progreso", estadoClass: "" },
      { id: "estadistica", nombre: "Probabilidad y Estadística", emoji: "📊", lecciones: 8, ejercicios: 32, progreso: 100, estado: "Completado", estadoClass: "badge-success" }
    ]
  };

  // Render dashboard values dynamically (Fase 4.6)
  const renderDashboard = (data) => {
    // Dynamic greeting (Fase 4.4)
    if (topbarGreeting) {
      const hour = new Date().getHours();
      let greeting = "Buenas noches";
      if (hour >= 5 && hour < 12) {
        greeting = "Buenos días";
      } else if (hour >= 12 && hour < 18) {
        greeting = "Buenas tardes";
      }
      topbarGreeting.textContent = `${greeting}, ${data.user.name}`;
    }

    // Incase DOM elements need explicit rendering, we can ensure they match data
    // Here we can also dynamically build the activity list if needed
    const activityList = document.querySelector('.activity-list');
    if (activityList && data.actividadReciente) {
      activityList.innerHTML = '';
      data.actividadReciente.forEach(act => {
        const li = document.createElement('li');
        li.className = 'activity-item';
        
        let iconSvg = '';
        if (act.tipo === 'success') {
          iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        } else if (act.tipo === 'pending') {
          iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
        } else {
          iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        }

        li.innerHTML = `
          <div class="activity-status ${act.tipo}" aria-label="${act.tipo === 'success' ? 'Completado' : 'En progreso'}">
            ${iconSvg}
          </div>
          <div class="activity-details">
            <span class="activity-text">${act.texto}</span>
            <span class="activity-time text-muted font-mono"><time datetime="${act.datetime}">${act.tiempo}</time></span>
          </div>
        `;
        activityList.appendChild(li);
      });
    }
  };

  // Run render first
  renderDashboard(demoData);

  // ==========================================
  // 3. Sidebar Interaction Logic (Fase 4.3)
  // ==========================================
  
  // Restore sidebar state from localStorage on load (Desktop view)
  const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
  if (isCollapsed && window.innerWidth >= 1024 && sidebar) {
    sidebar.classList.add('is-collapsed');
  }

  // Toggle Sidebar on Desktop & Mobile
  const openMobileSidebar = () => {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.add('is-open');
      sidebarOverlay.classList.add('is-active');
      document.body.style.overflow = 'hidden'; // Block body scroll
    }
  };

  const closeMobileSidebar = () => {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.remove('is-open');
      sidebarOverlay.classList.remove('is-active');
      document.body.style.overflow = ''; // Restore body scroll
    }
  };

  // Toggle button click (Desktop colapsado manual)
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      if (window.innerWidth >= 768) {
        const collapsed = sidebar.classList.toggle('is-collapsed');
        localStorage.setItem('sidebar-collapsed', collapsed);
      }
    });
  }

  // Hamburger button click (Mobile open)
  if (topbarHamburger) {
    topbarHamburger.addEventListener('click', openMobileSidebar);
  }

  // Overlay click (Mobile close)
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileSidebar);
  }

  // Keyboard controls: Close mobile sidebar with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileSidebar();
    }
  });

  // ==========================================
  // 4. SVG Progress Rings Animation (Fase 4.5)
  // ==========================================
  
  const animateProgressRing = (circle, percent) => {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    
    // Set up dash array and start hidden
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    
    // Force a reflow
    circle.getBoundingClientRect();
    
    // Animate to target percent
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  };

  // Animate rings when visible in viewport
  const setupRingsAnimation = () => {
    const ringItems = document.querySelectorAll('.progress-ring-item');
    
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        threshold: 0.2
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const circle = entry.target.querySelector('.progress-ring__circle');
            if (circle) {
              const percent = parseInt(circle.getAttribute('data-percent'), 10) || 0;
              animateProgressRing(circle, percent);
            }
            observer.unobserve(entry.target); // Trigger only once
          }
        });
      }, observerOptions);

      ringItems.forEach(item => observer.observe(item));
    } else {
      // Fallback for older browsers: animate immediately
      ringItems.forEach(item => {
        const circle = item.querySelector('.progress-ring__circle');
        if (circle) {
          const percent = parseInt(circle.getAttribute('data-percent'), 10) || 0;
          animateProgressRing(circle, percent);
        }
      });
    }
  };

  setupRingsAnimation();

  // ==========================================
  // 5. Modules Live Search Filter (Fase 4.7)
  // ==========================================
  if (searchInput && modulesGrid) {
    // Create container for "No results" message
    const noResultsMessage = document.createElement('div');
    noResultsMessage.className = 'card no-results-card text-center text-muted reveal-element anim-fade-in';
    noResultsMessage.style.gridColumn = '1 / -1';
    noResultsMessage.style.padding = 'var(--space-2xl) var(--space-lg)';
    noResultsMessage.innerHTML = `
      <p style="font-size: 2rem; margin-bottom: var(--space-sm);">🔍</p>
      <h4 style="color: var(--text-primary); margin-bottom: var(--space-xs);">No se encontraron módulos</h4>
      <p>Prueba con otros términos de búsqueda.</p>
    `;
    noResultsMessage.style.display = 'none';
    modulesGrid.appendChild(noResultsMessage);

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      let matchCount = 0;

      moduleCards.forEach(card => {
        const moduleName = card.getAttribute('data-module-name').toLowerCase();
        
        if (moduleName.includes(query)) {
          card.style.display = '';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Display "No results" message if zero matches
      if (matchCount === 0) {
        noResultsMessage.style.display = '';
      } else {
        noResultsMessage.style.display = 'none';
      }
    });
  }

  // ==========================================
  // 6. Responsive Helpers (Fase 4.8)
  // ==========================================
  const mdBreakpoint = window.matchMedia('(min-width: 768px)');
  
  const handleBreakpointChange = (e) => {
    // If we transition to tablet/desktop viewport (>768px)
    if (e.matches) {
      closeMobileSidebar();
      // Remove any inline overflow styling on body
      document.body.style.overflow = '';
    }
  };

  // Add listener for screen resize
  if (mdBreakpoint.addEventListener) {
    mdBreakpoint.addEventListener('change', handleBreakpointChange);
  } else {
    // Fallback for older browsers
    mdBreakpoint.addListener(handleBreakpointChange);
  }

  // ==========================================
  // 7. Keyboard Navigation for Custom Elements (Hallazgo #2)
  // ==========================================
  // Listen for Enter and Space to click focused module cards
  moduleCards.forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Handle user profile avatar click on keyboard Enter/Space
  const topbarAvatar = document.getElementById('topbar-avatar');
  if (topbarAvatar) {
    topbarAvatar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        topbarAvatar.click();
      }
    });
    // Stub click event for visualization
    topbarAvatar.addEventListener('click', () => {
      console.log('Avatar click triggered.');
    });
  }

  // ==========================================
  // 8. Scroll Reveal Fallback (Hallazgo #10)
  // ==========================================
  // If main.js is not present or fails to run, reveal cards after 1 second
  setTimeout(() => {
    const hiddenElements = document.querySelectorAll('.reveal-element:not(.is-visible)');
    if (hiddenElements.length > 0) {
      console.warn('dashboard.js: Fallback de animación de revelado activado (main.js ausente o no ejecutado).');
      hiddenElements.forEach(el => {
        el.classList.add('is-visible');
      });
    }
  }, 1000);
});
