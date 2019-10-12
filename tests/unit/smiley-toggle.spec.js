import { shallowMount } from '@vue/test-utils'
import SmileyToggle from '@/components/smiley-toggle/index.vue'

describe('SmileyToggle.vue', () => {
  describe('when value is false', () => {
    const wrapper = shallowMount(SmileyToggle, {
      propsData: { value: false }
    })

    it('has aria-checked attribute that equals false', () => {
      const actual = wrapper.attributes('aria-checked')
      const expected = 'false'
      expect(actual).toEqual(expected)
    })
    describe('emits an input event with payload = true', () => {
      it('when clicked', () => {
        wrapper.trigger('click')
        const event = wrapper.emitted().input
        expect(event).toBeTruthy()

        const actual = event[0]
        const expected = [true]
        expect(actual).toEqual(expected)
      })
      it('when space key is pressed', () => {
        wrapper.trigger('keyup.space')
        const event = wrapper.emitted().input
        expect(event).toBeTruthy()

        const actual = event[0]
        const expected = [true]
        expect(actual).toEqual(expected)
      })
      it('when enter key is pressed', () => {
        wrapper.trigger('keyup.enter')
        const event = wrapper.emitted().input
        expect(event).toBeTruthy()

        const actual = event[0]
        const expected = [true]
        expect(actual).toEqual(expected)
      })
    })
  })

  describe('when value is true', () => {
    const wrapper = shallowMount(SmileyToggle, {
      propsData: { value: true }
    })

    it('has aria-checked attribute that equals true', () => {
      const actual = wrapper.attributes('aria-checked')
      const expected = 'true'
      expect(actual).toEqual(expected)
    })

    describe('emits an input event with payload = false', () => {
      it('when clicked', () => {
        wrapper.trigger('click')
        const event = wrapper.emitted().input
        expect(event).toBeTruthy()

        const actual = event[0]
        const expected = [false]
        expect(actual).toEqual(expected)
      })
      it('when space key is pressed', () => {
        wrapper.trigger('keyup.space')
        const event = wrapper.emitted().input
        expect(event).toBeTruthy()

        const actual = event[0]
        const expected = [false]
        expect(actual).toEqual(expected)
      })
      it('when enter key is pressed', () => {
        wrapper.trigger('keyup.enter')
        const event = wrapper.emitted().input
        expect(event).toBeTruthy()

        const actual = event[0]
        const expected = [false]
        expect(actual).toEqual(expected)
      })
    })
  })

  describe('when disabled', () => {
    const wrapper = shallowMount(SmileyToggle, {
      propsData: { disabled: true }
    })
    describe('doesn\'t emit an input event', () => {
      it('when clicked', () => {
        wrapper.trigger('click')
        const actual = wrapper.emitted().input
        const expected = undefined
        expect(actual).toEqual(expected)
      })
      it('when space key is pressed', () => {
        wrapper.trigger('keyup.space')
        const actual = wrapper.emitted().input
        const expected = undefined
        expect(actual).toEqual(expected)
      })
      it('when enter key is pressed', () => {
        wrapper.trigger('keyup.enter')
        const actual = wrapper.emitted().input
        const expected = undefined
        expect(actual).toEqual(expected)
      })
    })
  })
})
