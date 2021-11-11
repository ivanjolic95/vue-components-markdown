import VueComponentsMarkdown from './components/VueComponentsMarkdown'

const components = {
  VueComponentsMarkdown,
}

const plugin = (Vue) => {
  Object.keys(components).forEach((componentName) => {
    Vue.component(componentName, components[componentName])
  })
}

export default plugin

const version = '__VERSION__'

export { version, VueComponentsMarkdown }
