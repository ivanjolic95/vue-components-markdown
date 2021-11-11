import VueMarkdown from 'vue-markdown'

function getPropValue(prop, variables) {
  const value = prop.split(':')[1].trim().replace(/'/g, '')
  const isVariable = value.match(/^{{\w*}}$/)
  if (isVariable) {
    return variables[value.replace(/{|}/g, '')]
  }
  return value
}

function extractComponentConfig(component, variables) {
  const componentConfig = component
    .match(/[^!<>]*/g)
    .filter(Boolean)[0]
    .match(/^(\S+)\s(.*)/)
    .slice(1)
  const componentName = componentConfig[0]
  const componentProps = componentConfig[1]
    .slice(1, -1)
    .split(',')
    .map((prop) => prop.trim())
    .reduce((val, item) => {
      const propName = item.split(':')[0]
      const propValue = getPropValue(item, variables)
      return { ...val, [propName]: propValue }
    }, {})
  return { componentName, componentProps }
}

function renderComponent(
  h,
  component,
  componentMap,
  variables,
  componentWrapperTag,
  componentWrapperClass
) {
  // split only by first space
  const { componentName, componentProps } = extractComponentConfig(
    component,
    variables
  )
  return h(componentWrapperTag, { staticClass: componentWrapperClass }, [
    h(componentMap[componentName], { props: componentProps }, []),
  ])
}

function splitMarkdownContentAndComponents(content) {
  const COMPONENT_REGEX = /(!<.*>)/g

  return (
    content.split(COMPONENT_REGEX).map((paragraph) => ({
      isComponent: !!paragraph.match(COMPONENT_REGEX),
      content: paragraph,
    })) || []
  )
}

function injectComponents(
  h,
  {
    content,
    componentMap,
    variables,
    componentWrapperTag,
    componentWrapperClass,
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
          componentWrapperTag,
          componentWrapperClass
        )
      : (scopedSlots['markdown-processor'] &&
          scopedSlots['markdown-processor']({ content: paragraph.content })) ||
        h(VueMarkdown, { props: { source: paragraph.content } }, [])
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
    componentWrapperTag: {
      type: String,
      default: 'div',
    },
    componentWrapperClass: {
      type: String,
      default: '',
    },
  },
  render(h, { props, scopedSlots }) {
    return renderBlocks(h, props, scopedSlots)
  },
}
