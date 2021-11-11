import Vue from 'vue'
import { mount, shallowMount } from '@vue/test-utils'

import VueMarkdown from 'vue-markdown'

import VueComponentsMarkdown from '../VueComponentsMarkdown'

const MyComponent = Vue.extend({
  name: 'MyComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  render(h) {
    return h('div', { staticClass: 'MyComponent' }, [
      h('h1', [this.title]),
      h('p', [this.text]),
      h('button', ['My button']),
    ])
  },
})

describe('VueComponentsMarkdown', () => {
  let wrapper
  let content
  let variables

  beforeEach(() => {
    content = `
# This is a title

This is a __test__.

!<my-component { title: 'Title', text: '{{customText}}' }>

Another regular markdown paragraph. This time with list items:
- first
- second
- third
  - subitem

And back to the custom component:
!<my-component { title: 'Title', text: '{{customText}}' }>`

    variables = {
      customText: 'This is my custom text passed as a variable.',
    }

    wrapper = shallowMount(VueComponentsMarkdown, {
      propsData: {
        content,
        componentMap: {
          'my-component': MyComponent,
        },
        variables,
      },
    })
  })

  describe('Rendering', () => {
    beforeEach(() => {
      wrapper = mount(VueComponentsMarkdown, {
        propsData: {
          content,
          componentMap: {
            'my-component': MyComponent,
          },
          variables,
        },
      })
    })
    test('renders properly', () => {
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Injecting custom components', () => {
    test('shows the custom component', () => {
      expect(wrapper.findComponent(MyComponent).exists()).toBeTruthy()
    })

    test('sets prop with static value', () => {
      expect(wrapper.findComponent(MyComponent).props().title).toBe('Title')
    })

    test('sets prop with dynamic value', () => {
      expect(wrapper.findComponent(MyComponent).props().text).toBe(
        'This is my custom text passed as a variable.'
      )
    })

    test('uses `div` as wrapper element for custom components by default', () => {
      expect(
        wrapper.findComponent(MyComponent).element.parentElement.tagName
      ).toBe('DIV')
    })

    test('uses `componentWrapperTag` as wrapper element for custom components', () => {
      wrapper = mount(VueComponentsMarkdown, {
        propsData: {
          content,
          componentMap: {
            'my-component': MyComponent,
          },
          variables,
          componentWrapperTag: 'p',
        },
      })
      expect(
        wrapper.findComponent(MyComponent).element.parentElement.tagName
      ).toBe('P')
    })

    test('uses `componentWrapperClass` as class attribute for wrapper element for custom components', () => {
      wrapper = mount(VueComponentsMarkdown, {
        propsData: {
          content,
          componentMap: {
            'my-component': MyComponent,
          },
          variables,
          componentWrapperClass: 'test-class',
        },
      })
      expect(
        wrapper.findComponent(MyComponent).element.parentElement.classList
      ).toContain('test-class')
    })
  })

  describe('using custom markdown processor', () => {
    test('uses `VueMarkdown` for processing markdown by default', () => {
      expect(wrapper.findComponent(VueMarkdown).exists()).toBeTruthy()
    })

    test('uses custom markdown processor if provided as `markdown-processor` scoped slot', () => {
      wrapper = shallowMount(VueComponentsMarkdown, {
        propsData: {
          content,
          componentMap: {
            'my-component': MyComponent,
          },
          variables,
        },
        scopedSlots: {
          'markdown-processor':
            '<p>This is a custom markdown processor: {{props.content}}</p>',
        },
      })

      expect(wrapper.text()).toContain('This is a custom markdown processor')
    })
  })
})
