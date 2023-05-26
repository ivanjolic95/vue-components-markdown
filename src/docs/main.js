import { createApp } from 'vue'
import VueComponentsMarkdownPlugin from '../index'
import App from './App.vue'

const app = createApp(App)

app.use(VueComponentsMarkdownPlugin)

app.mount('#app')
