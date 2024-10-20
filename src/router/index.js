/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'

import Main from '@/pages/Main.vue'
import Auth from '@/pages/Authorisation.vue'

import AccountsList from '@/pages/AccountsList.vue'

import MenuList from '@/pages/MenuList.vue'

import RulerList from '@/pages/RulerList.vue'
import { useCommonStore } from '@/stores/CommonStore';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      name: 'auth',
      component: Auth
    },
    {
      path: '/',
      name: 'home',
      component: Main
    },

    {
      path: '/accounts',
      name: 'accounts',
      component: AccountsList
    },
    {
      path: '/menu',
      name: 'menus',
      component: MenuList
    },
    {
      path: '/ruler-list',
      name: 'ruler',
      component: RulerList
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.beforeEach((to, from, next) => {
  console.log('verify route')
  const commonStore = useCommonStore();

  if (to.matched.some(route => commonStore.acceptToken != '')) {

    next()
  }
  else if (to.fullPath=='/signin') {
    next()
  }
  else{
    next('/signin')
  }
})


router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router



