import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { IonicVue } from '@ionic/vue';
import App from './App.vue';
import router from './router';

// Core Ionic CSS
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(IonicVue, {
  animated: false,
});
app.use(router);

// Router waits for the app to be ready before mounting
router.isReady().then(() => {
  app.mount('#app');
});