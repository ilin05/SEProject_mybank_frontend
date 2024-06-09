import { createRouter, createWebHistory } from 'vue-router'
import SavingAccountVue from '@/components/CounterComponents/Account/SavingAccount.vue'
import WithdrawVue from '@/components/CounterComponents/Business/Withdraw.vue'
import DepositVue from '@/components/CounterComponents/Business/Deposit.vue'
import TransferVue from '@/components/CounterComponents/Business/Transfer.vue'
import MainMenuVue from "@/components/CounterComponents/MainMenu.vue";
import LoginVue from "@/components/CounterComponents/Login.vue";
import AdminloginVue from "@/components/AdminComponents/Adminlogin.vue";
import AdminmenuVue from "@/components/AdminComponents/Adminmenu.vue";
import FreezeVue from "@/components/CounterComponents/Account/Freeze.vue"
import UnfreezeVue from "@/components/CounterComponents/Account/Unfreeze.vue"
import ReissueVue from "@/components/CounterComponents/Account/Reissue.vue";
import ReportlossVue from "@/components/CounterComponents/Account/Reportloss.vue";
import CreditCardVue from "@/components/CounterComponents/Account/CreditCard.vue";
import InternetBankVue from "@/components/CounterComponents/Account/InternetBank.vue";
import ForeignCurrencyVue from "@/components/CounterComponents/Account/ForeignCurrency.vue";
import LoanVue from "@/components/CounterComponents/Business/Loan.vue";
import AccountVue from "@/components/CounterComponents/Account/Account.vue"
import OpenSavingAccountVue from "@/components/CounterComponents/Account/OpenSavingAccount.vue";
import BusinessVue from "@/components/CounterComponents/Business/Business.vue";
import CashierVue from "@/components/AdminComponents/Cashier/Cashier.vue";


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
      path:'/adminlogin',
      component:AdminloginVue
    },
    {
      path:'/adminmenu',
      component:AdminmenuVue
    },
    {
      path:'/menu',
      component:MainMenuVue
    },
    {
      path:'/account',
      component:AccountVue
    },

    {
      path: '/customer',
      redirect: '/customer/customerquery'
    },
    {
      path: '/account/savingaccount',
      component: SavingAccountVue
    },
    {
      path: '/account/creditcard',
      component: CreditCardVue
    },
    {
      path: '/account/internetbank',
      component: InternetBankVue
    },
    {
      path: '/account/foreigncurrency',
      component: ForeignCurrencyVue
    },

      //business底下的索引
    {
      path: '/business',
      component: BusinessVue
    },
    {
      path: '/business/deposit',
      component: DepositVue
    },
    {
      path: '/business/withdraw',
      component: WithdrawVue
    },
    {
      path: '/business/transfer',
      component: TransferVue
    },
    {
      path: '/business/loan',
      component: LoanVue
    },

      // 储蓄账户底下的索引 /account/savingaccount/?
    {
      path: '/account/savingaccount',
      component: SavingAccountVue
    },
    {
      path: '/account/savingaccount/openaccount',
      component: OpenSavingAccountVue
    },
    {
      path: '/account/savingaccount/freeze',
      component: FreezeVue
    },
    {
      path: '/account/savingaccount/unfreeze',
      component: UnfreezeVue
    },
    {
      path: '/account/savingaccount/reportloss',
      component: ReportlossVue
    },
    {
      path: '/account/savingaccount/reissue',
      component: ReissueVue
    },

      //cashier底下的索引
    {
      path: '/cashier',
      component: CashierVue
    },
  ]
})
router.beforeEach((to, from, next)=>{
  if(!sessionStorage.getItem("token") && to.path !== '/login'){
    next({path: '/login'})
  }else{
    next()
  }
})

export default router
