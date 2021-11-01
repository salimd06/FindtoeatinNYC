import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'

//import VueGeolocation from 'vue-browser-geolocation'

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';


import ListeDesRestaurants from './components/ListeDesRestaurants.vue'
import HelloWorld from './components/HelloWorld.vue'
import Restaurant from './components/Restaurant.vue'


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)



Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueRouter);
Vue.use(BootstrapVue)
//Vue.use(VueGeolocation);

const router = new VueRouter({
  routes: [
    {
      path : '/',
      component: ListeDesRestaurants
    },
    {
      path : '/hello',
      component: HelloWorld,
      props:{
        msg : "Coucou la Miage !"
      }
    },
    {
      path : '/restaurant/:id',
      component: Restaurant,
    },
  ],
  mode: 'history'
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
