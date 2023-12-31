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
      path: '/babygrowthhub',
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
      path: "/registro/2/:idBebe",
      name: 'registroEncargado',
      component: () => import('../views/RegisterEncargadoVIew.vue')
    },
    {
      path: '/registro/3/:idAdulto/:idRol',
      name: 'registroBebe',
      component: ()=> import('../views/RegisterBabyView.vue')
    },
    {
      path: "/admin",
      name: 'admin',
      component: ()=> import('../views/AdminView.vue')
    },
    {
      path: '/actividades/seguimiento',
      name: 'seguimiento',
      component: ()=> import('../views/ActividadesView.vue')
    },
    {
      path: "/actividades/calendario",
      name: 'calendario',
      component: ()=> import('../views/CalendarioView.vue')
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: ()=> import('../views/Perfil/PerfilView.vue')
    },
    {
      path: '/dietas',
      name: 'dietas',
      component: ()=> import('../views/Dietas/DietasView.vue')
    },
    {
      path: '/inicio',
      name: "inicio",
      component: ()=> import('../views/Inicio/InicioView.vue')
    },
    {
      path: "/expediente/salud/:id",
      name: "salud",
      component: ()=> import('../views/ExpedienteSaludView.vue')
    },
    {
      path: "/expediente/medicacion/:id",
      name: "medicacion",
      component: ()=> import('../views/ExpedienteMedicacionView.vue')
    },
    {
      path: "/doble-factor",
      name: "doble-factor",
      component: ()=> import('../views/TokenView.vue')
    },
    {
      path: "/etapas-desarrollo",
      name: "etapas-desarrollo",
      component: ()=> import('../views/EtapasDesarrollo/EtapasView.vue')
    },
    {
      path: "/admin-panel-family/:id",
      name: "admin-panel-family",
      component: ()=> import('../views/AdministrativePanelView.vue')
    },
    {
      path: '/admin/perfil',
      name: 'adminProfile',
      component: ()=> import ('../views/ProfileAdmin.vue'),
    },
    {
      path: "/upmultimedia",
      name: "upmultimedia",
      component: ()=> import('../views/Multimedia/SubirMultimediaView.vue')
    },
    {
      path:"/preguntas",
      name:"preguntas",
      component:()=> import('../views/PreguntasView.vue')
    },
    {
      path:"/galeria-recuerdo/:id/:nombreBebe",
      name:"galeriaRecuerdo",
      component:()=> import('../views/Multimedia/GaleriaRecuerdo.vue')
    },
    {
      path:"/album-etapas-desarrollo/:id/:idAlbum",
      name:"etapasDesarrollo",
      component:()=> import('../views/Multimedia/etapasDesarrollo.vue')
    },
    {
      path:"/album-por-anio/:id/:idAlbum",
      name:"albumAnnio",
      component:()=> import('../views/Multimedia/porAnnio.vue')
    },
    {
      path:"/album-ultrasonidos/:id/:idAlbum",
      name:"albumUltrasonidos",
      component:()=> import('../views/Multimedia/ultrasonidos.vue')
    },
    {
      path: "/grabaraudios",
      name: "grabaraudios",
      component: ()=> import('../views/Multimedia/SubirAudiosView.vue')
    },
  ]
})

export default router
