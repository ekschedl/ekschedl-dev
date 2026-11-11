<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import EducationPage from './EducationPage.vue'
import ExperiencePage from './ExperiencePage.vue'

type Language = 'DE' | 'EN' | 'RU'

const languages: Language[] = ['DE', 'EN', 'RU']
const language = ref<Language>('DE')
const educationPath = '/Ausbildung'
const experiencePath = '/Berufserfahrung'
const isExperience = /^\/berufserfahrung\/?$/i.test(window.location.pathname)
const experienceLabels = { DE: 'Berufserfahrung', EN: 'Work experience', RU: 'Опыт работы' }
const isEducation = /^\/ausbildung\/?$/i.test(window.location.pathname)
const educationLabels = { DE: 'Ausbildung', EN: 'Education', RU: 'Образование' }
const portfolioName = computed(() => ({
  DE: 'Ekaterina Schedlberger',
  EN: 'Ekaterina Schedlberger',
  RU: 'Екатерина Шедльбергер'
})[language.value])

function homeLink(hash: string) {
  return isEducation || isExperience ? '/' + hash : hash
}

function updatePageLanguage() {
  document.documentElement.lang = language.value.toLowerCase()
  if (isEducation) {
    document.title = educationLabels[language.value] + ' | ' + portfolioName.value
  } else if (isExperience) {
    document.title = experienceLabels[language.value] + ' | ' + portfolioName.value
  }
}
const menuOpen = ref(false)
const projectAreas = ['mobile', 'game', 'web', 'backend'] as const
type ProjectArea = typeof projectAreas[number]
type ProjectFilterMode = 'area' | 'technology'
const projectFilterMode = ref<ProjectFilterMode>('area')
const selectedAreas = ref<ProjectArea[]>([])
const projectSort = ref<'newest' | 'oldest'>('newest')
const selectedTechnologies = ref<string[]>([])
const darkMode = ref(false)

onMounted(() => {
  try {
    darkMode.value = localStorage.getItem('portfolio-theme') === 'dark'
    const savedLanguage = languages.find((item) => item === localStorage.getItem('portfolio-language'))
    if (savedLanguage) language.value = savedLanguage
  } catch {
    // Language and theme switching also work when storage is unavailable.
  }
  updatePageLanguage()
})

watch(darkMode, (enabled) => {
  const theme = enabled ? 'dark' : 'light'
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem('portfolio-theme', theme)
  } catch {
    // Keep the selected theme for this visit.
  }
})

