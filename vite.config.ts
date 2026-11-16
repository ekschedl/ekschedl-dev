import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const siteUrl = 'https://ekschedl.pages.dev'
const portfolioPages = [
  {
    path: '/Ausbildung',
    title: 'Ausbildung | Ekaterina Schedlberger',
    description: 'Ausbildung von Ekaterina Schedlberger in Graz: Software Engineering an der FH CAMPUS 02, Webentwicklung am WIFI und Transkulturelle Kommunikation.'
  },
  {
    path: '/Berufserfahrung',
    title: 'Berufserfahrung | Ekaterina Schedlberger',
    description: 'Berufserfahrung von Ekaterina Schedlberger: Softwareentwicklung bei JAWA Management Software GmbH, Hotellerie, Dolmetschen und Wertpapiergeschäft.'
  }
]

function portfolioSeo(): Plugin {
  return {
    name: 'portfolio-seo',
    apply: 'build',
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        const home = bundle['index.html']
        if (!home || home.type !== 'asset' || typeof home.source !== 'string') {
          this.error('The portfolio build did not emit index.html.')
        }

        for (const page of portfolioPages) {
          const url = siteUrl + page.path
          const html = home.source
            .replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
            .replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*/g, `$1${page.description}`)
            .replace(/(<meta property="og:title" content=")[^"]*/, `$1${page.title}`)
            .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
            .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
            .replace(/^ *<script type="application\/ld\+json" id="profile-structured-data">[\s\S]*?<\/script>\r?\n/m, '')
          this.emitFile({ type: 'asset', fileName: `${page.path.slice(1)}.html`, source: html })
        }

        const sitemap = ['/', ...portfolioPages.map(page => page.path)]
          .map(path => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n')
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap}\n</urlset>\n`
        })
        this.emitFile({
          type: 'asset',
          fileName: 'robots.txt',
          source: `User-agent: *\nDisallow: /api/\nSitemap: ${siteUrl}/sitemap.xml\n`
        })
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    portfolioSeo(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
