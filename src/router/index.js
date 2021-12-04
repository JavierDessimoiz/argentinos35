import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Resultados from '../views/Resultados.vue'
//import Galeria from '../views/Galeria.vue'
import Videos from '../views/Videos.vue'
import Presentacion from '../views/Presentacion.vue'
import Sponsors from '../views/Sponsors.vue'
//import Jugadores from '.../views/Jugadores.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '*', redirect: '/'
  },
  {
    path: '/',
    name: 'Presentacion',
    component: Presentacion
  },
  {
    path: '/resultados',
    name: 'Resultados',
    component: Resultados
  },
  {
    path: '/videos',
    name: 'Videos',
    component: Videos
  },
  {
    path: '/sponsors',
    name: 'Sponsors',
    component: Sponsors
  },
  

  {
    path: '/galeria',
    name: 'Galeria',
    component: () => import('../views/Galeria.vue')
  },
  {
    path: '/jugadores',
    name: 'Jugadores',
    component: () => import('../views/Jugadores.vue')
  },
  {
    path: '/Campeonato2019',
    name: 'Campeonato2019',
    component: () => import('../views/Campeonato2019.vue')
  },
  {
    path: '/Contacto',
    name: 'Contacto',
    component: () => import('../views/Contacto.vue')
  },
  {
    path: '/Partidos',
    name: 'Partidos',
    component: () => import('../views/Partidos.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

})

export default router
