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
// import AddDevInfo from '@/components/AddDevInfo'
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
      name: 'AdminMemberCenter',
      component: resolve => require(['@/components/AdminMemberCenter'], resolve)
    },
    {
      path: '/MemberCenter',
      name: 'MemberCenter',
      component: resolve => require(['@/components/MemberCenter'], resolve)
    },
    {
      path: '/Mine',
      name: 'Mine',
      component: resolve => require(['@/components/Mine'], resolve)
    },
    {
      path: '/ModifyUserInfo',
      name: 'ModifyUserInfo',
      component: resolve => require(['@/components/ModifyUserInfo'], resolve)
    },
    {
      path: '/ModifyRepairtorPassword',
      name: 'ModifyRepairtorPassword',
      component: resolve => require(['@/components/ModifyRepairtorPassword'], resolve)
    },
    {
      path: '/AdminLogin',
      name: 'AdminLogin',
      component: resolve => require(['@/components/AdminLogin'], resolve)
    },
    {
      path: '/AdminPcLogin',
      name: 'AdminPcLogin',
      component: resolve => require(['@/components/pc/AdminPcLogin'], resolve)
    },
    {
      path: '/adminPcLoginSearch',
      name: 'adminPcLoginSearch',
      component: resolve => require(['@/components/pc/adminPcLoginSearch'], resolve)
    },
    {
      path: '/Login',
      name: 'Login',
      component: resolve => require(['@/components/Login'], resolve)
    },
    {
      path: '/AddDevInfo',
      name: 'AddDevInfo',
      component: resolve => require(['@/components/AddDevInfo'], resolve)
    },
    {
      path: '/UserAddDevInfo',
      name: 'UserAddDevInfo',
      component: resolve => require(['@/components/UserAddDevInfo'], resolve)
    },
    {
      path: '/DevInfo/:id',
      name: 'DevInfo',
      component: resolve => require(['@/components/DevInfo'], resolve)
    },
    {
      path: '/AddRepairtor',
      name: 'AddRepairtor',
      component: resolve => require(['@/components/AddRepairtor'], resolve)
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      name: 'HelloWorld',
      component: resolve => require(['@/components/HelloWorld'], resolve)
    }
  ]
})
