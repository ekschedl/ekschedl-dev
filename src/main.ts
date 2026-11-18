// Startpunkt der Website. Verbindet Vue, die Sprachverwaltung und die globalen Styles mit der Seite.
import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'

import './style.css'

createApp(App).use(i18n).mount('#app')
