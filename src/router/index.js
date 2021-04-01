import Vue from 'vue'
import VueRouter from 'vue-router'

//menu sin login
import Inicio from '../views/Inicio.vue'
import Colaborar from '../views/Colaborar.vue'
import Donar from '../views/Donar.vue'
import Creditos from '../views/Creditos.vue'



Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Inicio',
    component: Inicio,
    meta: {
      //requiereLogin: true,
      menu: 'root'
    }
  },
  {
    path: '/colaborar',
    component: Colaborar,
    meta: {}
  },
  {
    path: '/donar',
    component: Donar,
    meta: {}
  },
  {
    path: '/creditos',
    component: Creditos,
    meta: {}
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  //base: '/',
  base: process.env.NODE_ENV === 'production' ? '/reguleque/' : '/',
 //base: process.env.NODE_ENV === 'production' ? '/feremi/' : '/',

  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  //console.log("to : ");
  //console.log(to);
  if (to.matched.some(record => record.meta.requiereLogin)) {
    //console.log("evalua si requiere login");
    var usuario = JSON.parse(sessionStorage.getItem("usuario"));
    //console.log("usuario : " + usuario.nombre);
    var logueado = true;
    if (usuario == null) {
      logueado = false;
    }

    if (!logueado) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })

    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
export default router