const translations = {
  DE: {
    areaFilter: 'Projektbereich',
    filterOptions: 'Projektfilter',
    allAreas: 'Alle Bereiche',
    areas: { mobile: 'Mobile App', game: 'Spiel', web: 'Webentwicklung', backend: 'Backend & Daten' },
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
    projectsTitle: 'Dinge, die ich entwickle.',
    projectsIntro: 'Eine Auswahl meiner Projekte und Ideen.',
    portfolioStatus: 'Derzeit in Bearbeitung',
    technologiesTitle: 'Mein Tech-Stack.',
    technologiesIntro: 'Technologien, mit denen ich arbeite und weiterlerne.',
    techGroups: ['Frontend & Apps', 'Backend & Daten', 'Werkzeuge', 'KI-Werkzeuge', 'Ausbildungsschwerpunkte'], projectUse: 'Im Projekt eingesetzt', studyUse: 'In der Ausbildung vertieft',
    sectionPortfolio: '01 / PORTFOLIO', sectionTechnologies: '02 / TECHNOLOGIEN', sectionAbout: '03 / ÜBER MICH', sectionContact: '04 / KONTAKT',
    projectTypes: { mobile: 'MOBILE APP', game: 'KONSOLENSPIEL', web: 'WEBPROJEKT', backend: 'KONSOLENANWENDUNG' },
    projectTypesShort: { mobile: 'APP', game: 'SPIEL', web: 'WEB', backend: 'JAVA' },
    studyTopics: 'Objektorientierte Programmierung · Algorithmen · Softwarearchitektur · Softwarequalitätssicherung',
    techFilterAll: "Alle Bereiche", techFilterGroups: ["Frontend & Apps", "Backend & Daten", "Werkzeuge", "KI-Werkzeuge"],
    techFilterReset: 'Zurücksetzen',
    about: 'Über mich',
    aboutShort: 'Mein Weg und was mich antreibt.',
    aboutTitle: 'Neugierig bleiben. Neues schaffen.',
    aboutText:
      'Ich habe den akademischen Lehrgang Software-Entwicklung an der FH CAMPUS 02 abgeschlossen und bei JAWA praktische Erfahrung in der Webentwicklung gesammelt. Ich mag es, Zusammenhänge zu verstehen, Lösungen zu finden und Neues auszuprobieren.',
    helloTitle: 'Lass uns etwas bewegen.',
    helloText:
      'Ich freue mich über interessante Projekte, neue Herausforderungen und berufliche Möglichkeiten in der Softwareentwicklung.',
    github: 'Mein GitHub',
    email: 'E-Mail schreiben',
    unoTitle: 'UNO-Kartenspiel',
    projectDescriptions: [
      'YogaNow Studio verbindet eine frei zugängliche Yoga-Bibliothek mit der Buchung von Studiokursen. Im Team war ich für das Design, die Datenbankanbindung mit Supabase und die Kursbuchungsplattform zuständig.',
      'Im Team entwickeltes UNO-Kartenspiel für die Java-Konsole. Karten, Spieler und Spielrunden sind als Java-Klassen modelliert. Das Spiel prüft die Spielzüge und unterstützt Aktionskarten wie „Aussetzen“ und „Richtungswechsel“. Über JDBC speichert das Spiel die Punktestände in SQLite und ruft die Bestenliste per SQL ab.',
      'Kaffeehaus-Website mit Speisekarte, Bildergalerie und Kontaktformular, entstanden als Übungsprojekt an der FH CAMPUS 02. Der überschaubare Umfang ließ Raum für die Grundlagen der Webentwicklung: Seiten mit HTML strukturieren, Layouts mit CSS Grid und Flexbox an verschiedene Bildschirmgrößen anpassen und eine Bildergalerie mit JavaScript und Swiper einbinden.',
      'Konsolenbasiertes Prüfungsprojekt zur Verwaltung von Gästen, Zimmern, Buchungen und Zusatzleistungen. Mit Hibernate/JPA, CRUD-Funktionen, HQL-Abfragen, Transaktionen und XML-Mapping.',
      'Mit Feta begann mein Weg in die IT. Mein erstes Webprojekt war zugleich mein Diplomprojekt am WIFI und eine echte Kundenwebsite für einen Lutscherhersteller. Dafür erstellte ich ein eigenes responsives WordPress-Theme mit Produktkatalog, aufklappbaren Zutatenlisten und Kontaktformular. Die Kundenwebsite war online. Heute zeigt die Galerie eine lokale Vorschau.'
    ],
    todoTitle: 'To-do-App',
    todoDescription: 'Aufgaben hinzufügen, abhaken und löschen. Pinia verwaltet den Zustand und speichert die Aufgaben im Browser.',
    shopDescription: 'Shop-Demo mit Produktdaten und Kategorien aus der Platzi Fake Store API. Produkte lassen sich suchen, filtern, als Favoriten markieren und in den Warenkorb legen.',
    liveDemo: 'Im neuen Tab öffnen',
    inlineDemo: 'Demo hier testen',
    projectLink: 'Projekt auf GitHub ansehen',
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schließen',
    backToTop: 'Nach oben'
  },
  EN: {
    areaFilter: 'Project area',
    filterOptions: 'Project filters',
    allAreas: 'All areas',
    areas: { mobile: 'Mobile app', game: 'Game', web: 'Web development', backend: 'Backend & data' },
    filter: 'Filter by technology',
    allTechnologies: 'All technologies',
    noResults: 'No matching projects found.',
    reset: 'Reset all filters',
    areaMode: 'By project area',
    technologyMode: 'By technology',
    projectCount: '{visible} of {total} projects',
    sortLabel: 'Sort', newest: 'Newest first', oldest: 'Oldest first', created: 'Created',
    switchToDark: 'Switch to dark mode', switchToLight: 'Switch to light mode',
    navigationLabel: 'Main navigation',
    languageLabel: 'Language',
    nav: ['Home', 'Portfolio', 'Technologies', 'About'],
    contact: "LET'S TALK", cvDownload: 'Download CV', cvShort: 'CV',
    valueLabels: ['Code', 'Create', 'Learn', 'Repeat'],
    logoHome: 'ek. – Back to top of home page', heroGreeting: 'HELLO, I’M', heroName: 'Ekaterina', whatIUse: 'WHAT I USE', more: '+ more', aboutTile: 'A LITTLE ABOUT ME', footerMade: 'Made with love for code and detail.', footerCopyright: '© 2026 Ekaterina Schedlberger',
    role: 'Software Developer',
    location: 'Graz, Austria',
    heroNote: 'Explore ideas. Build solutions. Keep learning.',
    projectsTitle: 'Things I build.',
    projectsIntro: 'A selection of my projects and ideas.',
    portfolioStatus: 'Currently in progress',
    technologiesTitle: 'My tech stack.',
    technologiesIntro: 'Technologies I use and continue to explore.',
    techGroups: ['Frontend & apps', 'Backend & data', 'Tools', 'AI tools', 'Study topics'], projectUse: 'Used in projects', studyUse: 'Covered in training',
    sectionPortfolio: '01 / PORTFOLIO', sectionTechnologies: '02 / TECHNOLOGIES', sectionAbout: '03 / ABOUT ME', sectionContact: '04 / CONTACT',
    projectTypes: { mobile: 'MOBILE APP', game: 'CONSOLE GAME', web: 'WEB PROJECT', backend: 'CONSOLE APP' },
    projectTypesShort: { mobile: 'APP', game: 'GAME', web: 'WEB', backend: 'JAVA' },
    studyTopics: 'Object-oriented programming · Algorithms · Software architecture · Software quality assurance',
    techFilterAll: "All areas", techFilterGroups: ["Frontend & apps", "Backend & data", "Tools", "AI tools"],
    techFilterReset: 'Reset',
    about: 'About me',
    aboutShort: 'My journey and what motivates me.',
    aboutTitle: 'Stay curious. Keep creating.',
    aboutText:
      'I completed an academic Software Development programme at FH CAMPUS 02 and gained practical web development experience at JAWA. I enjoy understanding how things work, finding solutions and exploring new ideas.',
    helloTitle: "Let's make something happen.",
    helloText:
      'I am open to interesting projects, new challenges and career opportunities in software development.',
    github: 'My GitHub',
    email: 'Send an email',
    unoTitle: 'UNO Card Game',
    projectDescriptions: [
      'YogaNow Studio combines a free yoga library with studio class booking. In the team, I was responsible for the design, the Supabase database integration and the class booking platform.',
      'A Java console version of UNO developed as a team. Cards, players and rounds are modelled as Java classes. The game validates moves and supports action cards such as Skip and Reverse. The game stores scores in SQLite via JDBC and retrieves the leaderboard with SQL.',
      'A coffee house website with a menu, photo gallery and contact form, built as a coursework project at FH CAMPUS 02. The small scope left room to practise the fundamentals: structuring pages with HTML, adapting layouts to different screen sizes with CSS Grid and Flexbox, and integrating an image gallery with JavaScript and Swiper.',
      'A console-based assessment project for managing guests, rooms, bookings, and additional services. Built with Hibernate/JPA, CRUD operations, HQL queries, transactions, and XML mapping.',
      'Feta marked the start of my career in tech. It was my first web project, my diploma project at WIFI and a website for a lollipop manufacturer. I built a custom responsive WordPress theme with a product catalog, expandable ingredient lists and a contact form. The client website was live. The gallery now shows a local preview.'
    ],
    todoTitle: 'To-do App',
    todoDescription: 'Add, complete and delete tasks. Pinia manages the app state and saves tasks in the browser.',
    shopDescription: 'A shop demo that loads products and categories from the Platzi Fake Store API. Search and filter products, save favourites and add items to the cart.',
    liveDemo: 'Open in a new tab',
    inlineDemo: 'Try the demo here',
    projectLink: 'View project on GitHub',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    backToTop: 'Back to top'
  },
  RU: {
    areaFilter: 'Тип проекта',
    filterOptions: 'Фильтры проектов',
    allAreas: 'Все типы',
    areas: { mobile: 'Мобильное приложение', game: 'Игра', web: 'Веб-разработка', backend: 'Бэкенд и данные' },
    filter: 'Фильтр по технологии',
    allTechnologies: 'Все технологии',
    noResults: 'Подходящих проектов нет.',
    reset: 'Сбросить все фильтры',
    areaMode: 'По типу проекта',
    technologyMode: 'По технологии',
    projectCount: 'Проекты: {visible} из {total}',
    sortLabel: 'Сортировка', newest: 'Сначала новые', oldest: 'Сначала старые', created: 'Создано',
    switchToDark: 'Включить тёмную тему', switchToLight: 'Включить светлую тему',
    navigationLabel: 'Основная навигация',
    languageLabel: 'Язык',
    nav: ['Главная', 'Портфолио', 'Технологии', 'Обо мне'],
    contact: 'КОНТАКТ', cvDownload: 'Скачать резюме', cvShort: 'Резюме',
    valueLabels: ['Программировать', 'Создавать', 'Учиться', 'Повторять'],
    logoHome: 'ek. – На главную страницу', heroGreeting: 'ПРИВЕТ, Я', heroName: 'Екатерина', whatIUse: 'МОИ ИНСТРУМЕНТЫ', more: 'и другие', aboutTile: 'НЕМНОГО ОБО МНЕ', footerMade: 'С любовью к коду и деталям.', footerCopyright: '© 2026 Екатерина Шедльбергер',
    role: 'Разработчик программного обеспечения',
    location: 'Грац, Австрия',
    heroNote: 'Исследовать идеи. Находить решения. Учиться новому.',
    projectsTitle: 'То, что я создаю.',
    projectsIntro: 'Некоторые из моих проектов и идей.',
    portfolioStatus: 'Раздел обновляется',
    technologiesTitle: 'Мой стек технологий.',
    technologiesIntro: 'Технологии, с которыми я работаю и продолжаю развиваться.',
    techGroups: ['Фронтенд и приложения', 'Бэкенд и данные', 'Инструменты', 'ИИ-инструменты', 'Темы обучения'], projectUse: 'Использовала в проектах', studyUse: 'Изучала в рамках обучения',
    sectionPortfolio: '01 / ПОРТФОЛИО', sectionTechnologies: '02 / ТЕХНОЛОГИИ', sectionAbout: '03 / ОБО МНЕ', sectionContact: '04 / КОНТАКТЫ',
    projectTypes: { mobile: 'МОБИЛЬНОЕ ПРИЛОЖЕНИЕ', game: 'КОНСОЛЬНАЯ ИГРА', web: 'ВЕБ-ПРОЕКТ', backend: 'КОНСОЛЬНОЕ ПРИЛОЖЕНИЕ' },
    projectTypesShort: { mobile: 'ПРИЛ.', game: 'ИГРА', web: 'ВЕБ', backend: 'JAVA' },
    studyTopics: 'Объектно-ориентированное программирование · Алгоритмы · Архитектура ПО · Обеспечение качества ПО',
    techFilterAll: "Все разделы", techFilterGroups: ["Фронтенд и приложения", "Бэкенд и данные", "Инструменты", "ИИ-инструменты"],
    techFilterReset: 'Сбросить',
    about: 'Обо мне',
    aboutShort: 'Мой путь и то, что меня вдохновляет.',
    aboutTitle: 'С интересом к жизни. С радостью — к новому.',
    aboutText:
      'Я люблю жизнь, свою семью, движение и танцы. Люблю смеяться, узнавать новое и постоянно учиться. Эту энергию и любознательность я привношу и в разработку программного обеспечения: мне нравится разбираться в задачах и создавать продуманные решения.',
    helloTitle: 'Давайте создавать вместе.',
    helloText:
      'Я открыта к интересным проектам, новым задачам и профессиональным возможностям в разработке программного обеспечения.',
    github: 'Мой GitHub',
    email: 'Написать письмо',
    unoTitle: 'Карточная игра UNO',
    projectDescriptions: [
      'YogaNow Studio объединяет открытую библиотеку йоги и запись на занятия в студии. В команде я отвечала за дизайн, подключение базы данных Supabase и платформу записи на занятия.',
      'Консольная версия UNO на Java, разработанная в команде. Карты, игроки и раунды представлены классами Java. Игра проверяет ходы и поддерживает карты действий, например «Пропуск хода» и «Смена направления». Игра сохраняет очки в SQLite через JDBC и загружает таблицу рекордов с помощью SQL-запроса.',
      'Учебный проект в FH CAMPUS 02: сайт кофейни с меню, фотогалереей и контактной формой. Небольшой объём проекта позволил сосредоточиться на основах веб-разработки: структуре страниц на HTML, адаптивной вёрстке с CSS Grid и Flexbox и подключении фотогалереи с помощью JavaScript и Swiper.',
      'Консольный экзаменационный проект для управления гостями, номерами, бронированиями и дополнительными услугами. Hibernate/JPA, операции CRUD, запросы HQL, транзакции и XML-маппинг.',
      'С проекта Feta начался мой путь в ИТ. Моим первым веб-проектом и одновременно дипломной работой в WIFI стал сайт для производителя леденцов. Я разработала адаптивную тему WordPress с каталогом, раскрывающимися списками ингредиентов и контактной формой. Сайт компании был опубликован. Сейчас в галерее показана локальная версия.'
    ],
    todoTitle: 'Список задач',
    todoDescription: 'Задачи можно добавлять, отмечать как выполненные и удалять. Pinia управляет состоянием приложения и сохраняет задачи в браузере.',
    shopDescription: 'Демонстрационный магазин загружает товары и категории через Platzi Fake Store API. Товары можно искать, фильтровать, добавлять в избранное и в корзину.',
    liveDemo: 'Открыть в новой вкладке',
    inlineDemo: 'Попробовать демоверсию здесь',
    projectLink: 'Открыть проект на GitHub',
    menuOpen: 'Открыть меню',
    menuClose: 'Закрыть меню',
    backToTop: 'Наверх'
  }
}

