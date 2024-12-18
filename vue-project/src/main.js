import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import './assets/css/global-background.css'; // 글로벌 CSS 임포트
// import './assets/css/global-component.css'; // 글로벌 CSS 임포트
// import './assets/css/global-layout.css'; // 글로벌 CSS 임포트
// import './assets/css/global-font.css'; // 글로벌 CSS 임포트
// main.jscx


// src/index.js
const styles = import.meta.glob('./assets/css/**/*.css', { eager: true });

// 각 파일을 동적으로 로드
for (const path in styles) {
  console.log(`Loaded: ${path}`); // 로드된 파일 경로 확인 (옵션)
}



const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
