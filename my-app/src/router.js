import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import DogRun from './views/DogRun.vue'
import Cafe from './views/Cafe.vue'
import WashDry from './views/WashDry.vue'
import GroomingBath from './views/GroomingBath.vue'
import Snack from './views/Snack.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/dog-run', name: 'DogRun', component: DogRun },
  { path: '/cafe', name: 'Cafe', component: Cafe },
  { path: '/wash-dry', name: 'WashDry', component: WashDry },
  { path: '/grooming-bath', name: 'GroomingBath', component: GroomingBath },
  { path: '/snack', name: 'Snack', component: Snack },
   { path: '/login', name: 'Login', component: Login },
     { path: '/register', name: 'Register', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
