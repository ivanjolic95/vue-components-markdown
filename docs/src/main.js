import Vue from 'vue'
import VueComponentsMarkdownPlugin from '../../src/index'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueComponentsMarkdownPlugin)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
