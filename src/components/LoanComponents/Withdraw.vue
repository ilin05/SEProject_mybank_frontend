<template>
  <div class="main">
    <el-container>
      <el-container>
        <el-container class="content-container">
          <el-main class="main-content">
            <div class="title2">
              <span style="margin-left: 5%">申请结果</span>
              <RouterLink to="/home/internetmenu">
                <span class="history-trail">主菜单</span>
              </RouterLink>
              <span class="history-trail"> > </span>
              <RouterLink to="/home/loan/withdraw">
                <span class="history-trail">申请结果</span>
              </RouterLink>
            </div>
            <div style="margin-top: 20px;margin-left: 20px; display: flex; align-items: center; font-weight: bold;">
              <span>贷款申请时间范围：</span>
              <el-radio-group v-model.number="time" style="margin-left: 10px">
                <el-radio-button :value=7>近七天</el-radio-button>
                <el-radio-button :value=30>近三十天</el-radio-button>
              </el-radio-group>
            </div>
            <el-card title="用户贷款记录" class="history_table">
              <el-table :data="LoanApplicationData" stripe border :default-sort="{ prop: 'loanId', order: 'ascending' }" max-height="600">
                <el-table-column prop="loanId" label="贷款id" width="100px" sortable>
                </el-table-column>
                <el-table-column prop="accountId" label="储蓄卡号" width="200px" sortable>
                </el-table-column>
                <el-table-column prop="loanAmount" label="贷款金额" width="160px" sortable>
                </el-table-column>
                <el-table-column prop="loanDuration" label="贷款期限" width="120px" sortable>
                  <template v-slot="scope">
                    {{ durationTransform(scope.row.loanDuration) }}
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="贷款状态" width="130px" sortable>
                </el-table-column>
                <el-table-column prop="loanType" label="贷款用途" width="110px" sortable>
                </el-table-column>
                <el-table-column prop="applicationDate" label="申请时间" width="110px" sortable>
                </el-table-column>
                <el-table-column prop="reviewComments" label="审查意见" width="250px" sortable>
                  <template v-slot="scope">
                    <el-text style="width: 300px; font-weight: bold; font-size: 1rem;" truncated>
                      {{scope.row.reviewComments}}
                    </el-text>
                  </template>
                </el-table-column>
                <el-table-column label="点击选择操作">
                  <template v-slot="scope">
                    <el-button type="success" @click="showConfirmDialog(scope.row)" :disabled="(scope.row.status !== 'APPROVED')">确认</el-button>
                    <el-button type="danger" @click="showDeleteDialog(scope.row)" :disabled="(scope.row.status !== 'PENDING') && (scope.row.status !== 'APPROVED')">撤销</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-main>
        </el-container>
      </el-container>

      <el-dialog v-model="confirmLoanVisible" title="撤销申请确认">
        <el-divider></el-divider>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px;">
          贷款id：
          {{ confirmApplicationData.loanId }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          储蓄卡号：
          {{ confirmApplicationData.accountId }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          贷款金额：
          {{ confirmApplicationData.loanAmount }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          贷款期限：
          {{ this.durationTransform(confirmApplicationData.loanDuration) }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          贷款类别：
          {{ confirmApplicationData.loanType }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          申请时间：
          {{ confirmApplicationData.applicationDate }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; max-width: 300px">
          审查意见：
          {{ confirmApplicationData.reviewComments }}
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="danger" @click="confirmLoan">确认</el-button>
            <el-button @click="confirmLoanVisible = false">取消</el-button>
          </span>
        </template>
        <el-divider></el-divider>
      </el-dialog>

      <el-dialog v-model="deleteLoanVisible" title="撤销申请确认">
        <el-divider></el-divider>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px;">
          贷款id：
          {{ DeleteApplicationData.loanId }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          储蓄卡号：
          {{ DeleteApplicationData.accountId }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          贷款金额：
          {{ DeleteApplicationData.loanAmount }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          贷款期限：
          {{ this.durationTransform(DeleteApplicationData.loanDuration) }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          贷款类别：
          {{ DeleteApplicationData.loanType }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          审查意见：
          {{ DeleteApplicationData.reviewComments }}
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="danger" @click="confirmDeleteLoan">确认</el-button>
            <el-button @click="deleteLoanVisible = false">取消</el-button>
          </span>
        </template>
        <el-divider></el-divider>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import { Postcard, Reading, Tickets, UserFilled } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from "axios";

export default {
  components: { Tickets, Postcard, Reading, UserFilled },
  data() {
    return {
      customerId: localStorage.getItem("customerId"),

      time: 7,

      LoanApplicationData: [
        {
          loanId: 123,
          accountId: '123456',
          loanAmount: 5000,
          interestRate: 0.98,
          loanDuration: 12,
          applicationDate: '',
          loanType: '',
          status: '未审批',
          reviewComments: '',
        }
      ],

      confirmApplicationData: {
        loanId: 123,
        accountId: '123456',
        loanAmount: 5000,
        interestRate: 0.98,
        loanDuration: 12,
        loanType: '',
        reviewComments: '',
      },

      DeleteApplicationData: {
        loanId: 123,
        accountId: '123456',
        loanAmount: 5000,
        interestRate: 0.98,
        loanDuration: 12,
        loanType: '',
        reviewComments: '',
      },

      // 用户贷款记录数据
      confirmLoanVisible: false,
      deleteLoanVisible: false,
    };
  },
  watch: {
    // 观察 time 值的变化
    time(newTime, oldTime) {
      // 当 time 变化时，调用 QueryLoanApplication()
      this.QueryLoanApplication(newTime);
    },
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
    showConfirmDialog(row){
      this.confirmApplicationData = {...row};
      this.confirmLoanVisible = true;
    },
    showDeleteDialog(row) {
      this.DeleteApplicationData = {...row};
      this.deleteLoanVisible = true;
    },
    confirmLoan() {
      this.confirmLoanVisible = false;
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      let response = axios.post('/home/loan/withdraw/confirm',
          {
            loanId: this.confirmApplicationData.loanId
          },
          config
      )
          .then(response => {
            let data = response.data;
            if (data === "success"){
              ElMessage.success("贷款确认成功") // 显示消息提醒
            }else if (data === "failed"){
              ElMessage.error("贷款确认失败")
            }
            this.QueryLoanApplication()
          })
    },
    confirmDeleteLoan() {
      this.deleteLoanVisible = false;
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      let response = axios.post('/home/loan/withdraw/delete',
        {
          loanId: this.DeleteApplicationData.loanId
        },
          config
      )
      .then(response => {
        let data = response.data;
        if (data === "success"){
          ElMessage.success("申请撤销成功") // 显示消息提醒
        }else if (data === "failed"){
          ElMessage.error("申请撤销失败")
        }
        this.QueryLoanApplication()
      })
    },
    QueryLoanApplication() {
      this.LoanApplicationData = [];
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      let response = axios.post('/home/loan/withdraw',
        {
          customerId: this.customerId,
          time: this.time,
        },
        config,
      )
          .then (response => {
            let data = response.data
            data.forEach(item => {
              this.LoanApplicationData.push(item)
            })
          })
    }
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
  background: url("../../assets/figure1.png");
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
