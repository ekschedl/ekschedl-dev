import {
  hotelConsoleImage,
  projects,
  todoDemoUrl,
  shopDemoUrl,
  unoWebCover,
  unoWebDemoUrl
} from './portfolioData'

const hotelSlides = [

  {
    image: hotelConsoleImage,
    captionKey: 'hotelOverview'
  },
  {
    image: '/images/hotelverwaltung-zimmerpreise.png',
    captionKey: 'hotelPrices'
  },
  {
    image: '/images/hotelverwaltung-buchungsdemo.png',
    captionKey: 'hotelBooking'
  },
  { image: '/images/hotelverwaltung-modell.svg', captionKey: 'hotelModel' },
  { image: '/images/hotelverwaltung-buchung.svg', captionKey: 'hotelProcess' },
  { image: '/images/hotelverwaltung-architektur.svg', captionKey: 'hotelArchitecture' },
  { image: '/images/hotelverwaltung-uml.png', captionKey: 'hotelUml' }
] as const

export const yogaSlides = [
  { image: '/images/yoganow-overview.png', captionKey: 'yogaHome' },
  { image: '/images/yoganow-slide-09.png', captionKey: 'yogaLibrary' },
  { image: '/images/yoganow-slide-10.png', captionKey: 'yogaBooking' },
  { video: '/videos/yoganow-demo.mp4', poster: '/images/yoganow-video-poster.jpg', captionKey: 'yogaVideo' }
] as const

const fetaSlides = [
  { image: '/images/feta-ueber-uns.png', captionKey: 'fetaHome' },
  { image: '/images/feta-katalog.png', captionKey: 'fetaCatalog' },
  { image: '/images/feta-zutaten.png', captionKey: 'fetaIngredients' },
  { image: '/images/feta-mobil.png', captionKey: 'fetaMobile' },
  { image: '/images/feta-kontakt.png', captionKey: 'fetaContact' }
] as const

export const projectGalleries = {
  portfolio: {
    slides: [
      { image: '/images/pixel-avatar.png', captionKey: 'portfolioPixel' }
    ]
  },
  geschenkeverwaltung: {
    slides: [
      { image: '/images/geschenkeverwaltung-vorschau.png', captionKey: 'giftsOverview' },
      { image: '/images/geschenkeverwaltung-startfenster.png', captionKey: 'giftsMenu' },
      { image: '/images/geschenkeverwaltung-rechner.png', captionKey: 'giftsCalculator' }
    ]
  },
  todo: {
    slides: [
      { image: '/images/todo-start.jpg', captionKey: 'todoHome' },
      { image: '/images/todo-aufgaben.jpg', captionKey: 'todoTasks' },
      { embed: `${todoDemoUrl}?v=91f0b77`, captionKey: 'todoDemo' }
    ]
  },
  shopplatzi: {
    slides: [
      { image: '/images/todo-shopplatzi.jpg', captionKey: 'shopOverview' },
      { embed: `${shopDemoUrl}?v=91f0b77`, captionKey: 'shopDemo' }
    ]
  },
  feta: { slides: fetaSlides },
  hotelverwaltung: { slides: hotelSlides },
  yoganow: { slides: yogaSlides },
  uno: {
    slides: [
      { image: projects[1].image, captionKey: 'unoStart' },
      { image: '/images/uno_spiel.png', captionKey: 'unoCards' },
      { image: '/images/uno_sieger.png', captionKey: 'unoWinner' },
      { video: '/videos/uno-console.mp4', poster: projects[1].image, captionKey: 'unoVideo' }
    ]
  },
  'uno-web': {
    slides: [
      { image: '/images/uno-web.png', captionKey: 'unoWebStart' },
      { image: unoWebCover, captionKey: 'unoWebWinter' },
      { image: '/images/campus02-farbwahl.png', captionKey: 'unoWebColor' },
      { image: '/images/campus02-rundensieg.png', captionKey: 'unoWebRound' },
      { image: '/images/campus02-partiesieg.png', captionKey: 'unoWebWinner' },
      {
        embed: unoWebDemoUrl,
        captionKey: 'unoWebDemo'
      }
    ]
  },
  kaffeehaus: {
    slides: [
      { image: '/images/mokka-start.png', captionKey: 'coffeeHome' },
      { image: '/images/mokka-menu.png', captionKey: 'coffeeMenu' },
      { image: '/images/mokka-galerie-detail.png', captionKey: 'coffeeGallery' }
    ]
  }
}
