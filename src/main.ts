import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './lib/router';

import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css';
import 'quasar/dist/quasar.css';
import './assets/css/tailwind.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(Quasar, {
  plugins: {},
  config: {
    brand: {
      // primary: '#e46262',
    },
  },
});

app.mount('#app');
