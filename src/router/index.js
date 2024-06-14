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
import InternetBankVue from "@/components/CounterComponents/Account/InternetBank.vue";
import ForeignCurrencyVue from "@/components/CounterComponents/Account/ForeignCurrency.vue";
import LoanVue from "@/components/CounterComponents/Business/Loan.vue";
import AccountVue from "@/components/CounterComponents/Account/Account.vue"
import OpenSavingAccountVue from "@/components/CounterComponents/Account/OpenSavingAccount.vue";
import BusinessVue from "@/components/CounterComponents/Business/Business.vue";
import Closure from "@/components/CounterComponents/Account/Closure.vue";
import ModifyAccount from "@/components/CounterComponents/Account/ModifyAccount.vue";
import QueryAccount from "@/components/CounterComponents/Account/QueryAccount.vue";
import ExamineLoan from "@/components/LoanComponents/ExamineLoan.vue";

import CashierVue from "@/components/AdminComponents/Cashier/Cashier.vue";
import CustomerQuery   from "@/components/CounterComponents/Customer/CustomerQuery.vue";
import Register from "@/components/InternetComponents/Register.vue";

import Banlance from "@/components/InternetComponents/Banlance.vue";
import Loss from "@/components/InternetComponents/Loss.vue"
import InternetSelect from "@/components/InternetComponents/Select.vue"
import TransactionHistory from "@/components/InternetComponents/TransactionHistory.vue";
import InternetTransfer from "@/components/InternetComponents/Transfer.vue"
import InternetMenu from "@/components/InternetComponents/InternetMenu.vue";
import ModifyPassword from "@/components/InternetComponents/ModifyPassword.vue";

import ApplicationVue from "@/components/LoanComponents/Application.vue";
import HistoryVue from "@/components/LoanComponents/History.vue";
import HomeVue from "@/components/Home.vue"
import RepayVue from "@/components/LoanComponents/Repay.vue"
import WithdrawLoanVue from "@/components/LoanComponents/Withdraw.vue"

import InternetManage from "@/components/AdminComponents/Inernet/Internet.vue";
import CreditCardMenu from "@/components/CreditCardComponents/MainMenu.vue";
import CreditCardVue from '@/components/CreditCardComponents/CreditCard.vue'
import ApproveVue from '@/components/CreditCardComponents/Approve.vue'
import PaymentVue from '@/components/CreditCardComponents/Payment.vue'
import ChangeCardVue from '@/components/CreditCardComponents/ChangeCard.vue'
import BillVue from '@/components/CreditCardComponents/Bill.vue'
import AuthorizationVue from '@/components/CreditCardComponents/Authorization.vue'
import CheckApprove from "@/components/CreditCardComponents/CheckApprove.vue";
import AuditorMenu from "@/components/CreditCardComponents/AuditorMenu.vue";

import AdminExaminer from "@/components/AdminComponents/Loan/AdminExaminer.vue";

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
      redirect:'/login'
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
      path: '/loanadmin',
      component:AdminExaminer
    },

    // {
    //   path: '/customer',
    //   redirect: '/customer/customerquery'
    // },
    {
      path:'/customer',
      component:CustomerQuery
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
      //component: WithdrawLoanVue
    },
    {
      path: '/business/transfer',
      component: TransferVue
    },
    {
      path: '/business/loan',
      component: LoanVue
    },
    {
      path: '/loan/menu',
      component: ExamineLoan
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
    {
      path: '/account/savingaccount/closure',
      component: Closure
    },
    {
      path: '/account/savingaccount/modifyaccount',
      component: ModifyAccount
    },
    {
      path: '/account/savingaccount/queryaccount',
      component: QueryAccount
    },


      //cashier底下的索引
    {
      path: '/cashier',
      component: CashierVue
    },
    {
      path: '/internetManage',
      component: InternetManage
    },


    {
      path: '/home',
      component: HomeVue,
      children:[
        // 用户索引
        {
          path: '/home/internetmenu',
          component:InternetMenu
        },
        {
          path: '/home/loan/application',
          component:ApplicationVue
        },
        {
          path: '/home/loan/history',
          component:HistoryVue
        },
        {
          path: '/home/loan/withdraw',
          component:WithdrawLoanVue
        },
        {
          path: '/home/loan/repayment',
          component:RepayVue
        },

          // internet
        {
          path: '/home/internet/register',
          component: Register
        },
        {
          path:'/home/internet/banlance',
          component:Banlance
        },
        {
          path:'/home/internet/loss',
          component:Loss
        },
        {
          path:'/home/internet/select',
          component:InternetSelect
        },
        {
          path:'/home/internet/transactionHistory',
          component:TransactionHistory
        },
        {
          path:'/home/internet/transfer',
          component:InternetTransfer
        },
        {
          path:'/home/internet/modify',
          component:ModifyPassword
        }
      ]
    },

    {
      path: '/creditcard/menu',
      component: CreditCardMenu
    },
    {
      path: '/creditcard',
      component: CreditCardVue
    },
    {
      path: '/approve',
      component: ApproveVue
    },
    {
      path: '/checkapprove',
      component: CheckApprove
    },
    {
      path: '/payment',
      component: PaymentVue
    },
    {
      path: '/change',
      component: ChangeCardVue
    },
    {
      path: '/bill',
      component: BillVue
    },
    {
      path: '/authorization',
      component: AuthorizationVue
    },
    {
      path: '/auditor/menu',
      component: AuditorMenu
    }
  ]
})
router.beforeEach((to, from, next)=>{
  if(!sessionStorage.getItem("token") && to.path !== '/login'){
    next({path: '/login'})
  } else {
    next()
  }
})


export default router
