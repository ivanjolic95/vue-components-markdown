import VueMarkdown from 'vue-markdown'

function getPropValue(prop, variables) {
  const propValue = prop.split(': ')[1].trim().replace(/'/g, '')
  const isVariable = propValue.match(/^{{\w*}}$/)
  if (isVariable) {
    return variables[propValue.replace(/{|}/g, '')]
  }
  return JSON.parse(propValue)
}

function extractComponentConfig(component, variables) {
  // split only by first space
  let componentConfig = component.match(/[^!<>]*/g).filter(Boolean)[0]
  if (componentConfig.match(/^(\S+)\s(.*)/))
    componentConfig = componentConfig.match(/^(\S+)\s(.*)/).slice(1)
  else componentConfig = [componentConfig]

  const componentName = componentConfig[0]

  const componentProps = componentConfig[1]
    ? componentConfig[1]
        .slice(1, -1)
        .split(', ')
        .map((prop) => prop.trim())
        .reduce((val, item) => {
          const propName = item.split(':')[0]
          const propValue = getPropValue(item, variables)
          return { ...val, [propName]: propValue }
        }, {})
    : {}
  return { componentName, componentProps }
}

function renderComponent(
  h,
  component,
  componentMap,
  variables,
  noComponentWrapper,
  componentWrapperTag,
  componentWrapperClass
) {
  const { componentName, componentProps } = extractComponentConfig(
    component,
    variables
  )
  const componentElement = h(
    componentMap[componentName],
    { props: componentProps },
    []
  )
  return noComponentWrapper
    ? componentElement
    : h(componentWrapperTag, { staticClass: componentWrapperClass }, [
        componentElement,
      ])
}

function splitMarkdownContentAndComponents(content) {
  const COMPONENT_REGEX = /((?<!#)!<.*>)/g
  const COMPONENT_EXAMPLE_REGEX = /(#!<.*>)/g

  return (
    content.split(COMPONENT_REGEX).map((paragraph) => ({
      isComponent: !!paragraph.match(COMPONENT_REGEX),
      content: paragraph.match(COMPONENT_EXAMPLE_REGEX)
        ? paragraph.replace(/#!</g, '!<')
        : paragraph,
    })) || []
  )
}

function injectComponents(
  h,
  {
    content,
    componentMap,
    variables,
    noComponentWrapper,
    componentWrapperTag,
    componentWrapperClass,
    markdownProcessorProps,
  },
  scopedSlots
) {
  const paragraphs = splitMarkdownContentAndComponents(content)

  const elements = paragraphs.map((paragraph) =>
    paragraph.isComponent
      ? renderComponent(
          h,
          paragraph.content,
          componentMap,
          variables,
          noComponentWrapper,
          componentWrapperTag,
          componentWrapperClass,
          markdownProcessorProps
        )
      : (scopedSlots['markdown-processor'] &&
          scopedSlots['markdown-processor']({ content: paragraph.content })) ||
        h(
          VueMarkdown,
          { props: { ...markdownProcessorProps, source: paragraph.content } },
          []
        )
  )

  return h('div', { staticClass: 'VueComponentsMarkdown' }, elements)
}

function renderBlocks(h, props, scopedSlots) {
  return injectComponents(h, props, scopedSlots)
}

export default {
  name: 'VueComponentsMarkdown',
  functional: true,
  props: {
    content: {
      type: String,
      default: '',
    },
    componentMap: {
      type: Object,
      default: () => ({}),
    },
    variables: {
      type: Object,
      default: () => ({}),
    },
    noComponentWrapper: {
      type: Boolean,
      default: false,
    },
    componentWrapperTag: {
      type: String,
      default: 'div',
    },
    componentWrapperClass: {
      type: String,
      default: '',
    },
    markdownProcessorProps: {
      type: Object,
      default: () => ({}),
    },
  },
  render(h, { props, scopedSlots }) {
    return renderBlocks(h, props, scopedSlots)
  },
}