const t = computed(() => translations[language.value])

const todoDemoUrl = 'https://ekschedl.github.io/jawa_todo/todo/'
const shopDemoUrl = 'https://ekschedl.github.io/jawa_todo/shopplatzi/'

const projects = [
  {
    id: 'yoganow',
    title: 'YogaNow Studio',
    createdAt: '2026-06',
    type: 'iOS APP',
    area: 'mobile',
    image: '/images/yoganow-overview.png',
    url: 'https://github.com/ekschedl/YogaNowStudio',
    stack: 'Swift · SwiftUI · Supabase'
  },
  {
    id: 'uno',
    title: 'UNO',
    createdAt: '2025-12',
    type: 'CARD GAME',
    area: 'game',
    image: '/images/uno.jpg',
    url: 'https://github.com/ekschedl/UnoGame_inDerKonsole_Java_campusMe_2025',
    stack: 'Java · OOP · JDBC · SQLite'
  },
  {
    id: 'kaffeehaus',
    title: 'Kaffeehaus Mokka',
    createdAt: '2025-06',
    type: 'WEB PROJECT',
    area: 'web',
    image: '/images/mokka-start.png',
    url: 'https://github.com/ekschedl/web1_hausaufgabe01_Mokka',
    stack: 'HTML · CSS · JavaScript'
  },
  {
    id: 'hotelverwaltung',
    title: 'Hotelverwaltung',
    createdAt: '2026-01',
    type: 'CONSOLE APP',
    area: 'backend',
    image: '',
    url: 'https://github.com/ekschedl/Datenbankenprogrammierung_02_hotel_pruefung',
    stack: 'Java · Hibernate · JPA · HQL · SQLite · XML'
  },
  {
    id: 'feta',
    title: 'Feta',
    createdAt: '2023-03',
    type: 'CLIENT WEBSITE',
    area: 'web',
    image: '/images/feta-katalog.png',
    url: 'https://github.com/ekschedl/feta_new_2024/tree/main/feta-theme-new_server_08.2024',
    stack: 'WordPress · PHP · HTML · CSS · JavaScript'
  },
  {
    id: 'todo',
    title: 'To-do-App',
    createdAt: '2025-07',
    area: 'web',
    image: '/images/todo-aufgaben.jpg',
    url: 'https://github.com/ekschedl/jawa_todo',
    demoUrl: todoDemoUrl,
    stack: 'Vue 3 · TypeScript · Vuetify · Pinia'
  },
  {
    id: 'shopplatzi',
    title: 'ShopPlatzi',
    createdAt: '2025-07',
    area: 'web',
    image: '/images/todo-shopplatzi.jpg',
    url: 'https://github.com/ekschedl/jawa_todo',
    demoUrl: shopDemoUrl,
    stack: 'Vue 3 · TypeScript · Vuetify · Pinia · Axios · REST-APIs'
  }
] as const

const hotelSlides = [
  { image: '/images/hotelverwaltung-modell.svg', caption: { DE: 'Datenmodell: Gäste, Zimmer, Buchungen und Zusatzleistungen', EN: 'Data model: guests, rooms, bookings and additional services', RU: 'Модель данных: гости, номера, бронирования и дополнительные услуги' } },
  { image: '/images/hotelverwaltung-buchung.svg', caption: { DE: 'Buchungsablauf: prüfen, speichern und Änderungen gemeinsam übernehmen', EN: 'Booking flow: validate, save and commit the changes together', RU: 'Бронирование: проверка, сохранение и фиксация всех изменений' } },
  { image: '/images/hotelverwaltung-architektur.svg', caption: { DE: 'Architektur: Modelle, Datenzugriff, Abfragen und Services', EN: 'Architecture: models, data access, queries and services', RU: 'Архитектура: модели, доступ к данным, запросы и сервисы' } },
  { image: '/images/hotelverwaltung-uml.png', caption: { DE: 'Vollständiges UML-Klassendiagramm mit Attributen, Methoden und Beziehungen', EN: 'Full UML class diagram with attributes, methods and relationships', RU: 'Полная диаграмма классов UML с атрибутами, методами и связями' } }
] as const
const yogaSlides = [
  { image: '/images/yoganow-overview.png', caption: { DE: 'Startseite: Bibliothek und Kursplattform', EN: 'Home screen: library and course platform', RU: 'Главный экран: библиотека и платформа занятий' } },
  { image: '/images/yoganow-slide-09.png', caption: { DE: 'Yoga Library: Video zum Mitmachen', EN: 'Yoga Library: follow-along video', RU: 'Библиотека йоги: видео для занятий' } },
  { image: '/images/yoganow-slide-10.png', caption: { DE: 'Kursdetails und Buchung', EN: 'Course details and booking', RU: 'Информация о занятии и бронирование' } },
  { video: '/videos/yoganow-demo.mp4', poster: '/images/yoganow-video-poster.jpg', caption: { DE: 'Videodemo: Vom Kurskalender zur bestätigten Buchung', EN: 'Video demo: from the class calendar to the confirmed booking', RU: 'Видео: от календаря занятий до подтверждённой записи' } }
] as const

const yogaDemoText = {
  DE: { action: 'Buchungsdemo ansehen', access: 'Die Yoga Library ist ohne Anmeldung zugänglich. Zum selbstständigen Testen der Kursplattform ist ein Konto erforderlich.' },
  EN: { action: 'View booking demo', access: 'The Yoga Library is open without signing in. To try the booking platform yourself, you need an account.' },
  RU: { action: 'Посмотреть, как записаться на занятие', access: 'Библиотека йоги доступна без входа. Чтобы самостоятельно попробовать запись на занятия, нужна учётная запись.' }
}

const fetaSlides = [
  { image: '/images/feta-ueber-uns.png', caption: { DE: 'Startseite · Lokale Vorschau', EN: 'Home page · Local preview', RU: 'Главная страница · Локальная версия' } },
  { image: '/images/feta-katalog.png', caption: { DE: 'Produktkatalog · Zutatenliste geschlossen', EN: 'Product catalog · Ingredients collapsed', RU: 'Каталог · Список ингредиентов свёрнут' } },
  { image: '/images/feta-zutaten.png', caption: { DE: 'Produktkatalog mit aufgeklappter Zutatenliste', EN: 'Product catalog with the ingredients expanded', RU: 'Каталог с открытым списком ингредиентов' } },
  { image: '/images/feta-mobil.png', caption: { DE: 'Produktkatalog · Mobile Ansicht', EN: 'Product catalog · Mobile view', RU: 'Каталог продукции · Мобильная версия' } },
  { image: '/images/feta-kontakt.png', caption: { DE: 'Kontaktformular · Vorschau', EN: 'Contact form · Preview', RU: 'Контактная форма · Предпросмотр' } }
] as const

