import { shallowMount } from '@vue/test-utils'
import StepsProgress from '@/components/steps-progress/index.vue'

const cards = [
  {
    title: 'Phase 01',
    description: 'Project research and main component specifications.'
  },
  {
    title: 'Phase 02',
    description: 'Initial project requirements and initialization.'
  },
  {
    title: 'Phase 03',
    description: 'Design and basic bootstrap for all elements.'
  },
  {
    title: 'Phase 04',
    description: 'Final testing on various devices and platforms.'
  }
]

describe('StepsProgress.vue', () => {
  describe('when it has cards with title and description', () => {
    const wrapper = shallowMount(StepsProgress, {
      propsData: {
        cards
      }
    })

    it('has the same number of .card elements', () => {
      const actual = wrapper.findAll('.card').length
      const expected = 4
      expect(actual).toEqual(expected)
    })

    describe('when a card is selected', () => {
      const wrapper = shallowMount(StepsProgress, {
        propsData: {
          cards,
          currentStep: 3
        }
      })
      it('has an active class in the selected card', () => {
        const actual = wrapper.findAll('.card').at(2).classes()
        const expected = 'active'
        expect(actual).toContain(expected)
      })
      it('has a done class in all previous cards', () => {
        const firstCard = wrapper.findAll('.card').at(0)
        const secondCard = wrapper.findAll('.card').at(1)
        const expected = 'done'
        expect(firstCard.classes()).toContain(expected)
        expect(secondCard.classes()).toContain(expected)
      })
    })

    describe('when a currentStep is beyond cards length', () => {
      const wrapper = shallowMount(StepsProgress, {
        propsData: {
          cards,
          currentStep: 6
        }
      })
      it('has a done class in the last card', () => {
        const actual = wrapper.findAll('.card').at(3).classes()
        const expected = 'done'
        expect(actual).toContain(expected)
      })
    })
  })

  describe('when it has no cards', () => {
    const wrapper = shallowMount(StepsProgress)
    it('nothing renders', () => {
      const actual = wrapper.isEmpty()
      const expected = true
      expect(actual).toEqual(expected)
    })
  })

  describe('when cards is empty', () => {
    const wrapper = shallowMount(StepsProgress, {
      propsData: {
        cards: []
      }
    })
    it('nothing renders', () => {
      const actual = wrapper.isEmpty()
      const expected = true
      expect(actual).toEqual(expected)
    })
  })

  describe('when a card has no title', () => {
    const wrapper = shallowMount(StepsProgress, {
      propsData: {
        cards: [
          ...cards,
          {
            description: 'this card has no title'
          }
        ]
      }
    })
    it('nothing renders', () => {
      const actual = wrapper.isEmpty()
      const expected = true
      expect(actual).toEqual(expected)
    })
  })
})
