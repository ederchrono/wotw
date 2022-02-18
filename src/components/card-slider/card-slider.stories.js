import CardSlider from './card-slider.vue'

const components = { CardSlider }

export default { title: 'Card slider' }

const slides = [
  {
    title: 'Ready Player One',
    description: 'When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune.',
    image: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg'
  },
  {
    title: 'Avengers: Infinity War',
    description: 'As the Avengers and their allies have continued to protect the world from threats too large for any...',
    image: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg'
  },
  {
    title: 'Coco',
    description: 'Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician...',
    image: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg'
  }
]

export const interactive = () => ({
  components,
  data () {
    return {
      slides,
      clicked: 'none'
    }
  },
  methods: {
    buttonClicked (index) {
      this.clicked = slides[index].title
    }
  },
  template: `<div>
    <card-slider :slides="slides" @click="buttonClicked"/>
    <p>clicked: {{clicked}}</p>
  </div>`
})
