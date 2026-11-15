export default {
    assistant: {
        title: 'KI-Assistent',
        status: 'In Bearbeitung',
        greeting: 'Hallo, am Ende dieser Woche werde ich funktionieren.'
    },
    welcome: 'Willkommen',
    education: 'Ausbildung',
    areaFilter: 'Projektbereich',
    filterOptions: 'Projektfilter',
    allAreas: 'Alle Bereiche',
    areas: { mobile: 'Mobile App', web: 'Webentwicklung', backend: 'Backend & Daten', desktop: 'Desktop-App' },
    filter: 'Technologie filtern',
    allTechnologies: 'Alle Technologien',
    noResults: 'Keine passenden Projekte gefunden.',
    reset: 'Alle Filter zurücksetzen',
    areaMode: 'Nach Projektbereich',
    technologyMode: 'Nach Technologie',
    projectCount: '{visible} von {total} Projekten',
    sortLabel: 'Sortieren', newest: 'Neueste zuerst', oldest: 'Älteste zuerst', created: 'Erstellt',
    switchToDark: 'Dunkelmodus einschalten', switchToLight: 'Hellmodus einschalten',
    navigationLabel: 'Hauptnavigation',
    languageLabel: 'Sprache',
    nav: ['Start', 'Portfolio', 'Technologien', 'Über mich'],
    contact: 'KONTAKT', cvDownload: 'CV herunterladen', cvShort: 'CV',
    valueLabels: ['Programmieren', 'Gestalten', 'Lernen', 'Wiederholen'],
    logoHome: 'ek. – Zur Startseite oben', heroGreeting: 'HALLO, ICH BIN', heroName: 'Ekaterina', whatIUse: 'WOMIT ICH ARBEITE', more: '+ weitere', aboutTile: 'EIN WENIG ÜBER MICH', footerMade: 'Mit Liebe zum Code und zum Detail.', footerCopyright: '© 2026 Ekaterina Schedlberger',
    role: 'Softwareentwicklerin',
    location: 'Graz, Österreich',
    heroNote: 'Ideen verstehen. Lösungen entwickeln. Neues lernen.',
    educationNews: 'Aktuell',
    educationFocus: 'Softwareentwicklung im Fokus',
    educationHeading: 'Akademisch geprüfte Softwareentwicklerin',
    educationMilestone: 'Abgeschlossen im Oktober 2026',
    educationNext: 'Nächster Schritt',
    educationNextCourse: 'Python-Kurs in Hagen · geplant für Ende November 2026',
    projectsTitle: 'Dinge, die ich entwickle.',
    projectsIntro: 'Eine Auswahl meiner Projekte und Ideen.',
    portfolioStatus: 'Derzeit in Bearbeitung',
    technologiesTitle: 'Technologien aus meiner Praxis.',
    technologiesIntro: 'Mit diesen Technologien habe ich in meiner Ausbildung und in Projekten gearbeitet. Meine Erfahrung ist je nach Technologie unterschiedlich tief. Mit jedem Projekt lerne ich dazu.',
    techGroups: ['Frontend & Apps', 'Backend & Daten', 'Werkzeuge', 'KI-Werkzeuge', 'Ausbildungsschwerpunkte'], projectUse: 'Im Projekt eingesetzt', studyUse: 'In der Ausbildung vertieft',
    sectionPortfolio: '01 / PORTFOLIO', sectionTechnologies: '02 / TECHNOLOGIEN', sectionAbout: '03 / ÜBER MICH', sectionContact: '04 / KONTAKT',
    projectTypes: { mobile: 'MOBILE APP', web: 'WEBPROJEKT', backend: 'KONSOLENANWENDUNG', desktop: 'DESKTOP-APP' },
    projectTypesShort: { mobile: 'APP', web: 'WEB', backend: 'JAVA', desktop: 'DESKTOP' },
    studyTopics: 'Objektorientierte Programmierung (OOP) · MVVM · Algorithmen · Softwarearchitektur · Softwarequalitätssicherung',
    techFilterAll: "Alle Bereiche", techFilterGroups: ["Frontend & Apps", "Backend & Daten", "Werkzeuge", "KI-Werkzeuge"],
    techFilterReset: 'Zurücksetzen',
    about: 'Über mich',
    aboutShort: 'Mein Weg und was mich antreibt.',
    aboutTitle: 'Neugierig bleiben.',
    aboutSections: [
        {
        heading: 'Was reizt mich am Code?',
        before: '',
        emphasis: 'Wenn Code hakt, gehe ich der Ursache auf den Grund.',
        after: ' Das hat mich im Lehrgang Software-Entwicklung an der FH CAMPUS 02 genauso angetrieben wie in der Webentwicklung bei JAWA. Ich habe mir mein Wissen mit Zeit und Übung erarbeitet. Jetzt will ich wissen, was ich damit noch entwickeln kann.'
        },
        {
        heading: 'Ich über KI',
        before: 'Ein Streichholz spart Zeit beim Feuermachen. KI spart mir Zeit beim Entwickeln. So kann ich mehr Ideen testen und Fehler gezielter eingrenzen. ',
        emphasis: 'Ich gebe die Richtung vor, prüfe die Vorschläge am Code und entscheide, welchen Ansatz ich weiterentwickle.',
        after: ''
        },
        {
        heading: 'Warum jetzt Python?',
        before: '',
        emphasis: 'Wie lernt ein Modell aus Daten?',
        after: ' Und woran erkenne ich, ob ich seinem Ergebnis trauen kann? Das will ich selbst ausprobieren. Mein Einstieg ist der Python-Kurs in Hagen.'
        },
    ],
    helloTitle: 'Lass uns etwas bewegen.',
    helloText:
        'Ich freue mich über interessante Projekte, neue Herausforderungen und berufliche Möglichkeiten in der Softwareentwicklung.',
    github: 'Mein GitHub',
    email: 'E-Mail schreiben',
    projectDescriptions: {
        yoganow: "YogaNow Studio verbindet eine frei zugängliche Yoga-Bibliothek mit der Buchung von Studiokursen. Im Team war ich für das Design, die Datenbankanbindung mit Supabase und die Kursbuchungsplattform zuständig.",
        uno: "Im Team entwickeltes UNO-Kartenspiel für die Java-Konsole. Karten, Spieler und Spielrunden sind als Java-Klassen modelliert. Das Spiel prüft die Spielzüge und unterstützt Aktionskarten wie „Aussetzen“ und „Richtungswechsel“. Über JDBC speichert das Spiel die Punktestände in SQLite und ruft die Bestenliste per SQL ab.",
        kaffeehaus: "Kaffeehaus-Website mit Speisekarte, Bildergalerie und Kontaktformular, entstanden als Übungsprojekt an der FH CAMPUS 02. Der überschaubare Umfang ließ Raum für die Grundlagen der Webentwicklung: Seiten mit HTML strukturieren, Layouts mit CSS Grid und Flexbox an verschiedene Bildschirmgrößen anpassen und eine Bildergalerie mit JavaScript und Swiper einbinden.",
        hotelverwaltung: "Konsolenbasiertes Prüfungsprojekt zur Verwaltung von Gästen, Zimmern, Buchungen und Zusatzleistungen. Mit Hibernate/JPA, CRUD-Funktionen, HQL-Abfragen, Transaktionen und XML-Mapping.",
        feta: "Mit Feta begann mein Weg in die IT. Mein erstes Webprojekt war zugleich mein Diplomprojekt am WIFI und eine echte Kundenwebsite für einen Lutscherhersteller. Dafür erstellte ich ein eigenes responsives WordPress-Theme mit Produktkatalog, aufklappbaren Zutatenlisten und Kontaktformular. Die Kundenwebsite war online. Heute zeigt die Galerie eine lokale Vorschau.",
        geschenkeverwaltung: "Windows-Desktop-App zum Anlegen, Bearbeiten, Kopieren und Filtern von Geschenken. So funktioniert MVVM beim Löschen: Die Oberfläche löst den Löschbefehl aus, das ViewModel prüft die Auswahl und das Repository löscht das Geschenk über Entity Framework in SQL Server LocalDB. Anschließend aktualisiert WPF die Liste und die Statusleiste per Datenbindung.",
        todo: "Aufgaben hinzufügen, abhaken und löschen. Pinia verwaltet den Zustand und speichert die Aufgaben im Browser.",
        shopplatzi: "Shop-Demo mit Produktdaten und Kategorien aus der Platzi Fake Store API. Produkte lassen sich suchen, filtern, als Favoriten markieren und in den Warenkorb legen.",
        "uno-web": "CAMPUS02 ColorSpiel ist ein webbasiertes Kartenspiel für vier Personen an einem Bildschirm. Karten ablegen, Farben wechseln und über mehrere Runden Punkte sammeln. Die Spieloberfläche entstand im Team an der FH CAMPUS 02. Für meine Weiterentwicklung habe ich ein eigenes Node.js-Backend mit Express gebaut, das Karten austeilt, Spielzüge prüft und Punkte verwaltet. Dazu kommen eigene Kartendesigns und ein Wintermodus. Die Demo läuft im kostenlosen Render-Tarif. Nach einer Pause kann das Laden etwa eine Minute dauern."
    },
    liveDemo: 'Im neuen Tab öffnen',
    inlineDemo: 'Demo hier testen',
    projectLink: 'Projekt auf GitHub ansehen',
    projectTitles: {
        yoganow: 'YogaNow Studio',
        uno: 'UNO-Kartenspiel',
        kaffeehaus: 'Kaffeehaus Mokka',
        hotelverwaltung: 'Hotelverwaltung',
        feta: 'Feta',
        geschenkeverwaltung: 'Geschenkeverwaltung',
        todo: 'To-do-App',
        shopplatzi: 'ShopPlatzi',
        'uno-web': 'CAMPUS02 ColorSpiel'
        },
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schließen',
    backToTop: 'Nach oben',

    galleryCaptions: {
    // Hotelverwaltung
    hotelOverview: 'Konsolenausgabe · Zimmerübersicht mit Kategorie, Preis und Verfügbarkeit',
    hotelPrices: 'Zimmer nach Preis',
    hotelBooking: 'Erfolgreiche Buchung',
    hotelModel: 'Datenmodell: Gäste, Zimmer, Buchungen und Zusatzleistungen',
    hotelProcess: 'Buchungsablauf: prüfen, speichern und Änderungen gemeinsam übernehmen',
    hotelArchitecture: 'Architektur: Modelle, Datenzugriff, Abfragen und Services',
    hotelUml: 'Vollständiges UML-Klassendiagramm mit Attributen, Methoden und Beziehungen',

    // YogaNow Studio
    yogaHome: 'Startseite: Bibliothek und Kursplattform',
    yogaLibrary: 'Yoga Library: Video zum Mitmachen',
    yogaBooking: 'Kursdetails und Buchung',
    yogaVideo: 'Videodemo: Vom Kurskalender zur bestätigten Buchung',

    // Feta
    fetaHome: 'Startseite · Lokale Vorschau',
    fetaCatalog: 'Produktkatalog · Zutatenliste geschlossen',
    fetaIngredients: 'Produktkatalog mit aufgeklappter Zutatenliste',
    fetaMobile: 'Produktkatalog · Mobile Ansicht',
    fetaContact: 'Kontaktformular · Vorschau',

    // Geschenkeverwaltung
    giftsOverview: 'Vorschau nach XAML · Wunschzettel und Geschenkdetails',
    giftsMenu: 'Vorschau nach XAML · Startfenster mit geöffneter Menüleiste',
    giftsCalculator: 'Vorschau nach XAML · Geschenke-Rechner mit Notenskala',

    // To-do-App
    todoHome: 'Startseite mit Aufgabenliste und zwei Shop-Demos',
    todoTasks: 'Aufgabenliste mit offenen und erledigten Beispielaufgaben',
    todoDemo: 'Live-Demo',

    // ShopPlatzi
    shopOverview: 'Produktübersicht mit Suche, Kategorien und Favoriten',
    shopDemo: 'Live-Demo',

    // UNO Java
    unoStart: 'Spielstart mit Bestenliste und Spielreihenfolge',
    unoCards: 'Karten auf der Hand und Farbwahl',
    unoWinner: 'Glückwunsch zum Rundensieg und aktueller Punktestand',
    unoVideo: 'Videodemo des UNO-Konsolenspiels',

    // CAMPUS02 ColorSpiel
    unoWebStart: 'Spielstart im Holzdesign',
    unoWebWinter: 'Spieltisch im Wintermodus',
    unoWebColor: 'Neue Spielfarbe wählen',
    unoWebRound: 'Rundensieg mit Punktestand',
    unoWebWinner: 'Partiesieg ab 500 Punkten',
    unoWebDemo: 'Render Free · Nach einer Pause kann das Laden etwa eine Minute dauern.',

    // Kaffeehaus Mokka
    coffeeHome: 'Startseite',
    coffeeMenu: 'Speisekarte',
    coffeeGallery: 'Bildergalerie'
    },
    portfolioName: "Ekaterina Schedlberger",
    homePageTitle: "Ekaterina Schedlberger {separator} Softwareentwicklerin in Graz",
    galleryControls: {
      open: "Projektgalerie öffnen",
      close: "Schließen",
      prev: "Vorheriges Bild",
      next: "Nächstes Bild",
      full: "Bild in voller Größe"
    },
    yogaDemo: {
      action: "Buchungsdemo ansehen",
      access: "Die Yoga Library ist ohne Anmeldung zugänglich. Zum selbstständigen Testen der Kursplattform ist ein Konto erforderlich."
    },
    educationPage: {
      reset: "Zurücksetzen",
      sortLabel: "Sortieren",
      newest: "Neueste zuerst",
      oldest: "Älteste zuerst",
      filter: "Nach Bereich filtern",
      categories: {
        all: "Alle",
        degree: "Schule, Studium & Abschlüsse",
        it: "IT-Weiterbildungen",
        language: "Sprachen",
        hospitality: "Hotellerie"
      },
      title: "Ausbildung",
      label: "Mein Bildungsweg",
      intro: "Die Welt ist voller spannender Themen – und Lernen hört für mich nie auf. Mein Bildungsweg führte mich von Wirtschaft und Sprachen zur Softwareentwicklung. Heute sehe ich, was all diese Etappen verbindet: meine Neugier, die Freude am Lernen und der Wunsch, Zusammenhänge zu verstehen.",
      completed: "Erfolgreich abgeschlossen im Oktober 2026",
      focus: "Schwerpunkte",
      topics: "Objektorientierte Programmierung, Algorithmen, Datenbanken, Softwarearchitektur, REST-APIs und Softwarequalitätssicherung.",
      practice: "Berufspraxis bei JAWA Management Software GmbH",
      project: "Mitarbeit an Kundenprojekten und an inforum, der modularen Management-Plattform für die produzierende Industrie; Fehleranalyse mit PHP und Xdebug, Arbeit mit SQL und Jira Service Management.",
      institution: "Einrichtung",
      location: "Ort",
      recognition: "Anerkennung",
      institutionNotes: {
        campus: "Akademischer Hochschullehrgang Software Engineering",
        glo: "Online-Schule für Programmierung und Webentwicklung",
        wifi: "Institut für berufliche Aus- und Weiterbildung der Wirtschaftskammer Steiermark",
        graz: ""
      },
      places: [
        "Graz, Österreich",
        "Online",
        "Irkutsk, Russland",
        "Bratsk, Russland"
      ],
      entries: {
        softwareEngineering: {
          title: "Akademisch geprüfte Softwareentwicklerin",
          institution: "FH CAMPUS 02 – Fachhochschule der Wirtschaft"
        },
        vue: {
          title: "Vue.js – Grundlagen und erstes Projekt",
          institution: "Glo Academy"
        },
        javascript: {
          title: "JavaScript",
          institution: "Glo Academy"
        },
        webDevelopment: {
          title: "Web Developerin",
          institution: "WIFI Steiermark",
          period: "14.11.2022 – 27.03.2023"
        },
        reception: {
          title: "Geprüfte Rezeptionistin",
          institution: "WIFI Steiermark",
          period: "11.10.2019 – 13.12.2019"
        },
        englishB1: {
          title: "Englisch B1",
          institution: "Internationales Sprachzentrum an der Universität Graz"
        },
        englishA2B1: {
          title: "Englisch A2 und B1",
          institution: "Internationales Sprachzentrum an der Universität Graz"
        },
        transculturalCommunication: {
          title: "Bachelor of Arts (BA) – Transkulturelle Kommunikation, Deutsch, Italienisch und Russisch",
          institution: "Karl-Franzens-Universität Graz"
        },
        germanC1: {
          title: "Deutsch C1",
          institution: "Vorstudienlehrgang der Grazer Universitäten und Hochschulen"
        },
        economics: {
          title: "Ökonom – Manager",
          institution: "Baikal Universität für Ökonomie und Recht",
          recognition: "ENIC NARIC Austria",
          recognitionNote: ""
        },
        banking: {
          title: "Bankwesen",
          institution: "Kolleg der Baikal Universität für Ökonomie und Recht",
          recognition: "BMWfi – Anerkennung als Bankkauffrau (österreichischer Lehrberuf)"
        },
        school: {
          title: "Allgemeinbildende Schulbildung",
          institution: "Schule Nr. 3"
        }
      }
    },
    experiencePage: {
      sortLabel: "Sortieren",
      techStack: "Technologien",
      newest: "Neueste zuerst",
      oldest: "Älteste zuerst",
      filter: "Nach Bereich filtern",
      categories: {
        all: "Alle",
        it: "Softwareentwicklung",
        finance: "Wertpapier",
        hospitality: "Hotellerie",
        interpreting: "Dolmetschen",
        break: "Karenz & Neuorientierung"
      },
      title: "Berufserfahrung",
      label: "Mein Berufsweg",
      intro: "Mein Weg in die Softwareentwicklung begann lange vor dem ersten Code. Das Finanzwesen lehrte mich Genauigkeit, die Hotellerie Aufmerksamkeit für Menschen, und durch die Sprachmittlung lernte ich, Verständigung zwischen Menschen zu schaffen. Heute verbinde ich diese Erfahrungen, um durchdachte Softwarelösungen zu entwickeln.",
      place: "Ort",
      field: "Bereich",
      position: "Position",
      places: [
        "Graz, Österreich",
        "Moskau, Russland",
        "Novosibirsk, Russland",
        "Irkutsk, Russland"
      ],
      fields: [
        "Wertpapier",
        "Allgemeinmedizinische Erst- und Grundversorgung",
        "Hotellerie und Tourismus",
        "Softwareentwicklung und Managementplattformen für die produzierende Industrie"
      ],
      entries: {
        "2002-09": {
          role: "Mitarbeiterin in der Registrierungsabteilung",
          tasks: [
            "Kundenbetreuung",
            "Dokumentation"
          ]
        },
        "2004-05": {
          role: "Mitarbeiterin im Backoffice",
          tasks: [
            "Kundenbetreuung",
            "Abwicklung von Wertpapiergeschäften",
            "Mitwirkung an Finanzreports"
          ]
        },
        "2007-03": {
          role: "Leiterin des Backoffice",
          tasks: [
            "Kundenbetreuung",
            "Abwicklung von Wertpapiergeschäften",
            "Verbuchung von Wertpapieren"
          ]
        },
        "2008-10": {
          role: "Berufliche Neuorientierung"
        },
        "2009-02": {
          role: "Internes Controlling von Wertpapiergeschäften",
          tasks: [
            "Allgemeine Abwicklungstätigkeiten",
            "Übertragung von Wertpapieren",
            "Überwachung des Finanzmittelbestands",
            "Kundenbetreuung"
          ]
        },
        "2012-07": {
          role: "Karenzzeit"
        },
        "2014-04": {
          role: "Ehrenamtliche Dolmetscherin für Russisch"
        },
        "2015-12": {
          role: "Karenzzeit"
        },
        "2020-08": {
          role: "Rezeptionistin"
        },
        "2025-09": {
          role: "Softwareentwicklung",
          tasks: [
            "Mitarbeit an Kundenprojekten und an der modularen Plattform INFORUM",
            "Fehleranalyse und PHP-Debugging mit Xdebug",
            "Arbeit mit SQL und Jira Service Management"
          ],
          institutionNote: ""
        }
      }
    }
}
