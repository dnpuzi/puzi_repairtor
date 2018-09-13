import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DevInfo from '@/components/DevInfo'
import MemberCenter from '@/components/MemberCenter'
import Mine from '@/components/Mine'
import ModifyUserInfo from '@/components/ModifyUserInfo'
import ModifyRepairtorPassword from '@/components/ModifyRepairtorPassword'
import AdminMemberCenter from '@/components/AdminMemberCenter'
import AdminLogin from '@/components/AdminLogin'
import Login from '@/components/Login'
import AddDevInfo from '@/components/AddDevInfo'
import AddRepairtor from '@/components/AddRepairtor'
import AdminPcLogin from '@/components/pc/AdminPcLogin'
import UserAddDevInfo from '@/components/UserAddDevInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/MemberCenter'
    },
  	{
  		path: '/AdminMemberCenter',
  		component: AdminMemberCenter
  	},
    {
      path: '/MemberCenter',
      component: MemberCenter
    },
    {
      path: '/Mine',
      component: Mine
    },
    {
      path: '/ModifyUserInfo',
      component: ModifyUserInfo
    },
    {
      path: '/ModifyRepairtorPassword',
      component: ModifyRepairtorPassword
    },
  	{
  		path: '/AdminLogin',
  		component: AdminLogin
  	},
    {
      path: '/AdminPcLogin',
      component: AdminPcLogin
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/AddDevInfo',
      component: AddDevInfo
    },
    {
      path: '/UserAddDevInfo',
      component: UserAddDevInfo
    },
    {
      path: '/DevInfo/:id',
      component: DevInfo
    },
    {
      path: '/AddRepairtor',
      component: AddRepairtor
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
