// Deutsche Texte für die Oberfläche und Pixel sowie die 350 deutschen Arbeitgeberfragen.
import { pixelFacts, jawaExperienceMonths, formatKnowledgeMonth } from '../pixel/facts'

const jawaStart = formatKnowledgeMonth(pixelFacts.jawa.start, 'de')
const jawaEnd = formatKnowledgeMonth(pixelFacts.jawa.end, 'de')
const softwareEngineeringCompletion = formatKnowledgeMonth(pixelFacts.softwareEngineering.completed, 'de')

// Vom Nutzer bestätigte Berufserfahrung. Die Dauer stammt aus den gemeinsamen Fakten.
// Gemeinsame Projektantwort für Pixel und die zugehörigen FAQ.
const portfolioAssistantReply = "Der KI-Assistent gehört zu Ekaterinas Portfolio-Website, die sie mit Unterstützung von KI entwickelt und schrittweise erweitert. Die Website nutzt Vue 3, TypeScript, Vue I18n und Vite und stellt ihre Projekte, Ausbildung und Berufserfahrung auf Deutsch, Englisch und Russisch vor. Der Assistent verbindet vorbereitete FAQ-Antworten mit einer optionalen KI-Funktion über Cloudflare Pages Functions und Workers AI. Zum Kontaktformular gehören die Spam-Prüfung mit Turnstile und der E-Mail-Versand über Resend."

const jawaVueExperience = `Ekaterina hat ${jawaExperienceMonths} Monate bei JAWA Management Software GmbH mit Vue gearbeitet.`

export default {
  latestProjects: 'Zuletzt gebaut',
  allProjectsLink: 'Alle Projekte',
  legal: {
    imprint: "Impressum / Offenlegung",
    privacy: "Datenschutzerklärung",
    navigation: "Rechtliche Informationen",
    owner: "Medieninhaberin",
    controller: "Datenschutzrechtlich Verantwortliche",
    austria: "Österreich",
    emailPlaceholder: "[Öffentliche Kontakt-E-Mail vor Veröffentlichung ergänzen]",
    purpose: "Persönliches, nichtkommerzielles Portfolio zur Präsentation meiner Ausbildung, Berufserfahrung und Projekte für Bewerbungen.",
    privacyIntro: "Dieses Portfolio ist ein persönliches Lernprojekt, das ich laufend weiterentwickle. Wenn Ihnen etwas an dieser Datenschutzerklärung unklar ist oder Ihnen ein Fehler auffällt, schreiben Sie mir gern.",
    hostingTitle: "Hosting und Sicherheit",
    hosting: "Ich nutze Cloudflare Pages (Cloudflare, Inc., USA) für das sichere Hosting. Cloudflare verarbeitet dafür technische Zugriffsdaten wie Ihre IP-Adresse und die aufgerufene Seite (Art. 6 Abs. 1 lit. f DSGVO). Für erfasste US-Übermittlungen gilt der Angemessenheitsbeschluss zum EU-US Data Privacy Framework. Für andere Übermittlungen ohne Angemessenheitsbeschluss sieht der verlinkte Vertrag EU-Standardvertragsklauseln vor.",
    analytics: "Ich nutze Cloudflare Web Analytics, um Seitenaufrufe und Ladezeiten auszuwerten und die Website zu verbessern. Laut Cloudflare setzt das Messskript keine Cookies und greift nicht auf den lokalen Browserspeicher zu.",
    storageTitle: "Sprache und Darstellung",
    storage: "Wenn Sie Sprache oder Hell-/Dunkelmodus wählen, speichert der Browser diese Einstellung lokal (portfolio-language, portfolio-theme), um Ihre Auswahl beim nächsten Besuch wiederherzustellen. Die Werte werden dafür nicht an den Server gesendet und bleiben bis zur Änderung oder Löschung der Websitedaten gespeichert. Die Speicherung dient der ausdrücklich gewählten Darstellung (§ 165 Abs. 3 TKG 2021).",
    demosTitle: "Externe Projekt-Demos",
    demos: "Externe Demos werden erst geladen, wenn Sie sie öffnen und zuvor „Externe Demos erlauben“ gewählt haben (Art. 6 Abs. 1 lit. a DSGVO und § 165 Abs. 3 TKG 2021). Die Anbieter, etwa GitHub Pages und Render (USA), erhalten Ihre IP-Adresse und technische Browserdaten. Demos können Daten im Browser speichern oder auslesen. Ihre Wahl wird bis zur Änderung oder Löschung der Websitedaten im Browser gespeichert. Unter „Demo-Einstellungen“ im Footer können Sie Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Beim Schließen einer Demo wird deren Einbettung entfernt. Für bereits übermittelte Daten und deren Speicherdauer gelten die Hinweise der jeweiligen Anbieter. Externe Links öffnen die Zielseite direkt.",
    shopData: "ShopPlatzi ruft Produkt- und Kategoriedaten von api.escuelajs.co und Produktbilder von den dort angegebenen Bildservern ab. Bei diesen Abrufen erhalten die jeweiligen Server Ihre IP-Adresse und technische Browserdaten.",
    demoNotice: "Beim Öffnen eingebetteter Demos erhalten {hosts} Ihre IP-Adresse und technische Browserdaten. Die Demos können Daten im Browser speichern oder auslesen. Ihre Wahl gilt für alle eingebetteten Demos und lässt sich jederzeit im Footer ändern.",
    demoDetails: "Einige Demos nutzen weitere Dienste. Details unter",
    demoSettings: "Demo-Einstellungen",
    allowDemos: "Externe Demos erlauben",
    denyDemos: "Nicht erlauben",
    demoInactive: "Externe Demos sind deaktiviert.",
    contactTitle: "Kontaktaufnahme",
    contact: "Wenn Sie mir schreiben, verarbeite ich Ihre Absenderadresse und Nachricht, um Ihre Anfrage zu bearbeiten. Mein berechtigtes Interesse besteht in der Beantwortung Ihrer Nachricht (Art. 6 Abs. 1 lit. f DSGVO). Mein E-Mail-Anbieter verarbeitet die Korrespondenz für die Zustellung und Speicherung. Ich bewahre sie bis zur Erledigung der Anfrage und darüber hinaus nur bei gesetzlichen Pflichten oder zur Rechtsverteidigung auf. Ihre Angaben sind freiwillig. Für eine Antwort benötige ich eine Rücksendeadresse.",
    form: "Beim Öffnen des Kontaktformulars prüft Cloudflare Turnstile (USA) anhand von IP-Adresse und Browser- bzw. Gerätesignalen, ob ein automatisierter Zugriff vorliegt. Die Prüfung schützt das Formular vor Missbrauch (Art. 6 Abs. 1 lit. f DSGVO). Beim Absenden übermittelt die Website E-Mail-Adresse und Nachricht über Resend (USA) an mein Postfach. Die entsprechenden Auftragsverarbeitungsverträge enthalten Garantien für Übermittlungen außerhalb des EWR, darunter EU-Standardvertragsklauseln, soweit einschlägig. Kopien finden Sie in den Verträgen. Bei den Anbietern richtet sich die Speicherdauer nach der Bereitstellung des Dienstes und den jeweiligen Löschfristen.",
    objectionTitle: "Widerspruchsrecht",
    objection: "Sie können der Verarbeitung Ihrer personenbezogenen Daten auf Grundlage berechtigter Interessen jederzeit widersprechen, wenn sich dafür Gründe aus Ihrer besonderen Situation ergeben. Das betrifft hier insbesondere Hosting, Sicherheit und die Bearbeitung von Kontaktanfragen.",
    rightsTitle: "Ihre Rechte",
    rights: "Sie haben nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung und Datenübertragbarkeit. Eine Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren, etwa bei der",
    authority: "österreichischen Datenschutzbehörde",
  },
    assistant: {
        aiPrivacy: "In der Testversion verarbeitet Cloudflare Workers AI (Cloudflare, Inc., USA) Ihre Frage zum Portfolio, um eine Antwort zu erzeugen. Bitte geben Sie keine persönlichen Daten ein.",
        open: 'Lieber persönlich Kontakt aufnehmen?',
        aiNotice: "Testversion des KI-Assistenten. Fragen zum Portfolio können zur Beantwortung an Cloudflare Workers AI gesendet werden. Antworten können Fehler enthalten. Bitte geben Sie keine persönlichen Daten ein.",
        cvTitle: 'Lebenslauf',
        cvAnswer: 'Hier finden Sie Ekaterinas Lebenslauf als PDF.',
        projectDetailsLink: 'Projekt im Portfolio ansehen',
        projectDemoLink: 'Live-Demo öffnen',
        followUp: {
            jawaInterest: 'Ekaterina schreibt, dass es sie bei JAWA motiviert hat, den Ursachen von Fehlern im Code auf den Grund zu gehen. Was ihr an der Arbeit insgesamt gefallen hat, beschreibt sie im Portfolio nicht näher.',
            jawaTechnology: jawaVueExperience + " " + 'Bei JAWA arbeitete Ekaterina mit PHP, Xdebug, SQL und Jira Service Management. Mit Xdebug ging sie Fehlern im PHP-Code auf den Grund.',
            jawaDuration: `Ekaterina arbeitete von ${jawaStart} bis ${jawaEnd} bei JAWA in Graz.`,
            jawaTasks: jawaVueExperience + " " + 'Ekaterina wirkte bei JAWA an Kundenprojekten und an der Managementplattform INFORUM mit. Zu ihren Aufgaben gehörten die Fehleranalyse und die Fehlersuche im PHP-Code.',
            projectTechnology: 'Für dieses Projekt kamen folgende Technologien zum Einsatz: {stack}.',
            interestUnknown: 'Dazu finde ich im Portfolio keine Aussage darüber, was Ekaterina gefallen hat.',
            detailUnknown: 'Zu dieser Anschlussfrage finde ich im Portfolio keine genauere Angabe. Fragen Sie mich gern nach einem konkreten Detail.',
        },
        contactForm: {
            verificationError: 'Die Sicherheitsprüfung konnte nicht geladen werden. Bitte versuchen Sie es erneut.',
            open: 'Ekaterina eine Nachricht hinterlassen',
            invitation: 'Möchten Sie Ekaterina eine Nachricht hinterlassen? Ihre E-Mail-Adresse wird für eine Rückantwort mitgesendet.',
            email: 'Ihre E-Mail-Adresse',
            message: 'Ihre Nachricht',
            send: 'Nachricht senden',
            sending: 'Wird gesendet …',
            sent: 'Vielen Dank! Pixel hat Ihre Nachricht zum Versand angenommen.',
            error: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
            unavailable: 'Der Nachrichtenversand ist gerade nicht verfügbar.',
        },
        suggestionLabel: 'Beispielfragen',
        suggestions: {
            projects: 'Welche Projekte hat Ekaterina entwickelt?',
            teamwork: 'Wie wichtig ist Teamarbeit für Ekaterina?',
            workplace: 'Welches Arbeitsmodell passt für Ekaterina?',
        },
        detailsLink: 'Vollständige Informationen ansehen',
        personalReplies: {
            softwareExperience: {
  "title": "Praktische Erfahrung in der Softwareentwicklung",
  "answer": jawaVueExperience + " " + `Ekaterina begann ihren Weg in die Softwareentwicklung mit einer Weiterbildung zur Web Developerin am WIFI Steiermark. Als Diplomprojekt entwickelte sie für einen Lutscherhersteller die Website Feta mit einem eigenen responsiven WordPress-Theme, Produktkatalog und Kontaktformular. Anschließend vertiefte sie ihre Kenntnisse in der Softwareentwicklung an der FH CAMPUS 02 und sammelte von ${jawaStart} bis ${jawaEnd} bei JAWA Management Software praktische Erfahrung mit PHP, SQL, Xdebug und der Analyse bestehender Anwendungen. Darüber hinaus setzte sie verschiedene Ausbildungs- und Praxisprojekte um, unter anderem mit Java, Vue, C# und Swift.`
},
            personality: {
                title: "Persönlichkeit und Arbeitsweise",
                answer: "Ekaterina ist offen und kontaktfreudig. Bei der Arbeit setzt sie sich gern klare Ziele und erledigt ihre Aufgaben sorgfältig und termingerecht. Sie schätzt den Austausch mit Menschen, die positiv an Dinge herangehen und eigene Ziele verfolgen.",
            },
        juniorProfile: {
              title: 'Junior Softwareentwicklerin',
              answer: `Ekaterina ist eine Softwareentwicklerin am Anfang ihrer beruflichen Entwicklerlaufbahn. Sie hat im ${softwareEngineeringCompletion} ihre akademische Ausbildung an der FH CAMPUS 02 abgeschlossen und zuvor bereits eine Weiterbildung zur Web Developerin am WIFI Steiermark absolviert. Zusätzlich sammelte sie ${jawaExperienceMonths} Monate praktische Erfahrung bei JAWA Management Software. Jetzt möchte sie regelmäßig programmieren, ihre Kenntnisse vertiefen und zunehmend selbstständig Entwicklungsaufgaben übernehmen.`
        },
            languages: {
               title: 'Sprachkenntnisse',
               answer: 'Ekaterina verfügt über Kenntnisse in Russisch (ihre Muttersprache), Deutsch, Englisch und Italienisch. Sie hat Deutsch bis zum Niveau C1 gelernt und Englischkurse auf den Niveaus A2 und B1 besucht. Deutsch, Italienisch und Russisch waren Teil ihres Studiums der Transkulturellen Kommunikation an der Universität Graz. Außerdem hat sie ehrenamtlich ins Russische gedolmetscht.'
            },
            teamwork: {
                title: "Zusammenarbeit im Team",
                answer: "Ekaterina arbeitet gerne mit anderen zusammen. Sie tauscht Ideen aus, hilft bei Problemen und freut sich, wenn man gemeinsam Lösungen findet. Ein freundliches und unterstützendes Team ist ihr wichtig.",
            },
            growth: {
                title: "Was Ekaterina weiterentwickelt",
                answer: "Ekaterina möchte ihre Programmierkenntnisse vertiefen. Sie weiß, dass vieles erst mit der Praxis verständlich wird, und arbeitet aktiv daran. Sie lernt täglich, hört sich Online-Vorlesungen an und probiert Neues in eigenen Projekten aus.",
            },
            hours: {
                title: "Gewünschte Wochenstunden",
                answer: `Ekaterina sucht eine Stelle mit ${pixelFacts.hoursPerWeek.min} bis ${pixelFacts.hoursPerWeek.max} Stunden pro Woche.`,
            },
            workplace: {
                title: "Arbeitsort und Arbeitsmodell",
                answer: "Für Ekaterina kommen Büroarbeit, hybrides Arbeiten und Remote-Arbeit infrage. Was am besten passt, hängt vom Arbeitsort ab. Bei einer Stelle in Wien könnte sie zum Beispiel an zwei Tagen pro Woche vor Ort und an den übrigen Arbeitstagen remote arbeiten.",
            },
            authorization: {
                title: "Arbeitsberechtigung",
                answer: "Ekaterina hat bestätigt, dass sie in Österreich und anderen EU-Mitgliedstaaten arbeiten darf.",
            },
            interests: {
                title: "Sport und Freizeit",
                answer: "Ekaterina ist schon mehrmals einen Halbmarathon gelaufen. Sie trainiert Pole Sport, tanzt gern Hip-Hop und liebt es, zu reisen und dabei Neues kennenzulernen.",
            },
        },
        name: "KI-Assistent",
        title: 'KI-Assistent',
        status: "Testversion",
        statusNote: "Bitte wichtige Angaben prüfen.",
        greeting: "Dieser KI-Assistent beantwortet Fragen zu Ekaterinas Projekten, Ausbildung und Berufserfahrung und hilft, passende Informationen auf der Website zu finden.",
        questionLabel: 'Ihre Frage',
        send: 'Senden',
        whichProject: "Welches Projekt meinen Sie? Nennen Sie mir gern den Projektnamen.",
        fallbackAnswer: 'Dazu habe ich gerade keine genaue Antwort. Vielleicht finden Sie die gesuchte Information in einem dieser Bereiche des Portfolios.',
        profileAnswer: 'Ekaterina Schedlberger ist Softwareentwicklerin in Graz. In ihrem Portfolio stellt sie ihre Ausbildung, ihre Berufserfahrung und ihre Projekte vor – von der To-do-App bis zur Hotelverwaltung. Wenn Sie sich selbst ein Bild machen möchten, können Sie hier UNO spielen und ihre Projektdemos ausprobieren. Ekaterina setzt sich gern klare Ziele und arbeitet sorgfältig und termingerecht. Sie freut sich über passende Stellenangebote in der Softwareentwicklung.',
        educationAnswer: `Ekaterina hat im ${softwareEngineeringCompletion} den Hochschullehrgang Software Engineering an der FH CAMPUS 02 abgeschlossen. Davor studierte sie Transkulturelle Kommunikation an der Universität Graz und schloss in Irkutsk ein Studium in Wirtschaft und Management ab.`,
        learningAnswer: 'Im Hochschullehrgang Software Engineering an der FH CAMPUS 02 lernte Ekaterina unter anderem objektorientierte Programmierung, Datenbanken, Softwarearchitektur und Qualitätssicherung. Am WIFI Steiermark lernte sie Webentwicklung und baute für ihr Diplomprojekt eine WordPress-Website.',
        salaryAnswer: 'Im Portfolio steht keine bestätigte Gehaltsvorstellung. Bitte besprechen Sie das Gehalt direkt mit Ekaterina.',
        contactAnswer: 'Ekaterinas GitHub-Profil finden Sie im Kontaktbereich des Portfolios.',
        replyTitles: {
            projects: 'Projekte',
            technologies: 'Technologien',
            contact: 'Kontakt',
            ai: 'KI in der Softwareentwicklung',
        },
        overview: {
            experience: "Ekaterinas Weg führte vom Wertpapierbereich über die Hotellerie und das Dolmetschen in die Softwareentwicklung. Heute bringt sie diese Erfahrungen in ihre Arbeit ein. In der Rubrik Berufserfahrung finden Sie die einzelnen Stationen.",
            projects: "Ekaterinas Projekte reichen von der Yoga-App YogaNow Studio über eine Aufgabenliste und eine Shop-Demo bis zur Hotel- und Geschenkeverwaltung. Sie finden dort auch die Websites für Feta und das Kaffeehaus Mokka sowie zwei Varianten von UNO. Probieren Sie gern eine der verfügbaren Demos aus." + " Dazu gehört auch ihre eigene mehrsprachige Portfolio-Website mit integriertem KI-Assistenten.",
            technologies: jawaVueExperience + " " + 'Ekaterina hat mit Vue und TypeScript Webanwendungen umgesetzt, mit Java eine Hotelverwaltung gebaut und bei JAWA mit PHP und SQL an bestehender Software gearbeitet.',
            contact: "Wenn Sie mit Ekaterina in Kontakt treten möchten, finden Sie ihr GitHub-Profil im Kontaktbereich des Portfolios. Sie freut sich über interessante Projekte und passende Stellenangebote in der Softwareentwicklung.",
            python: "Ekaterina möchte selbst ausprobieren, wie Modelle aus Daten lernen und woran sich verlässliche Ergebnisse erkennen lassen. Ihr Einstieg ist ein Python-Kurs in Hagen, der für Ende November 2026 geplant ist.",
            ai: "Ekaterina nutzt KI, um beim Entwickeln mehr Ideen auszuprobieren und Fehler gezielter einzugrenzen. Sie prüft die Vorschläge am Code und entscheidet selbst, welchen Ansatz sie weiterverfolgt.",
        },
        projectReplies: {
            portfolio: portfolioAssistantReply,
            yoganow: "YogaNow Studio verbindet eine frei zugängliche Yoga-Bibliothek mit der Buchung von Studiokursen. Im Team hat Ekaterina das Design, die Datenbankanbindung mit Supabase und die Kursbuchungsplattform übernommen. Die Galerie zeigt Ihnen, wie die Buchung abläuft.",
            todo: "In Ekaterinas To-do-App können Sie Aufgaben hinzufügen, abhaken und löschen. Pinia speichert die Aufgaben im Browser. Probieren Sie die Demo gern mit ein paar eigenen Aufgaben aus.",
            shopplatzi: "In der Shop-Demo können Sie Produkte suchen, nach Kategorien filtern, Favoriten markieren und Artikel in den Warenkorb legen. Die Produktdaten kommen aus der Platzi Fake Store API.",
            hotelverwaltung: "Ekaterina hat für ihre Prüfung eine Konsolenanwendung gebaut, mit der sich Gäste, Zimmer, Buchungen und Zusatzleistungen verwalten lassen. In der Galerie können Sie eine Beispielbuchung, das Datenmodell und die Architektur ansehen.",
            uno: "Ekaterina hat im Team ein UNO-Spiel für die Java-Konsole entwickelt. Es prüft Spielzüge, unterstützt Aktionskarten und speichert Punktestände in SQLite. In der Galerie finden Sie eine Videodemo des Spiels.",
            "uno-web": "CAMPUS02 ColorSpiel ist ein Kartenspiel für vier Personen an einem Bildschirm. Für ihre Weiterentwicklung hat Ekaterina ein eigenes Backend mit Node.js und Express gebaut und eigene Karten sowie einen Wintermodus ergänzt. Sie können die Demo spielen. Nach einer Pause kann das Laden etwa eine Minute dauern.",
            kaffeehaus: "Für das Kaffeehaus Mokka hat Ekaterina im Rahmen eines Übungsprojekts eine Website mit Speisekarte, Galerie und Kontaktformular gebaut. Die Galerie im Portfolio zeigt Ihnen, wie die Seiten aufgebaut sind.",
            feta: "Feta war Ekaterinas erstes Webprojekt und zugleich ihr Diplomprojekt am WIFI. Für einen Lutscherhersteller entwickelte sie ein eigenes WordPress-Theme mit Produktkatalog, aufklappbaren Zutatenlisten und Kontaktformular. Die Galerie zeigt Ihnen eine lokale Vorschau.",
            geschenkeverwaltung: "Mit der Windows-App können Sie Geschenke anlegen, bearbeiten, kopieren und filtern. Ekaterina zeigt am Löschen eines Eintrags, wie Oberfläche, ViewModel und Datenzugriff zusammenspielen. Die Galerie gibt Ihnen einen Eindruck von der Anwendung.",
        },
        educationReplies: {
            softwareEngineering: `Ekaterina hat den Hochschullehrgang Software Engineering an der FH CAMPUS 02 im ${softwareEngineeringCompletion} abgeschlossen. Zu den Schwerpunkten gehörten Programmierung, Datenbanken, Softwarearchitektur und Qualitätssicherung.`,
            vue: "Bei Glo Academy hat Ekaterina die Grundlagen von Vue.js gelernt und ein erstes Projekt damit umgesetzt. Wenn Sie Vue im Einsatz sehen möchten, können Sie sich ihre To-do-App ansehen.",
            javascript: "Ekaterina hat sich bei Glo Academy in JavaScript weitergebildet. Im Portfolio sehen Sie JavaScript zum Beispiel auf der Website für das Kaffeehaus Mokka und im webbasierten Kartenspiel.",
            webDevelopment: "Ekaterina hat am WIFI Steiermark eine Weiterbildung in Webentwicklung absolviert. Ihr Diplomprojekt war Feta, eine WordPress-Website für einen Lutscherhersteller. Einen Einblick bekommen Sie in der Projektgalerie.",
            reception: "Ekaterina hat am WIFI Steiermark die Ausbildung zur geprüften Rezeptionistin abgeschlossen. Später arbeitete sie vier Jahre lang an der Rezeption des Boutiquehotels Dom in Graz.",
            englishB1: "Ekaterina besuchte einen Englischkurs auf dem Niveau B1 am Internationalen Sprachzentrum der Universität Graz.",
            englishA2B1: "Ekaterina besuchte am Internationalen Sprachzentrum der Universität Graz Englischkurse auf den Niveaus A2 und B1.",
            transculturalCommunication: "Ekaterina hat an der Universität Graz einen Bachelor in Transkultureller Kommunikation abgeschlossen. Ihre Sprachen im Studium waren Deutsch, Italienisch und Russisch.",
            germanC1: "Ekaterina hat ihre Deutschkenntnisse im Vorstudienlehrgang der Grazer Universitäten und Hochschulen bis zum Niveau C1 ausgebaut.",
            economics: "Ekaterina hat an der Baikal Universität für Ökonomie und Recht in Irkutsk Wirtschaft und Management studiert. Im Ausbildungsbereich finden Sie auch Angaben zur Anerkennung ihres Abschlusses in Österreich.",
            banking: "Ekaterina hat am Kolleg der Baikal Universität für Ökonomie und Recht Bankwesen studiert. Ihre Qualifikation wurde in Österreich als Lehrabschluss im Beruf Bankkauffrau anerkannt.",
            school: "Ekaterina besuchte die allgemeinbildende Schule Nr. 3 in Bratsk. Mehr zu ihrem weiteren Bildungsweg finden Sie im Bereich Ausbildung.",
        },
        experienceReplies: {
            "2002-09": "Ekaterina arbeitete bei Stock Manadzer AG in der Registrierungsabteilung. Dort betreute sie Kunden und kümmerte sich um die Dokumentation.",
            "2004-05": "Im Backoffice der Investmentfirma Edinstvo AG betreute Ekaterina Kunden, wickelte Wertpapiergeschäfte ab und wirkte an Finanzberichten mit.",
            "2007-03": "Bei Alfa Broker Kapital leitete Ekaterina das Backoffice. Zu ihrer Arbeit gehörten die Kundenbetreuung, die Abwicklung von Wertpapiergeschäften und die Verbuchung von Wertpapieren.",
            "2008-10": "Von Oktober 2008 bis Januar 2009 nahm sich Ekaterina Zeit für eine berufliche Neuorientierung. Die anschließende Station war das interne Controlling bei Delta Kapital.",
            "2009-02": "Bei Delta Kapital arbeitete Ekaterina im internen Controlling von Wertpapiergeschäften. Sie begleitete Wertpapierübertragungen, überwachte Finanzmittelbestände und betreute Kunden.",
            "2012-07": "Von Juli 2012 bis Januar 2014 war Ekaterina in Karenz. Die beruflichen Stationen davor und danach finden Sie in der Übersicht zur Berufserfahrung.",
            "2014-04": "Ekaterina hat in der Caritas Marienambulanz ehrenamtlich für Russisch gedolmetscht, von April 2014 bis Oktober 2015.",
            "2015-12": "Von Dezember 2015 bis Januar 2020 war Ekaterina in Karenz. Anschließend arbeitete sie in der Hotellerie.",
            "2020-08": "Von August 2020 bis Juli 2024 arbeitete Ekaterina als Rezeptionistin im Boutiquehotel Dom in Graz.",
            "2025-09": jawaVueExperience + " " + `Von ${jawaStart} bis ${jawaEnd} arbeitete Ekaterina in der Softwareentwicklung bei der JAWA Management Software GmbH in Graz. Sie wirkte an Kundenprojekten und an der modularen Managementplattform INFORUM mit. Dabei analysierte sie Fehler und nutzte Xdebug zur Fehlersuche im PHP-Code. Außerdem arbeitete sie mit SQL und Jira Service Management.`,
        },
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
    educationMilestone: `Abgeschlossen im ${softwareEngineeringCompletion}`,
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
    portfolioDetails: {
    "open": "Projekt kennenlernen",
    "intro": "Die Website verbindet Projektgalerien, Live-Demos und Informationen zu Ausbildung und Berufserfahrung. Ein integrierter KI-Assistent hilft Besuchern, passende Antworten zu finden.",
    "interface": "Oberfläche, Projektfilter, Galerien und interaktive Funktionen.",
    "languages": "Deutsche, englische und russische Sprachversionen mit gemeinsamen Fakten und übersetzten Texten.",
    "ai": "Vorbereitete FAQ-Antworten und eine optionale KI-Funktion auf Basis der hinterlegten Portfolioinformationen.",
    "contact": "Spam-Prüfung für das Kontaktformular und Versand der Nachrichten per E-Mail.",
    "development": "Mit Unterstützung von KI entwickelt und schrittweise erweitert.",
    "exploreHint": "Stöbern Sie durch die Website, probieren Sie den Assistenten aus und machen Sie sich selbst ein Bild.",
    "explore": "Website erkunden"
},
    projectDescriptions: {
        portfolio: "Interaktive Portfolio-Website mit Projektgalerien, Live-Demos und Kontaktformular. Der KI-Assistent beantwortet Fragen zu Projekten, Ausbildung und Berufserfahrung auf Deutsch, Englisch und Russisch. Mit Unterstützung von KI entwickelt und schrittweise erweitert.",
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
        portfolio: "Portfolio & KI-Assistent",
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
    portfolioPixel: "KI-Assistent der Portfolio-Website",
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
      completed: `Erfolgreich abgeschlossen im ${softwareEngineeringCompletion}`,
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
            "Arbeit mit Vue",
            "Mitarbeit an Kundenprojekten und an der modularen Plattform INFORUM",
            "Fehleranalyse und PHP-Debugging mit Xdebug",
            "Arbeit mit SQL und Jira Service Management"
          ],
          institutionNote: ""
        }
      }
    }
}

