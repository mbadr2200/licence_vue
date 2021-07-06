import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
    confirmButtonColor: '#F26627',
    cancelButtonColor: '#325D79',
  };

createApp(App)
  .use(router)
  .use(VueSweetalert2,options)
  .mount('#app')
