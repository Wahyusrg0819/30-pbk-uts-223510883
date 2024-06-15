import { createApp } from "vue";
import App from "./App.vue";
import './style.css'
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import router from './router';
import pinia from "./pinia";

import { Quasar } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

const myApp = createApp(App);

myApp.use(createVuestic());
myApp.use(router);
myApp.use(pinia);

// Use Quasar
myApp.use(Quasar, {
  plugins: {} // Import Quasar plugins and add here
});

myApp.mount("#app");
