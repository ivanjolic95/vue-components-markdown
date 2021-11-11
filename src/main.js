import Vue from 'vue'
import VueComponentsMarkdownPlugin from './index'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueComponentsMarkdownPlugin)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
