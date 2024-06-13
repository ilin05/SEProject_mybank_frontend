<template>
  <div class="main">
    <el-container class="content-container">
      <el-main class="main-content">
        <div class="title2">
          <span style="margin-left: 5%">贷款记录</span>
          <RouterLink to="/user">
            <span class="history-trail">主菜单</span>
          </RouterLink>
          <span class="history-trail"> > </span>
          <RouterLink to="/user/history">
            <span class="history-trail">贷款记录</span>
          </RouterLink>
        </div>
        <el-card title="用户贷款记录" class="history_table">
          <el-table :data="HistoryList" stripe border :default-sort="{ prop: 'loanId', order: 'ascending' }" max-height="600">
            <el-table-column prop="loanId" label="贷款id" sortable/>
            <el-table-column prop="accountId" label="储蓄卡号" sortable/>
            <el-table-column prop="loanAmount" label="贷款金额" sortable/>
            <el-table-column prop="interestRate" label="贷款利率" sortable/>
            <el-table-column prop="loanStartDate" label="贷款发放时间" sortable/>
            <el-table-column prop="loanDuration" label="贷款期限" sortable/>
            <el-table-column prop="status" label="贷款状态" sortable/>
            <el-table-column prop="paidAmount" label="已还款金额" />
            <el-table-column prop="repaymentStatus" label="还款状态" sortable/>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Postcard, Reading, Tickets, UserFilled } from "@element-plus/icons-vue";
import axios from "axios";

export default {
  components: { Tickets, Postcard, Reading, UserFilled },
  data() {
    return {
      HistoryList: [
        {
          loanId: 'L001',
          accountId: "123456",
          loanAmount: 5000,
          interestRate: 0.98,
          loanStartDate: '2024-07-10',
          loanDuration: '12 months',
          status: 'Active',
          paidAmount: 1000,
          repaymentStatus: 'paid',
        }
      ],
    };
  },
  methods: {
    QueryHistory() {
      this.HistoryList = [];
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      let response = axios.post('/home/loan/history',
          {
            customerId: 1,
          },
          config
      )
          .then (response => {
            let data = response.data;
            data.forEach(item => {
              this.HistoryList.push(item)
            })
          })
    }
  },
  mounted() {
    this.QueryHistory();
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

</style>
