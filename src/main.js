import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import plugin from './plugins';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(plugin);
app.use(router);
app.use(store);
app.mount('#app');