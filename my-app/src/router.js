// import { createRouter, createWebHistory } from 'vue-router'

// import Home from './views/Home.vue'
// import DogRun from './views/DogRun.vue'
// import Cafe from './views/Cafe.vue'
// import WashDry from './views/WashDry.vue'
// import GroomingBath from './views/GroomingBath.vue'
// import Snack from './views/Snack.vue'
// import Login from './views/Login.vue'
// import Register from './views/Register.vue'

// const routes = [
//   { path: '/', name: 'Home', component: Home },
//   { path: '/dog-run', name: 'DogRun', component: DogRun },
//   { path: '/cafe', name: 'Cafe', component: Cafe },
//   { path: '/wash-dry', name: 'WashDry', component: WashDry },
//   { path: '/grooming-bath', name: 'GroomingBath', component: GroomingBath },
//   { path: '/snack', name: 'Snack', component: Snack },
//    { path: '/login', name: 'Login', component: Login },
//      { path: '/register', name: 'Register', component: Register },
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// })

// export default router
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import DogRun from './views/DogRun.vue'
import Cafe from './views/Cafe.vue'
import WashDry from './views/WashDry.vue'
import GroomingBath from './views/GroomingBath.vue'
import Snack from './views/Snack.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import AddDog from './views/AddDog.vue'
import Setting from './views/Setting.vue'
import Laundry from './views/Laundry.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/dog-run', name: 'DogRun', component: DogRun, meta: { requiresAuth: true } },
  { path: '/cafe', name: 'Cafe', component: Cafe, meta: { requiresAuth: true } },
  { path: '/wash-dry', name: 'WashDry', component: WashDry, meta: { requiresAuth: true } },
  { path: '/grooming-bath', name: 'GroomingBath', component: GroomingBath, meta: { requiresAuth: true } },
  { path: '/snack', name: 'Snack', component: Snack, meta: { requiresAuth: true } },
    { path: '/laundry', name: 'Laundry', component: Laundry, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
   { path: '/add-dog', name: 'AddDog', component: AddDog },
   { path: '/setting', name: 'Setting', component: Setting },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Global route guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isLoggedIn = !!token

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
