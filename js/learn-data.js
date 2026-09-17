// ====================================================
// LERNPFAD- & LEKTIONEN-DATEN
// Amy Johnson Gymnasium (2026)
// ====================================================

const PATH_DATA = {
  pc: {
    title: "Windows 11 Laptop-Führerschein",
    subtitle: "Lernpfad für den professionellen Einsatz deines Laptops am Amy Johnson Gymnasium",
    badge: "Windows 11 Modul",
    lessons: [
      {
        id: "pc-1",
        number: "Lektion 01",
        title: "Anständiges Nutzen ohne Missbrauch",
        category: "Verhaltenskodex & Recht",
        readTime: "6 Min.",
        summary: "Die Grundregeln für den Unterricht: Wann bleibt der Deckel unten? Was ist tabu? Wie schütze ich mein Schulkonto?",
        content: `
          <div class="lesson-body">
            <h3>1. Das Grundprinzip: Das Gerät ist ein Lernwerkzeug</h3>
            <p>Dein Laptop dient in der Schule der Bildung, Recherche, Mitschrift und Projektarbeit. Außerhalb ausdrücklich freigegebener Arbeitsphasen bestimmt die Lehrkraft, ob und wie das Gerät verwendet wird.</p>
            
            <div class="pro-box forbid">
              <h4>🚫 Was als Missbrauch gewertet wird:</h4>
              <ul>
                <li><strong>Heimliche Aufnahmen:</strong> Das Fotografieren oder Aufnehmen von Ton und Video von Mitschülern oder Lehrkräften ist nach § 201a StGB und KunstUrhG strafbar.</li>
                <li><strong>Unterrichtsfremde Aktivitäten:</strong> Gaming, Social Media, YouTube, Streaming oder private Chatprogramme während der Unterrichtszeit.</li>
                <li><strong>Netzwerk-Manipulation:</strong> Das Einrichten von Hotspots, Nutzen verbotener VPN-Tunnel oder Angriffe auf das Schulnetzwerk führen zum sofortigen Netzausschluss.</li>
                <li><strong>Täuschungsversuche mit KI:</strong> Das unkritische Kopieren von Texten aus ChatGPT ohne Quellenangabe und Lehrererlaubnis gilt als Leistungsverweigerung (Note 6 / 0 Punkte).</li>
              </ul>
            </div>

            <h3>2. Die 45-Grad-Regel ("Deckel halb zu")</h3>
            <p>Sobald eine Lehrkraft eine Erklärung beginnt oder eine Unterrichtsdiskussion im Plenum stattfindet, gilt am Amy Johnson Gymnasium das Signal <strong>„Deckel halb zu“</strong>: Der Laptop-Bildschirm wird auf ca. 45 Grad gesenkt, sodass Blickkontakt gewährleistet ist und die Tastatur ruht.</p>

            <h3>3. Schulkonto schützen (Windows Hello & Schnell-Sperre)</h3>
            <p>Lasse dein Gerät im Klassenraum niemals ungesperrt stehen. Gewöhne dir folgenden Reflex an:</p>
            <div class="key-shortcut">
              <span class="key">Win</span> + <span class="key">L</span>
              <span class="key-desc">&rarr; Sofortige Bildschirmsperre in 0,5 Sekunden</span>
            </div>
            <p style="margin-top:0.8rem;">Verwende eine mindestens 6-stellige PIN oder Windows Hello (Fingerabdruck), um rasch wieder entsperren zu können.</p>
          </div>
        `
      },
      {
        id: "pc-2",
        number: "Lektion 02",
        title: "Organisieren des Gerätes & Dateimanagement",
        category: "Struktur & Praxis",
        readTime: "8 Min.",
        summary: "Schluss mit Desktop-Chaos: Die standardisierte Ordnerhierarchie, einheitliche Dateinamen und der interaktive Simulator.",
        interactiveType: "explorer",
        content: `
          <div class="lesson-body">
            <h3>1. Warum Ordnerhierarchien deine Noten retten</h3>
            <p>Schüler verbringen durchschnittlich 15 Minuten pro Woche mit dem Suchen verlorener Arbeitsblätter. Am Amy Johnson Gymnasium gilt daher die 3-Ebenen-Regel:</p>
            
            <div class="folder-tree-view">
              <div class="tree-item">📁 <strong>OneDrive - Amy Johnson Gymnasium</strong></div>
              <div class="tree-item level-1">📁 <strong>Schule</strong></div>
              <div class="tree-item level-2">📁 <strong>2025-2026</strong> (Aktuelles Schuljahr)</div>
              <div class="tree-item level-3">📁 <strong>Mathematik</strong></div>
              <div class="tree-item level-3">📁 <strong>Deutsch</strong></div>
              <div class="tree-item level-3">📁 <strong>Englisch</strong></div>
              <div class="tree-item level-3">📁 <strong>Biologie / Physik / Geschichte...</strong></div>
            </div>

            <h3>2. Die offizielle Dateinamen-Formel</h3>
            <p>Keine Dateien namens <code>referat_neu_final2.docx</code> mehr! Benenne jedes Schuldokument strukturiert nach:</p>
            <div class="formula-box">
              <code>JAHR-MONAT-TAG_Fach_Thema.dateiendung</code>
            </div>
            <p><em>Beispiel:</em> <code>2026-09-17_Mathe_LineareFunktionen-AB.pdf</code><br>
            <strong>Vorteil:</strong> Windows sortiert deine Dateien dadurch automatisch in der perfekten chronologischen Reihenfolge.</p>

            <h3>3. Interaktives Praxistraining im Dateimanager</h3>
            <p>Probiere es direkt hier aus! Erstelle die Ordner für deine Fächer und bereinige den unordentlichen Downloads-Ordner:</p>
            
            <div id="lesson-sim-container"></div>
          </div>
        `
      },
      {
        id: "pc-3",
        number: "Lektion 03",
        title: "Tipps & Hacks für den Schulalltag",
        category: "Effizienz & Konzentration",
        readTime: "7 Min.",
        summary: "Praxiserprobte Methoden, Tastenkombinationen und Konzentrations-Hacks für konzentriertes Arbeiten.",
        content: `
          <div class="lesson-body">
            <h3>Unterkapitel 3.1: Fokus wahren & Verlockungen ausschalten</h3>
            <p><strong>Darf ich private Apps auf dem Schul-Laptop haben?</strong><br>
            <strong>Ja.</strong> Es ist dein privates Gerät. Du darfst Steam, Discord, Spotify oder Games installiert haben. Im Schulgebäude gilt jedoch: Keine privaten Apps während der Schulzeit!</p>
            
            <div class="pro-box tip">
              <h4>💡 Wie schalte ich den Drang zu zocken oder zu chatten ab?</h4>
              <ul>
                <li><strong>Fokus-Sitzung in Windows 11:</strong> Klicke unten rechts auf die Uhrzeit &rarr; Fokus-Sitzung (z.B. 45 Min.) starten. Alle störenden Pings von Discord, WhatsApp Web etc. werden automatisch stummgeschaltet.</li>
                <li><strong>Virtuelle Desktops (Win + Strg + D):</strong> Lege einen Desktop rein für „Schule“ an (nur Word, Edge und Teams geöffnet). Private Fenster bleiben auf Desktop 2 geschlossen und aus den Augen.</li>
                <li><strong>Taskleiste bereinigen:</strong> Hefte nur Schul-Tools an die Taskleiste. Spiele-Verknüpfungen gehören in einen Ordner und nicht mitten auf den Desktop.</li>
              </ul>
            </div>

            <h3>Unterkapitel 3.2: Tastatur-Hacks für schnelle Mitschriften</h3>
            <div class="shortcuts-grid">
              <div class="sc-item"><span class="key">Win</span> + <span class="key">Shift</span> + <span class="key">S</span> <div><strong>Präziser Screenshot:</strong> Bereich ausschneiden und sofort in OneNote/Word einfügen.</div></div>
              <div class="sc-item"><span class="key">Win</span> + <span class="key">V</span> <div><strong>Erweiterte Zwischenablage:</strong> Zeigt deinen Kopier-Verlauf der letzten Stunden an.</div></div>
              <div class="sc-item"><span class="key">Strg</span> + <span class="key">Z</span> / <span class="key">Y</span> <div><strong>Rückgängig / Wiederholen:</strong> Versehentlich Gelöschtes sofort wiederherstellen.</div></div>
              <div class="sc-item"><span class="key">Win</span> + <span class="key">Pfeiltaste</span> <div><strong>Split-Screen (Fenster teilen):</strong> Halber Bildschirm Word, halber Bildschirm Recherche.</div></div>
            </div>

            <h3>Unterkapitel 3.3: Akkuschonung für 6 bis 8 Schulstunden</h3>
            <ul>
              <li><strong>Helligkeit auf 60–70%:</strong> Das Display verbraucht bis zu 65% des gesamten Akkus.</li>
              <li><strong>Batteriesparmodus ab 30%:</strong> Schaltet unnötige Hintergrundaktualisierungen ab.</li>
              <li><strong>Lade-Disziplin:</strong> Das Gerät muss zu Beginn jedes Schultags mindestens zu 80% geladen sein. Steckdosen im Klassenraum sind keine Selbstverständlichkeit!</li>
            </ul>
          </div>
        `
      }
    ]
  },
  tablet: {
    title: "Tablet-Führerschein (iPad & Samsung)",
    subtitle: "Lernpfad für digitale Hefte, GoodNotes-Ordner und Stiftnutzung am Amy Johnson Gymnasium",
    badge: "Tablet Modul",
    lessons: [
      {
        id: "tab-1",
        number: "Lektion 01",
        title: "Anständiges Nutzen ohne Missbrauch",
        category: "Verhaltenskodex & Recht",
        readTime: "6 Min.",
        summary: "Flach-Leg-Pflicht, AirDrop-Regeln und das Verbot heimlicher Foto- und Audioaufnahmen.",
        content: `
          <div class="lesson-body">
            <h3>1. Digitale Etikette mit Tablets</h3>
            <p>Ein Tablet mit Stift ist das ideale digitale Schulheft. Allerdings verleitet der flache Formfaktor oft dazu, heimlich Spiele zu spielen oder im Netz zu surfen. Am Amy Johnson Gymnasium gelten klare Regeln:</p>
            
            <div class="pro-box forbid">
              <h4>🚫 Strikte Verbote im Klassenzimmer:</h4>
              <ul>
                <li><strong>Kein AirDrop / Quick Share Unfug:</strong> Das Versenden von Memes, privaten Bildern oder Nachrichten an Mitschüler während des Unterrichts ist verboten. Schalte AirDrop auf „Nur Kontakte“ oder „Aus“.</li>
                <li><strong>Kamera- und Mikrofonmissbrauch:</strong> Niemand darf ohne vorherige Erlaubnis fotografiert oder gefilmt werden (§ 201a StGB).</li>
                <li><strong>Ton aus:</strong> Das Tablet muss im Unterricht grundsätzlich stummgeschaltet sein. Tastenanschläge und Benachrichtigungstöne müssen deaktiviert sein.</li>
              </ul>
            </div>

            <h3>2. Die Flach-Leg-Regel</h3>
            <p>Auf Aufforderung der Lehrkraft („Tablets flach“) wird das Tablet flach auf den Tisch gelegt und der Eingabestift (Apple Pencil / S-Pen) daneben abgelegt. Das Aufstellen mit Tastatur-Hülle wird nur während aktiver Arbeitsphasen gestattet.</p>

            <h3>3. Diebstahlschutz & Sperrcode</h3>
            <p>Aktiviere zwingend die Suchfunktion (<em>„Wo ist?“</em> bei Apple bzw. <em>„SmartThings Find“</em> bei Samsung) und richte einen mindestens 6-stelligen Sperrcode ein, damit bei Verlust niemand auf deine persönlichen Notizen zugreifen kann.</p>
          </div>
        `
      },
      {
        id: "tab-2",
        number: "Lektion 02",
        title: "Organisieren: GoodNotes & Samsung Notes strukturieren",
        category: "Struktur & Praxis",
        readTime: "8 Min.",
        summary: "Wie man in GoodNotes und Samsung Notes echte Ordner für Fächer anlegt, Notizbücher einsortiert und PDFs verwaltet.",
        interactiveType: "goodnotes-manager",
        content: `
          <div class="lesson-body">
            <h3>1. Nie wieder Notizen-Chaos</h3>
            <p>Viele Schüler erstellen in GoodNotes oder Samsung Notes einfach 50 lose Einzelseiten auf der Startseite. Das führt spätestens vor den Klausuren zum totalen Kontrollverlust!</p>

            <div class="pro-box ok">
              <h4>📁 Die richtige GoodNotes- / Samsung-Notes-Hierarchie:</h4>
              <p>Erstelle zuerst <strong>Ordner für jedes Fach</strong> (z.B. ein Ordner „Mathematik“, ein Ordner „Deutsch“). In diesen Ordner legst du dann:</p>
              <ul>
                <li>Ein Haupt-Notizbuch für das Halbjahr (z.B. <code>Mathe_Q1_Analysis</code>)</li>
                <li>Einen Unterordner <code>Arbeitsblätter & Klausuren</code> für importierte PDFs</li>
              </ul>
            </div>

            <h3>2. Interaktiver GoodNotes- & Notizen-Ordner-Manager</h3>
            <p>Erlebe die echte Ordner-Verwaltung direkt hier: Erstelle Ordner für deine Schulfächer, lege Fächer-Notizbücher an und sortiere Arbeitsblätter sauber ein:</p>
            
            <div id="lesson-tab-sim-container"></div>
          </div>
        `
      },
      {
        id: "tab-3",
        number: "Lektion 03",
        title: "Tipps, Hacks & Tafelbild-Recht",
        category: "Effizienz & Konzentration",
        readTime: "7 Min.",
        summary: "Reizunterdrückung am Tablet, rechtssichere Tafelbilder und Split-View-Multitasking.",
        content: `
          <div class="lesson-body">
            <h3>Unterkapitel 3.1: Private Apps & Reize abstellen</h3>
            <p>Du darfst deine privaten Spiele und Social-Media-Apps auf dem Tablet behalten. Um während der Schulzeit nicht in Versuchung zu geraten, nutze diese bewährten Tricks:</p>

            <div class="pro-box tip">
              <h4>💡 Hacks gegen den Ablenkungsdrang:</h4>
              <ul>
                <li><strong>Fokus „Schule“ mit Zeitplan:</strong> Auf dem iPad unter <em>Einstellungen &gt; Fokus</em> oder bei Samsung unter <em>Modi &amp; Routinen</em>. Stelle ein, dass sich der Schul-Fokus montags bis freitags von 08:00 bis 15:30 Uhr automatisch aktiviert. Alle Spiele-Pings und WhatsApp-Meldungen werden geblockt.</li>
                <li><strong>Der 2-Seiten-Homescreen:</strong> Lege Seite 1 ausschließlich mit Schul-Apps (GoodNotes, Teams, Taschenrechner, Safari) an. Alle Spiele und Social-Media-Apps wandern in einen Ordner auf Seite 2. Was du nicht sofort siehst, lenkt dich nicht ab!</li>
              </ul>
            </div>

            <h3>Unterkapitel 3.2: Tafelbilder rechtssicher erfassen</h3>
            <p><strong>Darf ich die Tafel abfotografieren?</strong><br>
            Nur wenn die Lehrkraft es <strong>ausdrücklich erlaubt</strong>. Und dann gilt:</p>
            <ul>
              <li><strong>Niemals Mitschüler im Bild:</strong> Achte darauf, dass vor der Tafel sitzende Mitschüler nicht im Bildausschnitt sind.</li>
              <li><strong>Dokumentenscan-Funktion nutzen:</strong> Sowohl GoodNotes als auch Samsung Notes haben einen eingebauten Dokumentenscanner, der nur die Tafel entzerrt und zuschneidet.</li>
              <li><strong>Nicht ins Netz stellen:</strong> Das Hochladen von Tafelaufschrieben in öffentliche WhatsApp-Gruppen oder Social Media verletzt das Urheberrecht der Lehrkraft.</li>
            </ul>

            <h3>Unterkapitel 3.3: Split-View Multitasking</h3>
            <p>Nutze den geteilten Bildschirm: Links dein Notizheft, rechts das PDF-Buch oder die Recherche-Seite im Browser. So sparst du ständiges Hin- und Herspringen zwischen Apps!</p>
          </div>
        `
      }
    ]
  }
};
