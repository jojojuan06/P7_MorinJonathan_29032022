// importe le composant racine App à partir d'un composant à fichier unique.
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { mdi } from 'vuetify/lib/iconsets/mdi'
import { aliases, fa } from 'vuetify/lib/iconsets/fa'

loadFonts()
// Install  instance as a plugin router , store , vuetify
createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')

  export default createVuetify({
    icons: {
      defaultSet: 'fa',
      aliases,
      sets: {
        fa,
        mdi,
      }
    },
  })
