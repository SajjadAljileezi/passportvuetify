
import store from "./store";
require('./bootstrap');
import Vue from 'vue';
window.Vue = require('vue');
import VueRouter from 'vue-router';
import vuetify from './components/vuetify/vuetify';
Vue.use(VueRouter);
Vue.use(store);








const routes = [
    { path: '/', component: require('./components/HomeComponent.vue').default},
    { path: '/register', component: require('./components/Register.vue').default},

  ]

  const router = new VueRouter({
    routes,
    mode: 'history', // short for `routes: routes`
  })


new Vue({
    el: '#app',
    vuetify,
    router,
    store,

});
