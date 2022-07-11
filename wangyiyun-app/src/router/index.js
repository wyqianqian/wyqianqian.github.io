import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/playlist',
    name: 'playlist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "playlist" */ '../views/PlayListItem.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter(to, from, next) {
      if (store.state.isLogin || store.state.token || localStorage.getItem('token')) {
        next('/userinfo');
      }
      else {
        next();
      }
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    beforeEnter(to, from, next) {
      if (store.state.isLogin || store.state.token || localStorage.getItem('token')) {
        next();
      } else {
        next('/login');
      }
    },
    component: () => import(/* webpackChunkName: "userinfo" */ '../views/UserInfo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
