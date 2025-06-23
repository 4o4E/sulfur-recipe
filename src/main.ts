import './assets/main.css'
import App from './App.vue'

const app = Vue.createApp(App)

import router from './router'
app.use(router)

const { createPinia } = Pinia
const pinia = createPinia()
app.use(pinia)

const { createVuetify } = Vuetify
app.use(createVuetify({
  theme: {
    defaultTheme: 'dark'
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {},
    sets: {},
  },
}))

app.mount('#app')
