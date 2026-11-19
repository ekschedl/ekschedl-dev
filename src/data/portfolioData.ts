// Gemeinsame Portfoliodaten. Enthält Projekte, Technologien sowie Links zu Lebenslauf und Demos.
export const cvPath = '/cv/Schedlberger_Lebenslauf_Softwareentwicklerin_12_26.pdf'

export const todoDemoUrl = 'https://ekschedl.github.io/jawa_todo/todo/'
export const shopDemoUrl = 'https://ekschedl.github.io/jawa_todo/shopplatzi/'

export const hotelConsoleImage = '/images/hotelverwaltung-konsole.png'

export const unoWebDemoUrl = import.meta.env?.VITE_CAMPUS02_DEMO_URL?.trim() || 'https://campus-kartenspiel.onrender.com/'
export const unoWebCover = '/images/uno-web-spieltisch.png'

export const projects = [
  {
    id: 'yoganow',
    createdAt: '2026-06',
    type: 'iOS APP',
    area: 'mobile',
    image: '/images/yoganow-overview.png',
    url: 'https://github.com/ekschedl/YogaNowStudio',
    stack: 'Swift · SwiftUI · Supabase'
  },
  {
    id: 'uno',
    createdAt: '2025-06',
    type: 'CARD GAME',
    area: 'backend',
    image: '/images/uno.jpg',
    url: 'https://github.com/ekschedl/UnoGame_inDerKonsole_Java_campusMe_2025',
    stack: 'Java · OOP · JDBC · SQLite'
  },
  {
    id: 'kaffeehaus',
    createdAt: '2025-06',
    type: 'WEB PROJECT',
    area: 'web',
    image: '/images/mokka-start.png',
    url: 'https://github.com/ekschedl/web1_hausaufgabe01_Mokka',
    stack: 'HTML · CSS · JavaScript'
  },
  {
    id: 'hotelverwaltung',
    createdAt: '2026-01',
    type: 'CONSOLE APP',
    area: 'backend',
    image: hotelConsoleImage,
    url: 'https://github.com/ekschedl/Datenbankenprogrammierung_02_hotel_pruefung',
    stack: 'Java · Hibernate · JPA · HQL · SQLite · XML'
  },
  {
    id: 'feta',
    createdAt: '2023-03',
    type: 'CLIENT WEBSITE',
    area: 'web',
    image: '/images/feta-katalog.png',
    url: 'https://github.com/ekschedl/feta_new_2024/tree/main/feta-theme-new_server_08.2024',
    stack: 'WordPress · PHP · HTML · CSS · JavaScript'
  },
  {
    id: 'geschenkeverwaltung',
    createdAt: '2026-01',
    area: 'desktop',
    image: '/images/geschenkeverwaltung-vorschau.png',
    url: 'https://github.com/ekschedl/ISY_GeschenkeManager',
    stack: 'C# · WPF · XAML · MVVM · Entity Framework · SQL Server LocalDB'
  },
  {
    id: 'todo',
    createdAt: '2025-07',
    area: 'web',
    image: '/images/todo-aufgaben.jpg',
    url: 'https://github.com/ekschedl/jawa_todo',
    demoUrl: todoDemoUrl,
    stack: 'Vue · TypeScript · Vuetify · Pinia'
  },
  {
    id: 'shopplatzi',
    createdAt: '2025-07',
    area: 'web',
    image: '/images/todo-shopplatzi.jpg',
    url: 'https://github.com/ekschedl/jawa_todo',
    demoUrl: shopDemoUrl,
    stack: 'Vue · TypeScript · Vuetify · Pinia · Axios · REST-APIs'
  },
  {
    id: 'uno-web',
    createdAt: '2025-12',
    area: 'web',
    image: unoWebCover,
    url: 'https://github.com/ekschedl/NowaUno',
    demoUrl: unoWebDemoUrl,
    stack: 'HTML · CSS · JavaScript · Node.js · Express · REST-API'
  },
  {
    id: 'portfolio',
    createdAt: '2026-11',
    area: 'web',
    image: '/images/pixel-avatar.png',
    url: 'https://github.com/ekschedl/ekschedl-dev',
    stack: 'Vue · TypeScript · Cloudflare Workers AI'
  }
] as const

export const skillGroups = [
  {
    key: 'programming',
    skills: [
      { name: 'HTML', icon: 'html5', color: 'E34F26' },
      { name: 'CSS', icon: 'css3', color: '1572B6' },
      { name: 'JavaScript', icon: 'javascript', color: 'B99B00' },
      { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
      { name: 'Vue', icon: 'vuedotjs', color: '42B883' },
      { name: 'SwiftUI', icon: 'swift', color: 'F05138', note: 'project' },
      { name: 'Swift', icon: 'swift', color: 'F05138' },
      { name: 'Vuetify', icon: 'vuetify', color: '1867C0' },
      { name: 'Pinia', icon: 'pinia', color: 'B99B00' },
      { name: 'Axios', icon: 'axios', color: '5A29E4' },
      { name: 'WordPress', icon: 'wordpress', color: '21759B' },
      { name: 'WPF', icon: '', color: '512BD4' },
      { name: 'XAML', icon: '', color: '512BD4' },
    ]
  },
  {
    key: 'apps',
    skills: [
      { name: 'Supabase', icon: 'supabase', color: '3ECF8E', note: 'project' },
      { name: 'SQL · MySQL', icon: 'mysql', color: '4479A1' },
      { name: 'REST APIs', icon: 'fastapi', color: '009688' },
      { name: 'PHP', icon: 'php', color: '777BB4' },
      { name: 'C#', icon: '', color: '512BD4' },
      { name: 'XML', icon: '', color: '4479A1' },
      { name: 'Java', icon: 'openjdk', color: '437291' },
      { name: 'Node.js', icon: 'nodedotjs', color: '339933' },
      { name: 'Express', icon: 'express', color: '444444' },
      { name: 'JDBC', icon: '', color: '437291' },
      { name: 'Hibernate', icon: 'hibernate', color: '59666C' },
      { name: 'JPA', icon: '', color: '59666C' },
      { name: 'HQL', icon: '', color: '59666C' },
      { name: 'SQLite', icon: 'sqlite', color: '003B57' },
      { name: 'Entity Framework', icon: '', color: '512BD4' },
      { name: 'SQL Server LocalDB', icon: '', color: '4479A1' }
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
