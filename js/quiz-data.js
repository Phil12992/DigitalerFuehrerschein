// ====================================================
// GEPRÜFTE PRÜFUNGSFRAGEN – AMY JOHNSON GYMNASIUM (2026)
// Für das gesamte Gymnasium (Sek I & Sek II)
// Voreingestellter Zugangscode: AJG2025
// ====================================================

const QUIZ_ACCESS_CODE = "AJG2025";
const MIN_PASS_PERCENT  = 70;

const QUIZ_BANK = {
  pc: [
    {
      cat: "Verhaltenskodex & Schulregeln",
      q: "Was bedeutet das Signal 'Deckel halb zu' am Amy Johnson Gymnasium?",
      opts: [
        "Den Laptop sofort herunterfahren und in die Tasche packen",
        "Den Bildschirm auf ca. 45 Grad neigen, um Blickkontakt zur Lehrkraft herzustellen",
        "Den Laptop ganz zuklappen, damit die Tastatur gesperrt wird",
        "Auf stumm schalten, aber weiter tippen"
      ],
      correct: 1,
      explain: "Die 45-Grad-Regel ermöglicht sofortigen Blickkontakt im Plenum, ohne dass das Gerät ausgeschaltet werden muss."
    },
    {
      cat: "Dateiorganisation",
      q: "Wie lautet die empfohlene Namenskonvention für Schuldokumente?",
      opts: [
        "hausaufgabe_final_v2.docx",
        "JAHR-MONAT-TAG_Fach_Thema (z.B. 2026-09-17_Mathe_Analysis.pdf)",
        "Nur der Name des Themas ohne Datum",
        "Dateien müssen nicht benannt werden, die Windows-Suche reicht aus"
      ],
      correct: 1,
      explain: "Das Format JAHR-MONAT-TAG_Fach_Thema sortiert Dateien automatisch in der perfekten chronologischen Reihenfolge."
    },
    {
      cat: "Private Apps & Konzentration",
      q: "Darfst du private Apps (wie Spiele, Spotify oder Discord) auf deinem Laptop installiert haben?",
      opts: [
        "Nein, auf Schulgeräten sind private Apps durch die Schulordnung streng verboten",
        "Ja, sie dürfen auf dem privaten Gerät bleiben, während der Schulzeit gilt aber striktes Unterrichts-Tabu",
        "Ja, man darf sie auch im Unterricht benutzen, solange der Ton aus ist",
        "Nur wenn die Eltern eine schriftliche Genehmigung vorlegen"
      ],
      correct: 1,
      explain: "Private Geräte dürfen private Apps enthalten. Im Unterricht sind diese jedoch ausnahmslos tabu."
    },
    {
      cat: "Gerätesicherheit & Schutz",
      q: "Mit welcher Tastenkombination sperrst du deinen Windows-Laptop blitzschnell, wenn du deinen Platz verlässt?",
      opts: [
        "Strg + Alt + Entf",
        "Windows-Taste + L",
        "Alt + F4",
        "Windows-Taste + D"
      ],
      correct: 1,
      explain: "Win + L sperrt den Bildschirm in unter einer Sekunde und verhindert unbefugten Zugriff."
    },
    {
      cat: "Datenschutz & Aufnahmen",
      q: "Ein Mitschüler macht im Unterricht eine lustige Bewegung. Darfst du ihn mit der Webcam kurz aufnehmen?",
      opts: [
        "Ja, solange es nur in der privaten Klassengruppe geteilt wird",
        "Nein, Bild- und Tonaufnahmen ohne ausdrückliche Einwilligung sind nach § 201a StGB verboten",
        "Ja, wenn der Lehrer gerade wegguckt",
        "Ja, wenn es als Meme bearbeitet wird"
      ],
      correct: 1,
      explain: "Ungefragte Foto-, Video- und Tonaufnahmen verletzen das Recht am eigenen Bild und sind strafbar."
    },
    {
      cat: "KI & Quellenkompetenz",
      q: "Wie darf ChatGPT oder eine andere KI für schulische Aufgaben genutzt werden?",
      opts: [
        "Man darf den KI-Text komplett kopieren und als eigene Hausaufgabe abgeben",
        "Als Lern- und Rechercheassistenz mit kritischer Prüfung der Fakten und Transparenz im Quellenverzeichnis",
        "KI ist an Schulen gesetzlich komplett verboten",
        "Nur für Rechtschreibprüfung, keinesfalls zur Recherche"
      ],
      correct: 1,
      explain: "KI ist ein Hilfswerkzeug. Reine Kopien gelten als Täuschungsversuch und werden mit ungenügend bewertet."
    },
    {
      cat: "Netzwerk & Schule",
      q: "Wie gehst du verantwortungsvoll mit dem Schul-WLAN um?",
      opts: [
        "Über externe VPN-Tunnel die Schul-Sperren für TikTok und Spiele umgehen",
        "Große private Spiele-Updates herunterladen, weil das WLAN kostenlos ist",
        "Ausschließlich für schulische Zwecke nutzen und keine unnötige Bandbreite belasten",
        "Einen eigenen Hotspot für Mitschüler eröffnen"
      ],
      correct: 2,
      explain: "Das Schulnetzwerk dient Bildungszwecken. Bandbreitenüberlastung oder VPN-Tunneling führen zum Netzausschluss."
    },
    {
      cat: "Hardware & Akku",
      q: "Welche Lade-Voraussetzung gilt zu Beginn jedes Schultags?",
      opts: [
        "Der Akku muss gar nicht geladen sein, es gibt überall Steckdosen",
        "Das Gerät muss mindestens zu 80% geladen sein, Steckdosen sind Ausnahmen",
        "Genau 50% reichen für den Tag",
        "Man lässt das Ladekabel dauerhaft eingesteckt"
      ],
      correct: 1,
      explain: "Schüler müssen mit einsatzbereiten Geräten erscheinen. Klassenraum-Steckdosen sind keine Dauerlösung."
    },
    {
      cat: "Dateiorganisation & Backup",
      q: "Warum ist das Ablegen wichtiger Referate auf dem Desktop riskant?",
      opts: [
        "Der Desktop wird langsamer",
        "Weil lokale Desktop-Dateien bei Beschädigung oder Verlust des Geräts ohne Cloud-Sync unwiderruflich verloren sind",
        "Desktop-Dateien können von Lehrkräften ferngesteuert gelöscht werden",
        "Es gibt kein Risiko"
      ],
      correct: 1,
      explain: "Dateien gehören in die synchronisierte Schulcloud (OneDrive), um vor Hardwaredefekten geschützt zu sein."
    },
    {
      cat: "Tipps & Tricks",
      q: "Welche Windows-Funktion hilft dir, Pings und Benachrichtigungen im Unterricht stummzuschalten?",
      opts: [
        "Der Flugzeugmodus (trennt auch das Schul-WLAN)",
        "Die Windows 11 Fokus-Sitzung / Nicht-Stören-Modus",
        "Der Energiesparmodus",
        "Windows-Update erzwingen"
      ],
      correct: 1,
      explain: "Die Fokus-Sitzung hält das WLAN für Schularbeiten aktiv, unterdrückt aber störende App-Benachrichtigungen."
    }
  ],

  tablet: [
    {
      cat: "Verhaltenskodex & Schulregeln",
      q: "Was besagt die 'Flach-Leg-Regel' für Tablets am Amy Johnson Gymnasium?",
      opts: [
        "Das Tablet muss auf den Boden gelegt werden",
        "Auf Ansage wird das Tablet flach auf den Tisch gelegt und der Stift daneben abgelegt",
        "Das Tablet wird mit der Schutzhülle hochkant hingestellt",
        "Nur die Tastatur wird weggeklappt"
      ],
      correct: 1,
      explain: "Die Flach-Leg-Regel stellt sicher, dass alle Blicke nach vorne gerichtet sind und niemand abgelenkt tippt."
    },
    {
      cat: "GoodNotes & Ordnerstruktur",
      q: "Wie organisiert man Notizen in GoodNotes oder Samsung Notes optimal?",
      opts: [
        "Alle Notizen auf der Startseite ohne Ordner ablegen",
        "Für jedes Schulfach einen eigenen Ordner anlegen und darin Fächer-Hefte und PDF-Arbeitsblätter strukturieren",
        "Jede Schulstunde ein neues Notizbuch anlegen",
        "Notizen nur als unbenannte Quick-Notes führen"
      ],
      correct: 1,
      explain: "Fächerordner verhindern das Notizen-Chaos und machen Skripte und Arbeitsblätter gezielt auffindbar."
    },
    {
      cat: "Kamera & Tafelbilder",
      q: "Wann darfst du im Unterricht ein Foto des Tafelbildes machen?",
      opts: [
        "Jederzeit ohne Nachfrage, Tafelbilder sind frei",
        "Nur mit ausdrücklicher Erlaubnis der Lehrkraft und ohne dass Mitschüler im Bildausschnitt sind",
        "Nur in den Pausen",
        "Wenn man das Foto danach direkt in den Klassenchat stellt"
      ],
      correct: 1,
      explain: "Tafelbilder dürfen nur nach Freigabe fotografiert werden. Mitschüler dürfen nicht abgebildet werden."
    },
    {
      cat: "Netiquette & AirDrop",
      q: "Was gilt bezüglich AirDrop / Quick Share während des Schultages?",
      opts: [
        "Memes und Späße dürfen frei im Klassenraum verschickt werden",
        "AirDrop sollte auf 'Aus' oder 'Nur Kontakte' stehen; privates Versenden im Unterricht ist untersagt",
        "AirDrop muss für alle dauerhaft geöffnet sein",
        "Lehrkräfte dürfen über AirDrop Witze empfangen"
      ],
      correct: 1,
      explain: "Ungefragtes Senden von Dateien über AirDrop/Quick Share stört den Unterricht massiv und ist verboten."
    },
    {
      cat: "Private Apps & Konzentration",
      q: "Wie kannst du dein Tablet vor der Verlockung von Social Media während der Schulzeit schützen?",
      opts: [
        "Das Tablet zu Hause lassen",
        "Einen automatischen Fokus-Zeitplan 'Schule' (Mo–Fr) einrichten und private Apps auf Seite 2 verlagern",
        "Alle Apps täglich deinstallieren",
        "Auf Werkseinstellungen zurücksetzen"
      ],
      correct: 1,
      explain: "Ein zeitgesteuerter Schul-Fokus filtert Benachrichtigungen zuverlässig, ohne dass Apps gelöscht werden müssen."
    },
    {
      cat: "Datenschutz & Recht",
      q: "Dürfen Mitschriften oder Arbeitsblätter von Lehrkräften im Internet öffentlich hochgeladen werden?",
      opts: [
        "Ja, alles was im Unterricht verteilt wird, gehört dem Schüler",
        "Nein, urheberrechtlich geschützte Unterrichtsmaterialien dürfen nicht ohne Genehmigung veröffentlicht werden",
        "Ja, solange man kein Geld dafür verlangt",
        "Nur auf TikTok und Instagram"
      ],
      correct: 1,
      explain: "Arbeitsblätter und Tafelaufschriebe unterliegen dem Urheberrecht der Verfasser und Schulen."
    },
    {
      cat: "Produktivität & Apps",
      q: "Wie nutzt du die Split-View-Funktion (geteiltes Display) sinnvoll im Unterricht?",
      opts: [
        "Links ein Spiel, rechts die Mitschrift",
        "Links das Notizbuch (GoodNotes/Samsung Notes), rechts das Schulbuch-PDF oder Recherchematerial",
        "Zwei Musik-Apps gleichzeitig laufen lassen",
        "Split-View ist im Unterricht verboten"
      ],
      correct: 1,
      explain: "Split-View ermöglicht paralleles Arbeiten mit Lehrbuch und Mitschrift ohne App-Wechsel."
    },
    {
      cat: "Sicherheit & Verlust",
      q: "Was solltest du auf deinem Tablet zwingend aktivieren, falls es in der Schule vergessen wird?",
      opts: [
        "Den Bluetooth-Sichtbarkeitsmodus",
        "Die Ortungsfunktion ('Wo ist?' bei Apple bzw. 'SmartThings Find' bei Samsung) plus Sperrcode",
        "Die automatische Rufannahme",
        "Nichts, die Schule haftet immer"
      ],
      correct: 1,
      explain: "Ortungsdienste und Gerätesperren schützen deine Daten bei Diebstahl oder Verlust wirksam."
    },
    {
      cat: "KI & Lernen",
      q: "Welche Haltung vertritt das Amy Johnson Gymnasium bezüglich KI-Tools wie ChatGPT?",
      opts: [
        "Vollständiges Verbot mit Taschenkontrollen",
        "Verantwortungsvolle Nutzung als Lernhilfe, aber strenges Verbot von ungekennzeichneten Plagiaten",
        "KI darf Klausuren für Schüler schreiben",
        "KI existiert für den Schulunterricht nicht"
      ],
      correct: 1,
      explain: "Transparenz und Eigenleistung stehen an erster Stelle. KI-Einsatz muss deklariert werden."
    },
    {
      cat: "Hardware & Zubehör",
      q: "Was gehört zur unverzichtbaren Schutzausstattung eines Schul-Tablets?",
      opts: [
        "Nur ein cooler Sticker",
        "Eine stoßfeste Schutzhülle (idealerweise mit Displayschutz) und eine sichere Stifthalterung",
        "Auf keinen Fall eine Hülle, das Tablet muss leicht sein",
        "Eine dauerhafte Strombank am Schreibtisch"
      ],
      correct: 1,
      explain: "Ein Schul-Tablet ist ständigen Transport- und Stoßbelastungen ausgesetzt und benötigt soliden Schutz."
    }
  ]
};
