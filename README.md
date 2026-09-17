# 🎓 Digitaler Führerschein – Amy Johnson Gymnasium

Eine moderne, barrierefreie Webanwendung für die gymnasiale Oberstufe zur Schulung und Freigabe digitaler Endgeräte (Windows 11 Laptops, Apple iPads mit GoodNotes, Samsung Galaxy Tabs mit Samsung Notes).

---

## 🚀 Features

- **2 Spezialmodule**:
  - 💻 **PC / Laptop (Windows 11)**: Ordnerorganisation, Dateinamen-Konventionen, Office 365, Teams, Fokus-Modus, Sicherheitsrichtlinien.
  - 📱 **Tablet (iPad & Samsung)**: Umschaltbar zwischen iOS (GoodNotes 6, Apple Pencil) und Android (Samsung Notes, S-Pen), PDF-Annotation, Tafelbild-Recht.
- **Interaktive Checklisten**: Jeder Schüler kann seine Einstellungen schrittweise abhaken (Fortschritt wird im Browser gespeichert).
- **Abschlusstest mit Zugangscode**:
  - Schutz vor unberechtigtem Durchklicken – nur mit Code von der Lehrkraft startbar.
  - Standardcode: `AJG2025` (konfigurierbar in `js/quiz-data.js`).
  - 20 Fragen mit Zufallssortierung, Sofort-Feedback und Mindestquote (70%).
- **Offizielles Zertifikat**:
  - Druck- und PDF-optimiertes Zertifikat mit Originallogo des **Amy Johnson Gymnasiums**.
  - Inklusive Unterschriftszeile für Lehrkräfte / Schulleitung.

---

## 🌐 Auf GitHub hochladen & kostenlos hosten (GitHub Pages)

Diese Webseite besteht aus purem HTML, CSS und JavaScript und benötigt keinen Server. Sie ist perfekt für **GitHub Pages** geeignet:

### Schritt 1: Git-Repository initialisieren
Öffne PowerShell in diesem Ordner (`C:\Users\philb\VS\SchuelFührerschein`) und führe aus:
```bash
git init
git add .
git commit -m "Initial commit - Digitaler Fuehrerschein AJG"
```

### Schritt 2: Auf GitHub hochladen
1. Gehe auf [github.com](https://github.com) und erstelle ein neues Repository (z.B. `digitaler-fuehrerschein`).
2. Verbinde dein lokales Verzeichnis mit GitHub (ersetze `DEIN_USERNAME` und `REPO_NAME`):
```bash
git branch -M main
git remote add origin https://github.com/DEIN_USERNAME/REPO_NAME.git
git push -u origin main
```

### Schritt 3: GitHub Pages aktivieren
1. Öffne dein Repository auf GitHub.
2. Gehe auf **Settings** -> **Pages** (im linken Menü).
3. Unter **Branch**: Wähle `main` und Ordner `/ (root)` aus.
4. Klicke auf **Save**.
5. Nach ca. 1–2 Minuten ist deine Webseite unter `https://DEIN_USERNAME.github.io/REPO_NAME/` live im Internet erreichbar!

---

## 🔑 Lehrkraft-Hinweise

- Den Prüfungscode kannst du in der Datei [`js/quiz-data.js`](js/quiz-data.js) in Zeile 5 anpassen:
  ```javascript
  const QUIZ_ACCESS_CODE = "DEIN_NEUER_CODE";
  ```
- Um die Mindest-Bestehensquote zu ändern:
  ```javascript
  const MIN_PASS_PERCENT = 70; // Prozentwert
  ```
