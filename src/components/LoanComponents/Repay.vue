<template>
  <div class="main">
    <el-container>
      <el-container>
        <el-container class="content-container">
          <el-main class="main-content">
            <div class="title2">
              <span style="margin-left: 5%">贷款还款</span>
              <RouterLink to="/user">
                <span class="history-trail">用户主菜单</span>
              </RouterLink>
              <span class="history-trail"> > </span>
              <RouterLink to="/user/history">
                <span class="history-trail">用户贷款记录</span>
              </RouterLink>
            </div>
            <el-card title="用户贷款记录" class="history_table" default-sort="{ prop: 'loanStartDate', order: 'ascending' }">
              <el-table :data="LoanRepayData" stripe border :default-sort="{ prop: 'loanId', order: 'ascending' }" max-height="600">
                <el-table-column prop="loanId" label="贷款编号" width="90px">
                </el-table-column>
                <el-table-column prop="accountId" label="储蓄卡号" width="200px">
                </el-table-column>
                <el-table-column prop="loanAmount" label="贷款金额" width="100px">
                </el-table-column>
                <el-table-column prop="totalRepaymentAmount" label="总需还款金额" width="120px">
                </el-table-column>
                <el-table-column prop="loanDuration" label="贷款期限" width="100px">
                  <template v-slot="scope">
                    {{ durationTransform(scope.row.loanDuration) }}
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="贷款状态" width="130px">
                </el-table-column>
                <el-table-column prop="paidAmount" label="已还款金额" width="100px">
                </el-table-column>
                <el-table-column prop="loanStartDate" label="贷款起始日期" sortable>
                </el-table-column>
                <el-table-column label="下次还款日期" sortable>
                  <template v-slot="scope">
                    {{ calculateNextRepaymentDate(scope.row) }}
                  </template>
                </el-table-column>
                <el-table-column prop="nextRepayAmount" label="下次还款金额" sortable>
                  <template v-slot="scope">
                    {{ calculateNextRepaymentAmount(scope.row) }}
                  </template>
                </el-table-column>
                <el-table-column label="点击选择操作">
                  <template v-slot="scope">
                    <el-button type="success" @click="showRepaymentDialog(scope.row, calculateNextRepaymentAmount(scope.row)); getAvailableCards();">还款</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-main>
        </el-container>
      </el-container>

      <el-dialog v-model="repaymentVisible" title="还款确认">
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          贷款储蓄卡号：
          {{ ToRepay.accountId }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          本次还款金额：
          <el-input v-model.number="this.ToRepay.repayAmount" placeholder="输入还款金额" style="width:200px" ></el-input>
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          选择还款储蓄卡：
          <el-select v-model="this.ToRepay.accountId" placeholder="请选择贷款储蓄卡" style="width:500px">
            <el-option
                v-for="item in AvailableCards"
                :key="item.accountId"
                :label="item.accountId"
                :value="item.accountId">
            <span style="float: left">储蓄卡号： {{ item.accountId }}</span>
            <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px;">
              余额： {{ item.balance }}
            </span>
            </el-option>
          </el-select>
        </div>

        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="confirmRepayment">确认</el-button>
            <el-button @click="repaymentVisible = false">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import { Postcard, Reading, Tickets, UserFilled } from "@element-plus/icons-vue";
import moment from "moment";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  components: { Tickets, Postcard, Reading, UserFilled },
  data() {
    return {
      customerId: localStorage.getItem("customerId"),

      AvailableCards: [
        {
          accountId: '',
          balance: 0,
        }
      ],

      LoanRepayData: [
        {
          loanId: 123,
          accountId: '123456',
          loanAmount: 5000,
          interestRate: 0.98,
          loanDuration: 12,
          paidAmount: 1000,
          unpaidAmount: 4000,
          totalRepaymentAmount: 5100,
          nextRepayAmount: 5000,
          loanStartDate: '2024-6-13',
          loanType: '',
          status: '待还款',
          next_repay_date: '',
        }
      ],

      ToRepay: {
        loanId: 123,
        accountId: '123456',
        repayAmount: 5000,
        nextRepayAmount: 5000,
      },

      // 用户贷款记录数据
      repaymentVisible: false,
      deleteLoanVisible: false,
      deleteLoanInfo: {}
    };
  },
  methods: {
    durationTransform(duration){
      switch (duration){
        case 1: return "一个月";
        case 3: return "三个月";
        case 6: return "六个月";
        case 12: return "一年";
        case 36: return "三年";
        case 60: return "五年";
        default: return "未知期限";
      }
    },
    showRepaymentDialog(row, nextRepayAmount) {
      this.ToRepay.accountId = row.accountId;
      this.ToRepay.loanId = row.loanId;
      this.ToRepay.nextRepayAmount = nextRepayAmount;
      this.repaymentVisible = true;
    },
    confirmRepayment() {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      let response = axios.post('/home/loan/repay/pay',
          {
            loanId: this.ToRepay.loanId,
            accountId: this.ToRepay.accountId,
            repaymentAmount: this.ToRepay.repayAmount,
          },
          config
      )
          .then(response => {
            let data = response.data;
            if (data === "success"){
              this.repaymentVisible = false;
              ElMessage.success(data) // 显示消息提醒
            }else if (data === "fail"){
              ElMessage.error(data)
            }
            this.QueryLoanApplication();
          })
    },
    QueryLoanApplication() {
      this.LoanRepayData = [];
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      let response = axios.post('/home/loan/repay',
          {
            customerId: 1,
          },
          config
      )
          .then (response => {
            let data = response.data
            data.forEach(item => {
              this.LoanRepayData.push(item)
            })
          })
    },
    getAvailableCards() {
      this.AvailableCards = [];
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      let response = axios.post('/home/loan/repay/card',
          {
            customerId: 1,
            balance: this.ToRepay.nextRepayAmount,
          },
          config,
      )
          .then(response => {
            let data = response.data;
            data.forEach((item) => {
              this.AvailableCards.push(item);
            })
          })
    },
    calculateNextRepaymentDate(row) {
      const startDate = moment(row.loanStartDate); // 解析 loanStartDate 为 moment 对象
      const monthsPaid = (row.paidAmount / (row.totalRepaymentAmount)) * row.loanDuration;
      const nextRepaymentMonth = startDate.month() + Math.floor(monthsPaid) + 1; // 计算下次还款月份

      // 设置日期为贷款开始日期的月份加上已还款月份数
      const nextRepaymentDate = startDate.clone().set('month', nextRepaymentMonth);

      // 格式化日期为 'YYYY-MM' 格式
      return nextRepaymentDate.format('YYYY-MM-DD');
    },
    calculateNextRepaymentAmount(row) {
      const monthsPaid = (row.paidAmount / (row.totalRepaymentAmount)) * row.loanDuration;
      const nextTotalRepaymentAmount = ((Math.floor(monthsPaid) + 1) / row.loanDuration) * row.totalRepaymentAmount;
      return Math.ceil(nextTotalRepaymentAmount - row.paidAmount);
    },
  },
  mounted() {
    this.QueryLoanApplication();
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  min-height: 100vh;
  background-color: #0f184d;
}

.content-container {
  display: flex;
  flex-direction: column;
  width: calc(100% - 200px); /* 侧边栏宽度 */
  height: calc(100vh - 60px);
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow: auto;
}

.title2 {
  background: url("../../assets/figure2.jpg");
  height: 60px;
  display: flex;
  align-items: center;
  width: 100%; /* 占据整个页面宽度 */
  color: #ffffff;
  font-weight: bold;
  font-size: xx-large;
  font-family: 'Microsoft YaHei';
}

.history-trail {
  margin-left: 30px;
  font-size: medium;
  color: #ffffff;
}

.history_table {
  margin-top: 20px;
}

.dialog-footer {
  text-align: right;
}

.el-dialog {
  width: 50%;
}
</style>