const projectGalleries = {
  todo: {
    title: 'To-do-App',
    slides: [
      { image: '/images/todo-start.jpg', caption: { DE: 'Startseite mit Aufgabenliste und zwei Shop-Demos', EN: 'Home screen with the task list and two shop demos', RU: 'Главная страница со списком задач и двумя демоверсиями магазинов' } },
      { image: '/images/todo-aufgaben.jpg', caption: { DE: 'Aufgabenliste mit offenen und erledigten Beispielaufgaben', EN: 'Task list with open and completed sample tasks', RU: 'Список с открытыми и выполненными примерами задач' } },
      { embed: todoDemoUrl, caption: { DE: 'Live-Demo', EN: 'Live demo', RU: 'Интерактивная демоверсия' } }
    ]
  },
  shopplatzi: {
    title: 'ShopPlatzi',
    slides: [
      { image: '/images/todo-shopplatzi.jpg', caption: { DE: 'Produktübersicht mit Suche, Kategorien und Favoriten', EN: 'Product catalogue with search, categories and favourites', RU: 'Каталог товаров с поиском, категориями и избранным' } },
      { embed: shopDemoUrl, caption: { DE: 'Live-Demo', EN: 'Live demo', RU: 'Интерактивная демоверсия' } }
    ]
  },
  feta: { title: 'Feta', slides: fetaSlides },
  hotelverwaltung: { title: 'Hotelverwaltung', slides: hotelSlides },
  yoganow: { title: 'YogaNow Studio', slides: yogaSlides },
  uno: {
    title: projects[1].title,
    slides: [
      { image: projects[1].image, caption: { DE: 'Spielstart mit Bestenliste und Spielreihenfolge', EN: 'Game start with highscores and turn order', RU: 'Начало игры, рекорды и порядок ходов' } },
      { image: '/images/uno_spiel.png', caption: { DE: 'Karten auf der Hand und Farbwahl', EN: 'Cards in hand and colour selection', RU: 'Карты на руках и выбор цвета' } },
      { image: '/images/uno_sieger.png', caption: { DE: 'Glückwunsch zum Rundensieg und aktueller Punktestand', EN: 'Round winner and updated scores', RU: 'Поздравление победителя раунда и текущий счёт' } },
      { video: '/videos/uno-console.mp4', poster: projects[1].image, caption: { DE: 'Videodemo des UNO-Konsolenspiels', EN: 'UNO console game demo', RU: 'Видеодемонстрация консольной игры UNO' } }
    ]
  },
  kaffeehaus: {
    title: projects[2].title,
    slides: [
      { image: '/images/mokka-start.png', caption: { DE: 'Startseite', EN: 'Home page', RU: 'Главная страница' } },
      { image: '/images/mokka-menu.png', caption: { DE: 'Speisekarte', EN: 'Menu', RU: 'Меню' } },
      { image: '/images/mokka-galerie-detail.png', caption: { DE: 'Bildergalerie', EN: 'Photo gallery', RU: 'Фотогалерея' } }
    ]
  }
}
const galleryProject = ref<keyof typeof projectGalleries>('hotelverwaltung')
const activeGallery = computed(() => {
  const gallery = projectGalleries[galleryProject.value]
  if (galleryProject.value === 'todo') return { ...gallery, title: t.value.todoTitle }
  return galleryProject.value === 'uno' ? { ...gallery, title: t.value.unoTitle } : gallery
})
const hotelGalleryLabels = {
  DE: { open: 'Projektgalerie öffnen', close: 'Schließen', prev: 'Vorheriges Bild', next: 'Nächstes Bild', full: 'Bild in voller Größe' },
  EN: { open: 'Open project gallery', close: 'Close', prev: 'Previous image', next: 'Next image', full: 'Full-size image' },
  RU: { open: 'Открыть галерею проекта', close: 'Закрыть', prev: 'Предыдущее изображение', next: 'Следующее изображение', full: 'Изображение в полном размере' }
}
const hotelGallery = ref<HTMLDialogElement | null>(null)
const galleryVideo = ref<HTMLVideoElement | null>(null)
const hotelSlideIndex = ref(0)
const hotelSlide = computed(() => activeGallery.value.slides[hotelSlideIndex.value] ?? activeGallery.value.slides[0])
const galleryLabels = computed(() => hotelGalleryLabels[language.value])

function openProjectGallery(project: keyof typeof projectGalleries, startAt = 0) {
  galleryProject.value = project
  hotelSlideIndex.value = startAt
  hotelGallery.value?.showModal()
}

function changeHotelSlide(direction: number) {
  const count = activeGallery.value.slides.length
  if (count > 1) hotelSlideIndex.value = (hotelSlideIndex.value + direction + count) % count
}

const featuredProjects = projects.filter((project) => project.id !== 'hotelverwaltung' && project.id !== 'feta' && !('demoUrl' in project))

const projectTechnologies = [...new Set(projects.flatMap(({ stack }) => stack.split(' · ')))]
  .sort((first, second) => first.localeCompare(second))

const technologyAreas = new Map(projectTechnologies.map((technology) => {
  const areas = new Set(projects
    .filter((project) => project.stack.split(' · ').includes(technology))
    .map((project) => project.area))

  return [technology, areas.size === 1 ? [...areas][0] : undefined] as const
}))

const visibleProjects = computed(() => {
  return projects
    .map((project, index) => ({ ...project, description: project.id === 'todo' ? t.value.todoDescription
      : project.id === 'shopplatzi' ? t.value.shopDescription : t.value.projectDescriptions[index] }))
    .filter((project) => {
      const stack = project.stack.split(' · ')
      const matchesTechnology = selectedTechnologies.value.length === 0
        || selectedTechnologies.value.some((item) => stack.includes(item))
      const matchesArea = !selectedAreas.value.length || selectedAreas.value.includes(project.area)
      return matchesArea && matchesTechnology
    })
    .sort((first, second) => {
      if (!first.createdAt || !second.createdAt) return Number(!first.createdAt) - Number(!second.createdAt)
      const order = first.createdAt.localeCompare(second.createdAt)
      return projectSort.value === 'newest' ? -order : order
    })
})

const hasProjectFilters = computed(() => selectedAreas.value.length > 0 || selectedTechnologies.value.length > 0)
const projectCount = computed(() => t.value.projectCount
  .replace('{visible}', String(visibleProjects.value.length))
  .replace('{total}', String(projects.length))
)

function switchProjectFilterMode(mode: ProjectFilterMode) {
  if (mode === projectFilterMode.value) return
  resetProjectFilters()
  projectFilterMode.value = mode
}

function toggleProjectArea(area: ProjectArea | '') {
  if (!area) {
    selectedAreas.value = []
    selectedTechnologies.value = []
    return
  }

  const selected = selectedAreas.value
  selectedAreas.value = selected.includes(area)
    ? selected.filter((item) => item !== area)
    : [...selected, area]
  selectedTechnologies.value = []
}

function toggleTechnology(option: string) {
  if (!option) {
    selectedTechnologies.value = []
    return
  }

  selectedAreas.value = []
  const selected = selectedTechnologies.value
  selectedTechnologies.value = selected.includes(option)
    ? selected.filter((item) => item !== option)
    : [...selected, option]
}

function resetProjectFilters() {
  selectedAreas.value = []
  selectedTechnologies.value = []
}

async function openProject(event: MouseEvent, id: string) {
  if (visibleProjects.value.some((project) => project.id === id)) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

  event.preventDefault()
  resetProjectFilters()
  await nextTick()

  const hash = '#' + id
  if (window.location.hash === hash) {
    document.getElementById(id)?.scrollIntoView()
  } else {
    window.location.hash = hash
  }
}

