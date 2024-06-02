import { createRouter, createWebHistory } from 'vue-router'
import OpenAccountVue from '@/components/OpenAccount.vue'
import WithdrawVue from '@/components/Withdraw.vue'
import DepositVue from '@/components/Deposit.vue'
import TransferVue from '@/components/Transfer.vue'
import MainMenuVue from "@/components/MainMenu.vue";
import LoginVue from "@/components/Login.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path:'/login',
      component:LoginVue
    },
    {
      path:'/menu',
      component:MainMenuVue
    },
    {
      path: '/openaccount',
      component: OpenAccountVue
    },
    {
      path: '/deposit',
      component: DepositVue
    },
    {
      path: '/withdraw',
      component: WithdrawVue
    },
    {
      path: '/transfer',
      component: TransferVue
    }
  ]
})

export default router
