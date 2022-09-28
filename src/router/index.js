import Vue from 'vue'
import VueRouter from 'vue-router'
import UserList from '@/components/UserList.vue'
import userDetails from '@/components/userDetails.vue'


Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/users'},
  {path:'/users',component:UserList},
  {path:'/users/userinfo/:id',component:userDetails,props:true}
]

const router = new VueRouter({
  routes
})

export default router
