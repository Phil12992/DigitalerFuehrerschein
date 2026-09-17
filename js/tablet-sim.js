/**
 * TABLET NOTIZEN-SIMULATOR (GoodNotes 6 / Samsung Notes)
 * Interaktive Werkzeugleiste & PDF-Annotation
 */

class TabletAppSimulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.activeTool = 'pen';
    this.penColor = '#1B3F7E';
    this.annotations = [];
    this.activeSubject = 'Mathematik';
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="tab-sim-wrapper">
        <!-- TABLET FRAME -->
        <div class="tab-device-bezel">
          <!-- APP HEADER / TABS -->
          <div class="tab-app-header">
            <div class="tab-logo-area">
              <span class="tab-badge-app">GoodNotes & Notes Simulator</span>
              <span id="tab-doc-title">📘 Mathe_Analysis_Q1.pdf</span>
            </div>
            <div class="tab-nav-tabs">
              <button class="tab-chip active" data-subject="Mathematik">📐 Mathe</button>
              <button class="tab-chip" data-subject="Deutsch">📖 Deutsch</button>
              <button class="tab-chip" data-subject="Englisch">🇬🇧 Englisch</button>
              <button class="tab-chip" id="btn-add-notebook">+ Notizbuch</button>
            </div>
          </div>

          <!-- TOOLBAR -->
          <div class="tab-toolbar">
            <button class="tab-tool-btn active" data-tool="pen" title="Füller / Kugelschreiber">🖊️ Stift</button>
            <button class="tab-tool-btn" data-tool="highlighter" title="Textmarker">🖍️ Marker</button>
            <button class="tab-tool-btn" data-tool="eraser" title="Radiergummi">🧼 Radierer</button>
            <button class="tab-tool-btn" data-tool="lasso" title="Lasso-Werkzeug">🪢 Lasso</button>
            <div class="tab-color-pickers">
              <span class="tab-color-dot active" style="background:#1B3F7E" data-color="#1B3F7E"></span>
              <span class="tab-color-dot" style="background:#E8741A" data-color="#E8741A"></span>
              <span class="tab-color-dot" style="background:#276749" data-color="#276749"></span>
              <span class="tab-color-dot" style="background:#ECC94B" data-color="#ECC94B"></span>
            </div>
            <button class="tab-tool-btn" id="btn-clear-canvas" style="margin-left:auto;">🗑️ Blatt leeren</button>
          </div>

          <!-- CANVAS & NOTEBOOK PAGE -->
          <div class="tab-canvas-area" id="tab-canvas-area">
            <div class="tab-sheet-paper">
              <div class="tab-sheet-header">
                <h3>Thema: Stammfunktionen & Kurvendiskussion</h3>
                <small>Datum: 17.09.2026 | Schüler/in: Oberstufe</small>
              </div>
              <div class="tab-sheet-body">
                <p><strong>Definition:</strong> Eine Funktion $F$ heißt Stammfunktion von $f$, wenn gilt: $F'(x) = f(x)$.</p>
                <div class="tab-exercise-box">
                  <p><strong>Aufgabe 1:</strong> Bestimme die Stammfunktion von $f(x) = 3x^2 + 2x - 5$.</p>
                  <div class="tab-draw-field" id="tab-draw-field">
                    <canvas id="tab-interactive-canvas" width="680" height="240"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-footer-status">
            <span>💾 Automatisch synchronisiert mit iCloud / Samsung Cloud</span>
            <span id="tab-draw-status">Tippe oder ziehe mit der Maus/Finger, um handschriftliche Notizen zu simulieren.</span>
          </div>
        </div>
      </div>
    `;

    this.initCanvas();
    this.bindEvents();
  }

  initCanvas() {
    const canvas = document.getElementById('tab-interactive-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let drawing = false;

    const startDraw = (e) => {
      drawing = true;
      ctx.beginPath();
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
      ctx.moveTo(x, y);
    };

    const draw = (e) => {
      if (!drawing) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

      if (this.activeTool === 'eraser') {
        ctx.clearRect(x - 12, y - 12, 24, 24);
      } else if (this.activeTool === 'highlighter') {
        ctx.strokeStyle = this.penColor;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 14;
        ctx.lineCap = 'square';
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.strokeStyle = this.penColor;
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    };

    const stopDraw = () => {
      drawing = false;
      const status = document.getElementById('tab-draw-status');
      if (status) status.textContent = '✅ Handschriftliche Mitschrift erfolgreich erfasst.';
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDraw);

    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    window.addEventListener('touchend', stopDraw);

    const btnClear = document.getElementById('btn-clear-canvas');
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }
  }

  bindEvents() {
    this.container.querySelectorAll('.tab-tool-btn[data-tool]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.tab-tool-btn[data-tool]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeTool = btn.getAttribute('data-tool');
      });
    });

    this.container.querySelectorAll('.tab-color-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        this.container.querySelectorAll('.tab-color-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        this.penColor = dot.getAttribute('data-color');
      });
    });

    this.container.querySelectorAll('.tab-chip[data-subject]').forEach(chip => {
      chip.addEventListener('click', () => {
        this.container.querySelectorAll('.tab-chip[data-subject]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.activeSubject = chip.getAttribute('data-subject');
        const title = document.getElementById('tab-doc-title');
        if (title) title.textContent = `📘 ${this.activeSubject}_Mitschrift_2026.pdf`;
      });
    });

    const btnAdd = document.getElementById('btn-add-notebook');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        const name = prompt('Fach für das neue Notizbuch:');
        if (name && name.trim()) {
          alert(`Neues Notizbuch "${name.trim()}" in GoodNotes / Samsung Notes angelegt!`);
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('tablet-sim-root')) {
    window.tabSim = new TabletAppSimulator('tablet-sim-root');
  }
});
