import { shallowMount } from '@vue/test-utils'
import SubmitLoaderButton from '@/components/submit-loader-button/index.vue'

describe('SubmitLoaderButton.vue', () => {
  describe('when enabled', () => {
    const wrapper = shallowMount(SubmitLoaderButton)

    it('emits a click when clicked', () => {
      wrapper.trigger('click')
      const event = wrapper.emitted().click
      expect(event).toBeTruthy()

      const actual = event.length
      const expected = 1
      expect(actual).toEqual(expected)
    })
  })

  describe('when disabled', () => {
    const wrapper = shallowMount(SubmitLoaderButton, {
      propsData: { disabled: true }
    })

    it('doesn\'t emit a click when clicked', () => {
      wrapper.trigger('click')
      const actual = wrapper.emitted().click
      const expected = undefined
      expect(actual).toEqual(expected)
    })
  })

  describe('when errored', () => {
    const wrapper = shallowMount(SubmitLoaderButton, {
      propsData: { error: true }
    })

    it('emits a click when clicked', () => {
      wrapper.trigger('click')
      const event = wrapper.emitted().click
      expect(event).toBeTruthy()

      const actual = event.length
      const expected = 1
      expect(actual).toEqual(expected)
    })
  })

  describe('when clicked', () => {
    const wrapper = shallowMount(SubmitLoaderButton)
    wrapper.setData({ clicked: true })

    it('doesn\'t emit a click when clicked again', () => {
      wrapper.trigger('click')
      const actual = wrapper.emitted().click
      const expected = undefined
      expect(actual).toEqual(expected)
    })
  })
})
