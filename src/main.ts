import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import router from './router'
app.use(router)

import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createVuetify } from "vuetify/framework";
app.use(createVuetify({
  components,
  directives,
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
