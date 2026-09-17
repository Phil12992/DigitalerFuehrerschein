/**
 * SIMULATOR ENGINE (VirtualFS Explorer - REIN DATEIMANAGER, KEINE CLI-PFLICHT)
 * Amy Johnson Gymnasium (2026)
 */

class PureFileExplorerSimulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.storageKey = 'ajg_explorer_pure_fs';
    this.root = this.load() || this.createDefaultFS();
    this.currentPath = ['Schule'];
    this.render();
    this.bindEvents();
    this.checkQuests();
  }

  createDefaultFS() {
    return {
      type: 'dir',
      name: 'root',
      children: {
        'Schule': {
          type: 'dir',
          name: 'Schule',
          children: {
            '2025-2026': {
              type: 'dir',
              name: '2025-2026',
              children: {}
            }
          }
        },
        'Downloads': {
          type: 'dir',
          name: 'Downloads',
          children: {
            'chaos_ab_mathe_v2_final.pdf': {
              type: 'file',
              name: 'chaos_ab_mathe_v2_final.pdf',
              size: '420 KB',
              content: 'Arbeitsblatt Analysis - Stammfunktionen'
            },
            'bild_ohne_erlaubnis.jpg': {
              type: 'file',
              name: 'bild_ohne_erlaubnis.jpg',
              size: '1.2 MB',
              content: '[Foto aus dem Unterricht ohne Einwilligung]'
            },
            'englisch_vokabeln_unit1.docx': {
              type: 'file',
              name: 'englisch_vokabeln_unit1.docx',
              size: '64 KB',
              content: 'Vocabulary Unit 1'
            }
          }
        },
        'OneDrive - Amy Johnson Gymnasium': {
          type: 'dir',
          name: 'OneDrive - Amy Johnson Gymnasium',
          isCloud: true,
          children: {}
        },
        'Desktop': {
          type: 'dir',
          name: 'Desktop',
          children: {}
        }
      }
    };
  }

  save() {
    try { localStorage.setItem(this.storageKey, JSON.stringify(this.root)); } catch(e) {}
  }

  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch(e) { return null; }
  }

  reset() {
    this.root = this.createDefaultFS();
    this.currentPath = ['Schule'];
    this.save();
    this.render();
    this.bindEvents();
    this.checkQuests();
  }

  resolveNode(pathArray) {
    let curr = this.root;
    for (const part of pathArray) {
      if (!curr.children || !curr.children[part]) return null;
      curr = curr.children[part];
    }
    return curr;
  }

  getCurrentNode() {
    return this.resolveNode(this.currentPath);
  }

  mkdir(name) {
    const curr = this.getCurrentNode();
    if (!curr || curr.type !== 'dir') return false;
    if (curr.children[name]) { alert(`Ein Ordner namens "${name}" existiert hier bereits.`); return false; }
    curr.children[name] = { type: 'dir', name: name, children: {} };
    this.save();
    return true;
  }

  rename(oldName, newName) {
    const curr = this.getCurrentNode();
    if (!curr || !curr.children[oldName]) return false;
    if (curr.children[newName]) { alert(`"${newName}" existiert bereits.`); return false; }
    const item = curr.children[oldName];
    delete curr.children[oldName];
    item.name = newName;
    curr.children[newName] = item;
    this.save();
    return true;
  }

  delete(name) {
    const curr = this.getCurrentNode();
    if (!curr || !curr.children[name]) return false;
    delete curr.children[name];
    this.save();
    return true;
  }

  move(fileName, targetPathArray) {
    const curr = this.getCurrentNode();
    if (!curr || !curr.children[fileName]) return false;
    const target = this.resolveNode(targetPathArray);
    if (!target || target.type !== 'dir') { alert('Zielordner existiert nicht.'); return false; }
    if (target.children[fileName]) { alert('Im Zielordner existiert bereits eine gleichnamige Datei.'); return false; }
    
    target.children[fileName] = curr.children[fileName];
    delete curr.children[fileName];
    this.save();
    return true;
  }

  cd(target) {
    if (target === '..') {
      if (this.currentPath.length > 0) this.currentPath.pop();
      return;
    }
    const node = this.resolveNode([...this.currentPath, target]);
    if (node && node.type === 'dir') {
      this.currentPath.push(target);
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="sim-wrapper">
        <!-- MISSIONEN / FORTSCHRITT -->
        <div class="sim-quests-card">
          <div class="sim-quests-header">
            <div>
              <h4 style="color:var(--primary);margin-bottom:0.2rem;font-size:1.05rem;">🎯 Praxis-Aufgaben zum Abhaken</h4>
              <p style="font-size:0.85rem;color:var(--text-sec);margin:0;">Löse die Aufgaben direkt im Dateimanager darunter. Dein Fortschritt wird automatisch geprüft!</p>
            </div>
            <div class="sim-badge" id="sim-quest-badge">0 / 4 erledigt</div>
          </div>
          <div class="sim-quests-list" id="sim-quests-list"></div>
        </div>

        <!-- WINDOW EXPLORER -->
        <div class="sim-window">
          <!-- TITELLEISTE -->
          <div class="sim-titlebar">
            <div class="sim-window-controls">
              <span class="sim-btn-close"></span>
              <span class="sim-btn-min"></span>
              <span class="sim-btn-max"></span>
            </div>
            <div class="sim-window-title">📁 Datei-Explorer – Amy Johnson Gymnasium</div>
            <div class="sim-quick-actions">
              <button class="sim-tool-btn" id="btn-new-folder">📁+ Neuer Ordner</button>
              <button class="sim-tool-btn" id="btn-reset-fs">🔄 Zurücksetzen</button>
            </div>
          </div>

          <!-- ADRESSLEISTE / BREADCRUMB -->
          <div class="sim-address-bar">
            <button class="sim-nav-btn" id="btn-nav-back">⬆ Eine Ebene höher</button>
            <div class="sim-path-display" id="sim-path-display">/Schule</div>
          </div>

          <!-- EXPLORER BODY -->
          <div class="sim-body">
            <!-- SIDEBAR -->
            <div class="sim-sidebar">
              <div class="sim-side-section">Schnellzugriff</div>
              <div class="sim-side-item active" data-path="Schule">🏫 Schule</div>
              <div class="sim-side-item" data-path="Downloads">📥 Downloads</div>
              <div class="sim-side-item" data-path="OneDrive - Amy Johnson Gymnasium">☁️ OneDrive Schulcloud</div>
              <div class="sim-side-item" data-path="Desktop">🖥️ Desktop</div>
            </div>

            <!-- FILE VIEW -->
            <div class="sim-files-view" id="sim-files-view"></div>
          </div>
        </div>
      </div>
    `;

    this.renderFiles();
    this.renderBreadcrumb();
    this.renderQuests();
    this.updateActiveSidebar();
  }

  bindEvents() {
    const btnNewFolder = this.container.querySelector('#btn-new-folder');
    if (btnNewFolder) {
      btnNewFolder.addEventListener('click', () => {
        const name = prompt('Name des neuen Fach-Ordners (z.B. Mathematik, Deutsch oder Englisch):');
        if (name && name.trim()) {
          this.mkdir(name.trim());
          this.renderFiles();
          this.checkQuests();
        }
      });
    }

    const btnReset = this.container.querySelector('#btn-reset-fs');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Dateimanager auf den Ausgangszustand zurücksetzen?')) {
          this.reset();
        }
      });
    }

    const btnUp = this.container.querySelector('#btn-nav-back');
    if (btnUp) {
      btnUp.addEventListener('click', () => {
        this.cd('..');
        this.renderBreadcrumb();
        this.renderFiles();
        this.updateActiveSidebar();
      });
    }

    this.container.querySelectorAll('.sim-side-item').forEach(item => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-path');
        this.currentPath = [target];
        this.renderBreadcrumb();
        this.renderFiles();
        this.updateActiveSidebar();
      });
    });
  }

  renderBreadcrumb() {
    const p = this.container.querySelector('#sim-path-display');
    if (p) p.textContent = '/' + this.currentPath.join('/');
  }

  updateActiveSidebar() {
    const rootTarget = this.currentPath[0];
    this.container.querySelectorAll('.sim-side-item').forEach(item => {
      if (item.getAttribute('data-path') === rootTarget) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  renderFiles() {
    const view = this.container.querySelector('#sim-files-view');
    if (!view) return;
    const node = this.getCurrentNode();
    view.innerHTML = '';

    if (!node || node.type !== 'dir') {
      view.innerHTML = '<div class="sim-empty-state">Ordner nicht gefunden.</div>';
      return;
    }

    const entries = Object.values(node.children || {});
    if (entries.length === 0) {
      view.innerHTML = '<div class="sim-empty-state">Dieser Ordner ist leer. Klicke oben auf <strong>„+ Neuer Ordner“</strong>.</div>';
      return;
    }

    entries.forEach(item => {
      const el = document.createElement('div');
      el.className = 'sim-item-card ' + (item.type === 'dir' ? 'is-dir' : 'is-file');
      
      let icon = '📄';
      if (item.type === 'dir') icon = '📁';
      else if (item.name.endsWith('.pdf')) icon = '📕';
      else if (item.name.endsWith('.docx')) icon = '📘';
      else if (item.name.endsWith('.jpg')) icon = '🖼️';

      el.innerHTML = `
        <div class="sim-item-icon">${icon}</div>
        <div class="sim-item-name" title="${item.name}">${item.name}</div>
        <div class="sim-item-meta">${item.type === 'dir' ? Object.keys(item.children || {}).length + ' Elemente' : (item.size || 'Datei')}</div>
        <div class="sim-item-actions">
          <button class="sim-act-btn btn-ren" title="Umbenennen">✏️ Umbenennen</button>
          ${item.type === 'file' ? '<button class="sim-act-btn btn-mov" title="Verschieben">📦 Verschieben</button>' : ''}
          <button class="sim-act-btn btn-del" title="Löschen">🗑️</button>
        </div>
      `;

      el.addEventListener('dblclick', () => {
        if (item.type === 'dir') {
          this.cd(item.name);
          this.renderBreadcrumb();
          this.renderFiles();
          this.updateActiveSidebar();
        } else {
          alert(`Inhalt von "${item.name}":\n\n${item.content || '[Kein Textinhalt]'}`);
        }
      });

      el.querySelector('.btn-ren').addEventListener('click', (e) => {
        e.stopPropagation();
        const newName = prompt(`Neuer Name für "${item.name}":`, item.name);
        if (newName && newName.trim() && newName.trim() !== item.name) {
          this.rename(item.name, newName.trim());
          this.renderFiles();
          this.checkQuests();
        }
      });

      if (el.querySelector('.btn-mov')) {
        el.querySelector('.btn-mov').addEventListener('click', (e) => {
          e.stopPropagation();
          const target = prompt(`In welchen Ordner soll "${item.name}" verschoben werden?\n\nBeispiel: Schule/2025-2026/Mathematik`, 'Schule/2025-2026/Mathematik');
          if (target && target.trim()) {
            const parts = target.trim().replace(/^\//, '').split('/');
            const ok = this.move(item.name, parts);
            if (ok) {
              alert(`✅ Datei "${item.name}" erfolgreich nach ${target} verschoben!`);
              this.renderFiles();
              this.checkQuests();
            }
          }
        });
      }

      el.querySelector('.btn-del').addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Möchtest du "${item.name}" wirklich löschen?`)) {
          this.delete(item.name);
          this.renderFiles();
          this.checkQuests();
        }
      });

      view.appendChild(el);
    });
  }

  renderQuests() {
    const list = this.container.querySelector('#sim-quests-list');
    if (!list) return;
    list.innerHTML = '';

    const quests = this.getQuests();
    quests.forEach(q => {
      const isDone = q.check(this);
      const card = document.createElement('div');
      card.className = 'sim-quest-item ' + (isDone ? 'is-complete' : 'is-pending');
      card.id = 'dom-' + q.id;
      card.innerHTML = `
        <div class="sim-quest-status">${isDone ? '✅' : '⚪'}</div>
        <div class="sim-quest-content">
          <h4>${q.title}</h4>
          <p>${q.desc}</p>
          <small class="sim-quest-hint">${q.hint}</small>
        </div>
      `;
      list.appendChild(card);
    });
  }

  getQuests() {
    return [
      {
        id: 'q1',
        title: '1. Drei Fach-Ordner anlegen',
        desc: 'Navigiere zu <code>Schule/2025-2026</code> und erstelle dort die Fächer <code>Mathematik</code>, <code>Deutsch</code> und <code>Englisch</code>.',
        hint: 'Tipp: Doppelklicke auf "Schule", dann auf "2025-2026" und klicke oben auf "+ Neuer Ordner".',
        check: (inst) => {
          const node = inst.resolveNode(['Schule', '2025-2026']);
          if (!node || !node.children) return false;
          const c = node.children;
          return (c['Mathematik'] || c['Mathe']) && c['Deutsch'] && (c['Englisch'] || c['English']);
        }
      },
      {
        id: 'q2',
        title: '2. Download-Datei umbenennen',
        desc: 'Gehe in <code>Downloads</code>. Benenne die chaotische Datei <code>chaos_ab_mathe_v2_final.pdf</code> um in <code>2026-09-17_Mathe_Analysis.pdf</code>.',
        hint: 'Tipp: In Downloads auf "✏️ Umbenennen" klicken.',
        check: (inst) => {
          const dl = inst.resolveNode(['Downloads']);
          const mathe = inst.resolveNode(['Schule', '2025-2026', 'Mathematik']) || inst.resolveNode(['Schule', '2025-2026', 'Mathe']);
          const inDl = dl && dl.children['2026-09-17_Mathe_Analysis.pdf'];
          const inMathe = mathe && mathe.children && mathe.children['2026-09-17_Mathe_Analysis.pdf'];
          return inDl || inMathe;
        }
      },
      {
        id: 'q3',
        title: '3. In den Fach-Ordner verschieben',
        desc: 'Verschiebe das umbenannte Mathe-Arbeitsblatt aus <code>Downloads</code> in deinen Ordner <code>Schule/2025-2026/Mathematik</code>.',
        hint: 'Tipp: Bei der Datei auf "📦 Verschieben" klicken und den Zielordner bestätigen.',
        check: (inst) => {
          const mathe = inst.resolveNode(['Schule', '2025-2026', 'Mathematik']) || inst.resolveNode(['Schule', '2025-2026', 'Mathe']);
          return mathe && mathe.children && mathe.children['2026-09-17_Mathe_Analysis.pdf'];
        }
      },
      {
        id: 'q4',
        title: '4. Rechtswidriges Foto löschen',
        desc: 'Im Downloads-Ordner liegt <code>bild_ohne_erlaubnis.jpg</code> (ein heimliches Foto von Mitschülern). Lösche diese Datei!',
        hint: 'Tipp: Auf die Mülltonne 🗑️ klicken.',
        check: (inst) => {
          const dl = inst.resolveNode(['Downloads']);
          return dl && !dl.children['bild_ohne_erlaubnis.jpg'];
        }
      }
    ];
  }

  checkQuests() {
    let completedCount = 0;
    const quests = this.getQuests();
    quests.forEach(q => {
      const isDone = q.check(this);
      if (isDone) completedCount++;
      const dom = this.container.querySelector('#dom-' + q.id);
      if (dom) {
        if (isDone) {
          dom.classList.remove('is-pending');
          dom.classList.add('is-complete');
          dom.querySelector('.sim-quest-status').textContent = '✅';
        } else {
          dom.classList.remove('is-complete');
          dom.classList.add('is-pending');
          dom.querySelector('.sim-quest-status').textContent = '⚪';
        }
      }
    });

    const badge = this.container.querySelector('#sim-quest-badge');
    if (badge) {
      badge.textContent = `${completedCount} / ${quests.length} erledigt`;
      if (completedCount === quests.length) {
        badge.classList.add('all-done');
        badge.textContent = '🎉 Alle Aufgaben bestanden!';
      } else {
        badge.classList.remove('all-done');
      }
    }
  }
}
