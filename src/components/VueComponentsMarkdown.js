import { h, markRaw } from 'vue'
import emoji from 'markdown-it-emoji'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import toc from 'markdown-it-toc-and-anchor'
import katex from 'markdown-it-katex'
import tasklists from 'markdown-it-task-lists'
import Markdown from 'vue3-markdown-it'

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
  if (componentConfig.match(/^(\S+)\s(.*)/)) componentConfig = componentConfig.match(/^(\S+)\s(.*)/).slice(1)
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
  component,
  componentMap,
  variables,
  noComponentWrapper,
  componentWrapperTag,
  componentWrapperClass,
) {
  const { componentName, componentProps } = extractComponentConfig(
    component,
    variables,
  )
  const componentElement = h(
    markRaw(componentMap[componentName]),
    { ...componentProps },
  )
  return (noComponentWrapper
    ? componentElement
    : h(componentWrapperTag, { class: componentWrapperClass }, [
      componentElement,
    ]))
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
  {
    content,
    componentMap,
    variables,
    noComponentWrapper,
    componentWrapperTag,
    componentWrapperClass,
    markdownProcessorProps,
  },
) {
  const paragraphs = splitMarkdownContentAndComponents(content)

  const elements = paragraphs.map((paragraph) => (paragraph.isComponent
    ? renderComponent(
      paragraph.content,
      markRaw(componentMap),
      variables,
      noComponentWrapper,
      componentWrapperTag,
      componentWrapperClass,
      markdownProcessorProps,
    )
    : h(
      markRaw(Markdown),
      { ...markdownProcessorProps, source: paragraph.content, plugins: [emoji, subscript, superscript, footnote, deflist, abbreviation, insert, mark, toc, katex, tasklists].map((plugin) => ({ plugin })) },
    )))

  return h('div', { class: 'VueComponentsMarkdown' }, elements)
}

function renderBlocks(props) {
  return injectComponents(props)
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
  render(props) {
    return renderBlocks(props)
  },
}
