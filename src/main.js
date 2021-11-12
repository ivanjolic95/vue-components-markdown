import Vue from 'vue'
import VueComponentsMarkdownPlugin from './index'
import LivePreview from './examples/LivePreview/LivePreview.vue'

Vue.config.productionTip = false

Vue.use(VueComponentsMarkdownPlugin)

new Vue({
  render: (h) => h(LivePreview),
}).$mount('#app')
