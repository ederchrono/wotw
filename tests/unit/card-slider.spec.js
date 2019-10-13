import { mount } from '@vue/test-utils'
import CardSlider from '@/components/card-slider/index.vue'

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

describe('CardSlider.vue', () => {
  describe('when it has slides', () => {
    const wrapper = mount(CardSlider, {
      propsData: { slides }
    })
    describe('emits a click with the selected card index when clicking the button', () => {
      const button = wrapper.find('button')

      it('when first card is selected payload is 0', () => {
        button.trigger('click')
        const event = wrapper.emitted().click
        expect(event).toBeTruthy()

        const actual = event[0]
        const expected = [0]
        expect(actual).toEqual(expected)
      })

      it('when second card is selected payload is 1', () => {
        wrapper.setData({ selectedIndex: 1 })
        button.trigger('click')
        const event = wrapper.emitted().click
        expect(event).toBeTruthy()

        const actual = event.pop()
        const expected = [1]
        expect(actual).toEqual(expected)
      })
    })
  })

  describe('when is empty', () => {
    const wrapper = mount(CardSlider, {
      propsData: { slides: [] }
    })
    it('nothing renders', () => {
      const actual = wrapper.isEmpty()
      const expected = true
      expect(actual).toEqual(expected)
    })
  })

  describe('when slides is not defined', () => {
    const wrapper = mount(CardSlider)
    it('nothing renders', () => {
      const actual = wrapper.isEmpty()
      const expected = true
      expect(actual).toEqual(expected)
    })
  })
})