const skillGroups = [
  {
    key: 'programming',
    skills: [
      { name: 'HTML', icon: 'html5', color: 'E34F26' },
      { name: 'CSS', icon: 'css3', color: '1572B6' },
      { name: 'JavaScript', icon: 'javascript', color: 'B99B00' },
      { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
      { name: 'Vue 3', icon: 'vuedotjs', color: '42B883' },
      { name: 'SwiftUI', icon: 'swift', color: 'F05138', note: 'project' }
    ]
  },
  {
    key: 'apps',
    skills: [
      { name: 'Supabase', icon: 'supabase', color: '3ECF8E', note: 'project' },
      { name: 'SQL · MySQL', icon: 'mysql', color: '4479A1' },
      { name: 'REST APIs', icon: 'fastapi', color: '009688' },
      { name: 'PHP', icon: 'php', color: '777BB4' },
      { name: 'Java', icon: 'openjdk', color: '437291' }
    ]
  },
  {
    key: 'tools',
    skills: [
      { name: 'Git', icon: 'git', color: 'F05032' },
      { name: 'Docker', icon: 'docker', color: '2496ED' },
      { name: 'Xcode', icon: 'xcode', color: '147EFB' },
      { name: 'Xdebug', icon: 'php', color: '777BB4' },
      { name: 'Jira Service Management', icon: 'atlassian', color: '0052CC' }
    ]
  },
  {
    key: 'ai',
    skills: [{ name: 'ChatGPT', icon: 'openai', color: '412991' }]
  },
  {
    key: 'study',
    textKey: 'studyTopics'
  }
]

type SkillGroupKey = 'programming' | 'apps' | 'tools' | 'ai' | 'study'
const selectedSkillGroups = ref<SkillGroupKey[]>([])
const filterableSkillGroupKeys: SkillGroupKey[] = ['programming', 'apps', 'tools', 'ai']
function toggleSkillGroup(key?: SkillGroupKey) {
  if (!key) {
    selectedSkillGroups.value = []
    return
  }

  selectedSkillGroups.value = selectedSkillGroups.value.includes(key)
    ? selectedSkillGroups.value.filter((selected) => selected !== key)
    : [...selectedSkillGroups.value, key]
}

const visibleSkillGroups = computed(() => skillGroups.filter((group) =>
  group.key === 'study' || selectedSkillGroups.value.length === 0 || selectedSkillGroups.value.includes(group.key as SkillGroupKey)
))

function handleSkillIconLoad(event: Event) {
  const image = event.currentTarget as HTMLImageElement
  image.parentElement?.classList.add('has-icon')
}

function handleSkillIconError(event: Event) {
  (event.currentTarget as HTMLImageElement).hidden = true
}

const values = [
  { symbol: '⌘' },
  { symbol: '↗' },
  { symbol: '♡' },
  { symbol: '⟳' }
]

// Hier später deine bestätigten Kontaktdaten eintragen.
const githubUrl = 'https://github.com/ekschedl'
const emailAddress = ''

function changeLanguage(next: Language) {
  language.value = next
  updatePageLanguage()
  try {
    localStorage.setItem('portfolio-language', next)
  } catch {
    // Keep the selected language for this page.
  }
  menuOpen.value = false
}

function closeMenu() {
  menuOpen.value = false
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="page">
    <header class="header">
      <a href="/#home" class="logo" :aria-label="t.logoHome" @click="closeMenu">
        ek<span>.</span>
      </a>

      <nav
        id="main-navigation"
        class="navigation"
        :class="{ open: menuOpen }"
        :aria-label="t.navigationLabel"
      >
        <a :href="homeLink('#home')" @click="closeMenu">{{ t.nav[0] }}</a>
        <a :href="homeLink('#projects')" @click="closeMenu">{{ t.nav[1] }}</a>
        <a :href="homeLink('#technologies')" @click="closeMenu">{{ t.nav[2] }}</a>
        <a :href="homeLink('#about')" @click="closeMenu">{{ t.nav[3] }}</a>
        <a :href="educationPath" :aria-current="isEducation ? 'page' : undefined" @click="closeMenu">
          {{ educationLabels[language] }}
        </a>
        <a :href="experiencePath" :aria-current="isExperience ? 'page' : undefined" @click="closeMenu">
          {{ experienceLabels[language] }}
        </a>
      </nav>

      <div class="header-actions">
        <div class="languages" role="group" :aria-label="t.languageLabel">
          <button
            v-for="lang in languages"
            :key="lang"
            type="button"
            :class="{ active: language === lang }"
            :aria-pressed="language === lang"
            @click="changeLanguage(lang)"
          >
            {{ lang }}
          </button>
        </div>

        <button
          class="theme-button"
          type="button"
          :aria-label="darkMode ? t.switchToLight : t.switchToDark"
          :aria-pressed="darkMode"
          :title="darkMode ? t.switchToLight : t.switchToDark"
          @click="darkMode = !darkMode"
        >
          <span aria-hidden="true">{{ darkMode ? '☼' : '☾' }}</span>
        </button>

        <div class="header-ctas">
          <a
            class="header-cv"
            :class="{ 'header-cv-compact-label': language !== 'RU' }"
            href="/cv/Schedlberger_Lebenslauf_Softwareentwicklerin_12_26.pdf"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="t.cvDownload"
            :title="t.cvDownload"
          >
            <span class="cv-label-full">{{ t.cvDownload }}</span>
            <span class="cv-label-short">{{ t.cvShort }}</span>
            <svg class="cv-arrow" aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 19h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
          <a class="header-contact" :href="homeLink('#contact')">
            {{ t.contact }} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          class="menu-button"
          type="button"
          :aria-label="menuOpen ? t.menuClose : t.menuOpen"
          aria-controls="main-navigation"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          {{ menuOpen ? '✕' : '☰' }}
        </button>
      </div>
    </header>

    <EducationPage v-if="isEducation" :language="language" />
    <ExperiencePage v-else-if="isExperience" :language="language" />
    <main v-else>
      <!-- HERO BENTO -->
      <section id="home" class="hero-grid">
        <div class="tile portrait-tile">
          <div class="portrait-orbit orbit-one"></div>
          <div class="portrait-orbit orbit-two"></div>
          <span class="portrait-spark" aria-hidden="true">✳</span>

          <img
            src="/images/ekaterina-cutout.png"
            :alt="portfolioName"
            class="portrait-image"
            fetchpriority="high"
          />
        </div>

        <a href="#projects" class="tile intro-tile" :aria-label="t.nav[1]">
          <div>
            <span class="eyebrow">{{ t.heroGreeting }}</span>
            <h1>{{ t.heroName }}<span>.</span></h1>
            <h2>{{ t.role }}</h2>
            <p class="location">{{ t.location }}</p>
          </div>

          <div class="intro-bottom">
            <p>{{ t.heroNote }}</p>
            <span class="round-arrow" aria-hidden="true">↗</span>
          </div>
        </a>

        <a
          v-for="project in featuredProjects"
          :key="project.id"
          :href="'#' + project.id"
          @click="openProject($event, project.id)"
          class="tile project-tile"
          :data-area="project.area"
          :class="'tile-' + project.id"
        >
          <span class="tile-type tile-type-full">{{ t.projectTypes[project.area] }}</span>
          <span class="tile-type tile-type-compact">{{ t.projectTypesShort[project.area] }}</span>

          <div class="tile-project-image">
            <img v-if="project.id === 'yoganow'" class="yoga-tile-logo" src="/images/yoganow-logo.png" alt="" loading="lazy" />
            <img v-else-if="project.image" :src="project.image" :alt="project.title" loading="lazy" />
          </div>

          <div class="tile-bottom">
            <h3>{{ project.id === 'uno' ? t.unoTitle : project.title }}</h3>
            <span aria-hidden="true">↗</span>
          </div>
        </a>

        <a href="#technologies" class="tile expertise-tile">
          <span class="tile-type">{{ t.whatIUse }}</span>
          <h3>{{ t.nav[2] }}</h3>
          <div class="expertise-preview">
            <span>Vue </span>
            <span>TypeScript</span>
            <span>PHP</span>
            <span>{{ t.more }}</span>
          </div>
          <span class="tile-corner-arrow" aria-hidden="true">↗</span>
        </a>

        <a href="#about" class="tile about-tile">
          <span class="tile-type">{{ t.aboutTile }}</span>
          <h3>{{ t.about }}</h3>
          <p>{{ t.aboutShort }}</p>
          <span class="tile-corner-arrow" aria-hidden="true">↗</span>
        </a>
      </section>

      <!-- 01 / PORTFOLIO -->
      <section id="projects" class="section projects-section">
        <div class="section-head">
          <span class="section-number">{{ t.sectionPortfolio }}</span>
          <h2>{{ t.projectsTitle }}</h2>
          <p>{{ t.projectsIntro }}</p>
          <p class="portfolio-status">{{ t.portfolioStatus }}</p>
        </div>

        <div class="project-controls" role="group" :aria-label="t.filterOptions">
          <div class="project-filter-header">
            <div class="project-filter-mode" role="group" :aria-label="t.filterOptions">
              <button type="button" :aria-pressed="projectFilterMode === 'area'" @click="switchProjectFilterMode('area')">
                {{ t.areaMode }}
              </button>
              <button type="button" :aria-pressed="projectFilterMode === 'technology'" @click="switchProjectFilterMode('technology')">
                {{ t.technologyMode }}
              </button>
            </div>
            <div class="project-filter-summary">
              <span role="status">{{ hasProjectFilters ? projectCount : '' }}</span>
              <button v-if="hasProjectFilters" class="reset-filters" type="button" @click="resetProjectFilters">
                {{ t.reset }}
              </button>
            </div>
            <div class="project-sort" role="group" :aria-label="t.sortLabel">
              <button
                type="button"
                :aria-label="t.newest"
                :aria-pressed="projectSort === 'newest'"
                :title="t.newest"
                @click="projectSort = 'newest'"
              >↓</button>
              <button
                type="button"
                :aria-label="t.oldest"
                :aria-pressed="projectSort === 'oldest'"
                :title="t.oldest"
                @click="projectSort = 'oldest'"
              >↑</button>
            </div>
          </div>
          <fieldset v-if="projectFilterMode === 'area'" class="project-technology-filters">
            <legend>{{ t.areaFilter }}</legend>
            <div class="project-filter-buttons">
              <button
                v-for="area in (['', ...projectAreas] as const)"
                :key="area"
                type="button"
                :data-area="area"
                :aria-pressed="area ? selectedAreas.includes(area) : !selectedAreas.length"
                @click="toggleProjectArea(area)"
              >
                {{ area ? t.areas[area] : t.allAreas }}
              </button>
            </div>
          </fieldset>

          <fieldset v-else class="project-technology-filters">
            <legend>{{ t.filter }}</legend>
            <div class="project-filter-buttons">
              <button
                v-for="option in ['', ...projectTechnologies]"
                :key="option"
                type="button"
                :data-area="technologyAreas.get(option)"
                :aria-pressed="option ? selectedTechnologies.includes(option) : !selectedTechnologies.length"
                @click="toggleTechnology(option)"
              >
                {{ option || t.allTechnologies }}
              </button>
            </div>
          </fieldset>
        </div>

        <div role="status">
          <p v-if="!visibleProjects.length" class="project-empty">{{ t.noResults }}</p>
        </div>
        <div v-if="visibleProjects.length" class="projects-grid">
          <article
            v-for="project in visibleProjects"
            :id="project.id"
            :key="project.id"
            class="project-card"
          >
            <button class="project-visual project-cover" :data-area="project.area"
              type="button" aria-haspopup="dialog" :aria-label="(project.id === 'todo' ? t.todoTitle : project.title) + ' · ' + galleryLabels.open"
              @click="openProjectGallery(project.id)">
              <img v-if="project.image" :src="project.image" alt="" loading="lazy" />
              <div v-else class="project-cover-copy" aria-hidden="true">
                <span>JAVA · HIBERNATE</span>
                <strong>{{ project.title }}</strong>
                <span>JPA · HQL · SQLITE</span>
              </div>
              <span class="project-cover-expand" aria-hidden="true">↗</span>
            </button>

            <div class="project-meta">
              <div class="project-details">
                <span class="project-type project-area" :data-area="project.area">{{ t.areas[project.area] }}</span>
                <div class="project-title-row">
                  <h3>{{ project.id === 'todo' ? t.todoTitle : project.id === 'uno' ? t.unoTitle : project.title }}</h3>
                  <a v-if="'url' in project" class="project-repository-link" :href="project.url" target="_blank" rel="noopener noreferrer">
                    {{ t.projectLink }} <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <p v-if="project.createdAt" class="project-created">{{ t.created }} · {{ new Intl.DateTimeFormat(language.toLowerCase(), { month: 'long', year: 'numeric' }).format(new Date(project.createdAt + '-01T00:00:00')) }}</p>
                <p>{{ project.description }}</p>
                <span class="project-stack">{{ project.stack }}</span>
              </div>
              <div v-if="'demoUrl' in project" class="project-card-actions">
                <button type="button" aria-haspopup="dialog"
                  @click="openProjectGallery(project.id, projectGalleries[project.id].slides.length - 1)">
                  {{ t.inlineDemo }}
                </button>
                <a :href="project.demoUrl" target="_blank" rel="noopener noreferrer">
                  {{ t.liveDemo }} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div v-else class="project-card-actions">
                <button type="button" aria-haspopup="dialog"
                  @click="openProjectGallery(project.id, project.id === 'yoganow' ? yogaSlides.length - 1 : 0)">
                  {{ project.id === 'yoganow' ? yogaDemoText[language].action : galleryLabels.open }}
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 02 / TECHNOLOGIES -->
      <section id="technologies" class="section technologies-section">
        <div class="section-head">
          <span class="section-number">{{ t.sectionTechnologies }}</span>
          <h2>{{ t.technologiesTitle }}</h2>
          <p>{{ t.technologiesIntro }}</p>
        </div>

        <div class="tech-group-filters" role="group" :aria-label="t.technologiesTitle">
          <button type="button" :aria-pressed="!selectedSkillGroups.length" @click="toggleSkillGroup()">{{ t.techFilterAll }}</button>
          <button
            v-for="(key, index) in filterableSkillGroupKeys"
            :key="key"
            type="button"
            :class="'tech-filter-' + key"
            :aria-pressed="selectedSkillGroups.includes(key)"
            @click="toggleSkillGroup(key)"
          >{{ t.techFilterGroups[index] }}</button>
          <button
            v-if="selectedSkillGroups.length"
            type="button"
            class="tech-filter-reset"
            @click="toggleSkillGroup()"
          >{{ t.techFilterReset }}</button>
        </div>
        <div class="tech-groups">
          <section v-for="(group, index) in visibleSkillGroups" :key="group.key" class="tech-group" :class="['tech-group-' + group.key, { 'tech-group-study': group.textKey }]">
            <h3>{{ t.techGroups[group.key === 'study' ? 4 : filterableSkillGroupKeys.indexOf(group.key as SkillGroupKey)] }}</h3>
            <p v-if="group.textKey" class="tech-study">{{ t.studyTopics }}</p>
            <div v-else class="tech-list">
              <div
                v-for="skill in group.skills"
                :key="skill.name"
                class="tech-item"
                :style="{ '--skill-color': '#' + skill.color }"
              >
                <span class="tech-icon" aria-hidden="true">
                  <img
                    :src="`https://cdn.simpleicons.org/${skill.icon}/${skill.color}`"
                    alt=""
                    loading="lazy"
                    @load="handleSkillIconLoad"
                    @error="handleSkillIconError"
                  />
                  <span class="tech-icon-fallback">{{ skill.name.slice(0, 2) }}</span>
                </span>
                <span>{{ skill.name }}</span>
              </div>
            </div>
          </section>
        </div>
      </section>

      <!-- 03 / ABOUT ME -->
      <section id="about" class="section about-section">
        <div class="about-layout">
          <div class="section-head">
            <span class="section-number">{{ t.sectionAbout }}</span>
            <h2>{{ t.aboutTitle }}</h2>
          </div>

          <div class="about-content">
            <p>{{ t.aboutText }}</p>

            <div class="values-line">
              <div
                v-for="(value, index) in values"
                :key="value.symbol"
                class="value-item"
              >
                <span aria-hidden="true">{{ value.symbol }}</span>
                <strong>{{ t.valueLabels[index] }}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 04 / SAY HELLO -->
      <section id="contact" class="section contact-section">
        <div class="contact-copy">
          <span class="section-number">{{ t.sectionContact }}</span>
          <h2>{{ t.helloTitle }}</h2>
          <p>{{ t.helloText }}</p>

          <div class="contact-actions">
            <a
              v-if="emailAddress"
              :href="`mailto:${emailAddress}`"
              class="primary-link"
            >
              {{ t.email }} <span aria-hidden="true">↗</span>
            </a>

            <a
              :href="githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="secondary-link"
            >
              {{ t.github }} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div class="contact-art" aria-hidden="true">
          <span class="art-code">&lt;/&gt;</span>
          <span class="art-star">✳</span>
        </div>
      </section>
    </main>

    <dialog ref="hotelGallery" class="hotel-gallery" :class="{ 'hotel-gallery-video': 'video' in hotelSlide, 'hotel-gallery-video-wide': galleryProject === 'uno' && 'video' in hotelSlide }" :aria-label="activeGallery.title"
      @close="galleryVideo?.pause(); if ('embed' in hotelSlide) hotelSlideIndex = 0"
      @keydown.left.prevent="changeHotelSlide(-1)" @keydown.right.prevent="changeHotelSlide(1)">
      <div class="hotel-gallery-header">
        <strong>{{ activeGallery.title }}</strong>
        <button type="button" autofocus :aria-label="galleryLabels.close" @click="hotelGallery?.close()">×</button>
      </div>
      <figure aria-live="polite">
        <video v-if="'video' in hotelSlide" ref="galleryVideo" :src="hotelSlide.video"
          :poster="hotelSlide.poster"
          :aria-label="hotelSlide.caption[language]" controls muted playsinline preload="none" @keydown.left.stop @keydown.right.stop />
        <iframe v-else-if="'embed' in hotelSlide" class="todo-demo-frame" :src="hotelSlide.embed"
          :title="activeGallery.title" sandbox="allow-scripts allow-same-origin" />
        <img v-else :src="hotelSlide.image" :alt="hotelSlide.caption[language]" loading="lazy" />
        <figcaption>{{ hotelSlide.caption[language] }}</figcaption>
      </figure>
      <div v-if="activeGallery.slides.length > 1" class="hotel-gallery-controls">
        <button type="button" :aria-label="galleryLabels.prev" @click="changeHotelSlide(-1)">←</button>
        <span>{{ hotelSlideIndex + 1 }} / {{ activeGallery.slides.length }}</span>
        <button v-if="'embed' in (activeGallery.slides[hotelSlideIndex + 1] ?? {})"
          type="button" @click="changeHotelSlide(1)">{{ t.inlineDemo }} →</button>
        <button v-else type="button" :aria-label="galleryLabels.next" @click="changeHotelSlide(1)">→</button>
      </div>
      <a v-if="'image' in hotelSlide" :href="hotelSlide.image" target="_blank" rel="noopener">{{ galleryLabels.full }} ↗</a>
      <p v-if="galleryProject === 'yoganow'" class="yoga-gallery-access">{{ yogaDemoText[language].access }}</p>
    </dialog>

    <footer class="footer">
      <span>{{ t.footerCopyright }}</span>
      <span>{{ t.footerMade }}</span>
    </footer>

    <button class="back-to-top" type="button" :aria-label="t.backToTop" :title="t.backToTop" @click="scrollToTop">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path d="M12 20V4m0 0 7 7m-7-7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.section-head .portfolio-status {
  display: block;
  max-width: none;
  margin: 16px 0 0;
  padding: 14px clamp(12px, 3vw, 22px);
  border-inline-start: 5px solid #dbad46;
  border-radius: 10px;
  background: #245c4b;
  color: #fff;
  font-size: clamp(17px, 2vw, 22px);
  font-weight: 700;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

.project-filter-header,
.project-filter-summary,
.project-filter-mode {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.project-filter-header {
  flex: 1 1 100%;
  justify-content: flex-start;
  gap: 12px;
}

.project-filter-mode {
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
}

.project-filter-mode button {
  padding: 7px 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--ink);
}

.project-filter-mode button[aria-pressed='true'] {
  background: var(--ink);
  color: var(--on-ink);
}

.project-sort {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.project-sort button {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 1px solid var(--control-line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
  font-size: 20px;
}

.project-sort button[aria-pressed='true'] {
  border-color: var(--accent);
  background: var(--mist);
}

.project-filter-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  font-size: 13px;
}

.project-technology-filters {
  flex: 1 1 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.project-technology-filters legend {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.project-filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.project-filter-buttons button {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid var(--control-line);
  border-radius: 8px;
  background: var(--area-color, var(--surface));
  color: var(--ink);
}

.project-filter-buttons button:hover {
  border-color: var(--ink);
}

.project-filter-buttons button[aria-pressed='true'] {
  background: var(--area-color, var(--surface));
  box-shadow: inset 0 0 0 2px var(--ink);
}

[data-area='mobile'] {
  --area-color: var(--mist);
}

[data-area='game'] {
  --area-color: var(--lilac);
}

[data-area='web'] {
  --area-color: var(--slate);
}

[data-area='backend'] {
  --area-color: var(--blue);
}

.project-tile[data-area],
.project-visual[data-area],
.project-area[data-area] {
  background: var(--area-color);
}

.project-area {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--ink);
}

.project-card,
.project-card .project-meta {
  display: flex;
  flex-direction: column;
}

.project-card .project-meta {
  flex: 1;
  gap: 16px;
}

.project-card-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 8px;
  margin-top: auto;
}

.todo-demo-frame {
  display: block;
  width: 100%;
  height: clamp(360px, 70dvh, 680px);
  border: 1px solid var(--control-line);
  border-radius: 8px;
  background: var(--surface);
}

.project-card-actions :is(button, a) {
  max-width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--control-line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--accent);
  font: inherit;
  font-weight: 600;
  text-align: start;
  overflow-wrap: anywhere;
}

.project-cover[data-area] {
  position: relative;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  place-items: center;
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  padding: clamp(5px, 1.4vw, 16px);
  border: 0;
  color: var(--ink);
}

.project-cover > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.project-cover-copy {
  display: grid;
  gap: clamp(3px, 1vw, 12px);
  max-width: 100%;
  text-align: center;
  overflow-wrap: anywhere;
}

.project-cover-copy span {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: clamp(8px, 1.1vw, 13px);
  letter-spacing: .08em;
}

.project-cover-copy strong {
  font-size: clamp(13px, 2.4vw, 34px);
  line-height: 1.15;
}

.project-cover-expand {
  position: absolute;
  inset-block-start: 6px;
  inset-inline-end: 6px;
  padding: 3px 7px;
  border-radius: 6px;
  background: var(--surface);
}

.tile-yoganow .yoga-tile-logo {
  width: min(100%, 160px);
  object-fit: contain;
}

.yoga-gallery-access {
  margin: 10px 0 0;
  color: var(--muted);
}

.hotel-gallery {
  width: min(96vw, 1180px);
  max-width: none;
  max-height: 94vh;
  padding: clamp(8px, 2vw, 20px);
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--surface);
  color: var(--ink);
  text-align: center;
  overflow-wrap: anywhere;
}

.hotel-gallery::backdrop { background: #000b; }

.hotel-gallery-header,
.hotel-gallery-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.hotel-gallery-controls {
  justify-content: center;
  margin: 12px 0 8px;
}

.hotel-gallery button {
  min-width: 40px;
  min-height: 40px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--paper);
  color: var(--ink);
}

.hotel-gallery figure { margin: 12px 0 0; }
.hotel-gallery img {
  display: block;
  width: 100%;
  height: min(65dvh, 680px);
  object-fit: contain;
  border-radius: 8px;
}

.hotel-gallery.hotel-gallery-video {
  width: min(96vw, 560px);
}

.hotel-gallery-video video {
  display: block;
  width: min(100%, 41dvh, 420px);
  height: auto;
  aspect-ratio: 2 / 3;
  margin-inline: auto;
  border-radius: 8px;
  background: #171717;
  object-fit: contain;
}

.hotel-gallery.hotel-gallery-video-wide {
  width: min(96vw, 1040px);
}

.hotel-gallery-video-wide video {
  width: min(100%, 100dvh);
  aspect-ratio: 1440 / 934;
}

.hotel-gallery figcaption { margin-top: 8px; }
.hotel-gallery a { text-decoration: underline; }

.project-title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0 16px;
}

