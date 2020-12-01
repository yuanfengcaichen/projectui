import Vue from 'vue'
import VueRouter from 'vue-router'

//避免出现重复路由问题
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

import mymain from 'components/main/main.vue'
const proManager = () => import('components/proManager/proManager.vue')
const stageManager = () => import('components/stageManager/stageManager.vue')
const taskManager = () => import('components/taskManager/taskManager.vue')
const mamberManager = () => import('components/mamberManager/mamberManager.vue')
const userManager = () => import('components/sysManger/userManager/userManager.vue')
const roleManager = () => import('components/sysManger/roleManager/roleManager.vue')
const userinfo = () =>import('components/user/userinfo/userinfo.vue')
const routes = [
  { path:'', redirect:'/main'},
  { path: '/main', component: mymain },
  { path: '/proManager', component: proManager },
  { path: '/stageManager', component: stageManager },
  { path: '/taskManager', component: taskManager },
  { path: '/mamberManager', component: mamberManager },
  { path: '/userManager', component: userManager },
  { path: '/roleManager', component: roleManager },
  { path: '/roleManager', component: roleManager },
  { path: '/userinfo', component: userinfo },
]

const router = new VueRouter({
  routes
})

export default router
