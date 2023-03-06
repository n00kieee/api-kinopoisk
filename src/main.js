import { createApp } from 'vue'
import App from './App.vue'
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import 'aos/dist/aos.css'


createApp(App)
    .use(moshaToast)
    .mount('#app')