.project-repository-link {
  display: flex;
  width: fit-content;
  max-width: 100%;
  align-items: center;
  gap: 7px;
  color: var(--accent);
  font-size: 14px;
  font-weight: 600;
  text-underline-offset: 4px;
}

.project-repository-link:hover {
  text-decoration: underline;
}

.tech-group-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 32px;
}

.tech-group-filters button {
  padding: 10px 15px;
  border: 1px solid var(--control-line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--ink);
  font: inherit;
  font-size: 15px;
  transition: background .18s ease, border-color .18s ease, transform .18s ease;
}

.tech-group-filters button[aria-pressed='true'] {
  border-color: var(--tech-group-color, var(--accent));
  background: color-mix(in srgb, var(--tech-group-color, var(--mist)) 78%, var(--surface));
}

.tech-filter-programming,
.tech-group-programming { --tech-group-color: var(--mist); }
.tech-filter-apps,
.tech-group-apps { --tech-group-color: var(--slate); }
.tech-filter-tools,
.tech-group-tools { --tech-group-color: var(--lilac); }
.tech-filter-ai,
.tech-group-ai { --tech-group-color: color-mix(in srgb, var(--accent) 22%, var(--paper)); }

.tech-group-filters button:hover {
  border-color: var(--accent);
  transform: translateY(-1px);
}

