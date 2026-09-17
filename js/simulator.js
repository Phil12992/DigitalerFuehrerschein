/**
 * SIMULATOR ENGINE (VirtualFS + Explorer GUI + Live CLI + Quest Verifier)
 * Amy Johnson Gymnasium - Digitaler Führerschein (2026)
 */

class VirtualFS {
  constructor(storageKey = 'ajg_vfs_data') {
    this.storageKey = storageKey;
    this.root = this.load() || this.createDefaultFS();
    this.currentPath = ['Schule'];
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
            '2026': {
              type: 'dir',
              name: '2026',
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
              content: 'Arbeitsblatt Analysis Q1 - Stammfunktionen'
            },
            'bild_ohne_erlaubnis.jpg': {
              type: 'file',
              name: 'bild_ohne_erlaubnis.jpg',
              size: '1.2 MB',
              content: '[Foto aus dem Unterricht]'
            },
            'englisch_vokabeln_unit1.docx': {
              type: 'file',
              name: 'englisch_vokabeln_unit1.docx',
              size: '64 KB',
              content: 'Vocabulary list Advanced English Q1'
            }
          }
        },
        'OneDrive - Amy Johnson': {
          type: 'dir',
          name: 'OneDrive - Amy Johnson',
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
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.root));
    } catch(e) {}
  }

  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch(e) {
      return null;
    }
  }

  reset() {
    this.root = this.createDefaultFS();
    this.currentPath = ['Schule'];
    this.save();
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
    if (!curr || curr.type !== 'dir') return { success: false, msg: 'Ungültiges Verzeichnis' };
    if (curr.children[name]) return { success: false, msg: `"${name}" existiert bereits` };
    curr.children[name] = { type: 'dir', name: name, children: {} };
    this.save();
    return { success: true, msg: `Ordner "${name}" erstellt.` };
  }

  touch(name, content = 'Schuldokument') {
    const curr = this.getCurrentNode();
    if (!curr || curr.type !== 'dir') return { success: false, msg: 'Ungültiges Verzeichnis' };
    if (curr.children[name]) return { success: false, msg: `Datei "${name}" existiert bereits` };
    curr.children[name] = { type: 'file', name: name, size: '25 KB', content: content };
    this.save();
    return { success: true, msg: `Datei "${name}" erstellt.` };
  }

  rename(oldName, newName) {
    const curr = this.getCurrentNode();
    if (!curr || !curr.children[oldName]) return { success: false, msg: `"${oldName}" nicht gefunden` };
    if (curr.children[newName]) return { success: false, msg: `"${newName}" existiert bereits` };
    const item = curr.children[oldName];
    delete curr.children[oldName];
    item.name = newName;
    curr.children[newName] = item;
    this.save();
    return { success: true, msg: `"${oldName}" in "${newName}" umbenannt.` };
  }

  delete(name) {
    const curr = this.getCurrentNode();
    if (!curr || !curr.children[name]) return { success: false, msg: `"${name}" nicht gefunden` };
    delete curr.children[name];
    this.save();
    return { success: true, msg: `"${name}" gelöscht.` };
  }

  move(fileName, targetPathArray) {
    const curr = this.getCurrentNode();
    if (!curr || !curr.children[fileName]) return { success: false, msg: `"${fileName}" existiert hier nicht` };
    const target = this.resolveNode(targetPathArray);
    if (!target || target.type !== 'dir') return { success: false, msg: 'Zielordner existiert nicht' };
    if (target.children[fileName]) return { success: false, msg: `Im Zielordner existiert bereits eine Datei namens "${fileName}"` };
    
    target.children[fileName] = curr.children[fileName];
    delete curr.children[fileName];
    this.save();
    return { success: true, msg: `"${fileName}" erfolgreich verschoben.` };
  }

  cd(target) {
    if (target === '/' || target === '~') {
      this.currentPath = [];
      return { success: true };
    }
    if (target === '..') {
      if (this.currentPath.length > 0) this.currentPath.pop();
      return { success: true };
    }
    const parts = target.split('/').filter(p => p.length > 0);
    const testPath = [...this.currentPath];
    for (const p of parts) {
      if (p === '..') {
        if (testPath.length > 0) testPath.pop();
      } else {
        testPath.push(p);
      }
    }
    const node = this.resolveNode(testPath);
    if (!node || node.type !== 'dir') {
      return { success: false, msg: `Verzeichnis "${target}" nicht gefunden` };
    }
    this.currentPath = testPath;
    return { success: true };
  }
}

