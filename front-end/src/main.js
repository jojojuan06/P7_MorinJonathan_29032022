// importe le composant racine App à partir d'un composant à fichier unique.
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()
// Install  instance as a plugin router , store , vuetify
//creation d'une application vue
createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app') //l'instance du composant racine au lieu de l'instance de l'application.