.tech-group-filters .tech-filter-reset {
  border-color: transparent;
  background: transparent;
  color: var(--muted);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.tech-groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 28px;
}

.tech-group {
  min-width: 0;
  padding: clamp(18px, 2.2vw, 28px);
  border: 1px solid var(--line);
  border-radius: 16px;
  background: color-mix(in srgb, var(--tech-group-color, var(--surface)) 78%, var(--surface));
}

.tech-group-study {
  grid-column: 1 / -1;
  background: color-mix(in srgb, var(--mist) 38%, var(--surface));
}

.tech-group h3 {
  margin: 0;
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  font-size: clamp(19px, 1.6vw, 23px);
  font-weight: 600;
}

.tech-group .tech-list {
  margin-top: 18px;
}

.tech-study {
  margin: 16px 0 0;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 16px;
  line-height: 1.75;
}

@media (max-width: 680px) {
  .tech-groups {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
  }

  .tech-group-study {
    grid-column: auto;
  }

  .tech-group-filters button {
    padding: 9px 13px;
    font-size: 14px;
  }
}

.menu-button {
  box-sizing: border-box;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--control-line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
  font-size: 22px;
}

.header-actions {
  flex: 0 0 auto;
  flex-wrap: nowrap;
  gap: 14px;
}

.header-ctas {
  display: flex;
  flex: 0 0 auto;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;
}

