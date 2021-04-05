import Vue from 'vue'
import App from './App.vue'
import router from './router'
//Vue.config.productionTip = false
/////////////////////////////////////////////////
// AXIOS
import axios from 'axios'
import VueAxios from 'vue-axios'
//Vue.use(VueAxios)
Vue.use(VueAxios,axios)
//Vue.prototype.$axios = axios
//window.axios = require('axios');

//FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

//iconos de navegación
import { faPaw, faSpinner, faCheck, faBox, faBoxes,faBoxOpen, faUndo, faUpload } from '@fortawesome/free-solid-svg-icons'
library.add(faPaw, faSpinner, faCheck, faBox, faBoxes,faBoxOpen, faUndo, faUpload)
Vue.component('font-awesome-icon', FontAwesomeIcon)

//BOOTSTRAP
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import './assets/styles/minty/bootstrap.min.css';
import './assets/styles/sketchy/bootstrap.min.css';
//import './assets/styles/cyborg/bootstrap.min.css';


new Vue({
  router,
    render: h => h(App)
}).$mount('#app')

