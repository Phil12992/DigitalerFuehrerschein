// ================================================
//  QUIZ KONFIGURATION – Digitaler Führerschein
//  Zugangscode hier aendern:
// ================================================
const QUIZ_ACCESS_CODE = "AJG2025";   // <-- Hier den Code aendern
const MIN_PASS_PERCENT  = 70;         // Mindest-Prozent zum Bestehen

const QUIZ_QUESTIONS = [
  {
    cat: "Dateiorganisation",
    q: "Wie solltest du Dateien auf deinem Schulgerät am besten benennen?",
    opts: [
      "neues dokument.docx",
      "2025-09-17_Biologie_Mitschrift_K11.docx",
      "asdf123.docx",
      "Dateien müssen gar nicht benannt werden"
    ],
    correct: 1,
    explain: "Eine strukturierte Benennung mit Datum, Fach und Thema hilft dir, Dateien schnell wiederzufinden."
  },
  {
    cat: "Sicherheit",
    q: "Was ist eine sichere Passwortstrategie?",
    opts: [
      "Deinen Namen und Geburtsjahr verwenden (z.B. Max2008)",
      "Immer dasselbe Passwort für alle Accounts nutzen",
      "Eine zufällige Kombination aus Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen",
      "Passwörter auf einem Zettel neben dem Gerät notieren"
    ],
    correct: 2,
    explain: "Sichere Passwörter sind komplex, einzigartig pro Dienst und werden nicht aufgeschrieben oder geteilt."
  },
  {
    cat: "Datenschutz & Recht",
    q: "Du machst ein Foto von einem Mitschüler im Unterricht und möchtest es posten. Was gilt?",
    opts: [
      "Kein Problem, solange es lustig ist",
      "Erlaubt, wenn das Foto gut aussieht",
      "Ohne ausdrückliche Einwilligung der abgebildeten Person ist das verboten",
      "Nur in privaten Chats darf man es teilen"
    ],
    correct: 2,
    explain: "Das Recht am eigenen Bild schützt jede Person. Fotos von Mitschülern dürfen ohne deren Erlaubnis nicht verbreitet werden."
  },
  {
    cat: "Tablet & Notiz-Apps",
    q: "Wie organisierst du Notizen optimal in GoodNotes (iPad) oder Samsung Notes?",
    opts: [
      "Alles in einem einzigen Notizbuch chronologisch",
      "Pro Schulfach ein separates Notizbuch mit klarer Struktur",
      "Keine Struktur nötig – suchen reicht",
      "Alle Notizen auf einer einzigen langen Seite"
    ],
    correct: 1,
    explain: "Ein Notizbuch pro Fach mit Registerseiten macht Notizen leicht auffindbar und übersichtlich."
  },
  {
    cat: "Netiquette",
    q: "Was bedeutet 'Netiquette'?",
    opts: [
      "Schnelles Tippen ohne Rechtschreibfehler",
      "Verhaltens- und Umgangsregeln im Internet und digitaler Kommunikation",
      "Eine Art Internetzensur durch die Schule",
      "Der technische Standard für Schul-WLANs"
    ],
    correct: 1,
    explain: "Netiquette beschreibt höfliches, respektvolles Verhalten in der digitalen Kommunikation – wie Benehmen in der echten Welt."
  },
  {
    cat: "Schulregeln",
    q: "Wann darfst du dein digitales Gerät im Unterricht benutzen?",
    opts: [
      "Immer und nach Belieben, auch während einer Erklärung",
      "Nur wenn die Lehrkraft es explizit erlaubt oder aufgegeben hat",
      "Niemals – Geräte sind im Unterricht verboten",
      "Ausschließlich in den letzten 5 Minuten der Stunde"
    ],
    correct: 1,
    explain: "Digitale Geräte sind Lernwerkzeuge. Im Unterricht gelten die Regeln der Lehrkraft. Ohne Erlaubnis bleibt das Gerät weg."
  },
  {
    cat: "Cloud & Speicher",
    q: "Wofür stehen OneDrive, iCloud und Google Drive?",
    opts: [
      "Programm zum Bearbeiten von Fotos",
      "Antivirusprogramme für Schulgeräte",
      "Cloud-Speicherdienste zum Speichern und automatischen Synchronisieren von Dateien",
      "Kommunikationsprogramme wie E-Mail"
    ],
    correct: 2,
    explain: "Cloud-Dienste speichern deine Dateien online und machen sie auf allen deinen Geräten verfügbar – auch wenn dein Gerät verloren geht."
  },
  {
    cat: "Cyber-Mobbing",
    q: "Du wirst Opfer von Cyber-Mobbing. Was ist der richtige erste Schritt?",
    opts: [
      "Schweigen und hoffen, dass es von allein aufhört",
      "Zurückmobben und den Täter bloßstellen",
      "Beweise sichern (Screenshots), melden und eine Vertrauensperson informieren",
      "Das Gerät dauerhaft weglegen und auf Social Media verzichten"
    ],
    correct: 2,
    explain: "Cyber-Mobbing muss gemeldet werden. Beweise sichern, nicht selbst eskalieren und Hilfe bei Lehrkräften oder Schulberatung suchen."
  },
  {
    cat: "Gerätepflege",
    q: "Wie schonst du den Akku deines Geräts langfristig am besten?",
    opts: [
      "Gerät immer auf 100% geladen lassen (dauernd am Strom)",
      "Akku komplett entleeren bevor man lädt",
      "Ladestand zwischen 20–80% halten und extreme Temperaturen vermeiden",
      "Akku ist egal, der wird sowieso irgendwann ersetzt"
    ],
    correct: 2,
    explain: "Lithium-Akkus halten am längsten, wenn sie nicht ständig voll- oder leergeladen werden. 20–80% ist ideal."
  },
  {
    cat: "KI & Quellen",
    q: "Du nutzt ChatGPT für eine Schularbeit. Was ist dabei unbedingt zu beachten?",
    opts: [
      "KI-Texte können unverändert als eigene Leistung abgegeben werden",
      "KI ist in der Schule generell verboten – nicht nutzen",
      "KI-Nutzung muss kenntlich gemacht werden, Ergebnisse kritisch prüfen und Quellen angeben",
      "KI macht Schularbeiten überflüssig"
    ],
    correct: 2,
    explain: "KI ist ein hilfreiches Werkzeug, aber keine eigene Leistung. Nutzung deklarieren, Fakten prüfen und kritisch denken bleibt deine Aufgabe."
  },
  {
    cat: "Produktivität",
    q: "Was bewirkt der 'Fokus-Modus' auf Windows 11 oder dem iPad?",
    opts: [
      "Der Bildschirm wird heller und kontrastreicher",
      "Das Gerät wird schneller durch Deaktivierung von Hintergrundprozessen",
      "Benachrichtigungen, Ablenkungen und störende Apps werden unterdrückt",
      "Das WLAN wird für bestimmte Apps gesperrt"
    ],
    correct: 2,
    explain: "Der Fokus-Modus hilft dir, konzentriert zu arbeiten, indem er störende Benachrichtigungen und Pop-ups unterbindet."
  },
  {
    cat: "Datenschutz & Recht",
    q: "Was schützt das Urheberrecht?",
    opts: [
      "Das Recht, alles aus dem Internet kostenlos herunterzuladen",
      "Kreative Werke wie Texte, Bilder, Musik und Videos vor unerlaubter Nutzung",
      "Nur professionelle Künstler und Autoren, nicht Schüler",
      "Den Zugang zu kostenpflichtigen Webseiten"
    ],
    correct: 1,
    explain: "Urheberrecht schützt alle kreativen Werke automatisch. Einfach kopieren oder weiterverwenden ist ohne Genehmigung strafbar."
  },
  {
    cat: "Kommunikation",
    q: "Wie ist eine professionelle Schulmail aufgebaut?",
    opts: [
      "Nur Emojis und Jugendsprache – Lehrkräfte müssen sich anpassen",
      "So kurz wie möglich ohne Anrede",
      "Korrekte Anrede, präziser Betreff, höflicher Text, Gruß und vollständiger Name",
      "Keine Struktur nötig – Hauptsache, die Info ist drin"
    ],
    correct: 2,
    explain: "In E-Mails an Lehrkräfte gilt formale Sprache: Anrede, klarer Betreff, höflicher Text und vollständiger Name sind Pflicht."
  },
  {
    cat: "Sicherheit",
    q: "Du bist fertig an einem öffentlichen Schulcomputer. Was tust du?",
    opts: [
      "Angemeldet lassen – der nächste merkt es schon",
      "Das Passwort im Browser speichern für nächstes Mal",
      "Abmelden, Browserverlauf löschen, keine Zugangsdaten gespeichert lassen",
      "Nur das Fenster schließen reicht"
    ],
    correct: 2,
    explain: "Auf gemeinsam genutzten Geräten immer abmelden und keine persönlichen Daten hinterlassen, um Missbrauch zu verhindern."
  },
  {
    cat: "Tablet & Notiz-Apps",
    q: "Welche Notiz-App ist die beste Wahl für Samsung-Tablets?",
    opts: [
      "GoodNotes – die beste App überhaupt",
      "Nur mit Stift arbeitende Apps sind erlaubt",
      "Samsung Notes oder Microsoft OneNote (GoodNotes gibt es nicht für Android)",
      "WhatsApp-Notizen sind ausreichend"
    ],
    correct: 2,
    explain: "GoodNotes ist nur für iPad/macOS verfügbar. Samsung-Tablet-Nutzer greifen auf Samsung Notes oder Microsoft OneNote zurück."
  },
  {
    cat: "Schulregeln",
    q: "Wie nutzt du das Schul-WLAN verantwortungsvoll?",
    opts: [
      "Für private Downloads, Streaming und Gaming – dafür ist WLAN da",
      "Das Passwort an Freunde und Familie weitergeben",
      "Nur für schulische Zwecke nutzen und keine unnötige Bandbreite verbrauchen",
      "Das WLAN ist frei, also darf man alles damit machen"
    ],
    correct: 2,
    explain: "Das Schul-WLAN ist für den Unterricht gedacht. Missbrauch kann zum Verlust des Zugangs und zu rechtlichen Konsequenzen führen."
  },
  {
    cat: "Gerätepflege",
    q: "Wie schützt du dein Gerät vor physischen Schäden?",
    opts: [
      "Ungeschützt in der Tasche transportieren – ein bisschen Stoß hält es aus",
      "Schutzcase und Displayschutzfolie verwenden und sorgfältig transportieren",
      "Schäden passieren sowieso, Schutz ist sinnlos",
      "Das Gerät zu Hause lassen ist am sichersten"
    ],
    correct: 1,
    explain: "Ein gutes Case und eine Schutzfolie schützen vor Kratzern und Sturzschäden. Dein Gerät ist teuer – behandle es entsprechend."
  },
  {
    cat: "Datenschutz & Recht",
    q: "Du möchtest ein Foto von der Tafel machen. Was ist zu beachten?",
    opts: [
      "So viel wie möglich fotografieren statt zuzuhören und mitzuschreiben",
      "Nur mit ausdrücklicher Erlaubnis der Lehrkraft und ohne Mitschüler im Bild",
      "Fotos der Tafel dürfen direkt ins Internet gestellt werden",
      "Mitschüler beim Schreiben zu fotografieren und in der Gruppe zu teilen ist okay"
    ],
    correct: 1,
    explain: "Unterrichtsmaterialien urheberrechtlich geschützt sein können. Mitschüler dürfen ohne Erlaubnis nicht fotografiert werden."
  },
  {
    cat: "Dateiorganisation",
    q: "Welche Ordnerstruktur ist für deine Schuldokumente sinnvoll?",
    opts: [
      "Alle Dateien direkt auf dem Desktop ablegen",
      "Alles im Downloads-Ordner lassen",
      "Schule → Schuljahr → Fach → Thema mit klaren Dateinamen",
      "Keine Struktur – die Suchfunktion findet alles"
    ],
    correct: 2,
    explain: "Eine klare Hierarchie spart Zeit beim Suchen und hält deinen Speicher übersichtlich. Die Suchfunktion ist kein Ersatz für Ordnung."
  },
  {
    cat: "Sicherheit",
    q: "Du siehst ein unbekanntes offenes WLAN ('Free_School_WiFi'). Was tust du?",
    opts: [
      "Sofort verbinden – kostenloses WLAN ist praktisch",
      "Verbinden und dann Schulpasswörter eingeben zum Testen",
      "Vorsicht walten lassen, nicht verbinden und ggf. IT oder Lehrkraft informieren",
      "Das Netzwerk ignorieren und vergessen"
    ],
    correct: 2,
    explain: "Unbekannte WLANs können gefälschte Hotspots sein ('Evil Twin'-Angriff). Nur bekannte, vertrauenswürdige Netze nutzen."
  }
];
