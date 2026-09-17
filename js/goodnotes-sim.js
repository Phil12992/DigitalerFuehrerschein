/**
 * GOODNOTES 6 & NOTIZEN ORDNER-MANAGER SIMULATOR
 * Ermöglicht Schülern, Fächerordner zu erstellen, Notizbücher einzusortieren
 * und Arbeitsblätter strukturiert abzulegen.
 */

class GoodNotesFolderSimulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.storageKey = 'ajg_gn_sim_data';
    this.state = this.loadState() || this.defaultState();
    this.currentFolderId = 'root';
    this.render();
  }

  defaultState() {
    return {
      folders: [
        { id: 'f_mathe', parentId: 'root', name: 'Mathematik', color: '#1B3F7E' },
        { id: 'f_deutsch', parentId: 'root', name: 'Deutsch', color: '#E8741A' }
      ],
      items: [
        { id: 'doc_1', parentId: 'f_mathe', title: 'Mathe_Q1_Analysis_Heft', type: 'notebook', pages: 24, date: '17.09.2026' },
        { id: 'doc_2', parentId: 'f_mathe', title: 'AB_Stammfunktionen_Klausurvorbereitung.pdf', type: 'pdf', pages: 4, date: '15.09.2026' },
        { id: 'doc_3', parentId: 'f_deutsch', title: 'Deutsch_Epik_Faust_I.pdf', type: 'pdf', pages: 12, date: '10.09.2026' },
        { id: 'doc_loose', parentId: 'root', title: 'Unsortiertes_Kritzelblatt_Bio.pdf', type: 'pdf', pages: 1, date: 'Heute' }
      ]
    };
  }

  loadState() {
    try {
      const d = localStorage.getItem(this.storageKey);
      return d ? JSON.parse(d) : null;
    } catch(e) { return null; }
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch(e) {}
  }

  reset() {
    this.state = this.defaultState();
    this.currentFolderId = 'root';
    this.saveState();
    this.render();
  }

  render() {
    const isRoot = this.currentFolderId === 'root';
    const currentFolder = isRoot ? null : this.state.folders.find(f => f.id === this.currentFolderId);

    const subFolders = this.state.folders.filter(f => f.parentId === this.currentFolderId);
    const subItems = this.state.items.filter(i => i.parentId === this.currentFolderId);

    this.container.innerHTML = `
      <div class="gn-sim-bezel">
        <!-- APP BAR -->
        <div class="gn-sim-header">
          <div class="gn-app-title">
            <span class="gn-badge">GoodNotes 6 / Samsung Notes</span>
            <span class="gn-current-path">📂 ${isRoot ? 'Dokumente (Übersicht)' : 'Dokumente > ' + currentFolder.name}</span>
          </div>
          <div class="gn-action-bar">
            ${!isRoot ? '<button class="gn-btn" id="gn-btn-up">⬆ Zurück</button>' : ''}
            <button class="gn-btn primary" id="gn-btn-add-folder">📁 Neuer Fach-Ordner</button>
            <button class="gn-btn" id="gn-btn-add-book">📓 Neues Notizbuch</button>
            <button class="gn-btn danger" id="gn-btn-reset" title="Zurücksetzen">🔄</button>
          </div>
        </div>

        <!-- NOTIZEN GRID -->
        <div class="gn-sim-grid" id="gn-sim-grid">
          ${subFolders.map(f => `
            <div class="gn-card folder" data-folder-id="${f.id}">
              <div class="gn-card-icon" style="color:${f.color || '#1B3F7E'}">📁</div>
              <div class="gn-card-info">
                <strong>${f.name}</strong>
                <small>${this.countChildren(f.id)} Elemente</small>
              </div>
              <button class="gn-delete-btn" data-del-folder="${f.id}" title="Löschen">✕</button>
            </div>
          `).join('')}

          ${subItems.map(item => `
            <div class="gn-card item ${item.type}">
              <div class="gn-card-icon">${item.type === 'notebook' ? '📓' : '📕'}</div>
              <div class="gn-card-info">
                <strong>${item.title}</strong>
                <small>${item.pages} Seiten · ${item.date}</small>
              </div>
              <div class="gn-item-actions">
                ${isRoot ? `<button class="gn-move-btn" data-move-id="${item.id}" title="In Fach-Ordner einsortieren">📥 Einsortieren</button>` : ''}
                <button class="gn-delete-btn" data-del-item="${item.id}" title="Löschen">✕</button>
              </div>
            </div>
          `).join('')}

          ${subFolders.length === 0 && subItems.length === 0 ? `
            <div class="gn-empty-state">
              Dieser Ordner ist noch leer. Klicke auf <strong>„Neues Notizbuch“</strong> oder lege Arbeitsblätter ab.
            </div>
          ` : ''}
        </div>

        <!-- FOOTER STATUS -->
        <div class="gn-sim-footer">
          <span>💡 <strong>Aufgabe:</strong> Erstelle für all deine Fächer eigene Ordner und lasse keine losen Dateien auf der Startseite herumliegen!</span>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  countChildren(folderId) {
    const fCount = this.state.folders.filter(f => f.parentId === folderId).length;
    const iCount = this.state.items.filter(i => i.parentId === folderId).length;
    return fCount + iCount;
  }

  bindEvents() {
    // Ordner öffnen
    this.container.querySelectorAll('.gn-card.folder').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('gn-delete-btn')) return;
        this.currentFolderId = el.getAttribute('data-folder-id');
        this.render();
      });
    });

    // Zurück nach oben
    const btnUp = document.getElementById('gn-btn-up');
    if (btnUp) {
      btnUp.addEventListener('click', () => {
        const curr = this.state.folders.find(f => f.id === this.currentFolderId);
        this.currentFolderId = curr ? curr.parentId : 'root';
        this.render();
      });
    }

    // Neuer Ordner
    const btnAddFolder = document.getElementById('gn-btn-add-folder');
    if (btnAddFolder) {
      btnAddFolder.addEventListener('click', () => {
        const name = prompt('Name des Schulfachs (z.B. Englisch, Biologie, Geschichte):');
        if (name && name.trim()) {
          const colors = ['#1B3F7E', '#E8741A', '#276749', '#805AD5', '#D69E2E'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          this.state.folders.push({
            id: 'f_' + Date.now(),
            parentId: this.currentFolderId,
            name: name.trim(),
            color: randomColor
          });
          this.saveState();
          this.render();
        }
      });
    }

    // Neues Notizbuch
    const btnAddBook = document.getElementById('gn-btn-add-book');
    if (btnAddBook) {
      btnAddBook.addEventListener('click', () => {
        const title = prompt('Titel des Notizbuches (z.B. Englisch_Grammar_Q1):');
        if (title && title.trim()) {
          this.state.items.push({
            id: 'item_' + Date.now(),
            parentId: this.currentFolderId,
            title: title.trim(),
            type: 'notebook',
            pages: 1,
            date: 'Heute'
          });
          this.saveState();
          this.render();
        }
      });
    }

    // Löschen
    this.container.querySelectorAll('[data-del-folder]').forEach(b => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = b.getAttribute('data-del-folder');
        if (confirm('Ordner wirklich löschen?')) {
          this.state.folders = this.state.folders.filter(f => f.id !== id);
          this.state.items = this.state.items.filter(i => i.parentId !== id);
          this.saveState();
          this.render();
        }
      });
    });

    this.container.querySelectorAll('[data-del-item]').forEach(b => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = b.getAttribute('data-del-item');
        if (confirm('Dokument löschen?')) {
          this.state.items = this.state.items.filter(i => i.id !== id);
          this.saveState();
          this.render();
        }
      });
    });

    // Einsortieren
    this.container.querySelectorAll('[data-move-id]').forEach(b => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        const itemId = b.getAttribute('data-move-id');
        const availableFolders = this.state.folders.filter(f => f.parentId === 'root');
        if (availableFolders.length === 0) {
          alert('Bitte erstelle zuerst einen Fach-Ordner (z.B. Mathematik oder Deutsch)!');
          return;
        }
        const options = availableFolders.map((f, idx) => `${idx + 1}. ${f.name}`).join('\n');
        const choice = prompt(`In welchen Fach-Ordner soll das Dokument verschoben werden?\n\n${options}\n(Nummer eingeben):`);
        const num = parseInt(choice);
        if (num > 0 && num <= availableFolders.length) {
          const targetFolder = availableFolders[num - 1];
          const item = this.state.items.find(i => i.id === itemId);
          if (item) {
            item.parentId = targetFolder.id;
            this.saveState();
            this.render();
            alert(`✅ Dokument erfolgreich in den Ordner "${targetFolder.name}" einsortiert!`);
          }
        }
      });
    });

    // Reset
    const btnReset = document.getElementById('gn-btn-reset');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('GoodNotes-Simulator auf Ausgangszustand zurücksetzen?')) {
          this.reset();
        }
      });
    }
  }
}
