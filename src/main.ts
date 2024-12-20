import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import { config } from './common/primevue/primevue'
import 'primeicons/primeicons.css'
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ToastService);
app.use(createPinia())
app.use(router)
app.use(PrimeVue, config).use(DialogService).use(router)

app.mount('#app')
