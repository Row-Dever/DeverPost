import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout.vue'
import Home from '../page/Home.vue'
import Login from '../page/Login.vue'
import Signup from '../page/Signup.vue'
import Mypage from '../page/Mypage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'signup',
          name: 'signup',
          component: Signup
        },
        {
          path: 'mypage',
          name: 'mypage',
          component: Mypage
        }
      ]
    }
  ]
})

export default router