// ----------------------------------------------------
// QUEST SYSTEM (Verifiziert Aufgaben wie in Code-Apps)
// ----------------------------------------------------
const SIMULATOR_QUESTS = [
  {
    id: 'quest-1',
    title: '1. Oberstufen-Ordner anlegen',
    desc: 'Navigiere zu <code>Schule/2026</code> und erstelle dort die 3 Fachordner <code>Mathematik</code>, <code>Deutsch</code> und <code>Englisch</code>.',
    hint: 'Tipp: Klicke oben auf "+ Neuer Ordner" oder tippe in die CLI: <code>mkdir Mathematik</code> etc.',
    check: (fs) => {
      const node = fs.resolveNode(['Schule', '2026']);
      if (!node || !node.children) return false;
      const c = node.children;
      return (c['Mathematik'] || c['Mathe']) && c['Deutsch'] && (c['Englisch'] || c['English']);
    }
  },
  {
    id: 'quest-2',
    title: '2. Chaotischen Download umbenennen',
    desc: 'Gehe in <code>Downloads</code>. Benenne die chaotische Datei <code>chaos_ab_mathe_v2_final.pdf</code> in ein sauberes Format um: <code>2026-09-17_Mathe_Analysis.pdf</code>.',
    hint: 'Tipp: Klicke bei der Datei auf "Umbenennen" oder nutze in der CLI: <code>rename alterName neuerName</code>.',
    check: (fs) => {
      const dl = fs.resolveNode(['Downloads']);
      const mathe = fs.resolveNode(['Schule', '2026', 'Mathematik']) || fs.resolveNode(['Schule', '2026', 'Mathe']);
      // File could be renamed in Downloads or already moved to Mathe
      const inDl = dl && (dl.children['2026-09-17_Mathe_Analysis.pdf'] || dl.children['2026-09-17_Mathe_Analysis']);
      const inMathe = mathe && (mathe.children['2026-09-17_Mathe_Analysis.pdf'] || mathe.children['2026-09-17_Mathe_Analysis']);
      return inDl || inMathe;
    }
  },
  {
    id: 'quest-3',
    title: '3. Datei in den richtigen Fachordner verschieben',
    desc: 'Verschiebe das umbenannte Mathe-Arbeitsblatt aus <code>Downloads</code> in deinen neuen Ordner <code>Schule/2026/Mathematik</code>.',
    hint: 'Tipp: Datei auswählen und auf "Verschieben nach..." klicken oder in Downloads: <code>mv 2026-09-17_Mathe_Analysis.pdf /Schule/2026/Mathematik</code>.',
    check: (fs) => {
      const mathe = fs.resolveNode(['Schule', '2026', 'Mathematik']) || fs.resolveNode(['Schule', '2026', 'Mathe']);
      return mathe && mathe.children && (mathe.children['2026-09-17_Mathe_Analysis.pdf'] || mathe.children['2026-09-17_Mathe_Analysis']);
    }
  },
  {
    id: 'quest-4',
    title: '4. Recht am eigenen Bild beachten',
    desc: 'Im Downloads-Ordner liegt <code>bild_ohne_erlaubnis.jpg</code> (ein Foto von Mitschülern ohne deren Einwilligung). Lösche diese rechtswidrige Datei!',
    hint: 'Tipp: Klicke auf die Mülltonne 🗑️ oder tippe in Downloads: <code>rm bild_ohne_erlaubnis.jpg</code>.',
    check: (fs) => {
      const dl = fs.resolveNode(['Downloads']);
      return dl && !dl.children['bild_ohne_erlaubnis.jpg'];
    }
  }
];

