import { h, markRaw } from 'vue'
import { mount, shallowMount } from '@vue/test-utils'

import VueComponentsMarkdown from '../VueComponentsMarkdown'

const MyComponent = markRaw({
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
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  render() {
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

!<my-component { title: '"Title"', text: '{{customText}}', config: '{"a":1,"b":{"c":"test"}}' }>

Another regular markdown paragraph. This time with list items:
- first
- second
- third
  - subitem

And back to the custom component:
!<my-component { title: '"Title"', text: '{{customText}}' }>`

    variables = {
      customText: 'This is my custom text passed as a variable.',
    }

    wrapper = shallowMount(VueComponentsMarkdown, {
      props: {
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
        props: {
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

    test('sets prop with static JSON value to equivalent JS object', () => {
      expect(wrapper.findComponent(MyComponent).props().config).toEqual({
        a: 1,
        b: {
          c: 'test',
        },
      })
    })

    test('sets prop with dynamic value', () => {
      expect(wrapper.findComponent(MyComponent).props().text).toBe(
        'This is my custom text passed as a variable.',
      )
    })

    test('uses `div` as wrapper element for custom components by default', () => {
      expect(
        wrapper.findComponent(MyComponent).element.parentElement.tagName,
      ).toBe('DIV')
    })

    test('uses `componentWrapperTag` as wrapper element for custom components', () => {
      wrapper = mount(VueComponentsMarkdown, {
        props: {
          content,
          componentMap: {
            'my-component': MyComponent,
          },
          variables,
          componentWrapperTag: 'p',
        },
      })
      expect(
        wrapper.findComponent(MyComponent).element.parentElement.tagName,
      ).toBe('P')
    })

    test('uses `componentWrapperClass` as class attribute for wrapper element for custom components', () => {
      wrapper = mount(VueComponentsMarkdown, {
        props: {
          content,
          componentMap: {
            'my-component': MyComponent,
          },
          variables,
          componentWrapperClass: 'test-class',
        },
      })
      expect(
        wrapper.findComponent(MyComponent).element.parentElement.classList,
      ).toContain('test-class')
    })
  })
})
