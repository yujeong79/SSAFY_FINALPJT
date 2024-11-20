import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/css/global-background.css'; // 글로벌 CSS 임포트
import './assets/css/global-component.css'; // 글로벌 CSS 임포트
import './assets/css/global-layout.css'; // 글로벌 CSS 임포트
import './assets/css/global-font.css'; // 글로벌 CSS 임포트

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