// ----------------------------------------------------
// SIMULATOR UI CONTROLLER
// ----------------------------------------------------
class OSExplorerSimulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.fs = new VirtualFS();
    this.cliHistory = [];
    this.historyIndex = -1;
    this.render();
    this.bindEvents();
    this.checkQuests();
  }

  render() {
    this.container.innerHTML = `
      <div class="sim-wrapper">
        <!-- QUESTS / FORTSCHRITT -->
        <div class="sim-quests-card">
          <div class="sim-quests-header">
            <div>
              <h3>🎯 Interaktive Praxis-Missionen</h3>
              <p>Wende dein Wissen direkt im simulierten Schul-Dateimanager an.</p>
            </div>
            <div class="sim-badge" id="sim-quest-badge">0 / 4 erledigt</div>
          </div>
          <div class="sim-quests-list" id="sim-quests-list"></div>
        </div>

        <!-- OS WINDOW -->
        <div class="sim-window">
          <!-- TITELLEISTE -->
          <div class="sim-titlebar">
            <div class="sim-window-controls">
              <span class="sim-btn-close"></span>
              <span class="sim-btn-min"></span>
              <span class="sim-btn-max"></span>
            </div>
            <div class="sim-window-title">📁 Datei-Explorer – Amy Johnson Gymnasium (Oberstufe)</div>
            <div class="sim-quick-actions">
              <button class="sim-tool-btn" id="btn-new-folder" title="Neuen Ordner erstellen">📁+ Neuer Ordner</button>
              <button class="sim-tool-btn" id="btn-reset-fs" title="Simulator zurücksetzen">🔄 Reset</button>
            </div>
          </div>

          <!-- ADRESSLEISTE / BREADCRUMB -->
          <div class="sim-address-bar">
            <button class="sim-nav-btn" id="btn-nav-back" title="Eine Ebene höher">⬆ Eine Ebene höher</button>
            <div class="sim-path-display" id="sim-path-display">/Schule</div>
          </div>

          <!-- EXPLORER BODY -->
          <div class="sim-body">
            <!-- SIDEBAR -->
            <div class="sim-sidebar">
              <div class="sim-side-section">Schnellzugriff</div>
              <div class="sim-side-item" data-path="Schule">🏫 Schule</div>
              <div class="sim-side-item" data-path="Downloads">📥 Downloads</div>
              <div class="sim-side-item" data-path="OneDrive - Amy Johnson">☁️ OneDrive Schulcloud</div>
              <div class="sim-side-item" data-path="Desktop">🖥️ Desktop</div>
            </div>

            <!-- FILE VIEW -->
            <div class="sim-files-view" id="sim-files-view"></div>
          </div>

          <!-- LIVE TERMINAL / CLI -->
          <div class="sim-cli-container">
            <div class="sim-cli-header">
              <span>💻 PowerShell / Terminal (Live-CLI mit VirtualFS)</span>
              <span style="opacity:0.7;font-size:0.75rem;">Befehle: ls, cd, mkdir, mv, rename, rm, help</span>
            </div>
            <div class="sim-cli-output" id="sim-cli-output">
              <div class="cli-line info">Amy Johnson Gymnasium OS v2026 [VirtualFS Shell]. Tippe 'help' für eine Befehlsübersicht.</div>
            </div>
            <div class="sim-cli-input-row">
              <span class="sim-cli-prompt" id="sim-cli-prompt">Schule></span>
              <input type="text" id="sim-cli-input" class="sim-cli-input" placeholder="z.B. mkdir Mathematik oder help eingeben..." autocomplete="off">
            </div>
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
    // Toolbar buttons
    const btnNewFolder = document.getElementById('btn-new-folder');
    if (btnNewFolder) {
      btnNewFolder.addEventListener('click', () => {
        const name = prompt('Name des neuen Ordners (z.B. Mathematik):');
        if (name && name.trim()) {
          const res = this.fs.mkdir(name.trim());
          this.logCli(res.msg, res.success ? 'success' : 'error');
          this.renderFiles();
          this.checkQuests();
        }
      });
    }

    const btnReset = document.getElementById('btn-reset-fs');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Möchtest du den Dateimanager und alle Aufgaben auf den Ausgangszustand zurücksetzen?')) {
          this.fs.reset();
          this.render();
          this.bindEvents();
          this.checkQuests();
        }
      });
    }

    const btnUp = document.getElementById('btn-nav-back');
    if (btnUp) {
      btnUp.addEventListener('click', () => {
        this.fs.cd('..');
        this.renderBreadcrumb();
        this.renderFiles();
        this.updateActiveSidebar();
      });
    }

    // Sidebar navigation
    this.container.querySelectorAll('.sim-side-item').forEach(item => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-path');
        this.fs.currentPath = [target];
        this.renderBreadcrumb();
        this.renderFiles();
        this.updateActiveSidebar();
      });
    });

    // CLI Input
    const cliInput = document.getElementById('sim-cli-input');
    if (cliInput) {
      cliInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = cliInput.value.trim();
          cliInput.value = '';
          if (cmd) {
            this.handleCliCommand(cmd);
          }
        }
      });
    }
  }

  renderBreadcrumb() {
    const p = document.getElementById('sim-path-display');
    const prompt = document.getElementById('sim-cli-prompt');
    const pathStr = '/' + this.fs.currentPath.join('/');
    if (p) p.textContent = pathStr;
    if (prompt) prompt.textContent = (this.fs.currentPath[this.fs.currentPath.length - 1] || 'root') + '>';
  }

  updateActiveSidebar() {
    const rootTarget = this.fs.currentPath[0];
    this.container.querySelectorAll('.sim-side-item').forEach(item => {
      if (item.getAttribute('data-path') === rootTarget) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  renderFiles() {
    const view = document.getElementById('sim-files-view');
    if (!view) return;
    const node = this.fs.getCurrentNode();
    view.innerHTML = '';

    if (!node || node.type !== 'dir') {
      view.innerHTML = '<div class="sim-empty-state">Ordner nicht gefunden.</div>';
      return;
    }

    const entries = Object.values(node.children || {});
    if (entries.length === 0) {
      view.innerHTML = '<div class="sim-empty-state">Dieser Ordner ist leer. Klicke auf "+ Neuer Ordner" oder erstelle eine Datei.</div>';
      return;
    }

    entries.forEach(item => {
      const el = document.createElement('div');
      el.className = 'sim-item-card ' + (item.type === 'dir' ? 'is-dir' : 'is-file');
      
      let icon = '📄';
      if (item.type === 'dir') icon = '📁';
      else if (item.name.endsWith('.pdf')) icon = '📕';
      else if (item.name.endsWith('.docx')) icon = '📘';
      else if (item.name.endsWith('.jpg') || item.name.endsWith('.png')) icon = '🖼️';

      el.innerHTML = `
        <div class="sim-item-icon">${icon}</div>
        <div class="sim-item-name" title="${item.name}">${item.name}</div>
        <div class="sim-item-meta">${item.type === 'dir' ? Object.keys(item.children || {}).length + ' Elemente' : (item.size || 'Datei')}</div>
        <div class="sim-item-actions">
          <button class="sim-act-btn btn-ren" title="Umbenennen">✏️</button>
          ${item.type === 'file' ? '<button class="sim-act-btn btn-mov" title="Verschieben">📦</button>' : ''}
          <button class="sim-act-btn btn-del" title="Löschen">🗑️</button>
        </div>
      `;

      // Doppelklick auf Ordner = öffnen
      el.addEventListener('dblclick', () => {
        if (item.type === 'dir') {
          this.fs.cd(item.name);
          this.renderBreadcrumb();
          this.renderFiles();
          this.updateActiveSidebar();
        } else {
          alert(`Inhalt von "${item.name}":\n\n${item.content || '[Kein Textinhalt]'}`);
        }
      });

      // Actions
      el.querySelector('.btn-ren').addEventListener('click', (e) => {
        e.stopPropagation();
        const newName = prompt(`Neuer Name für "${item.name}":`, item.name);
        if (newName && newName.trim() && newName.trim() !== item.name) {
          const res = this.fs.rename(item.name, newName.trim());
          this.logCli(res.msg, res.success ? 'success' : 'error');
          this.renderFiles();
          this.checkQuests();
        }
      });

      if (el.querySelector('.btn-mov')) {
        el.querySelector('.btn-mov').addEventListener('click', (e) => {
          e.stopPropagation();
          const target = prompt(`Wohin soll "${item.name}" verschoben werden?\n(z.B. Schule/2026/Mathematik):`, 'Schule/2026/Mathematik');
          if (target && target.trim()) {
            const parts = target.trim().replace(/^\//, '').split('/');
            const res = this.fs.move(item.name, parts);
            this.logCli(res.msg, res.success ? 'success' : 'error');
            this.renderFiles();
            this.checkQuests();
          }
        });
      }

      el.querySelector('.btn-del').addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Möchtest du "${item.name}" wirklich löschen?`)) {
          const res = this.fs.delete(item.name);
          this.logCli(res.msg, res.success ? 'success' : 'error');
          this.renderFiles();
          this.checkQuests();
        }
      });

      view.appendChild(el);
    });
  }

  logCli(text, type = 'normal') {
    const out = document.getElementById('sim-cli-output');
    if (!out) return;
    const div = document.createElement('div');
    div.className = 'cli-line ' + type;
    div.textContent = text;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }

  handleCliCommand(cmdStr) {
    this.logCli(this.fs.currentPath.join('/') + '> ' + cmdStr, 'command');
    const tokens = cmdStr.split(' ').filter(t => t.length > 0);
    const cmd = tokens[0].toLowerCase();
    const arg1 = tokens[1];
    const arg2 = tokens[2];

    switch(cmd) {
      case 'help':
        this.logCli('Verfügbare Befehle:');
        this.logCli('  ls                     – Inhalt des aktuellen Ordners auflisten');
        this.logCli('  cd <ordner>            – Ordner wechseln (z.B. cd 2026, cd .. für zurück)');
        this.logCli('  mkdir <name>           – Neuen Ordner erstellen (z.B. mkdir Mathematik)');
        this.logCli('  touch <name>           – Neue Datei erstellen');
        this.logCli('  rename <alt> <neu>     – Datei oder Ordner umbenennen');
        this.logCli('  mv <datei> <zielpfad>  – Datei verschieben (z.B. mv datei.pdf Schule/2026/Mathematik)');
        this.logCli('  rm <name>              – Datei oder Ordner löschen');
        this.logCli('  pwd                    – Aktuellen Pfad anzeigen');
        this.logCli('  clear                  – Terminalausgabe leeren');
        break;

      case 'pwd':
        this.logCli('/' + this.fs.currentPath.join('/'));
        break;

      case 'clear':
        const out = document.getElementById('sim-cli-output');
        if (out) out.innerHTML = '';
        break;

      case 'ls':
      case 'dir':
        const node = this.fs.getCurrentNode();
        const items = Object.values(node.children || {});
        if (items.length === 0) {
          this.logCli('[Ordner ist leer]');
        } else {
          items.forEach(it => {
            const prefix = it.type === 'dir' ? '<DIR> ' : '      ';
            this.logCli(`${prefix} ${it.name}`);
          });
        }
        break;

      case 'cd':
        if (!arg1) {
          this.logCli('Fehler: Bitte Zielordner angeben (z.B. "cd 2026" oder "cd ..")', 'error');
        } else {
          const res = this.fs.cd(arg1);
          if (!res.success) this.logCli(res.msg, 'error');
          this.renderBreadcrumb();
          this.renderFiles();
          this.updateActiveSidebar();
        }
        break;

      case 'mkdir':
        if (!arg1) {
          this.logCli('Fehler: Ordnername fehlt. Beispiel: mkdir Mathematik', 'error');
        } else {
          const res = this.fs.mkdir(arg1);
          this.logCli(res.msg, res.success ? 'success' : 'error');
          this.renderFiles();
          this.checkQuests();
        }
        break;

      case 'touch':
        if (!arg1) {
          this.logCli('Fehler: Dateiname fehlt. Beispiel: touch notizen.docx', 'error');
        } else {
          const res = this.fs.touch(arg1);
          this.logCli(res.msg, res.success ? 'success' : 'error');
          this.renderFiles();
          this.checkQuests();
        }
        break;

      case 'rename':
        if (!arg1 || !arg2) {
          this.logCli('Fehler: Syntax ist "rename <alterName> <neuerName>"', 'error');
        } else {
          const res = this.fs.rename(arg1, arg2);
          this.logCli(res.msg, res.success ? 'success' : 'error');
          this.renderFiles();
          this.checkQuests();
        }
        break;

      case 'mv':
      case 'move':
        if (!arg1 || !arg2) {
          this.logCli('Fehler: Syntax ist "mv <datei> <zielpfad>"', 'error');
        } else {
          const parts = arg2.replace(/^\//, '').split('/');
          const res = this.fs.move(arg1, parts);
          this.logCli(res.msg, res.success ? 'success' : 'error');
          this.renderFiles();
          this.checkQuests();
        }
        break;

      case 'rm':
      case 'del':
        if (!arg1) {
          this.logCli('Fehler: Dateiname fehlt. Beispiel: rm test.txt', 'error');
        } else {
          const res = this.fs.delete(arg1);
          this.logCli(res.msg, res.success ? 'success' : 'error');
          this.renderFiles();
          this.checkQuests();
        }
        break;

      default:
        this.logCli(`Befehl "${cmd}" unbekannt. Tippe "help" für eine Übersicht.`, 'error');
    }
  }

  renderQuests() {
    const list = document.getElementById('sim-quests-list');
    if (!list) return;
    list.innerHTML = '';

    SIMULATOR_QUESTS.forEach(q => {
      const isDone = q.check(this.fs);
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

  checkQuests() {
    let completedCount = 0;
    SIMULATOR_QUESTS.forEach(q => {
      const isDone = q.check(this.fs);
      if (isDone) completedCount++;
      const dom = document.getElementById('dom-' + q.id);
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

    const badge = document.getElementById('sim-quest-badge');
    if (badge) {
      badge.textContent = `${completedCount} / ${SIMULATOR_QUESTS.length} erledigt`;
      if (completedCount === SIMULATOR_QUESTS.length) {
        badge.classList.add('all-done');
        badge.textContent = '🎉 Alle Missionen bestanden!';
      } else {
        badge.classList.remove('all-done');
      }
    }
  }
}

// Initialisieren falls Container auf Seite existiert
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('sim-app-root')) {
    window.osSim = new OSExplorerSimulator('sim-app-root');
  }
});