.header-ctas > a {
  flex: 0 0 auto;
}

.header-contact {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 44px;
  padding: 0 20px;
}

.theme-button {
  box-sizing: border-box;
  width: 44px;
  height: 44px;
}

.header-cv {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
  height: 44px;
  min-height: 44px;
  padding: 0 16px;
  border: 1px solid var(--accent);
  border-radius: 10px;
  background: var(--accent);
  color: var(--on-ink);
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}

.header-cv:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 14px var(--art-accent);
}

.cv-arrow {
  display: block;
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  transition: transform .18s ease;
}

.header-cv:hover .cv-arrow {
  transform: translateY(2px);
}

.cv-label-short {
  display: none;
}

.header-cv-compact-label .cv-label-full {
  display: none;
}

.header-cv-compact-label .cv-label-short {
  display: inline;
}

.back-to-top {
  position: fixed;
  z-index: 40;
  right: clamp(10px, 2vw, 24px);
  bottom: clamp(10px, 2vw, 24px);
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--accent);
  cursor: pointer;
  opacity: .82;
  transition: opacity .18s ease, transform .18s ease;
}

.back-to-top:hover {
  opacity: 1;
  transform: translateY(-2px);
}

.back-to-top svg {
  display: block;
  width: 26px;
  height: 26px;
}

.back-to-top:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.languages {
  box-sizing: border-box;
  flex: 0 0 auto;
  height: 44px;
  gap: 1px;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
}

.languages button {
  position: relative;
  display: grid;
  min-width: 34px;
  min-height: 34px;
  place-items: center;
  padding: 5px 7px;
  border-radius: 0;
  font-size: 11px;
}

.languages button.active {
  background: transparent;
  color: var(--accent);
  box-shadow: none;
}

.languages button.active::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--accent);
  content: '';
}

.theme-button,
.menu-button,
.header-cv {
  transition: border-radius .18s ease, background-color .18s ease, transform .18s ease, box-shadow .18s ease;
}

.languages button {
  transition: color .18s ease, box-shadow .18s ease;
}

.theme-button:hover,
.menu-button:hover {
  border-radius: 8px;
}

.header-cv:hover {
  border-radius: 14px;
}


@media (min-width: 1301px) and (max-width: 1650px) {
  .header {
    gap: 14px;
  }

  .navigation {
    gap: 15px;
  }

  .navigation a {
    font-size: 16px;
  }

  .header-actions {
    gap: 10px;
  }

  .header-ctas {
    gap: 8px;
  }

  .cv-label-full {
    display: none;
  }

  .cv-label-short {
    display: inline;
  }
}

@media (max-width: 1300px) {
  .navigation {
    display: none;
    position: absolute;
    z-index: 30;
    top: 75px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 15px;
    border-radius: 12px;
    background: var(--paper);
    box-shadow: 0 15px 35px rgba(0,0,0,.08);
  }

  .navigation.open {
    display: flex;
  }

  .navigation a {
    padding: 12px 14px;
    font-size: 18px;
  }

  .menu-button {
    display: block;
  }
}

@media (max-width: 920px) {
  .header-contact {
    display: none;
  }

  .cv-label-full {
    display: none;
  }

  .cv-label-short {
    display: inline;
  }

  .header-cv {
    min-height: 36px;
    padding: 0 11px;
    font-size: 11px;
  }
}

@media (max-width: 520px) {
  .logo {
    flex: 0 0 auto;
    margin-right: 8px;
  }

  .header {
    flex-wrap: nowrap;
    min-height: 0;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
  }

  .header-actions {
    flex: 0 1 auto;
    width: auto;
    min-width: 0;
    justify-content: space-between;
    gap: 4px;
  }

  .header-contact {
    display: none;
  }

  .navigation {
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    max-width: 100%;
    box-sizing: border-box;
    padding: 8px;
  }

  .cv-label-full {
    display: none;
  }

  .cv-label-short {
    display: none;
  }

  .header-contact,
  .theme-button,
  .menu-button,
  .header-cv {
    height: 40px;
    min-height: 40px;
  }

  .header-cv {
    width: 40px;
    min-width: 40px;
    min-height: 40px;
    padding: 0 6px;
    gap: 0;
    border: 0;
    border-radius: 10px;
    font-size: 11px;
  }

  .cv-arrow {
    display: block;
    width: 18px;
    height: 18px;
  }

  .theme-button,
  .menu-button {
    width: 40px;
    min-width: 40px;
    border: 1px solid var(--control-line);
    border-radius: 8px;
    background: var(--surface);
    color: var(--ink);
  }

  .languages {
    box-sizing: border-box;
    height: 40px;
    gap: 0;
    padding: 2px;
    border: 0;
    border-radius: 0;
    background: transparent;
  }

  .languages button {
    width: 30px;
    min-width: 30px;
    height: 34px;
    min-height: 34px;
    padding: 0;
    border-radius: 0;
    font-size: 10px;
  }

  .header-ctas {
    gap: 6px;
  }

  .menu-button {
    font-size: 20px;
  }
}

@media (max-width: 680px) {
  .cv-label-full,
  .cv-label-short,
  .header-cv-compact-label .cv-label-short {
    display: none;
  }

  .header-cv {
    width: 40px;
    min-width: 40px;
    height: 40px;
    min-height: 40px;
    padding: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .header-cv,
  .cv-arrow,
  .back-to-top {
    transition: none;
  }
}

@media (max-width: 340px) {
  .header-actions {
    gap: 3px;
  }

  .header {
    gap: 4px;
  }

  .theme-button {
    display: grid;
    width: 30px;
    min-width: 30px;
    height: 32px;
    min-height: 32px;
  }

  .languages button {
    width: 24px;
    min-width: 24px;
    padding: 0;
  }

  .header-cv {
    width: 30px;
    min-width: 30px;
    height: 32px;
    min-height: 32px;
    padding: 0;
  }

  .menu-button {
    width: 30px;
    min-width: 30px;
    height: 32px;
    min-height: 32px;
  }
}

@media (max-width: 260px) {
  .logo {
    font-size: 30px;
    margin-right: 4px;
  }

  .header {
    gap: 2px;
  }

  .header-actions {
    gap: 2px;
  }

  .languages button {
    width: 20px;
    min-width: 20px;
  }

  .theme-button {
    width: 34px;
    min-width: 34px;
    height: 32px;
    min-height: 32px;
  }

  .header-cv,
  .menu-button {
    width: 34px;
    min-width: 34px;
    height: 32px;
    min-height: 32px;
  }
}

@media (max-width: 220px) {
  .logo {
    font-size: 24px;
    margin-right: 3px;
  }

  .languages button {
    width: 20px;
    min-width: 20px;
    font-size: 10px;
  }

  .header-actions {
    gap: 1px;
  }

  .header {
    gap: 2px;
  }

  .theme-button {
    width: 30px;
    min-width: 30px;
    height: 30px;
    min-height: 30px;
  }

  .header-cv {
    width: 30px;
    min-width: 30px;
    height: 30px;
    min-height: 30px;
  }

  .menu-button {
    width: 30px;
    min-width: 30px;
    height: 30px;
    min-height: 30px;
  }
}
</style>
