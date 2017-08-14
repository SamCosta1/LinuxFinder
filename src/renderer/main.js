import Vue from 'vue';
import axios from 'axios';
import App from './App';

import Sidebar from './components/Sidebar';

Vue.component('Sidebar', Sidebar);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable */
new Vue({
   components: {App},
   template: '<App/>'
}).$mount('#app');