export const employerFaq = [
  {
    "id": 1,
    "question": "Wer ist Ekaterina Schedlberger?",
    "answer": `Ekaterina ist Softwareentwicklerin aus Graz. Sie hat im ${softwareEngineeringCompletion} ihre akademische Ausbildung in Softwareentwicklung an der FH CAMPUS 02 abgeschlossen und bereits praktische Erfahrung bei JAWA Management Software gesammelt. In ihrem Portfolio zeigt sie Webanwendungen, mobile Apps und weitere Softwareprojekte.`
  },
  {
    "id": 2,
    "question": "Was macht Ekaterina beruflich?",
    "answer": "Ekaterina möchte in der Softwareentwicklung arbeiten und ihre Kenntnisse durch praktische Aufgaben weiter ausbauen. Sie interessiert sich besonders für die Entwicklung von Anwendungen, die technische Probleme lösen und für Menschen nützlich sind."
  },
  {
    "id": 3,
    "question": "Ist Ekaterina Junior Software Developer?",
    "answer": `Ja, Ekaterina befindet sich am Anfang ihrer beruflichen Laufbahn als Softwareentwicklerin. Sie bringt eine abgeschlossene Ausbildung und ${jawaExperienceMonths} Monate praktische Erfahrung bei JAWA mit. Gleichzeitig ist ihr bewusst, dass sie noch viel lernen und ihre Programmierpraxis weiter vertiefen möchte.`
  },
  {
    "id": 4,
    "question": "Wie ist Ekaterina zur Softwareentwicklung gekommen?",
    "answer": "Ekaterinas beruflicher Weg führte sie über den Finanzbereich, die Hotellerie und die Sprachen zur Softwareentwicklung. Ihren Einstieg in die Webentwicklung machte sie mit einer Weiterbildung am WIFI Steiermark. Danach vertiefte sie ihre Kenntnisse durch weitere Kurse, die Ausbildung an der FH CAMPUS 02 und praktische Arbeit bei JAWA."
  },
  {
    "id": 5,
    "question": "Warum hat Ekaterina die Branche gewechselt?",
    "answer": "Ekaterina interessiert sich dafür, wie Software funktioniert und wie sich Ideen in Anwendungen umsetzen lassen. Besonders motiviert sie, technische Zusammenhänge zu verstehen, Fehlerursachen zu finden und durch praktische Arbeit dazuzulernen."
  },
  {
    "id": 6,
    "question": "Hat Ekaterina bereits Berufserfahrung außerhalb der IT?",
    "answer": "Ja. Vor ihrer Tätigkeit in der Softwareentwicklung arbeitete sie unter anderem im Wertpapierbereich, in der Hotellerie und im Bereich der Sprachvermittlung. Sie bringt deshalb auch Erfahrung aus Berufen mit Kundenkontakt und organisatorischen Aufgaben mit."
  },
  {
    "id": 7,
    "question": "Was zeichnet ihren beruflichen Werdegang aus?",
    "answer": "Ekaterina hat sich beruflich mehrfach weiterentwickelt und dabei unterschiedliche Fachbereiche kennengelernt. Der Wechsel in die Softwareentwicklung zeigt ihre Bereitschaft, sich neues Wissen anzueignen und einen neuen beruflichen Weg konsequent zu verfolgen."
  },
  {
    "id": 8,
    "question": "Warum ist ihre bisherige Berufserfahrung für die IT relevant?",
    "answer": "Ihre früheren Tätigkeiten haben ihr Erfahrungen im Umgang mit Menschen, mit strukturierten Arbeitsabläufen und mit sorgfältiger Dokumentation vermittelt. In der Softwareentwicklung kann sie diese Perspektiven mit ihrem technischen Wissen verbinden."
  },
  {
    "id": 9,
    "question": "Hat Ekaterina bereits in einem Unternehmen Software entwickelt?",
    "answer": `Ja. Von ${jawaStart} bis ${jawaEnd} arbeitete sie bei JAWA Management Software GmbH in Graz. Dort war sie an Kundenprojekten und an der modularen Managementplattform INFORUM beteiligt.`
  },
  {
    "id": 10,
    "question": "Welche Stelle sucht Ekaterina?",
    "answer": "Ekaterina sucht eine passende Einstiegsposition in der Softwareentwicklung, beispielsweise als Junior Software Developer, Webentwicklerin oder Anwendungsentwicklerin. Sie ist auch offen für Aufgaben im Frontend, Backend oder in der Full-Stack-Entwicklung, sofern die Position zu ihren Kenntnissen und Entwicklungsmöglichkeiten passt."
  },
  {
    "id": 11,
    "question": "Wie würden Sie Ekaterina beschreiben?",
    "answer": "Ekaterina ist offen, kontaktfreudig und neugierig. Sie arbeitet gerne mit klaren Zielen, achtet auf Details und möchte Aufgaben zuverlässig abschließen. Besonders wichtig ist ihr, fachlich und persönlich weiterzulernen."
  },
  {
    "id": 12,
    "question": "Welche Stärken hat sie?",
    "answer": "Zu ihren dokumentierten Stärken gehören Sorgfalt, Lernbereitschaft und Interesse an technischen Zusammenhängen. Sie beschäftigt sich gerne mit Problemen, bei denen sie die Ursache verstehen und eine Lösung erarbeiten kann."
  },
  {
    "id": 13,
    "question": "Wie wichtig ist Teamarbeit für Ekaterina?",
    "answer": "Ekaterina arbeitet gerne mit anderen zusammen. Sie tauscht Ideen aus, hilft bei Problemen und freut sich, wenn man gemeinsam Lösungen findet. Ein freundliches und unterstützendes Team ist ihr wichtig."
  },
  {
    "id": 14,
    "question": "Arbeitet sie lieber allein oder im Team?",
    "answer": "Ekaterina schätzt die Zusammenarbeit mit anderen und möchte gleichzeitig selbstständiger im Programmieren werden. Ihr ist wichtig, Aufgaben eigenständig zu bearbeiten und bei Bedarf den Austausch mit dem Team zu suchen."
  },
  {
    "id": 15,
    "question": "Wie geht Ekaterina mit neuen Aufgaben um?",
    "answer": "Sie möchte zunächst verstehen, was die Aufgabe verlangt und welche Zusammenhänge wichtig sind. Anschließend beschäftigt sie sich mit möglichen Lösungen und versucht, das Gelernte praktisch umzusetzen."
  },
  {
    "id": 16,
    "question": "Wie geht sie mit Fehlern um?",
    "answer": "Die Fehlersuche ist ein Bereich, der Ekaterina besonders interessiert. Während ihrer Tätigkeit bei JAWA untersuchte sie Fehler im PHP-Code und nutzte unter anderem Xdebug. Dabei ging es darum, Probleme nachzuvollziehen und ihre Ursachen einzugrenzen."
  },
  {
    "id": 17,
    "question": "Was motiviert Ekaterina bei der Arbeit?",
    "answer": "Sie möchte verstehen, warum etwas funktioniert oder weshalb ein Fehler auftritt. Besonders gerne beschäftigt sie sich mit Aufgaben, bei denen sie durch Ausprobieren und Analysieren neue Erkenntnisse gewinnt."
  },
  {
    "id": 18,
    "question": "Ist Ekaterina lernbereit?",
    "answer": "Ja. Ihr Ausbildungsweg umfasst mehrere Weiterbildungen und eine abgeschlossene akademische Ausbildung in Softwareentwicklung. Auch danach beschäftigt sie sich weiter mit Programmierung und neuen Technologien."
  },
  {
    "id": 19,
    "question": "Wie geht sie mit Feedback um?",
    "answer": "Ekaterina möchte ihre Fähigkeiten gezielt verbessern und legt Wert darauf, aus der praktischen Arbeit zu lernen. Wie sie mit Feedback in einer konkreten Arbeitssituation umgeht, lässt sich aus dem Portfolio allerdings nicht im Detail beurteilen."
  },
  {
    "id": 20,
    "question": "Welche Arbeitsatmosphäre bevorzugt sie?",
    "answer": "Ekaterina ist eine offene Kommunikation, gegenseitige Unterstützung und ein gutes Miteinander wichtig. Sie schätzt es, wenn Kolleginnen und Kollegen ihr Wissen teilen und gemeinsam an Lösungen arbeiten."
  },
  {
    "id": 21,
    "question": "Ist Ekaterina selbstständig?",
    "answer": "Sie möchte ihre Aufgaben zunehmend selbstständig lösen und gezielt ihre Fähigkeit stärken, Code ohne ständige Hilfestellung zu schreiben. Ihr Portfolio zeigt, dass sie sich auch außerhalb ihrer Ausbildung mit eigenen Projekten beschäftigt."
  },
  {
    "id": 22,
    "question": "Wie geht sie mit Herausforderungen um?",
    "answer": "Ekaterina beschäftigt sich gerne mit technischen Problemen und versucht, deren Ursachen zu verstehen. Besonders die Analyse von Fehlern im Code hat sie während ihrer praktischen Tätigkeit motiviert."
  },
  {
    "id": 23,
    "question": "Ist sie kreativ?",
    "answer": "In ihren Projekten beschäftigt sich Ekaterina nicht nur mit Programmierlogik, sondern auch mit Gestaltung und Benutzeroberflächen. Beispielsweise übernahm sie bei YogaNow Studio Aufgaben im Design und entwickelte bei CAMPUS02 ColorSpiel eigene Kartengestaltungen."
  },
  {
    "id": 24,
    "question": "Kann Ekaterina mit Kunden umgehen?",
    "answer": "Ja, sie hat durch ihre früheren Tätigkeiten umfangreiche Erfahrung im Kundenkontakt. Auch bei JAWA gehörte die Arbeit an kundenbezogenen Softwareprojekten zu ihrer Praxis."
  },
  {
    "id": 25,
    "question": "Was unterscheidet Ekaterina von anderen Junior-Entwicklern?",
    "answer": "Ekaterina verbindet ihre noch junge technische Laufbahn mit Erfahrungen aus anderen Berufsfeldern. Neben ihrer Softwareausbildung bringt sie Kenntnisse aus der Finanzbranche, der Hotellerie und der transkulturellen Kommunikation mit."
  },
  {
    "id": 26,
    "question": "Welche IT-Ausbildung hat Ekaterina abgeschlossen?",
    "answer": `Ekaterina hat im ${softwareEngineeringCompletion} den akademischen Lehrgang Softwareentwicklung an der FH CAMPUS 02 in Zusammenarbeit mit ZAM erfolgreich abgeschlossen. Damit verfügt sie über die Qualifikation als akademisch geprüfte Softwareentwicklerin.`
  },
  {
    "id": 27,
    "question": "Wann hat sie ihre Softwareausbildung abgeschlossen?",
    "answer": `Im ${softwareEngineeringCompletion}. Während der Ausbildung beschäftigte sie sich unter anderem mit objektorientierter Programmierung, Datenbanken, Softwarearchitektur, Webentwicklung und Softwarequalität.`
  },
  {
    "id": 28,
    "question": "Ist Ekaterina akademisch geprüfte Softwareentwicklerin?",
    "answer": "Ja. Sie hat die entsprechende akademische Ausbildung an der FH CAMPUS 02 erfolgreich abgeschlossen und ihr Abschlusszertifikat erhalten."
  },
  {
    "id": 29,
    "question": "Hat sie einen Bachelor in Informatik?",
    "answer": "Ein Bachelorabschluss in Informatik ist in ihren Unterlagen nicht dokumentiert. Ekaterina hat einen Bachelorabschluss in Transkultureller Kommunikation und zusätzlich den akademischen Lehrgang Softwareentwicklung abgeschlossen."
  },
  {
    "id": 30,
    "question": "Hat sie einen Hochschulabschluss?",
    "answer": "Ja, Ekaterina hat an der Universität Graz Transkulturelle Kommunikation studiert und einen Bachelorabschluss erworben. Außerdem hat sie ein Studium in Wirtschaft und Management in Irkutsk abgeschlossen."
  },
  {
    "id": 31,
    "question": "Was hat sie an der FH CAMPUS 02 gelernt?",
    "answer": "Zu den Schwerpunkten gehörten objektorientierte Programmierung, Algorithmen und Datenstrukturen, Datenbankentwicklung, Softwarearchitektur, Webentwicklung, REST-APIs und Softwarequalitätssicherung. Das Gelernte setzte sie auch in praktischen Projekten um."
  },
  {
    "id": 32,
    "question": "Hat sie Java gelernt?",
    "answer": "Ja. Java war Bestandteil ihrer Ausbildung und wurde in mehreren Projekten eingesetzt, darunter ein UNO-Kartenspiel und die Hotelverwaltung. Sie hat damit praktische Grundlagen in objektorientierter Programmierung und Datenbankanbindung erarbeitet."
  },
  {
    "id": 33,
    "question": "Hat sie Datenbankprogrammierung gelernt?",
    "answer": "Ja. Während ihrer Ausbildung beschäftigte sie sich mit SQL und der Datenbankanbindung von Anwendungen. Im Projekt Hotelverwaltung setzte sie unter anderem Hibernate, JPA und HQL ein."
  },
  {
    "id": 34,
    "question": "Hat Ekaterina eine Ausbildung in Webentwicklung?",
    "answer": "Ja. Sie absolvierte eine Weiterbildung in Webentwicklung am WIFI Steiermark. Ihr Diplomprojekt war die Website Feta für einen Lutscherhersteller."
  },
  {
    "id": 35,
    "question": "Was war ihr erstes Webprojekt?",
    "answer": "Feta war ihr erstes Webprojekt und gleichzeitig ihr Diplomprojekt am WIFI Steiermark. Dafür entwickelte sie ein eigenes responsives WordPress-Theme."
  },
  {
    "id": 36,
    "question": "Hat sie Vue.js gelernt?",
    "answer": "Ja. Anfang 2025 beschäftigte sie sich bei Glo Academy mit den Grundlagen von Vue.js und setzte ein erstes Projekt um. Vue 3 verwendet sie auch in weiteren Projekten ihres Portfolios."
  },
  {
    "id": 37,
    "question": "Hat sie JavaScript gelernt?",
    "answer": "Ja. Sie absolvierte eine JavaScript-Weiterbildung bei Glo Academy und nutzte JavaScript anschließend in Webprojekten, beispielsweise für die Website des Kaffeehauses Mokka und für ein browserbasiertes Kartenspiel."
  },
  {
    "id": 38,
    "question": "Hat sie mobile Entwicklung gelernt?",
    "answer": "Ja. Mobile Anwendungsentwicklung war Teil ihrer Ausbildung. Mit YogaNow Studio zeigt sie ein iOS-Projekt, das mit Swift und SwiftUI umgesetzt wurde."
  },
  {
    "id": 39,
    "question": "Hat sie Softwarearchitektur gelernt?",
    "answer": "Ja. Softwarearchitektur und Softwaredesign gehörten zu den Inhalten ihrer Ausbildung. Im Hotelverwaltungsprojekt dokumentierte sie unter anderem das Datenmodell und den Aufbau der Anwendung."
  },
  {
    "id": 40,
    "question": "Lernt Ekaterina nach ihrem Abschluss weiter?",
    "answer": "Ja. Sie möchte ihre Programmierkenntnisse vertiefen und interessiert sich besonders für Python und künstliche Intelligenz. In ihren Portfolio-Daten ist ein Python-Kurs in Hagen als geplanter nächster Schritt genannt; eine erfolgreiche Teilnahme sollte erst nach Bestätigung als abgeschlossen bezeichnet werden."
  },
  {
    "id": 41,
    "question": "Wo hat Ekaterina praktische Erfahrung in der Softwareentwicklung gesammelt?",
    "answer": `Bei der JAWA Management Software GmbH in Graz. Dort arbeitete sie von ${jawaStart} bis ${jawaEnd} und sammelte Erfahrungen mit einer bestehenden Softwareplattform und kundenbezogenen Aufgaben.`
  },
  {
    "id": 42,
    "question": "Wie lange hat sie bei JAWA gearbeitet?",
    "answer": `Von ${jawaStart} bis ${jawaEnd}, also rund ${jawaExperienceMonths} Monate.`
  },
  {
    "id": 43,
    "question": "Was ist INFORUM?",
    "answer": "INFORUM ist eine modulare Managementplattform, die bei JAWA entwickelt und betreut wird. Ekaterina arbeitete im Rahmen ihrer Tätigkeit mit Teilen dieser Plattform und an Aufgaben aus Kundenprojekten."
  },
  {
    "id": 44,
    "question": "Hat Ekaterina INFORUM selbst entwickelt?",
    "answer": "Nein, das wäre eine falsche Darstellung ihrer Tätigkeit. Sie arbeitete mit dem bestehenden Code der Plattform und wirkte an Aufgaben und Fehleranalysen mit. Die Entwicklung der gesamten Plattform darf ihr nicht allein zugeschrieben werden."
  },
  {
    "id": 45,
    "question": "An wie vielen Kundenprojekten war sie beteiligt?",
    "answer": "Nach ihren Angaben arbeitete sie mit Code aus 16 Kundenprojekten aus der produzierenden Industrie. Das bedeutet nicht, dass sie diese Projekte eigenständig entwickelt oder geleitet hat."
  },
  {
    "id": 46,
    "question": "Welche Aufgaben hatte sie bei JAWA?",
    "answer": jawaVueExperience + " " + "Zu ihren Aufgaben gehörten die Untersuchung von Fehlern, die Analyse von PHP-Code und die Arbeit mit Datenbanken. Außerdem nutzte sie Jira Service Management und beschäftigte sich mit gemeldeten Problemen in Kundenprojekten."
  },
  {
    "id": 47,
    "question": "Hat sie mit PHP gearbeitet?",
    "answer": "Ja. PHP gehörte zu den Technologien, mit denen sie während ihrer Tätigkeit bei JAWA arbeitete. Sie beschäftigte sich insbesondere mit dem Nachvollziehen und Untersuchen bestehender Codeabläufe."
  },
  {
    "id": 48,
    "question": "Hat sie mit SQL gearbeitet?",
    "answer": "Ja. SQL gehörte sowohl zu ihrer Ausbildung als auch zu ihrer Praxis bei JAWA. Im Zusammenhang mit der Fehleranalyse verglich sie Informationen aus dem Code mit Datenbankinhalten."
  },
  {
    "id": 49,
    "question": "Hat sie Xdebug verwendet?",
    "answer": "Ja. Ekaterina nutzte Xdebug, um Fehler im PHP-Code nachzuvollziehen und ihre Ursachen einzugrenzen. Diese praktische Erfahrung gehört zu den Schwerpunkten ihrer Tätigkeit bei JAWA."
  },
  {
    "id": 50,
    "question": "Wie hat sie Fehler analysiert?",
    "answer": "Sie untersuchte gemeldete Probleme, versuchte sie nachzustellen und verfolgte die entsprechenden Abläufe im Code. Dazu nutzte sie unter anderem Xdebug und überprüfte bei Bedarf Datenbankinhalte."
  },
  {
    "id": 51,
    "question": "Hat sie mit Jira gearbeitet?",
    "answer": "Ja. Bei JAWA verwendete sie Jira Service Management im Zusammenhang mit der Bearbeitung und Untersuchung gemeldeter Probleme."
  },
  {
    "id": 52,
    "question": "Kennt sie bestehende große Softwareanwendungen?",
    "answer": "Sie hat bei JAWA mit einer modularen Managementplattform und bestehendem Anwendungscode gearbeitet. Dadurch konnte sie Erfahrungen mit Software sammeln, die nicht von Grund auf neu entwickelt wird, sondern bereits in Kundenprojekten eingesetzt wird."
  },
  {
    "id": 53,
    "question": "Hat sie Erfahrung mit Legacy-Code?",
    "answer": "Sie hat praktische Erfahrung mit der Analyse und Fehlersuche in vorhandenem Code. Ob einzelne Teile der Plattform technisch als Legacy-Code einzustufen sind, lässt sich aus ihren Angaben nicht eindeutig ableiten."
  },
  {
    "id": 54,
    "question": "Hat sie selbstständig Bugs behoben?",
    "answer": "Sie war an der Analyse und Fehlersuche im PHP-Code beteiligt. Welche konkreten Fehler sie vollständig eigenständig behoben hat, ist im Portfolio nicht für jeden Einzelfall dokumentiert."
  },
  {
    "id": 55,
    "question": "Hat sie mit Kunden kommuniziert?",
    "answer": "Bei JAWA hatte Ekaterina teilweise auch Kontakt mit Kunden. Darüber hinaus bringt sie aus früheren beruflichen Tätigkeiten Erfahrung in der Kommunikation mit unterschiedlichen Menschen mit."
  },
  {
    "id": 56,
    "question": "Was hat ihr bei JAWA besonders gefallen?",
    "answer": "Ekaterina fand es motivierend, Fehlerursachen im Code zu untersuchen und technische Zusammenhänge zu verstehen. Besonders die Fehlersuche hat ihr gezeigt, wie wichtig es ist, das Verhalten einer Anwendung nachzuvollziehen."
  },
  {
    "id": 57,
    "question": "Hat sie Frontend- oder Backend-Erfahrung bei JAWA gesammelt?",
    "answer": jawaVueExperience + " " + "Ihre Berufspraxis bei JAWA umfasst Vue sowie PHP, SQL und die Fehleranalyse bestehender Anwendungen."
  },
  {
    "id": 58,
    "question": "Hat sie produktive Unternehmenssoftware kennengelernt?",
    "answer": "Ja. Bei JAWA arbeitete sie mit Code aus Kundenprojekten und einer bestehenden modularen Managementplattform. Damit unterscheidet sich diese Praxis von ihren rein akademischen Übungsprojekten."
  },
  {
    "id": 59,
    "question": "War Ekaterina Teamleiterin bei JAWA?",
    "answer": "Eine Teamleitungsfunktion bei JAWA ist nicht dokumentiert. Ihre Rolle war die praktische Mitarbeit in der Softwareentwicklung."
  },
  {
    "id": 60,
    "question": "Was hat Ekaterina aus ihrer Zeit bei JAWA mitgenommen?",
    "answer": "Sie konnte ihr Verständnis für bestehenden Anwendungscode, Fehleranalyse und das Zusammenspiel von Code und Datenbank vertiefen. Die Erfahrung hat außerdem ihr Interesse an der praktischen Softwareentwicklung gestärkt."
  },
  {
    "id": 61,
    "question": "Welche Programmiersprachen kennt Ekaterina?",
    "answer": "In ihrer Ausbildung und ihren Projekten beschäftigte sich Ekaterina unter anderem mit Java, JavaScript, PHP, C#, Swift und TypeScript. Die praktische Erfahrung ist je nach Sprache unterschiedlich ausgeprägt. Deshalb sollte man diese Kenntnisse nicht pauschal als Expertenniveau einstufen."
  },
  {
    "id": 62,
    "question": "Welche Technologien verwendet sie für Webentwicklung?",
    "answer": "In ihren Webprojekten kommen unter anderem HTML, CSS, JavaScript, Vue 3, TypeScript, Pinia und REST-APIs vor. Außerdem hat sie mit WordPress und PHP gearbeitet."
  },
  {
    "id": 63,
    "question": "Hat Ekaterina Erfahrung mit Vue 3?",
    "answer": "Zu ihren Vue-3-Projekten gehören die To-do-App und ShopPlatzi. Auch ihre Portfolio-Website verwendet Vue." + " " + jawaVueExperience
  },
  {
    "id": 64,
    "question": "Kennt sie TypeScript?",
    "answer": "TypeScript ist Bestandteil ihres Projekt-Stacks, beispielsweise bei den Vue-Anwendungen. Die Verwendung in einem Projekt bedeutet jedoch nicht automatisch, dass sie sämtliche TypeScript-Funktionen selbstständig und sicher beherrscht."
  },
  {
    "id": 65,
    "question": "Hat sie Erfahrung mit JavaScript?",
    "answer": "Ja. Sie hat JavaScript sowohl in einer Weiterbildung gelernt als auch in praktischen Webprojekten verwendet. Beispiele dafür sind das Kaffeehaus Mokka und das browserbasierte Kartenspiel."
  },
  {
    "id": 66,
    "question": "Kann sie mit Java programmieren?",
    "answer": "Ekaterina hat Java intensiv in ihrer Ausbildung eingesetzt. Beispiele sind das UNO-Konsolenspiel und die Hotelverwaltung. Da sie zuletzt nicht kontinuierlich mit Java gearbeitet hat, möchte sie ihre Syntaxkenntnisse bei Bedarf auffrischen."
  },
  {
    "id": 67,
    "question": "Welche Erfahrung hat sie mit C#?",
    "answer": "C# verwendete sie im Projekt Geschenkeverwaltung. Dabei entwickelte sie eine Windows-Anwendung mit WPF, XAML, MVVM und Entity Framework."
  },
  {
    "id": 68,
    "question": "Kennt sie Swift?",
    "answer": "Ja. Im Teamprojekt YogaNow Studio wurde Swift mit SwiftUI eingesetzt. Ekaterina arbeitete dort unter anderem am Design, an der Supabase-Anbindung und an der Kursbuchungsplattform."
  },
  {
    "id": 69,
    "question": "Kennt sie Python?",
    "answer": "Ekaterina beschäftigt sich mit Python und möchte ihre Kenntnisse weiter vertiefen. Ein Python-Kurs an der FernUniversität in Hagen ist in ihren Unterlagen als nächster Ausbildungsschritt vorgesehen. Berufliche Python-Erfahrung ist damit noch nicht belegt."
  },
  {
    "id": 70,
    "question": "Welche Datenbanken kennt sie?",
    "answer": "In ihrer Ausbildung und ihren Projekten arbeitete sie unter anderem mit SQL, SQLite und SQL Server LocalDB. Bei JAWA gehörte außerdem die Arbeit mit Datenbankinhalten zu ihrer Praxis."
  },
  {
    "id": 71,
    "question": "Hat sie Erfahrung mit REST-APIs?",
    "answer": "Ja. REST-APIs waren Bestandteil ihrer Ausbildung und werden in ihren Projekten verwendet. In ShopPlatzi werden beispielsweise Produktdaten über eine externe API geladen."
  },
  {
    "id": 72,
    "question": "Kennt sie Git?",
    "answer": "Ja. Git gehört zu den Werkzeugen, die in ihrer Ausbildung und Projektarbeit vorkommen. Ihre Projekte sind außerdem über GitHub dokumentiert."
  },
  {
    "id": 73,
    "question": "Kennt sie Docker?",
    "answer": "Docker gehört zu den Werkzeugen, mit denen sie während ihrer praktischen Softwareentwicklung in Kontakt gekommen ist. Das Portfolio belegt damit jedoch keine Spezialisierung auf Container-Infrastruktur."
  },
  {
    "id": 74,
    "question": "Kennt sie objektorientierte Programmierung?",
    "answer": "Ja. Objektorientierte Programmierung war ein Schwerpunkt ihrer Ausbildung. Sie nutzte entsprechende Konzepte unter anderem in Java-Projekten und bei der Entwicklung einer C#-Desktopanwendung."
  },
  {
    "id": 75,
    "question": "Hat sie Erfahrung mit MVC oder MVVM?",
    "answer": "MVVM verwendete sie im Projekt Geschenkeverwaltung mit C#, WPF und XAML. Die Anwendung trennt Oberfläche, ViewModel und Datenzugriff voneinander."
  },
  {
    "id": 76,
    "question": "Kann Ekaterina Datenbankabfragen schreiben?",
    "answer": "SQL gehört zu den Themen ihrer Ausbildung und ihrer praktischen Tätigkeit. In der Java-Hotelverwaltung setzte sie außerdem HQL-Abfragen ein."
  },
  {
    "id": 77,
    "question": "Hat sie Erfahrung mit Hibernate?",
    "answer": "Ja. Hibernate und JPA kamen bei ihrer Java-Hotelverwaltung zum Einsatz. Das Projekt umfasst unter anderem Datenbankzugriffe, CRUD-Operationen und HQL-Abfragen."
  },
  {
    "id": 78,
    "question": "Kennt sie Frontend-Entwicklung?",
    "answer": "Ja. In mehreren Projekten arbeitete sie an Benutzeroberflächen mit HTML, CSS, JavaScript und Vue. Dazu gehören sowohl einfache Websites als auch interaktive Anwendungen."
  },
  {
    "id": 79,
    "question": "Kennt sie Backend-Entwicklung?",
    "answer": "Ekaterina hat erste Erfahrungen mit Backend-Entwicklung gesammelt, beispielsweise mit Java, PHP und Node.js. Bei CAMPUS02 ColorSpiel entwickelte sie für ihre Weiterentwicklung ein Backend mit Express."
  },
  {
    "id": 80,
    "question": "Ist sie Full-Stack-Entwicklerin?",
    "answer": "Sie hat sowohl Frontend- als auch Backend-Technologien kennengelernt und in Projekten verwendet. Eine ausgeprägte berufliche Full-Stack-Spezialisierung ist damit noch nicht belegt; sie ist offen dafür, sich in diese Richtung weiterzuentwickeln."
  },
  {
    "id": 81,
    "question": "Welche Projekte hat Ekaterina entwickelt?",
    "answer": "Ihr Portfolio umfasst Webanwendungen, eine iOS-App, Konsolenprogramme und eine Windows-Desktopanwendung. Dazu gehören unter anderem YogaNow Studio, zwei UNO-Varianten, eine Hotelverwaltung, eine Geschenkeverwaltung und verschiedene Webprojekte."
  },
  {
    "id": 82,
    "question": "Welches Projekt zeigt ihre Frontend-Kenntnisse?",
    "answer": "Ein gutes Beispiel ist ihre Vue-To-do-App mit TypeScript, Vuetify und Pinia. Auch ShopPlatzi zeigt die Arbeit mit Benutzeroberflächen, Produktdaten und interaktiven Funktionen."
  },
  {
    "id": 83,
    "question": "Welches Projekt zeigt ihre Backend-Kenntnisse?",
    "answer": "Die Java-Hotelverwaltung ist ein Beispiel für Datenbankprogrammierung und Anwendungslogik. Außerdem entwickelte sie für CAMPUS02 ColorSpiel ein eigenes Backend mit Node.js und Express."
  },
  {
    "id": 84,
    "question": "Hat sie Teamprojekte umgesetzt?",
    "answer": "Ja. YogaNow Studio und die Java-Version von UNO entstanden im Team. Auch die ursprüngliche Oberfläche von CAMPUS02 ColorSpiel wurde im Rahmen eines Teamprojekts entwickelt."
  },
  {
    "id": 85,
    "question": "Hat sie eigene Projekte umgesetzt?",
    "answer": "Ja. In ihrem Portfolio zeigt sie unter anderem selbst erstellte Webprojekte und individuelle Weiterentwicklungen vorhandener Anwendungen. Bei jedem Projekt sollte unterschieden werden, welche Bestandteile selbstständig und welche gemeinsam im Team entstanden sind."
  },
  {
    "id": 86,
    "question": "Kann man ihre Projekte ausprobieren?",
    "answer": "Für einige Projekte stehen interaktive Demos zur Verfügung, beispielsweise für die To-do-App, ShopPlatzi und CAMPUS02 ColorSpiel. Andere Projekte werden über Bilder, Videos oder GitHub-Repositories vorgestellt."
  },
  {
    "id": 87,
    "question": "Sind alle Projekte kommerzielle Anwendungen?",
    "answer": "Nein. Das Portfolio enthält akademische Projekte, Übungsanwendungen und eine frühere Kundenwebsite. Einige Anwendungen dienen vor allem dazu, technische Kenntnisse und Lernfortschritte zu zeigen."
  },
  {
    "id": 88,
    "question": "Hat Ekaterina Erfahrung mit echten Kundenprojekten?",
    "answer": "Ja. Während ihrer Tätigkeit bei JAWA arbeitete sie mit Code aus Kundenprojekten. Außerdem entwickelte sie mit Feta im Rahmen ihrer Webentwicklungsweiterbildung eine Website für einen Lutscherhersteller."
  },
  {
    "id": 89,
    "question": "Sind ihre Projekte auf GitHub?",
    "answer": "Zu den dokumentierten Portfolio-Projekten gibt es GitHub-Verweise. Dort können Interessierte die verfügbaren Repositories einsehen."
  },
  {
    "id": 90,
    "question": "Wie dokumentiert Ekaterina ihre Arbeit?",
    "answer": "In ihrem Portfolio stellt sie Projekte mit Beschreibungen, eingesetzten Technologien und ergänzendem Bild- oder Demomaterial vor. Bei einigen Projekten zeigt sie außerdem die Architektur oder typische Abläufe."
  },
  {
    "id": 91,
    "question": "Was ist YogaNow Studio?",
    "answer": "YogaNow Studio ist eine iOS-Anwendung mit einer frei zugänglichen Yoga-Bibliothek und einer Plattform zur Buchung von Studiokursen. Das Projekt verbindet mobile Entwicklung mit einer Datenbankanbindung."
  },
  {
    "id": 92,
    "question": "Welche Technologien wurden für YogaNow verwendet?",
    "answer": "Die Anwendung wurde mit Swift und SwiftUI entwickelt. Für die Datenbankanbindung kam Supabase zum Einsatz."
  },
  {
    "id": 93,
    "question": "Welche Aufgaben übernahm Ekaterina bei YogaNow?",
    "answer": "Ekaterina war im Team für das Design, die Supabase-Anbindung und die Kursbuchungsplattform zuständig. Die App wurde gemeinsam entwickelt und sollte deshalb nicht als ausschließlich ihre eigene Arbeit dargestellt werden."
  },
  {
    "id": 94,
    "question": "Kann man YogaNow ausprobieren?",
    "answer": "Im Portfolio gibt es Bilder und eine Videodemonstration der Anwendung. Die Yoga-Bibliothek ist ohne Anmeldung zugänglich; zum selbstständigen Testen der Kursbuchungsplattform wird ein Konto benötigt."
  },
  {
    "id": 95,
    "question": "Was ist die Hotelverwaltung?",
    "answer": "Die Hotelverwaltung ist eine Java-Konsolenanwendung, mit der Gäste, Zimmer, Buchungen und Zusatzleistungen verwaltet werden können. Sie entstand als Prüfungsprojekt im Bereich Datenbankprogrammierung."
  },
  {
    "id": 96,
    "question": "Welche Technologien verwendet die Hotelverwaltung?",
    "answer": "Zu den eingesetzten Technologien gehören Java, Hibernate, JPA, HQL, SQLite und XML. Damit konnte Ekaterina Datenbankzugriffe und typische Verwaltungsfunktionen umsetzen."
  },
  {
    "id": 97,
    "question": "Was bedeutet CRUD in der Hotelverwaltung?",
    "answer": "CRUD bezeichnet das Erstellen, Lesen, Aktualisieren und Löschen von Daten. Diese grundlegenden Datenbankoperationen wurden im Hotelverwaltungsprojekt eingesetzt."
  },
  {
    "id": 98,
    "question": "Welche Rolle spielt Hibernate?",
    "answer": "Hibernate unterstützt die Verbindung zwischen Java-Objekten und relationalen Datenbanken. In ihrer Hotelverwaltung wurde es zusammen mit JPA für den Datenzugriff verwendet."
  },
  {
    "id": 99,
    "question": "Hat die Hotelverwaltung eine grafische Oberfläche?",
    "answer": "Nein, es handelt sich um eine Konsolenanwendung. Das Projekt konzentriert sich unter anderem auf Anwendungslogik, Datenmodellierung und Datenbankzugriffe."
  },
  {
    "id": 100,
    "question": "Was ist die Geschenkeverwaltung?",
    "answer": "Die Geschenkeverwaltung ist eine Windows-Desktopanwendung. Mit ihr können Geschenke angelegt, bearbeitet, kopiert und gefiltert werden."
  },
  {
    "id": 101,
    "question": "Welche Technologien verwendete Ekaterina dafür?",
    "answer": "Die Anwendung wurde mit C#, WPF, XAML, MVVM, Entity Framework und SQL Server LocalDB umgesetzt."
  },
  {
    "id": 102,
    "question": "Wie funktioniert MVVM in diesem Projekt?",
    "answer": "Beim Löschen eines Geschenks löst die Oberfläche einen Befehl aus. Das ViewModel prüft die Auswahl, während das Repository den Datenbankzugriff übernimmt. Anschließend wird die Oberfläche über die Datenbindung aktualisiert."
  },
  {
    "id": 103,
    "question": "Was zeigt dieses Projekt über ihre Kenntnisse?",
    "answer": "Das Projekt zeigt, dass Ekaterina sich mit objektorientierter Programmierung, Desktop-Oberflächen und dem Zusammenspiel verschiedener Anwendungsschichten beschäftigt hat."
  },
  {
    "id": 104,
    "question": "Was ist das Java-UNO-Projekt?",
    "answer": "Das Projekt ist eine UNO-Version für die Java-Konsole, die Ekaterina gemeinsam mit ihrem Team entwickelte. Die Anwendung verwaltet Spieler, Karten, Spielrunden und Punktestände."
  },
  {
    "id": 105,
    "question": "Welche Technologien wurden eingesetzt?",
    "answer": "Java, objektorientierte Programmierung, JDBC und SQLite. Über die Datenbank werden beispielsweise Punktestände gespeichert."
  },
  {
    "id": 106,
    "question": "Welche Spielfunktionen hat die Java-Version?",
    "answer": "Das Spiel prüft Spielzüge und unterstützt unter anderem Aktionskarten wie Aussetzen und Richtungswechsel. Außerdem gibt es eine Bestenliste."
  },
  {
    "id": 107,
    "question": "Was ist CAMPUS02 ColorSpiel?",
    "answer": "CAMPUS02 ColorSpiel ist ein browserbasiertes Kartenspiel für vier Personen an einem Bildschirm. Die ursprüngliche Spieloberfläche entstand im Team an der FH CAMPUS 02."
  },
  {
    "id": 108,
    "question": "Was hat Ekaterina selbst daran erweitert?",
    "answer": "Sie entwickelte ein eigenes Backend mit Node.js und Express. Außerdem ergänzte sie eigene Kartendesigns und einen Wintermodus."
  },
  {
    "id": 109,
    "question": "Was macht das Backend bei ColorSpiel?",
    "answer": "Das Backend übernimmt unter anderem das Austeilen der Karten, die Prüfung von Spielzügen und die Verwaltung der Punkte. Damit konnte Ekaterina ihre Kenntnisse in der serverseitigen Programmierung praktisch anwenden."
  },
  {
    "id": 110,
    "question": "Warum lädt die Demo manchmal langsam?",
    "answer": "Die Demo läuft auf einem kostenlosen Render-Tarif. Nach einer längeren Pause kann das Starten der Anwendung ungefähr eine Minute dauern."
  },
  {
    "id": 111,
    "question": "Was kann die To-do-App?",
    "answer": "Mit der Anwendung können Besucher Aufgaben hinzufügen, als erledigt markieren und löschen. Pinia verwaltet den Zustand und speichert die Aufgaben im Browser."
  },
  {
    "id": 112,
    "question": "Welche Technologien verwendet die To-do-App?",
    "answer": "Im Projekt kommen Vue 3, TypeScript, Vuetify und Pinia zum Einsatz."
  },
  {
    "id": 113,
    "question": "Wozu verwendet die Anwendung Pinia?",
    "answer": "Pinia dient der Zustandsverwaltung. In der To-do-App wird damit der Zustand der Aufgaben organisiert und im Browser gespeichert."
  },
  {
    "id": 114,
    "question": "Was ist ShopPlatzi?",
    "answer": "ShopPlatzi ist eine Shop-Demo, in der Besucher Produkte suchen, filtern, als Favoriten markieren und zum Warenkorb hinzufügen können."
  },
  {
    "id": 115,
    "question": "Woher kommen die Produkte in ShopPlatzi?",
    "answer": "Die Produktdaten werden über die Platzi Fake Store API geladen. Das Projekt zeigt damit auch die Anbindung einer Webanwendung an eine externe REST-API."
  },
  {
    "id": 116,
    "question": "Verwendet ShopPlatzi Axios?",
    "answer": "Ja. Axios gehört zum dokumentierten Technologie-Stack des Projekts, gemeinsam mit Vue 3, TypeScript, Vuetify, Pinia und REST-APIs."
  },
  {
    "id": 117,
    "question": "Was ist das Projekt Feta?",
    "answer": "Feta war Ekaterinas erstes Webprojekt und gleichzeitig ihre Diplomarbeit am WIFI Steiermark. Für einen Lutscherhersteller entwickelte sie ein eigenes WordPress-Theme mit Produktkatalog, Zutatenlisten und Kontaktformular."
  },
  {
    "id": 118,
    "question": "War Feta eine echte Kundenwebsite?",
    "answer": "Ja. Die Website wurde für einen Lutscherhersteller entwickelt und war online. Im heutigen Portfolio wird eine lokale Vorschau präsentiert."
  },
  {
    "id": 119,
    "question": "Was hat Ekaterina bei Feta gelernt?",
    "answer": "Das Projekt bot ihr die Möglichkeit, Webentwicklung praktisch einzusetzen und sich mit der Gestaltung einer responsiven WordPress-Website zu beschäftigen."
  },
  {
    "id": 120,
    "question": "Was ist Kaffeehaus Mokka?",
    "answer": "Kaffeehaus Mokka ist eine Website mit Speisekarte, Galerie und Kontaktformular. Sie entstand als Übungsprojekt im Rahmen ihrer Ausbildung."
  },
  {
    "id": 121,
    "question": "Welche Technologien wurden bei Mokka verwendet?",
    "answer": "HTML, CSS und JavaScript. Für das Layout nutzte sie unter anderem CSS Grid und Flexbox; die Galerie wurde mit JavaScript und Swiper eingebunden."
  },
  {
    "id": 122,
    "question": "Verwendet Ekaterina künstliche Intelligenz beim Programmieren?",
    "answer": "Ja. Ekaterina nutzt KI, um Ideen auszuprobieren, Lösungsansätze zu vergleichen und Fehler gezielter einzugrenzen. Sie möchte vorgeschlagenen Code verstehen, prüfen und selbst entscheiden, welche Lösung sinnvoll ist."
  },
  {
    "id": 123,
    "question": "Schreibt sie ihren Code vollständig selbst?",
    "answer": "Nicht jeder Teil ihrer bisherigen Projekte wurde ohne KI-Unterstützung geschrieben. Ekaterina hat KI als Werkzeug eingesetzt und sich damit beschäftigt, generierten Code nachzuvollziehen, anzupassen und zu testen. Ihr Ziel ist es, beim eigenständigen Programmieren sicherer zu werden."
  },
  {
    "id": 124,
    "question": "Kann Ekaterina Code verstehen, auch wenn sie ihn nicht selbst geschrieben hat?",
    "answer": "Ja. Sie hat sich im Rahmen ihrer Ausbildung mit Programmierkonzepten und objektorientierter Entwicklung beschäftigt. Bei JAWA arbeitete sie außerdem mit vorhandenem PHP-Code und analysierte dessen Verhalten."
  },
  {
    "id": 125,
    "question": "Was möchte sie beim Programmieren verbessern?",
    "answer": "Sie möchte Syntax und typische Programmierabläufe sicherer beherrschen, um Aufgaben häufiger eigenständig lösen zu können. Ihr geht es darum, nicht nur fertigen Code zu verstehen, sondern selbst Lösungen zu entwickeln."
  },
  {
    "id": 126,
    "question": "Warum interessiert sie sich für Python?",
    "answer": "Ekaterina möchte ihre Programmierkenntnisse erweitern und verstehen, wie sich Python für Datenverarbeitung und KI einsetzen lässt. Besonders interessieren sie die Fragen, wie Modelle aus Daten lernen und wie ihre Ergebnisse bewertet werden können."
  },
  {
    "id": 127,
    "question": "Will sie sich auf künstliche Intelligenz spezialisieren?",
    "answer": "Ekaterina interessiert sich für KI und möchte sich in diesem Bereich weiterbilden. Gleichzeitig möchte sie ihre Grundlagen in der Softwareentwicklung festigen und praktisch programmieren."
  },
  {
    "id": 128,
    "question": "Ist sie bereits KI-Expertin?",
    "answer": "Nein, eine solche Einstufung wäre nicht gerechtfertigt. KI ist ein Bereich, in dem sie sich weiterentwickeln möchte."
  },
  {
    "id": 129,
    "question": "Was ist Pixel?",
    "answer": "Pixel ist der KI-gestützte Assistent in Ekaterinas Portfolio. Er unterstützt Besucher dabei, Informationen über ihre Projekte, Ausbildung und Berufserfahrung zu finden. Gleichzeitig ist er ein Lernprojekt, an dem sie weiterarbeitet."
  },
  {
    "id": 130,
    "question": "Hat sie Pixel selbst entwickelt?",
    "answer": "Pixel ist Bestandteil ihrer eigenen Portfolio-Weiterentwicklung. Die Anwendung verbindet eine Vue-Oberfläche mit vorbereiteten Antworten und einer optionalen KI-Funktion über Cloudflare Workers AI. Welcher Code dabei genau eigenständig oder mit KI-Unterstützung entstanden ist, sollte nicht pauschal behauptet werden."
  },
  {
    "id": 131,
    "question": "Kann Pixel Fehler machen?",
    "answer": "Ja. Pixel befindet sich in Entwicklung und kann Fragen falsch zuordnen oder ungenaue Antworten erzeugen. Deshalb sollte er nur geprüfte Portfolio-Informationen verwenden und unbekannte Angaben nicht erfinden."
  },
  {
    "id": 132,
    "question": "Wie lernt Ekaterina neue Technologien?",
    "answer": "Sie beschäftigt sich mit Lernmaterialien und setzt Wissen in eigenen Projekten um. Besonders wichtig ist ihr die praktische Wiederholung, weil sie dadurch Zusammenhänge besser versteht und Sicherheit beim Schreiben von Code gewinnt."
  },
  {
    "id": 133,
    "question": "Welche beruflichen Ziele hat sie?",
    "answer": "Ekaterina möchte in der Softwareentwicklung arbeiten, praktische Erfahrung sammeln und ihre Kenntnisse systematisch vertiefen. Sie ist offen für verschiedene technische Aufgaben, insbesondere in der Web- und Anwendungsentwicklung."
  },
  {
    "id": 134,
    "question": "Möchte sie lieber Frontend oder Backend entwickeln?",
    "answer": "Sie interessiert sich für beide Bereiche. Ihre Projekte umfassen sowohl Benutzeroberflächen als auch Datenbankprogrammierung und erste Backend-Entwicklung. Sie möchte durch praktische Arbeit herausfinden, wo sie ihre Fähigkeiten am besten weiterentwickeln kann."
  },
  {
    "id": 135,
    "question": "Was interessiert sie an Full-Stack-Entwicklung?",
    "answer": "Ekaterina möchte besser verstehen, wie Frontend, Backend, APIs und Datenbanken zusammenarbeiten. Ihre bisherigen Projekte bieten dafür bereits verschiedene praktische Anknüpfungspunkte."
  },
  {
    "id": 136,
    "question": "Ist sie bereit, neue Programmiersprachen zu lernen?",
    "answer": "Ja. Ihr bisheriger Ausbildungsweg zeigt, dass sie bereits mehrere Programmiersprachen kennengelernt hat und kontinuierlich weiterlernt. Auch Python gehört zu ihren aktuellen Lernzielen."
  },
  {
    "id": 137,
    "question": "Warum sollte ein Unternehmen in ihre Weiterbildung investieren?",
    "answer": "Ekaterina verfügt über eine abgeschlossene technische Ausbildung und erste Erfahrung mit Unternehmenssoftware. Sie möchte sich durch praktische Aufgaben weiterentwickeln und bringt die Bereitschaft mit, sich in bestehende Anwendungen und neue Technologien einzuarbeiten."
  },
  {
    "id": 138,
    "question": "Was kann sie einem Entwicklerteam heute bieten?",
    "answer": "Sie bringt Grundlagenwissen in der Softwareentwicklung, Erfahrung mit Fehleranalyse sowie eigene und gemeinschaftliche Projektarbeit mit. Außerdem ist sie offen für fachlichen Austausch und möchte ihre Fähigkeiten im Arbeitsalltag weiter ausbauen."
  },
  {
    "id": 139,
    "question": "Ist Ekaterina aktuell auf Jobsuche?",
    "answer": "Ekaterina sucht nach einer passenden beruflichen Möglichkeit in der Softwareentwicklung. Besonders interessieren sie Einstiegspositionen, bei denen sie praktisch mit Code arbeiten und sich weiterentwickeln kann."
  },
  {
    "id": 140,
    "question": "Wo möchte sie arbeiten?",
    "answer": "Ihr bevorzugter Standort ist Graz beziehungsweise die Steiermark. Je nach Tätigkeit kommen für sie auch Remote-Positionen innerhalb Österreichs und passende Stellen in Wien infrage."
  },
  {
    "id": 141,
    "question": "Ist sie bereit, nach Wien zu pendeln?",
    "answer": "Ja, für eine interessante Position kommt das für Ekaterina infrage. In ihren bisherigen Angaben hat sie beispielsweise ein hybrides Arbeitsmodell mit zwei Bürotagen pro Woche in Wien genannt."
  },
  {
    "id": 142,
    "question": "Ist Remote-Arbeit für sie möglich?",
    "answer": "Ja. Ekaterina ist offen für Remote-Arbeit, sofern die Aufgaben und die Zusammenarbeit zum jeweiligen Arbeitsmodell passen."
  },
  {
    "id": 143,
    "question": "Möchte sie ausschließlich remote arbeiten?",
    "answer": "Nein. Für sie kommen auch Büroarbeit und hybride Arbeitsmodelle infrage."
  },
  {
    "id": 144,
    "question": "Wie viele Stunden möchte Ekaterina arbeiten?",
    "answer": `In ihren bisherigen Portfolio-Angaben nennt sie eine gewünschte Wochenarbeitszeit von ${pixelFacts.hoursPerWeek.min} bis ${pixelFacts.hoursPerWeek.max} Stunden.`
  },
  {
    "id": 145,
    "question": "Kann sie Vollzeit arbeiten?",
    "answer": `Das Portfolio nennt als aktuelle Präferenz ${pixelFacts.hoursPerWeek.min} bis ${pixelFacts.hoursPerWeek.max} Wochenstunden. Ob darüber hinaus eine konkrete Vollzeitstelle infrage kommt, sollte direkt mit Ekaterina geklärt werden.`
  },
  {
    "id": 146,
    "question": "Hat Ekaterina eine Arbeitserlaubnis in Österreich?",
    "answer": "Laut ihren bisherigen Angaben hat sie das Recht, in Österreich und anderen EU-Mitgliedstaaten zu arbeiten."
  },
  {
    "id": 147,
    "question": "Ist sie bereit, im Büro zu arbeiten?",
    "answer": "Ja. Ekaterina ist offen für Arbeit im Büro, für hybride Modelle und für Remote-Tätigkeiten. Welche Variante passend ist, hängt insbesondere vom Arbeitsort ab."
  },
  {
    "id": 148,
    "question": "Ist sie an einem Praktikum interessiert?",
    "answer": "Ekaterina interessiert sich für Möglichkeiten, bei denen sie praktische Entwicklungserfahrung sammeln kann. Ob ein konkretes Praktikum infrage kommt, hängt von den Aufgaben und Rahmenbedingungen ab."
  },
  {
    "id": 149,
    "question": "Kann sie als Trainee einsteigen?",
    "answer": "Ein Trainee-Programm kann zu ihrem Wunsch passen, sich fachlich weiterzuentwickeln. Voraussetzung wäre eine Tätigkeit mit passenden technischen Aufgaben und Entwicklungsmöglichkeiten."
  },
  {
    "id": 150,
    "question": "Ist sie bereit, neue Technologien im Unternehmen zu lernen?",
    "answer": "Ja. Ekaterina möchte ihre Kenntnisse in der Praxis ausbauen und sich in neue technische Aufgaben einarbeiten."
  },
  {
    "id": 151,
    "question": "Wann könnte sie anfangen?",
    "answer": "Ein verbindliches Eintrittsdatum ist im Portfolio nicht dokumentiert. Am besten wird der mögliche Beginn direkt mit Ekaterina vereinbart."
  },
  {
    "id": 152,
    "question": "Welche Gehaltsvorstellungen hat sie?",
    "answer": "Dazu enthält das Portfolio keine bestätigte Angabe. Die Gehaltsvorstellungen sollten direkt mit Ekaterina besprochen werden."
  },
  {
    "id": 153,
    "question": "Ist sie bereit, für eine Stelle umzuziehen?",
    "answer": "Eine grundsätzliche Umzugsbereitschaft ist nicht dokumentiert. Bekannt ist ihre Offenheit für passende Remote- und Hybridmodelle sowie für das Pendeln nach Wien."
  },
  {
    "id": 154,
    "question": "Kann man sie zu einem Vorstellungsgespräch einladen?",
    "answer": "Ja. Über die Kontaktmöglichkeiten im Portfolio können Arbeitgeber Ekaterina eine Nachricht senden und eine Einladung oder Anfrage übermitteln."
  },
  {
    "id": 155,
    "question": "Wo findet man ihren Lebenslauf?",
    "answer": "Ihr Lebenslauf steht im Portfolio als PDF zur Verfügung. Zusätzlich sind ihre Ausbildung, Berufserfahrung und Projekte auf den entsprechenden Seiten beschrieben."
  },
  {
    "id": 156,
    "question": "Kann man ihren GitHub-Code ansehen?",
    "answer": "Ja. Ihre Projektbeschreibungen enthalten Verweise auf die verfügbaren GitHub-Repositories. Dort können Interessierte die veröffentlichten Projekte genauer ansehen."
  },
  {
    "id": 157,
    "question": "Welche Positionen passen am besten zu ihr?",
    "answer": "Auf Grundlage ihrer Ausbildung und Projekte kommen insbesondere Junior-Positionen in der Webentwicklung, Anwendungsentwicklung und Softwareentwicklung infrage. Auch Stellen mit Schwerpunkt PHP, Vue oder Datenbankanwendungen können interessant sein, abhängig von den konkreten Anforderungen."
  },
  {
    "id": 158,
    "question": "Kann sie in einem internationalen Team arbeiten?",
    "answer": "Ekaterina hat ein Studium der Transkulturellen Kommunikation abgeschlossen und berufliche Erfahrung im Umgang mit unterschiedlichen Menschen. Ob ihre Sprachkenntnisse den Anforderungen einer bestimmten internationalen Position entsprechen, sollte anhand der konkreten Stelle geprüft werden."
  },
  {
    "id": 159,
    "question": "Welche Sprachen spricht Ekaterina?",
    "answer": "Russisch ist Ekaterinas Muttersprache. Außerdem verfügt sie über Kenntnisse in Deutsch, Englisch und Italienisch. Deutsch hat sie bis zum Niveau C1 gelernt, Englischkurse besuchte sie auf A2- und B1-Niveau. Deutsch, Italienisch und Russisch waren zudem Teil ihres Studiums der Transkulturellen Kommunikation."
  },
  {
    "id": 160,
    "question": "Spricht sie Deutsch?",
    "answer": "Ja. Ekaterina lebt in Graz und hat Deutsch bis zum Niveau C1 gelernt. Deutsch gehört auch zu den Sprachen ihres Studiums der Transkulturellen Kommunikation."
  },
  {
    "id": 161,
    "question": "Spricht sie Russisch?",
    "answer": "Ja. Russisch ist Ekaterinas Muttersprache. Sie hat außerdem ehrenamtlich bei Caritas Marienambulanz beim Dolmetschen ins Russische unterstützt."
  },
  {
    "id": 162,
    "question": "Spricht sie Englisch?",
    "answer": "Ekaterina hat Englisch gelernt und Kurse auf den Niveaus A2 und B1 besucht. Welches Niveau sie derzeit aktiv beherrscht, sollte bei Bedarf persönlich geklärt werden."
  },
  {
    "id": 163,
    "question": "Spricht sie Italienisch?",
    "answer": "Italienisch war Teil ihres Studiums der Transkulturellen Kommunikation an der Universität Graz. Ein aktuelles Sprachniveau ist im Portfolio nicht angegeben."
  },
  {
    "id": 164,
    "question": "Welche Sprachen hat sie studiert?",
    "answer": "Im Rahmen der Transkulturellen Kommunikation an der Universität Graz beschäftigte sie sich mit Deutsch, Italienisch und Russisch."
  },
  {
    "id": 165,
    "question": "Hat Ekaterina Erfahrung als Dolmetscherin?",
    "answer": "Ja. Sie war von April 2014 bis Oktober 2015 ehrenamtlich bei Caritas Marienambulanz tätig und unterstützte dort beim Dolmetschen ins Russische."
  },
  {
    "id": 166,
    "question": "Hat sie einen sprachwissenschaftlichen Hintergrund?",
    "answer": "Sie hat einen Bachelorabschluss in Transkultureller Kommunikation an der Universität Graz erworben. Dadurch bringt sie neben ihrer technischen Ausbildung auch einen akademischen Hintergrund im Bereich Sprache und Kommunikation mit."
  },
  {
    "id": 167,
    "question": "Was muss Ekaterina noch lernen?",
    "answer": "Ekaterina möchte vor allem sicherer darin werden, selbstständig Code zu schreiben. Sie versteht grundlegende Programmierkonzepte und möchte durch regelmäßige praktische Aufgaben ihre Syntaxkenntnisse und Problemlösungsroutine festigen."
  },
  {
    "id": 168,
    "question": "Ist ihre Programmiererfahrung noch begrenzt?",
    "answer": "Ekaterina befindet sich am Anfang ihrer beruflichen Entwicklerlaufbahn. Sie bringt eine abgeschlossene Ausbildung und erste Unternehmenspraxis mit, möchte aber noch mehr Erfahrung in der eigenständigen Umsetzung von Entwicklungsaufgaben sammeln."
  },
  {
    "id": 169,
    "question": "Kann sie ohne KI programmieren?",
    "answer": "Ekaterina arbeitet daran, Programmieraufgaben zunehmend eigenständig zu lösen. Sie verfügt über Grundlagenwissen und versteht bereits viele Konzepte, möchte aber beim Schreiben von Code ohne Hilfsmittel sicherer werden."
  },
  {
    "id": 170,
    "question": "Beherrscht sie die Syntax aller angegebenen Programmiersprachen?",
    "answer": "Nein, das wäre keine angemessene Schlussfolgerung aus ihrem Portfolio. Ekaterina hat mit unterschiedlichen Sprachen gearbeitet, aber ihre aktuelle Sicherheit ist je nach Sprache und praktischer Nutzung verschieden."
  },
  {
    "id": 171,
    "question": "Ist sie bereits bereit für komplexe Entwicklungsaufgaben?",
    "answer": "Sie bringt Grundlagenwissen und Erfahrung mit verschiedenen Projekten mit. Welche komplexeren Aufgaben sie bereits selbstständig übernehmen kann, sollte anhand einer konkreten Aufgabe oder im technischen Gespräch beurteilt werden."
  },
  {
    "id": 172,
    "question": "Wie groß ist ihre Erfahrung im produktiven Backend?",
    "answer": "Bei JAWA arbeitete sie mit vorhandenem PHP-Code einer Unternehmensplattform und beschäftigte sich mit Fehleranalyse. Darüber hinaus entwickelte sie Backend-Funktionen in eigenen Projekten, etwa mit Java und Node.js. Eine langjährige Backend-Spezialisierung ist nicht dokumentiert."
  },
  {
    "id": 173,
    "question": "Hat sie Erfahrung mit automatisierten Tests?",
    "answer": "Softwarequalitätssicherung war Bestandteil ihrer Ausbildung. Welche konkreten automatisierten Testframeworks sie praktisch beherrscht, ist aus den vorliegenden Projektbeschreibungen nicht ausreichend belegt."
  },
  {
    "id": 174,
    "question": "Kennt sie CI/CD?",
    "answer": "Eine eigenständige Einrichtung oder Betreuung von CI/CD-Pipelines ist in den geprüften Portfolio-Informationen nicht dokumentiert."
  },
  {
    "id": 175,
    "question": "Hat sie Cloud-Erfahrung?",
    "answer": "Ihre Projekte und ihre Portfolio-Website nutzen verschiedene Online- und Hostingdienste. Daraus lässt sich allerdings keine umfassende berufliche Erfahrung mit Cloud-Architektur oder Cloud-Infrastruktur ableiten."
  },
  {
    "id": 176,
    "question": "Kennt sie Azure oder AWS?",
    "answer": "Eine konkrete praktische Spezialisierung auf Azure oder AWS ist in den geprüften Portfolio-Angaben nicht dokumentiert."
  },
  {
    "id": 177,
    "question": "Hat sie Erfahrung mit agiler Softwareentwicklung?",
    "answer": "Sie hat im Team und mit Jira Service Management gearbeitet. Ob und in welchem Umfang sie in einem formal definierten Scrum- oder Kanban-Prozess gearbeitet hat, geht daraus nicht eindeutig hervor."
  },
  {
    "id": 178,
    "question": "Kann sie Code-Reviews durchführen?",
    "answer": "Ekaterina hat Erfahrung darin, bestehenden Code zu lesen und zu analysieren. Ob sie bereits formale Code-Reviews im Team durchgeführt hat, ist nicht dokumentiert."
  },
  {
    "id": 179,
    "question": "Hat sie Erfahrung mit Software-Sicherheit?",
    "answer": "Das Portfolio dokumentiert allgemeine Entwicklungs- und Qualitätskenntnisse, aber keine eigenständige Spezialisierung auf Anwendungssicherheit oder Penetrationstests."
  },
  {
    "id": 180,
    "question": "Kann Ekaterina eine komplette Anwendung allein entwickeln?",
    "answer": "Ihre Projekte zeigen Erfahrungen mit verschiedenen Teilen der Softwareentwicklung, von Benutzeroberflächen bis zur Datenbankanbindung. Ob sie eine konkrete Anwendung vollständig eigenständig umsetzen kann, hängt von deren Anforderungen und Komplexität ab."
  },
  {
    "id": 181,
    "question": "Warum sollten wir Ekaterina einstellen?",
    "answer": "Ekaterina bringt eine abgeschlossene Ausbildung in Softwareentwicklung, erste praktische Erfahrung mit Unternehmenssoftware und eine hohe Bereitschaft zur Weiterentwicklung mit. Sie kennt sowohl Entwicklungsprojekte aus ihrer Ausbildung als auch die Arbeit mit bestehendem Anwendungscode. Besonders interessant dürfte sie für Teams sein, die eine Junior-Entwicklerin mit Lernbereitschaft und einer breiten beruflichen Perspektive suchen."
  },
  {
    "id": 182,
    "question": "Was könnte Ekaterina unserem Team bringen?",
    "answer": "Sie bringt Grundlagen der Softwareentwicklung, praktische Erfahrung in der Fehleranalyse und Kenntnisse aus mehreren Programmierumgebungen mit. Daneben verfügt sie über Erfahrung in der Zusammenarbeit mit Menschen aus unterschiedlichen beruflichen Bereichen."
  },
  {
    "id": 183,
    "question": "Was wäre ihr größter Mehrwert?",
    "answer": "Eine ihrer Stärken ist die Verbindung aus technischem Lernwillen und ihrer früheren Berufserfahrung. Sie kann sich mit Software sowohl aus Entwicklungssicht als auch mit Blick auf Arbeitsabläufe und Benutzer beschäftigen."
  },
  {
    "id": 184,
    "question": "Was macht sie, wenn sie eine Aufgabe nicht lösen kann?",
    "answer": "Ekaterina möchte technische Probleme verstehen und arbeitet daran, selbstständiger Lösungen zu entwickeln. Wie sie bei einer konkreten unbekannten Aufgabe vorgeht, lässt sich am besten in einem persönlichen Fachgespräch besprechen."
  },
  {
    "id": 185,
    "question": "Wie reagiert sie unter Zeitdruck?",
    "answer": "Ekaterina legt Wert auf klare Ziele und darauf, Aufgaben sorgfältig sowie termingerecht abzuschließen. Konkrete Beispiele zu ihrem Verhalten unter hohem Zeitdruck sind im Portfolio nicht ausführlich dokumentiert."
  },
  {
    "id": 186,
    "question": "Wie geht sie mit Konflikten im Team um?",
    "answer": "Ihr sind offene Kommunikation und gegenseitige Unterstützung wichtig. Wie sie einen bestimmten Konflikt lösen würde, sollte persönlich besprochen werden, statt ihr eine nicht dokumentierte Verhaltensweise zuzuschreiben."
  },
  {
    "id": 187,
    "question": "Was ist ihre größte berufliche Schwäche?",
    "answer": "Ekaterina möchte beim eigenständigen Schreiben von Code noch mehr Sicherheit gewinnen. Das ist ein konkretes Entwicklungsziel, an dem sie durch regelmäßige Programmierpraxis arbeitet. Weitere persönliche Schwächen sollten nicht ohne ihre eigene Aussage behauptet werden."
  },
  {
    "id": 188,
    "question": "Kann sie neue Anforderungen schnell umsetzen?",
    "answer": "Ekaterina hat bereits unterschiedliche Technologien und Projekte kennengelernt. Wie schnell sie eine bestimmte neue Anforderung umsetzen kann, hängt von deren Umfang und Komplexität ab und lässt sich aus dem Portfolio allein nicht zuverlässig vorhersagen."
  },
  {
    "id": 189,
    "question": "Wird sie langfristig in der Softwareentwicklung bleiben?",
    "answer": "Ihr beruflicher Fokus liegt derzeit klar auf der Softwareentwicklung, und sie investiert weiter in ihre Kenntnisse. Konkrete langfristige Entscheidungen oder Verpflichtungen kann Pixel aber nicht vorhersagen."
  },
  {
    "id": 190,
    "question": "Wo sieht sie sich in fünf Jahren?",
    "answer": "Ekaterina möchte sich als Softwareentwicklerin fachlich weiterentwickeln und mehr praktische Erfahrung sammeln. Eine konkrete Position oder ein festes Karriereziel für die nächsten fünf Jahre ist nicht dokumentiert."
  },
  {
    "id": 191,
    "question": "Welches Gehalt erwartet sie?",
    "answer": "Dazu enthält das Portfolio keine bestätigten Angaben. Für konkrete Gehaltsvorstellungen sollte man sich direkt an Ekaterina wenden."
  },
  {
    "id": 192,
    "question": "Was ist ihr größter beruflicher Erfolg?",
    "answer": `Ihr erfolgreicher Abschluss der akademischen Softwareentwicklungs-Ausbildung im ${softwareEngineeringCompletion} ist ein wichtiger Meilenstein. Außerdem hat sie praktische Erfahrung bei JAWA gesammelt und verschiedene eigene und gemeinschaftliche Softwareprojekte umgesetzt.`
  },
  {
    "id": 193,
    "question": "Welches Projekt findet sie persönlich am besten?",
    "answer": "Das Portfolio zeigt unterschiedliche Projekte und technische Schwerpunkte. Welches davon ihr persönlicher Favorit ist, sollte Ekaterina selbst beantworten."
  },
  {
    "id": 194,
    "question": "Was hat sie in der Ausbildung am meisten begeistert?",
    "answer": "Aus ihren Angaben wird deutlich, dass sie gerne technische Zusammenhänge versteht und Fehlerursachen untersucht. Welches konkrete Ausbildungsfach ihr am besten gefallen hat, ist nicht eindeutig dokumentiert."
  },
  {
    "id": 195,
    "question": "Kann sie eine Live-Coding-Aufgabe lösen?",
    "answer": "Aus ihrem Portfolio allein lässt sich ihre Leistung bei einer konkreten Live-Coding-Aufgabe nicht zuverlässig beurteilen. Sie hat Programmiergrundlagen gelernt und arbeitet daran, ihre eigenständige Programmierpraxis weiter zu stärken."
  },
  {
    "id": 196,
    "question": "Würde sie gut zu unserem Unternehmen passen?",
    "answer": "Das hängt von den Aufgaben, der eingesetzten Technologie und der Zusammenarbeit im Team ab. Ihre Interessen liegen in der praktischen Softwareentwicklung, im Lernen neuer Technologien und im gemeinsamen Lösen technischer Probleme."
  },
  {
    "id": 197,
    "question": "Warum sucht sie eine Junior-Stelle trotz ihrer früheren Berufserfahrung?",
    "answer": "Ekaterina hat bereits mehrere Jahre in anderen Berufsfeldern gearbeitet, steht aber noch am Anfang ihrer Laufbahn in der Softwareentwicklung. Deshalb ist eine Junior-Position ein sinnvoller Einstieg, um auf ihrer Ausbildung und bisherigen technischen Praxis aufzubauen."
  },
  {
    "id": 198,
    "question": "Kann sie Verantwortung übernehmen?",
    "answer": "Ekaterina bringt Berufserfahrung aus unterschiedlichen Tätigkeitsbereichen mit und hat auch technische Aufgaben in Projekten übernommen. Welchen Verantwortungsumfang sie in einer konkreten Entwicklungsposition übernehmen kann, sollte gemeinsam geklärt werden."
  },
  {
    "id": 199,
    "question": "Wie können wir Ekaterina kontaktieren?",
    "answer": "Über die Kontaktmöglichkeiten im Portfolio können Sie Ekaterina direkt eine Nachricht hinterlassen. Dort finden Sie außerdem ihren Lebenslauf und ihre GitHub-Projekte."
  },
  {
    "id": 200,
    "question": "Kann Pixel eine verbindliche Aussage im Namen von Ekaterina machen?",
    "answer": "Nein. Pixel informiert über dokumentierte Angaben aus ihrem Portfolio, kann aber keine verbindlichen Zusagen zu Stellenangeboten, Gehalt, Arbeitsbeginn oder vertraglichen Bedingungen machen. Solche Fragen müssen direkt mit Ekaterina geklärt werden."
  },
  {
    "id": 201,
    "question": "Erzählen Sie mir mehr über Ekaterina.",
    "answer": `Ekaterina lebt in Graz und hat einen vielseitigen beruflichen Hintergrund. Nach Tätigkeiten im Finanzbereich, in der Hotellerie und im sprachlichen Umfeld hat sie sich für die Softwareentwicklung entschieden. Im ${softwareEngineeringCompletion} schloss sie ihre akademische Ausbildung an der FH CAMPUS 02 ab und bringt bereits praktische Erfahrung aus ihrer Tätigkeit bei JAWA mit.`
  },
  {
    "id": 202,
    "question": "Was macht Ekaterinas Lebenslauf besonders?",
    "answer": "Ihr beruflicher Weg verbindet mehrere Bereiche, die auf den ersten Blick unterschiedlich wirken. Sie hat im Finanzwesen gearbeitet, Menschen in der Hotellerie betreut, Sprachen studiert und sich schließlich der Softwareentwicklung zugewandt. Diese Erfahrungen geben ihr unterschiedliche Perspektiven auf Arbeitsabläufe, Kommunikation und technische Anwendungen."
  },
  {
    "id": 203,
    "question": "Ist Ekaterina eine Quereinsteigerin?",
    "answer": `Ja. Sie ist über Weiterbildungen und eine akademische Softwareentwicklungs-Ausbildung in die IT gewechselt. Gleichzeitig hat sie bereits ${jawaExperienceMonths} Monate praktische Erfahrung in einem Softwareunternehmen gesammelt und ist damit keine Einsteigerin ohne Programmiererfahrung.`
  },
  {
    "id": 204,
    "question": "War ihr Weg in die IT geradlinig?",
    "answer": "Nein, Ekaterina hat sich beruflich über mehrere Stationen weiterentwickelt. Ihr Weg führte von Wirtschaft und Management über Kommunikation und Kundenbetreuung zur Softwareentwicklung. Gerade diese unterschiedlichen Erfahrungen sind Teil ihres beruflichen Profils."
  },
  {
    "id": 205,
    "question": "Warum hat sie sich noch einmal für eine neue Ausbildung entschieden?",
    "answer": "Ekaterina wollte ihre Kenntnisse in der Softwareentwicklung auf eine fundierte Grundlage stellen. Deshalb ergänzte sie ihre ersten Webentwicklungskenntnisse durch eine umfangreichere akademische Ausbildung mit Programmierung, Datenbanken, Architektur und praktischen Projekten."
  },
  {
    "id": 206,
    "question": "Was sagt ihr beruflicher Wechsel über sie aus?",
    "answer": "Der Wechsel zeigt, dass Ekaterina bereit war, Zeit und Arbeit in ein neues Fachgebiet zu investieren. Sie hat sich nicht auf einzelne kurze Kurse beschränkt, sondern eine umfassendere Ausbildung abgeschlossen und praktische Erfahrung im Unternehmen gesammelt."
  },
  {
    "id": 207,
    "question": "Hat sie ihren beruflichen Wechsel erfolgreich abgeschlossen?",
    "answer": `Ihre akademische Softwareentwicklungs-Ausbildung hat Ekaterina im ${softwareEngineeringCompletion} erfolgreich abgeschlossen. Sie möchte nun den nächsten Schritt gehen und sich langfristig durch praktische Entwicklungsaufgaben weiterqualifizieren.`
  },
  {
    "id": 208,
    "question": "Wie hat sie Softwareentwicklung und berufliche Praxis verbunden?",
    "answer": "Während ihrer Ausbildung sammelte Ekaterina praktische Erfahrung bei JAWA Management Software in Graz. Dort arbeitete sie mit bestehendem Code, analysierte Fehler und beschäftigte sich mit Aufgaben aus Kundenprojekten. So konnte sie ihre Ausbildung durch Einblicke in die betriebliche Softwareentwicklung ergänzen."
  },
  {
    "id": 209,
    "question": "Warum sucht sie nach dem Abschluss eine Junior-Stelle?",
    "answer": "Ekaterina hat die fachliche Ausbildung abgeschlossen, steht aber noch am Anfang ihrer Laufbahn als Softwareentwicklerin. Sie möchte das Gelernte im Arbeitsalltag festigen und zunehmend selbstständig Entwicklungsaufgaben übernehmen."
  },
  {
    "id": 210,
    "question": "Welches berufliche Ziel verfolgt sie?",
    "answer": "Ihr Ziel ist eine Tätigkeit, in der sie regelmäßig programmiert und praktische Erfahrung sammelt. Sie möchte sich technisch weiterentwickeln, sicherer im Schreiben von Code werden und an sinnvollen Softwarelösungen mitarbeiten."
  },
  {
    "id": 211,
    "question": "Was möchte sie aus ihren bisherigen Berufen in die Softwareentwicklung mitnehmen?",
    "answer": "Aus ihren früheren Tätigkeiten bringt sie Erfahrung im Umgang mit Menschen, mit organisatorischen Aufgaben und mit sorgfältiger Arbeit mit. Dieses Wissen ergänzt ihre technische Ausbildung und hilft ihr, Software nicht nur als Code, sondern auch als Werkzeug für reale Arbeitsabläufe zu betrachten."
  },
  {
    "id": 212,
    "question": "Was verbindet ihre früheren Berufe mit der Softwareentwicklung?",
    "answer": "In ihren bisherigen beruflichen Stationen ging es häufig darum, Informationen zu verstehen, sorgfältig zu bearbeiten und mit anderen Menschen zusammenzuarbeiten. In der Softwareentwicklung begegnet sie anderen technischen Aufgaben, kann aber auf diese Erfahrungen zurückgreifen."
  },
  {
    "id": 213,
    "question": "Hat sie Erfahrung mit Verantwortung?",
    "answer": "Ekaterina hat in ihrer früheren Laufbahn unter anderem ein Backoffice im Wertpapierbereich geleitet. Das ist ein Teil ihrer Berufserfahrung außerhalb der IT. In der Softwareentwicklung ist sie dagegen als Juniorin einzuordnen."
  },
  {
    "id": 214,
    "question": "Wie sieht Ekaterinas aktuelle berufliche Situation aus?",
    "answer": "Ekaterina hat ihre Softwareentwicklungs-Ausbildung erfolgreich abgeschlossen und sucht eine passende Tätigkeit in diesem Bereich. Parallel beschäftigt sie sich weiter mit Programmierung und der Weiterentwicklung ihrer Projekte."
  },
  {
    "id": 215,
    "question": "Was sucht sie in ihrem nächsten beruflichen Schritt?",
    "answer": "Sie möchte in einem Umfeld arbeiten, in dem sie praktische Entwicklungsaufgaben übernehmen und sich fachlich verbessern kann. Wichtig ist ihr, dass sie wirklich mit Code arbeitet und nicht ausschließlich theoretische oder administrative Aufgaben erledigt."
  },
  {
    "id": 216,
    "question": "Was ist Ekaterina als Mensch wichtig?",
    "answer": "Ekaterina schätzt offene Kommunikation, gegenseitige Unterstützung und einen respektvollen Umgang. Sie arbeitet gerne mit Menschen zusammen, die Ideen austauschen und gemeinsam Lösungen finden möchten."
  },
  {
    "id": 217,
    "question": "Ist sie eher neugierig oder vorsichtig?",
    "answer": "Neugier gehört zu den Eigenschaften, die in ihrem beruflichen Weg sichtbar werden. Sie beschäftigt sich gerne mit neuen Themen und möchte verstehen, wie Dinge funktionieren. Gleichzeitig ist ihr wichtig, technische Vorschläge zu prüfen, statt sie ungefragt zu übernehmen."
  },
  {
    "id": 218,
    "question": "Was treibt Ekaterina an?",
    "answer": "Sie möchte sich weiterentwickeln und ihr Wissen praktisch einsetzen. Besonders motivierend findet sie Aufgaben, bei denen sie einen technischen Zusammenhang verstehen oder die Ursache eines Problems herausfinden kann."
  },
  {
    "id": 219,
    "question": "Was begeistert sie an Softwareentwicklung?",
    "answer": "Ekaterina interessiert sich dafür, wie aus einer Idee eine funktionierende Anwendung entsteht. Sie möchte verstehen, wie die einzelnen Teile zusammenarbeiten und wie sich Probleme im Code lösen lassen."
  },
  {
    "id": 220,
    "question": "Was gefällt ihr an der Fehlersuche?",
    "answer": "Bei der Fehlersuche kann sie Schritt für Schritt nachvollziehen, warum sich eine Anwendung anders verhält als erwartet. Diese analytische Arbeit hat sie während ihrer Zeit bei JAWA besonders interessiert."
  },
  {
    "id": 221,
    "question": "Ist Ekaterina ein kreativer Mensch?",
    "answer": "Ihre Projekte zeigen Interesse an Gestaltung und technischen Lösungen. Bei YogaNow Studio beschäftigte sie sich mit dem Design, und bei CAMPUS02 ColorSpiel entwickelte sie zusätzliche grafische Elemente und einen Wintermodus."
  },
  {
    "id": 222,
    "question": "Was bedeutet Qualität für Ekaterina?",
    "answer": "Sie möchte verstehen, was ihr Code macht, und die Ergebnisse ihrer Arbeit überprüfen. Diese Haltung zeigt sich auch darin, dass sie KI-Vorschläge nicht einfach übernehmen, sondern nachvollziehen und testen möchte."
  },
  {
    "id": 223,
    "question": "Wie wichtig ist ihr Weiterentwicklung?",
    "answer": "Weiterentwicklung ist ein zentraler Teil ihres beruflichen Weges. Nach verschiedenen Weiterbildungen schloss sie eine umfangreiche Softwareentwicklungs-Ausbildung ab und beschäftigt sich weiterhin mit Programmierung und neuen Themen."
  },
  {
    "id": 224,
    "question": "Arbeitet sie gerne an Details?",
    "answer": "Ekaterina legt Wert darauf, Aufgaben aufmerksam und sorgfältig umzusetzen. In der Softwareentwicklung interessiert sie sich besonders für Details, die das Verhalten einer Anwendung beeinflussen."
  },
  {
    "id": 225,
    "question": "Wie geht sie mit Dingen um, die sie noch nicht kann?",
    "answer": "Sie möchte fehlendes Wissen durch Lernen und praktische Übungen aufbauen. Ein aktuelles Entwicklungsziel ist beispielsweise, beim eigenständigen Schreiben von Programmcode sicherer zu werden."
  },
  {
    "id": 226,
    "question": "Ist Ekaterina offen für Veränderungen?",
    "answer": "Ihr beruflicher Werdegang zeigt, dass sie bereit ist, neue Wege einzuschlagen und sich weiterzubilden. Der Wechsel in die Softwareentwicklung war dabei eine besonders umfangreiche berufliche Veränderung."
  },
  {
    "id": 227,
    "question": "Was bedeutet Erfolg für sie?",
    "answer": "Ein nachvollziehbares Ziel ihres bisherigen Lernwegs ist es, neue Kenntnisse nicht nur theoretisch zu erwerben, sondern praktisch anwenden zu können. Eine darüber hinausgehende persönliche Definition von Erfolg hat sie im Portfolio nicht ausdrücklich festgelegt."
  },
  {
    "id": 228,
    "question": "Warum könnte man gerne mit ihr zusammenarbeiten?",
    "answer": "Ekaterina legt Wert auf ein freundliches Miteinander und einen offenen Austausch. Sie arbeitet gerne im Team, interessiert sich für neue Ideen und möchte gemeinsam mit anderen Lösungen entwickeln."
  },
  {
    "id": 229,
    "question": "Ist sie ehrgeizig?",
    "answer": "Ihr Ausbildungsweg und der bewusste Einstieg in die Softwareentwicklung sprechen für eine klare berufliche Zielsetzung. Sie möchte ihre Fähigkeiten kontinuierlich ausbauen und sich neue Aufgaben zutrauen können."
  },
  {
    "id": 230,
    "question": "Wie wichtig ist ihr Selbstständigkeit?",
    "answer": "Selbstständigkeit ist ein wichtiges Lernziel für sie. Ekaterina möchte Code nicht nur lesen und verstehen, sondern Lösungen zunehmend eigenständig entwickeln und umsetzen."
  },
  {
    "id": 231,
    "question": "Wie lernt Ekaterina am besten?",
    "answer": "Sie möchte technische Konzepte mit praktischen Übungen verbinden. Besonders wichtig ist ihr, selbst Code zu schreiben, Fehler zu erkennen und die Funktionsweise einer Lösung zu verstehen."
  },
  {
    "id": 232,
    "question": "Warum sind praktische Aufgaben für sie wichtig?",
    "answer": "Durch praktische Aufgaben kann Ekaterina ihr theoretisches Wissen anwenden und festigen. Sie möchte dadurch Routine gewinnen und beim Programmieren unabhängiger von Hilfsmitteln werden."
  },
  {
    "id": 233,
    "question": "Wie entwickelt sie ihre Programmierkenntnisse weiter?",
    "answer": "Ekaterina beschäftigt sich mit Lernmaterialien, wiederholt Programmierkonzepte und arbeitet an eigenen Projekten. Ihr Schwerpunkt liegt darauf, die Umsetzung von Lösungen selbstständiger zu beherrschen."
  },
  {
    "id": 234,
    "question": "Versteht sie objektorientierte Programmierung?",
    "answer": "Objektorientierte Programmierung war ein zentraler Bestandteil ihrer Ausbildung. Sie hat diese Konzepte in Java-Projekten und bei ihrer C#-Desktopanwendung praktisch eingesetzt."
  },
  {
    "id": 235,
    "question": "Warum fällt ihr Syntax manchmal schwerer als das Verständnis?",
    "answer": "Ekaterina hat beschrieben, dass sie vorhandenen Code oft nachvollziehen kann, beim eigenständigen Schreiben aber noch mehr Routine benötigt. Deshalb konzentriert sie sich darauf, Syntax durch praktische Wiederholung sicherer anzuwenden."
  },
  {
    "id": 236,
    "question": "Ist es problematisch, dass sie noch nicht jede Syntax auswendig kennt?",
    "answer": "Die Sicherheit in einer bestimmten Programmiersprache hängt auch davon ab, wie regelmäßig sie verwendet wird. Ekaterina möchte ihre Kenntnisse gezielt auffrischen und durch selbstständige Programmieraufgaben festigen. Wie sicher sie eine Sprache aktuell beherrscht, sollte anhand konkreter Aufgaben beurteilt werden."
  },
  {
    "id": 237,
    "question": "Wie geht Ekaterina an ein unbekanntes technisches Thema heran?",
    "answer": "Sie möchte zunächst die grundlegenden Zusammenhänge verstehen und sich anschließend praktisch damit beschäftigen. Welche Vorgehensweise sie in einer bestimmten Situation wählen würde, hängt von der konkreten Aufgabe ab."
  },
  {
    "id": 238,
    "question": "Was möchte sie beim Debugging weiterentwickeln?",
    "answer": "Ekaterina hat bereits Erfahrung mit dem Nachvollziehen von PHP-Code und dem Einsatz von Xdebug gesammelt. Darauf aufbauend möchte sie ihre technischen Kenntnisse weiter vertiefen und zunehmend eigenständig Probleme lösen."
  },
  {
    "id": 239,
    "question": "Kann sie fremden Code lesen?",
    "answer": "Ja. Bei JAWA beschäftigte sie sich mit bestehendem Anwendungscode und versuchte, Fehler und Programmabläufe nachzuvollziehen. Diese Erfahrung ist auch für die Einarbeitung in andere Softwareprojekte relevant."
  },
  {
    "id": 240,
    "question": "Möchte sie lieber selbst programmieren oder KI verwenden?",
    "answer": "Ihr Ziel ist es, selbstständig programmieren zu können. KI nutzt sie als unterstützendes Werkzeug, beispielsweise zum Erkunden von Lösungsansätzen oder zur Analyse von Fehlern."
  },
  {
    "id": 241,
    "question": "Wie entscheidet sie, ob KI-generierter Code sinnvoll ist?",
    "answer": "Ekaterina möchte verstehen, was vorgeschlagener Code macht, und ihn praktisch überprüfen. Es geht ihr nicht darum, jeden Vorschlag ungeprüft zu übernehmen, sondern passende Lösungen bewusst auszuwählen."
  },
  {
    "id": 242,
    "question": "Welche Rolle spielt Theorie in ihrem Lernen?",
    "answer": "Die theoretischen Grundlagen helfen ihr, den Aufbau und die Funktionsweise von Anwendungen zu verstehen. Gleichzeitig möchte sie dieses Wissen durch regelmäßige Programmierpraxis festigen."
  },
  {
    "id": 243,
    "question": "Was ist ihr nächstes technisches Lernziel?",
    "answer": "Ekaterina möchte ihre Kenntnisse in Python ausbauen und sich mit Themen rund um KI und Datenverarbeitung beschäftigen. Parallel bleibt das eigenständige Programmieren ein wichtiger Schwerpunkt."
  },
  {
    "id": 244,
    "question": "Interessiert sie sich für die Verbindung von Frontend und Backend?",
    "answer": "Ja. Sie möchte besser verstehen, wie Benutzeroberflächen, Serverlogik, APIs und Datenbanken zusammenarbeiten. Verschiedene Projekte in ihrem Portfolio beschäftigen sich bereits mit Teilen dieser Architektur."
  },
  {
    "id": 245,
    "question": "Woran erkennt man ihren Lernfortschritt?",
    "answer": "Ihr Portfolio zeigt Projekte aus unterschiedlichen Ausbildungsphasen und mit verschiedenen Technologien. Dadurch lässt sich nachvollziehen, wie sie sich von ersten Webprojekten zu umfangreicheren Anwendungen und Backend-Funktionen weiterentwickelt hat."
  },
  {
    "id": 246,
    "question": "Was macht für Ekaterina eine gute Anwendung aus?",
    "answer": "Ekaterina interessiert sich für Anwendungen, die verständlich aufgebaut sind und eine konkrete Aufgabe erfüllen. In ihren Projekten beschäftigt sie sich deshalb sowohl mit der Benutzeroberfläche als auch mit den technischen Funktionen im Hintergrund."
  },
  {
    "id": 247,
    "question": "Ist ihr Benutzerfreundlichkeit wichtig?",
    "answer": "Ja. In ihren Webprojekten und bei der Gestaltung ihres Portfolios legt sie Wert auf klare Oberflächen und eine nachvollziehbare Bedienung. Die technische Funktion soll für die Nutzer verständlich zugänglich sein."
  },
  {
    "id": 248,
    "question": "Hat sie einen Blick für Design?",
    "answer": "Ekaterina beschäftigt sich mit der visuellen Gestaltung ihrer Anwendungen. Bei YogaNow Studio übernahm sie Designaufgaben, während sie bei anderen Projekten eigene Oberflächen und grafische Elemente umsetzte."
  },
  {
    "id": 249,
    "question": "Kann sie responsive Websites entwickeln?",
    "answer": "Sie hat sich in ihrer Webentwicklungsausbildung mit responsiver Gestaltung beschäftigt und diese beispielsweise bei ihrem WordPress-Projekt Feta umgesetzt."
  },
  {
    "id": 250,
    "question": "Wie wichtig ist ihr die Struktur von Code?",
    "answer": "Die Struktur von Software gehört zu den Themen ihrer Ausbildung. In Projekten wie der Hotelverwaltung und der Geschenkeverwaltung beschäftigte sie sich mit der Trennung verschiedener Verantwortlichkeiten innerhalb einer Anwendung."
  },
  {
    "id": 251,
    "question": "Hat sie verstanden, wie Frontend und Backend zusammenarbeiten?",
    "answer": "Ekaterina hat beide Bereiche in ihrer Ausbildung und in Projekten kennengelernt. Besonders deutlich wird das bei CAMPUS02 ColorSpiel, wo eine browserbasierte Oberfläche mit einem eigenen Node.js-Backend verbunden ist."
  },
  {
    "id": 252,
    "question": "Warum ist eine API wichtig?",
    "answer": "Eine API ermöglicht die Kommunikation zwischen verschiedenen Softwarekomponenten oder Diensten. Ekaterina hat sich damit in ihrer Ausbildung beschäftigt und externe APIs beispielsweise in ShopPlatzi verwendet."
  },
  {
    "id": 253,
    "question": "Kann sie Anwendungen mit Datenbanken verbinden?",
    "answer": "Ja. Ihre Projekte zeigen unterschiedliche Formen der Datenbankanbindung, etwa mit JDBC, Hibernate, Entity Framework und Supabase. Bei JAWA beschäftigte sie sich ebenfalls mit SQL und Datenbankinhalten."
  },
  {
    "id": 254,
    "question": "Versteht sie das Konzept von Schichtenarchitektur?",
    "answer": "Softwarearchitektur war Teil ihrer Ausbildung. In der Geschenkeverwaltung zeigt sie beispielsweise die Zusammenarbeit von Benutzeroberfläche, ViewModel und Datenzugriff."
  },
  {
    "id": 255,
    "question": "Hat sie Erfahrung mit objektorientiertem Design?",
    "answer": "Ja. Sie hat objektorientierte Programmierung gelernt und in Java- und C#-Projekten eingesetzt. Dadurch konnte sie sich mit Klassen, Objekten und der Strukturierung von Programmlogik beschäftigen."
  },
  {
    "id": 256,
    "question": "Kann sie mit neuen Frameworks arbeiten?",
    "answer": "Ekaterina hat sich bereits mit verschiedenen Frameworks und Bibliotheken beschäftigt, darunter Vue, Hibernate und WPF. Bei einem neuen Framework würde sie sich zunächst mit dessen Grundlagen und Anwendung beschäftigen müssen."
  },
  {
    "id": 257,
    "question": "Was ist ihr bei einem technischen Problem wichtig?",
    "answer": "Sie möchte möglichst verstehen, wodurch das Problem entsteht. Ihre praktische Arbeit mit Xdebug bei JAWA bot ihr die Gelegenheit, sich gezielt mit solchen Ursachen auseinanderzusetzen."
  },
  {
    "id": 258,
    "question": "Interessiert sie sich für Softwarewartung?",
    "answer": "Ja. Ihre Erfahrung bei JAWA konzentrierte sich unter anderem auf bestehenden Anwendungscode und die Analyse gemeldeter Fehler. Damit hat sie bereits Einblicke in die Arbeit an vorhandener Software gesammelt."
  },
  {
    "id": 259,
    "question": "Arbeitet sie lieber an neuen oder bestehenden Projekten?",
    "answer": "Sie kennt beide Situationen: neue Anwendungen aus ihrer Ausbildung und die Arbeit mit bestehendem Code bei JAWA. Eine ausdrückliche Präferenz für ausschließlich neue oder bestehende Projekte ist nicht dokumentiert."
  },
  {
    "id": 260,
    "question": "Hat sie Verständnis für Geschäftsprozesse?",
    "answer": "Ekaterina hat vor ihrer IT-Laufbahn in verschiedenen wirtschaftlichen und organisatorischen Bereichen gearbeitet. Bei JAWA kam sie außerdem mit einer Managementplattform für betriebliche Anwendungen in Kontakt."
  },
  {
    "id": 261,
    "question": "Welches Projekt zeigt ihren Einstieg in die IT?",
    "answer": "Feta dokumentiert Ekaterinas Einstieg in die Webentwicklung. Im Rahmen ihrer WIFI-Ausbildung entwickelte sie eine WordPress-Website mit eigenem Theme, Produktkatalog und Kontaktformular."
  },
  {
    "id": 262,
    "question": "Welches Projekt zeigt ihre Kenntnisse in HTML und CSS?",
    "answer": "Das Kaffeehaus Mokka ist ein Beispiel dafür. Ekaterina beschäftigte sich dort mit Seitenstruktur, responsivem Layout und der Gestaltung einer Website."
  },
  {
    "id": 263,
    "question": "Welches Projekt zeigt ihre Java-Kenntnisse besonders gut?",
    "answer": "Die Hotelverwaltung und das konsolenbasierte UNO-Spiel sind gute Beispiele. Die Projekte behandeln unterschiedliche Bereiche, von objektorientierter Spiellogik bis zur Datenbankprogrammierung."
  },
  {
    "id": 264,
    "question": "Welches Projekt zeigt ihr Verständnis für Datenbanken?",
    "answer": "Die Hotelverwaltung verbindet Java mit Hibernate, JPA und Datenbankabfragen. Auch die Geschenkeverwaltung und YogaNow Studio enthalten dokumentierte Datenbankanbindungen."
  },
  {
    "id": 265,
    "question": "Welches Projekt zeigt ihre Kenntnisse in C#?",
    "answer": "Die Geschenkeverwaltung ist eine Windows-Desktopanwendung mit C#, WPF und MVVM. Sie zeigt unter anderem die Trennung zwischen Benutzeroberfläche, Anwendungslogik und Datenzugriff."
  },
  {
    "id": 266,
    "question": "Welches Projekt zeigt ihre Arbeit mit APIs?",
    "answer": "ShopPlatzi lädt Produktinformationen über die Platzi Fake Store API. Damit zeigt das Projekt die Verbindung einer Vue-Anwendung mit einem externen Datendienst."
  },
  {
    "id": 267,
    "question": "Welches Projekt zeigt ihre mobilen Entwicklungserfahrungen?",
    "answer": "YogaNow Studio ist ihr dokumentiertes iOS-Projekt. Die App wurde im Team entwickelt und verbindet eine Yoga-Bibliothek mit einer Möglichkeit zur Kursbuchung."
  },
  {
    "id": 268,
    "question": "Welches Projekt zeigt ihre Fähigkeit zur Weiterentwicklung vorhandener Software?",
    "answer": "CAMPUS02 ColorSpiel ist ein gutes Beispiel. Nach der gemeinsamen Entwicklung der ursprünglichen Spieloberfläche ergänzte Ekaterina ein eigenes Backend und zusätzliche Gestaltungselemente."
  },
  {
    "id": 269,
    "question": "Welches Projekt zeigt ihre Arbeit mit Zustandsverwaltung?",
    "answer": "Die To-do-App und ShopPlatzi verwenden Pinia. In beiden Anwendungen hilft die Zustandsverwaltung dabei, Informationen wie Aufgaben oder Produkte innerhalb der Anwendung zu organisieren."
  },
  {
    "id": 270,
    "question": "Welches Projekt zeigt ihr Verständnis für REST-APIs und Backend?",
    "answer": "CAMPUS02 ColorSpiel verbindet eine Weboberfläche mit einem Backend auf Basis von Node.js und Express. ShopPlatzi zeigt zusätzlich die Nutzung einer externen REST-API."
  },
  {
    "id": 271,
    "question": "Hat sie Projekte mit mehreren Programmiersprachen umgesetzt?",
    "answer": "Ja. In ihren Projekten kommen unter anderem Java, C#, Swift, JavaScript und TypeScript vor. Allerdings unterscheiden sich ihre Erfahrung und die Art ihrer Beteiligung je nach Projekt."
  },
  {
    "id": 272,
    "question": "Hat sie Projekte für verschiedene Plattformen?",
    "answer": "Ja. Ihr Portfolio enthält browserbasierte Anwendungen, eine iOS-App, Windows-Desktopsoftware und Konsolenprogramme."
  },
  {
    "id": 273,
    "question": "Warum hat sie so unterschiedliche Projekte?",
    "answer": "Die Projekte entstanden in verschiedenen Ausbildungsphasen und Lernzusammenhängen. Dadurch konnte Ekaterina unterschiedliche Technologien und Arten der Softwareentwicklung kennenlernen."
  },
  {
    "id": 274,
    "question": "Was sagt ihre Projektvielfalt über sie aus?",
    "answer": "Ihre Projekte zeigen eine breite technische Orientierung. Sie hat verschiedene Entwicklungsbereiche kennengelernt und möchte ihr Wissen weiter vertiefen, statt bereits eine langjährige Spezialisierung zu behaupten."
  },
  {
    "id": 275,
    "question": "Gibt es Projekte, die sie in einer Gruppe umgesetzt hat?",
    "answer": "Ja. Dazu gehören YogaNow Studio, die Java-Version von UNO und die ursprüngliche Oberfläche von CAMPUS02 ColorSpiel. Ihre persönlichen Aufgaben unterscheiden sich bei den einzelnen Teamprojekten."
  },
  {
    "id": 276,
    "question": "Hat sie auch Projekte nach der eigentlichen Ausbildung erweitert?",
    "answer": "Bei CAMPUS02 ColorSpiel ist eine individuelle Weiterentwicklung dokumentiert. Sie ergänzte dort ein Backend sowie eigene grafische Elemente und einen Wintermodus."
  },
  {
    "id": 277,
    "question": "Ist ihre Portfolio-Website selbst ein Projekt?",
    "answer": "Ja. " + portfolioAssistantReply
  },
  {
    "id": 278,
    "question": "Warum hat sie einen KI-Assistenten in ihre Website integriert?",
    "answer": "Pixel dient dazu, Besucher bei Fragen über ihre Ausbildung, Berufserfahrung und Projekte zu unterstützen. Gleichzeitig ermöglicht ihr das Projekt, sich praktisch mit der Einbindung von KI in eine Webanwendung zu beschäftigen."
  },
  {
    "id": 279,
    "question": "Welche Technologien nutzt Pixel?",
    "answer": portfolioAssistantReply
  },
  {
    "id": 280,
    "question": "Was lernt Ekaterina bei der Weiterentwicklung von Pixel?",
    "answer": "Pixel verbindet mehrere Themen, darunter Benutzeroberflächen, Sprachversionen, API-Anfragen und die zuverlässige Verarbeitung von Informationen. Bei der Weiterentwicklung beschäftigt sich Ekaterina auch damit, wie ein Assistent natürlich antworten kann, ohne falsche Angaben zu machen."
  },
  {
    "id": 281,
    "question": "Welche Erfahrung hat Ekaterina im Finanzwesen?",
    "answer": "Ekaterina arbeitete mehrere Jahre im Wertpapierbereich und hatte Aufgaben in der Kundenbetreuung, der Abwicklung von Geschäften und der Dokumentation. Später übernahm sie auch Aufgaben im internen Kontrollbereich."
  },
  {
    "id": 282,
    "question": "Hat sie Führungserfahrung?",
    "answer": "Sie leitete in ihrer früheren beruflichen Laufbahn ein Backoffice im Wertpapierbereich. Diese Erfahrung stammt aus der Finanzbranche und ist von ihrer jetzigen Junior-Rolle in der Softwareentwicklung zu unterscheiden."
  },
  {
    "id": 283,
    "question": "Was hat sie im Backoffice gemacht?",
    "answer": "Zu ihren Aufgaben gehörten unter anderem die Betreuung von Kunden, die Abwicklung von Wertpapiergeschäften und die Verwaltung entsprechender Unterlagen. In einer späteren Position übernahm sie auch eine Leitungsfunktion."
  },
  {
    "id": 284,
    "question": "Hat sie mit sensiblen Geschäftsprozessen gearbeitet?",
    "answer": "Ihre früheren Tätigkeiten umfassten die Verarbeitung von Finanzinformationen und die Kontrolle von Wertpapiergeschäften. Konkrete Angaben zu Sicherheitsfreigaben oder besonderen Compliance-Zertifizierungen sind nicht dokumentiert."
  },
  {
    "id": 285,
    "question": "Welche Erfahrung hat sie im internen Controlling?",
    "answer": "Im Finanzbereich beschäftigte sie sich mit der Kontrolle von Wertpapieroperationen, der Überwachung von Geldbeständen und der Begleitung von Wertpapierübertragungen."
  },
  {
    "id": 286,
    "question": "Hat sie Erfahrung mit internationalen oder unterschiedlichen Kunden?",
    "answer": "Ekaterina bringt Kundenkontakt aus verschiedenen beruflichen Bereichen mit. Außerdem hat sie Transkulturelle Kommunikation studiert und als ehrenamtliche Dolmetscherin gearbeitet."
  },
  {
    "id": 287,
    "question": "Was hat sie in der Hotellerie gemacht?",
    "answer": "Sie arbeitete von August 2020 bis Juli 2024 als Rezeptionistin im Boutiquehotel Dom in Graz. Zuvor absolvierte sie eine entsprechende Qualifizierung am WIFI Steiermark."
  },
  {
    "id": 288,
    "question": "Warum ist ihre Erfahrung als Rezeptionistin relevant?",
    "answer": "Die Tätigkeit umfasste den direkten Umgang mit Menschen in einem serviceorientierten Umfeld. Für eine spätere Tätigkeit in der Softwareentwicklung kann diese Perspektive hilfreich sein, insbesondere wenn Anwendungen für Nutzer und betriebliche Abläufe entwickelt werden."
  },
  {
    "id": 289,
    "question": "Hat sie Erfahrung in der Kommunikation mit Menschen?",
    "answer": "Ja. Kundenkontakt gehörte zu mehreren ihrer bisherigen Tätigkeiten. Darüber hinaus beschäftigte sie sich während ihres Studiums mit transkultureller Kommunikation."
  },
  {
    "id": 290,
    "question": "Hat Ekaterina mehrere berufliche Qualifikationen?",
    "answer": "Ja. Neben ihrem Abschluss in Softwareentwicklung verfügt sie über weitere Ausbildungsabschlüsse und Qualifikationen, unter anderem in Transkultureller Kommunikation, Wirtschaft und Management sowie im Hotelbereich."
  },
  {
    "id": 291,
    "question": "Kann sie Fachwissen aus der Wirtschaft mit Softwareentwicklung verbinden?",
    "answer": "Ekaterina hat einen wirtschaftlichen Ausbildungshintergrund und Erfahrung mit betrieblichen Abläufen. In der Softwareentwicklung kann sie diese Perspektive bei der Beschäftigung mit Geschäftsprozessen und Verwaltungsanwendungen einbringen."
  },
  {
    "id": 292,
    "question": "Hat sie Erfahrung mit Dokumentation?",
    "answer": "Dokumentation gehörte bereits zu früheren beruflichen Tätigkeiten. In der Softwareentwicklung dokumentiert sie außerdem ihre Projekte und zeigt teilweise technische Strukturen, beispielsweise Datenmodelle und Architekturdiagramme."
  },
  {
    "id": 293,
    "question": "Wie hilfreich sind ihre Sprachkenntnisse?",
    "answer": "Russisch ist Ekaterinas Muttersprache. Deutsch, Englisch und Italienisch hat sie in unterschiedlichen Zusammenhängen gelernt beziehungsweise verwendet. Für eine bestimmte Stelle sollte geprüft werden, welches aktive Niveau der Fremdsprachen benötigt wird."
  },
  {
    "id": 294,
    "question": "Hat sie schon einmal Menschen durch sprachliche Barrieren geholfen?",
    "answer": "Ja. Ekaterina war ehrenamtlich bei Caritas Marienambulanz tätig und unterstützte dort beim Dolmetschen ins Russische."
  },
  {
    "id": 295,
    "question": "Was ist ihr Vorteil gegenüber einer Person ohne vorherige Berufserfahrung?",
    "answer": "Ekaterina bringt Erfahrungen aus mehreren beruflichen Bereichen mit. Dadurch kennt sie bereits unterschiedliche Arbeitsabläufe, Kundenkontakt und organisatorische Aufgaben, während sie ihre technische Laufbahn als Entwicklerin weiter aufbaut."
  },
  {
    "id": 296,
    "question": "Wie könnte Ekaterinas Einarbeitung aussehen?",
    "answer": "Ekaterina bringt bereits Grundlagen aus Ausbildung und Unternehmenspraxis mit. Besonders sinnvoll wäre eine Einarbeitung, bei der sie die bestehende Anwendung kennenlernt, erste überschaubare Entwicklungsaufgaben übernimmt und ihre Selbstständigkeit schrittweise ausbaut."
  },
  {
    "id": 297,
    "question": "Was sollte ihr zukünftiger Arbeitgeber über sie wissen?",
    "answer": "Ekaterina ist keine langjährig erfahrene Entwicklerin, bringt aber eine abgeschlossene Ausbildung und erste praktische Erfahrung mit. Sie möchte tatsächlich programmieren, ihr Wissen anwenden und durch neue Aufgaben weiterlernen."
  },
  {
    "id": 298,
    "question": "Braucht sie Unterstützung durch erfahrene Entwickler?",
    "answer": "Als Junior-Entwicklerin kann sie vom fachlichen Austausch mit erfahrenen Kolleginnen und Kollegen profitieren. Gleichzeitig möchte sie zunehmend eigenständig arbeiten und ihr Wissen durch eigene Lösungen festigen."
  },
  {
    "id": 299,
    "question": "Kann sie sich in eine bestehende Codebasis einarbeiten?",
    "answer": "Bei JAWA beschäftigte sie sich mit bestehendem PHP-Code und untersuchte Fehler in einer modularen Unternehmensanwendung. Das bietet ihr eine praktische Grundlage für die Einarbeitung in weitere Codebasen."
  },
  {
    "id": 300,
    "question": "Ist sie geeignet für ein kleines Entwicklerteam?",
    "answer": "Sie arbeitet gerne mit anderen Menschen zusammen und schätzt eine unterstützende Teamkultur. Ob sie zu einem bestimmten kleinen Team passt, hängt von dessen Aufgaben, Technologien und Arbeitsweise ab."
  },
  {
    "id": 301,
    "question": "Ist sie geeignet für ein größeres Unternehmen?",
    "answer": "Ekaterina hat bereits mit Unternehmenssoftware und Kundenprojekten gearbeitet. Ob eine konkrete Position in einem größeren Unternehmen gut passt, hängt vor allem von den technischen Anforderungen und den Entwicklungsmöglichkeiten ab."
  },
  {
    "id": 302,
    "question": "Kann sie an langfristigen Softwareprojekten mitarbeiten?",
    "answer": "Ihre Erfahrung bei JAWA umfasste die Arbeit mit einer bestehenden Softwareplattform. Damit kennt sie bereits Aufgaben, bei denen vorhandener Code untersucht und weiterbearbeitet wird."
  },
  {
    "id": 303,
    "question": "Wäre sie für Wartung und Weiterentwicklung geeignet?",
    "answer": "Ihre Erfahrungen mit PHP, Xdebug und SQL können einen guten Einstieg in entsprechende Aufgaben bilden. Bei neuen Technologien und komplexeren Anforderungen würde sie ihre Kenntnisse weiter ausbauen müssen."
  },
  {
    "id": 304,
    "question": "Ist sie für reine Frontend-Aufgaben geeignet?",
    "answer": jawaVueExperience + " " + "Ihre Webprojekte mit Vue, JavaScript, HTML und CSS ergänzen ihre Berufspraxis und bilden eine Grundlage für eine Junior-Frontend-Stelle."
  },
  {
    "id": 305,
    "question": "Wäre eine Backend-Junior-Stelle passend?",
    "answer": "Sie hat Backend- und Datenbankprogrammierung gelernt und in Projekten verwendet. Eine Junior-Backend-Stelle mit entsprechender Einarbeitung könnte zu ihren Entwicklungszielen passen."
  },
  {
    "id": 306,
    "question": "Wäre sie für PHP-Entwicklung geeignet?",
    "answer": "Ihre praktische Erfahrung bei JAWA umfasste die Analyse und Fehlersuche in PHP-Code. Für eine passende Junior-Position kann diese Erfahrung relevant sein; der Umfang eigenständiger PHP-Entwicklung sollte im technischen Gespräch geklärt werden."
  },
  {
    "id": 307,
    "question": "Wäre eine Java-Stelle passend?",
    "answer": "Java gehörte zu den Schwerpunkten ihrer Ausbildung. Sie hat damit mehrere Anwendungen umgesetzt, müsste ihre Syntaxkenntnisse nach längerer Nichtverwendung aber gegebenenfalls auffrischen."
  },
  {
    "id": 308,
    "question": "Wäre sie für eine Position mit SQL geeignet?",
    "answer": "Sie bringt Kenntnisse aus der Ausbildung und praktische Erfahrung mit SQL bei JAWA mit. Außerdem hat sie in mehreren Projekten Datenbanktechnologien eingesetzt."
  },
  {
    "id": 309,
    "question": "Kann sie sich in neue Technologien einarbeiten?",
    "answer": "Ihr Ausbildungsweg umfasst unterschiedliche Sprachen und Entwicklungsumgebungen. Sie möchte dieses Wissen weiter ausbauen und hat bereits Erfahrung damit, sich in neue technische Themen einzuarbeiten."
  },
  {
    "id": 310,
    "question": "Wie wichtig ist ihr regelmäßiges Programmieren?",
    "answer": "Regelmäßiges Programmieren ist eines ihrer zentralen beruflichen Ziele. Sie möchte durch praktische Aufgaben sicherer werden und zunehmend unabhängig Lösungen entwickeln."
  },
  {
    "id": 311,
    "question": "Bevorzugt Ekaterina Graz?",
    "answer": "Ja. Graz und die Steiermark gehören zu ihren bevorzugten Arbeitsregionen. Bei passenden Angeboten ist sie aber auch für andere Arbeitsmodelle offen."
  },
  {
    "id": 312,
    "question": "Kommt Wien für sie infrage?",
    "answer": "Ja. Für eine interessante Position ist Ekaterina bereit, nach Wien zu pendeln. Ein hybrides Modell könnte dabei besonders gut passen."
  },
  {
    "id": 313,
    "question": "Wäre sie für eine österreichweite Remote-Stelle offen?",
    "answer": "Ja. Remote-Positionen innerhalb Österreichs gehören zu den Möglichkeiten, die sie in Betracht zieht."
  },
  {
    "id": 314,
    "question": "Möchte sie ausschließlich als Frontend-Entwicklerin arbeiten?",
    "answer": "Nein. Ekaterina interessiert sich auch für Backend- und Anwendungsentwicklung. Sie möchte vor allem praktische Programmiererfahrung sammeln."
  },
  {
    "id": 315,
    "question": "Ist eine Trainee-Stelle für sie interessant?",
    "answer": "Eine Trainee-Stelle kann interessant sein, wenn sie passende Entwicklungsaufgaben und fachliche Lernmöglichkeiten bietet."
  },
  {
    "id": 316,
    "question": "Ist sie für ein Praktikum zu erfahren?",
    "answer": "Das lässt sich nicht pauschal beantworten. Sie hat zwar ihre Ausbildung abgeschlossen und bereits Praxis gesammelt, ist aber weiterhin am Anfang ihrer Entwicklerlaufbahn. Entscheidend wären die konkreten Aufgaben und Rahmenbedingungen."
  },
  {
    "id": 317,
    "question": "Wie flexibel ist sie beim Arbeitsmodell?",
    "answer": "Ekaterina ist offen für Büroarbeit, hybride Modelle und Remote-Arbeit. Ihre Entscheidung hängt auch davon ab, wo sich der Arbeitgeber befindet und welche Aufgaben die Stelle umfasst."
  },
  {
    "id": 318,
    "question": "Welche Erwartungen hat sie an ihre nächste Stelle?",
    "answer": "Sie möchte regelmäßig mit Code arbeiten und ihr technisches Wissen in der Praxis vertiefen. Besonders wichtig sind ihr Aufgaben, durch die sie fachlich weiterkommt."
  },
  {
    "id": 319,
    "question": "Was sollte eine Stellenanzeige bieten, damit sie interessant ist?",
    "answer": "Für Ekaterina sind praktische Entwicklungsaufgaben, passende Technologien und Möglichkeiten zur Weiterentwicklung besonders relevant. Ob eine konkrete Stelle passt, sollte anhand ihrer tatsächlichen Anforderungen beurteilt werden."
  },
  {
    "id": 320,
    "question": "Können Arbeitgeber direkt über Pixel Kontakt aufnehmen?",
    "answer": "Das Portfolio enthält eine Kontaktfunktion, über die Besucher eine Nachricht an Ekaterina senden können, sofern diese Funktion verfügbar ist. Verbindliche Bewerbungsabsprachen erfolgen direkt mit ihr."
  },
  {
    "id": 321,
    "question": "Was macht Ekaterina in ihrer Freizeit?",
    "answer": "Ekaterina ist sportlich aktiv, hat bereits mehrere Halbmarathons absolviert und beschäftigt sich mit Pole Sport und Hip-Hop. Außerdem reist sie gerne und interessiert sich für neue Erfahrungen."
  },
  {
    "id": 322,
    "question": "Ist sie sportlich?",
    "answer": "Ja. In ihrem Portfolio nennt sie mehrere gelaufene Halbmarathons sowie Pole Sport und Tanzen als Freizeitaktivitäten."
  },
  {
    "id": 323,
    "question": "Was interessiert sie außerhalb der Softwareentwicklung?",
    "answer": "Zu ihren Interessen gehören Sport, Tanz und Reisen. Ihr beruflicher und akademischer Hintergrund zeigt außerdem ihre Beschäftigung mit Sprachen und Kommunikation."
  },
  {
    "id": 324,
    "question": "Reist sie gerne?",
    "answer": "Ja, Reisen gehört zu ihren dokumentierten Interessen. Sie lernt gerne neue Orte und Eindrücke kennen."
  },
  {
    "id": 325,
    "question": "Welche Bedeutung haben Sprachen in ihrem Leben?",
    "answer": "Sprachen waren ein wesentlicher Bestandteil ihres Studiums der Transkulturellen Kommunikation. Außerdem hat sie praktische Erfahrung mit dem Dolmetschen ins Russische gesammelt."
  },
  {
    "id": 326,
    "question": "Ist Ekaterina ein kontaktfreudiger Mensch?",
    "answer": "Sie beschreibt sich als offen und kommunikativ. Die Zusammenarbeit und der Austausch mit anderen Menschen sind ihr wichtig."
  },
  {
    "id": 327,
    "question": "Welche Werte sind ihr bei der Zusammenarbeit wichtig?",
    "answer": "Sie legt Wert auf respektvollen Umgang, gegenseitige Unterstützung und eine freundliche Atmosphäre. In einem Team möchte sie Ideen austauschen und gemeinsam Lösungen finden."
  },
  {
    "id": 328,
    "question": "Hat sie Interesse an lebenslangem Lernen?",
    "answer": "Ja. Ihr Bildungsweg umfasst unterschiedliche Fachrichtungen und mehrere Weiterbildungen. Auch nach ihrem Abschluss in Softwareentwicklung beschäftigt sie sich weiter mit neuen Themen."
  },
  {
    "id": 329,
    "question": "Wie geht sie mit neuen Lebensabschnitten um?",
    "answer": "Ihr beruflicher Weg zeigt, dass sie bereit ist, sich neu zu orientieren und zusätzliche Qualifikationen zu erwerben. Über persönliche Entscheidungen außerhalb der dokumentierten Stationen sollte Pixel nicht spekulieren."
  },
  {
    "id": 330,
    "question": "Was macht Ekaterina sympathisch?",
    "answer": "Ihr Portfolio vermittelt Offenheit, Interesse an neuen Themen und Freude an der Zusammenarbeit mit anderen. Eine persönliche Einschätzung sollten Besucher dennoch selbst gewinnen, beispielsweise im Gespräch mit ihr."
  },
  {
    "id": 331,
    "question": "Hat Ekaterina bereits mehrere Jahre Berufserfahrung als Entwicklerin?",
    "answer": `Nein. Ihre dokumentierte Unternehmenspraxis in der Softwareentwicklung umfasst ${jawaExperienceMonths} Monate bei JAWA. Darüber hinaus hat sie Erfahrung aus Ausbildung und Projekten gesammelt.`
  },
  {
    "id": 332,
    "question": "War sie allein für 16 Kundenprojekte verantwortlich?",
    "answer": "Nein. Sie arbeitete bei JAWA mit Code aus 16 Kundenprojekten. Daraus ergibt sich keine alleinige Projektverantwortung."
  },
  {
    "id": 333,
    "question": "Hat Ekaterina die gesamte Plattform INFORUM programmiert?",
    "answer": "Nein. Sie war an Arbeiten mit der Plattform beteiligt und untersuchte unter anderem Fehler im bestehenden PHP-Code. Die Entwicklung der gesamten Plattform darf ihr nicht zugeschrieben werden."
  },
  {
    "id": 334,
    "question": "Ist sie Expertin für alle Technologien ihres Portfolios?",
    "answer": "Nein. Die Technologien zeigen, womit sie während Ausbildung und Projektarbeit in Berührung gekommen ist. Ihre Erfahrung unterscheidet sich je nach Sprache, Framework und Projekt."
  },
  {
    "id": 335,
    "question": "Kann sie komplexe Architekturentscheidungen eigenständig treffen?",
    "answer": "Sie hat Softwarearchitektur gelernt und entsprechende Konzepte in Projekten angewendet. Ob sie komplexe Architekturentscheidungen für große Produktionssysteme eigenständig treffen kann, ist dadurch noch nicht nachgewiesen."
  },
  {
    "id": 336,
    "question": "Hat sie Erfahrung mit großen Entwicklungsteams?",
    "answer": "Teamarbeit ist in mehreren ihrer Projekte dokumentiert. Die Größe und Struktur ihrer bisherigen Entwicklungsteams ist jedoch nicht ausreichend beschrieben, um daraus eine konkrete Aussage abzuleiten."
  },
  {
    "id": 337,
    "question": "Hat sie Software schon eigenständig in Produktion betrieben?",
    "answer": "Die frühere Feta-Website war veröffentlicht, und mehrere ihrer Projekte verfügen über Demos. Eine umfassende eigenständige Verantwortung für den produktiven Betrieb größerer Softwaresysteme ist nicht dokumentiert."
  },
  {
    "id": 338,
    "question": "Beherrscht sie professionelle Testautomatisierung?",
    "answer": "Softwarequalitätssicherung gehörte zu ihrer Ausbildung. Eine besondere Erfahrung mit bestimmten Testautomatisierungsframeworks sollte Pixel nur nennen, wenn entsprechende Projekte oder Tätigkeiten dokumentiert sind."
  },
  {
    "id": 339,
    "question": "Kann sie eine Senior-Entwicklerposition übernehmen?",
    "answer": "Ihr derzeitiger beruflicher Schwerpunkt liegt auf Junior-Positionen und dem Aufbau weiterer praktischer Erfahrung. Eine Senior-Rolle würde nicht zu der dokumentierten Dauer und Tiefe ihrer bisherigen Entwicklerpraxis passen."
  },
  {
    "id": 340,
    "question": "Was weiß Pixel nicht über Ekaterina?",
    "answer": "Pixel kennt nur die Informationen, die in ihren freigegebenen Portfolio-Daten enthalten sind. Über nicht dokumentierte Erfahrungen, private Entscheidungen, konkrete Gehaltsvorstellungen und zukünftige Zusagen sollte er keine Annahmen treffen."
  },
  {
    "id": 341,
    "question": "Wie viel möchten Sie verdienen?",
    "answer": "Ekaterinas konkrete Gehaltsvorstellungen sind im Portfolio nicht angegeben. Bitte besprechen Sie diese Frage direkt mit ihr."
  },
  {
    "id": 342,
    "question": "Können Sie am ersten Dezember anfangen?",
    "answer": "Ein verbindlicher Eintrittstermin ist nicht hinterlegt. Sie können Ekaterina über das Kontaktformular nach ihrer Verfügbarkeit fragen."
  },
  {
    "id": 343,
    "question": "Können Sie fünf Tage pro Woche nach Wien pendeln?",
    "answer": "Ekaterina ist grundsätzlich bereit, für eine interessante Position nach Wien zu pendeln. Ob fünf Bürotage pro Woche infrage kommen, müsste sie persönlich entscheiden."
  },
  {
    "id": 344,
    "question": "Können wir ihr einen technischen Test schicken?",
    "answer": "Bitte kontaktieren Sie Ekaterina direkt, um die Anforderungen und den Ablauf eines technischen Tests zu besprechen."
  },
  {
    "id": 345,
    "question": "Wie gut spricht sie Italienisch auf einer Skala von A1 bis C2?",
    "answer": "Italienisch war Teil ihres Studiums der Transkulturellen Kommunikation. Ein aktuell bestätigtes Sprachniveau ist im Portfolio nicht angegeben."
  },
  {
    "id": 346,
    "question": "Wie viele Anwendungen hat sie vollständig ohne KI entwickelt?",
    "answer": "Dazu liegt keine verlässlich dokumentierte Zahl vor. Ekaterina hat KI-Unterstützung bei Entwicklungsaufgaben eingesetzt und möchte ihre Fähigkeit zum eigenständigen Programmieren weiter stärken."
  },
  {
    "id": 347,
    "question": "Kann sie sofort allein ein großes Backend-Projekt übernehmen?",
    "answer": "Ob das realistisch ist, hängt von den Anforderungen ab. Ekaterina bringt Backend-Grundlagen und erste praktische Erfahrung mit, befindet sich aber noch am Anfang ihrer Entwicklerlaufbahn."
  },
  {
    "id": 348,
    "question": "Warum hat sie ihre letzte Arbeitsstelle verlassen?",
    "answer": "Die dokumentierten Angaben enthalten die Dauer ihrer Tätigkeit bei JAWA, aber keine ausführliche persönliche Begründung für deren Ende. Diese Frage sollte Ekaterina selbst beantworten."
  },
  {
    "id": 349,
    "question": "Hat sie sich bereits bei unserem Unternehmen beworben?",
    "answer": "Pixel hat keinen verlässlichen Zugriff auf Ekaterinas aktuelle Bewerbungsaktivitäten. Eine solche Auskunft kann er deshalb nicht geben."
  },
  {
    "id": 350,
    "question": "Können wir Ekaterina ein Angebot machen?",
    "answer": "Ja, Sie können sie über die Kontaktmöglichkeiten ihres Portfolios erreichen. Pixel kann Informationen bereitstellen, aber keine Angebote annehmen oder Zusagen in ihrem Namen machen."
  }
] as const
