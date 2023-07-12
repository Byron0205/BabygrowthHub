import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/:pathMatch(.*)',
      name: '404',
      component: ()=> import ("../views/NotFound.vue")
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name:'login',
      component: () => import('../views/LoginUserView.vue')
    },
    {
      path: "/registro/1",
      name: 'registroPadre',
      component: () => import('../views/RegisterParentVIew.vue')
    },
    {
      path: "/registro/2",
      name: 'registroEncargado',
      component: () => import('../views/RegisterEncargadoVIew.vue')
    },
    {
      path: "/admin",
      name: 'admin',
      component: ()=> import('../views/AdminView.vue')
    },
    {
      path: "/admin/usuarios",
      name: "usuarios",
      component: ()=> import('../views/UsuariosView.vue')
    },
    {
      path: "/admin/auditoria",
      name: "auditoria",
      component: ()=> import("../views/AuditoriaView.vue")
    },
    {
      path: '/actividades/seguimiento',
      name: 'seguimiento',
      component: ()=> import('../views/ActividadesView.vue')
    }
  ]
})

export default router
