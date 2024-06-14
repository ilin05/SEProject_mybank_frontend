
<template>
  <div class="examiner_main" style="overflow-y: hidden;">
    <el-container class="content-container">
      <el-header class="title">
        <div style="margin-top: 12px; display: inline-block;">
          <span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">贷款审查员子系统</span>
        </div >
        <RouterLink to="/login">
          <el-button type="primary" style="margin-top: 12px; padding-right: 10px;">
            <span style="font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: normal;">登出</span>
          </el-button>
        </RouterLink>
      </el-header>

      <el-main class="main-content">
        <div class="title3">
          <span style="margin-left: 5%">贷款审批</span>
          <RouterLink to="/">
            <span class="history-trail">首页</span>
          </RouterLink>
          <span class="history-trail"> > </span>
          <RouterLink to="/examine">
            <span class="history-trail">贷款审批</span>
          </RouterLink>
        </div>
        <el-card title="待审批用户贷款申请" class="history_table">
          <el-table :data="HistoryList" >
            <el-table-column prop="loanId" label="贷款编号">
            </el-table-column>
            <el-table-column prop="customerId" label="申请人id">
            </el-table-column>
            <el-table-column prop="loanAmount" label="贷款金额">
            </el-table-column>
            <el-table-column prop="interestRate" label="贷款利率">
            </el-table-column>
            <el-table-column prop="loanDuration" label="贷款期限">
            </el-table-column>
            <el-table-column label="信用额度">
              <template v-slot="scope">
                <!-- 绑定detailDialog函数到按钮的点击事件 -->
                <el-button type="text" @click="getCreditDetail(scope.row);detailDialog()">详情</el-button>
              </template>
            </el-table-column>
            <el-table-column label="点击选择操作">
              <template v-slot="scope">
                <div class="flex flex-wrap gap-4 items-center">
                  <el-button type="success" @click="getCreditDetail(scope.row);confirmDialog(scope.row)">审查</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>

    <el-dialog v-model="detailsVisible" title="信用额度详情">
      <el-divider></el-divider>
      <!-- 展示贷款详情数据 -->
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; margin-bottom: 20px">
        信用额度：
        {{ this.creditDetail.credit }}
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; margin-bottom: 20px">
        总存款数：
        {{ this.creditDetail.totalSavings }}
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; margin-bottom: 20px">
        总交易金额：
        {{ this.creditDetail.totalCreditCardDebt }}
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; margin-bottom: 20px">
        总交易数量：
        {{ this.creditDetail.monthlyTransactionCount }}
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; margin-bottom: 20px">
        可抵押金额：
        {{ this.creditDetail.availableCollateral }}
      </div>
      <el-divider></el-divider>
      <template #footer>
        <span class="dialog-footer">
          <!-- 绑定点击事件到关闭对话框的函数 -->
          <el-button @click="detailsVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="confirmVisible" title="审批">
      <el-divider></el-divider>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 0px; margin-bottom: 20px">
        贷款id：
        {{ this.confirmData.loanId }}
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 10px; margin-bottom: 20px">
        贷款金额：
        {{ this.confirmData.loanAmount }}
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 10px; margin-bottom: 20px">
        贷款期限：
        {{ this.confirmData.loanDuration }}
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 10px; margin-bottom: 20px">
        客户信用额度：
        {{ this.creditDetail.credit }}
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 10px; margin-bottom: 20px">
        贷款申请日期：
        {{ this.confirmData.applicationDate }}
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 10px; margin-bottom: 20px">
        可抵押资产：
        {{ this.creditDetail.availableCollateral }}
      </div>
      <el-form label-width="100px" style="max-width: 800px; margin-right: 2vw"  class="user-form">
        <el-form-item label="审查结果" required>
          <el-select
              v-model="confirmData.status"
              placeholder="Select"
              size="large"
              style="width: 240px"
          >
            <el-option label="批准" value="CONFIRMED"/>
            <el-option label="待用户确认" value="APPROVED"/>
            <el-option label="否决" value="REJECTED"/>
          </el-select>
        </el-form-item>
        <el-form-item label="需抵押资产" v-if="isCollateralInputEnabled">
            <el-input v-model.number="confirmData.collateralAmount" width="200px" placeholder="输入需抵押资产" clearable></el-input>
        </el-form-item>
        <el-form-item label="审查意见" required>
          <el-input v-model="confirmData.reviewComments" type="textarea" width="200px" rows="3" placeholder="输入审查意见" clearable></el-input>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmExamine();confirmVisible = false">确认</el-button>
        <el-button @click="confirmVisible = false">取消</el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import { Postcard, Reading, Tickets, UserFilled } from "@element-plus/icons-vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  components: { Tickets, Postcard, Reading, UserFilled },
  data() {
    return {
      detailsVisible: false,
      confirmVisible: false,

      reviewerId: localStorage.getItem("reviewerId"),

      HistoryList: [
        {
          loanId: 'L001',
          customerId: 2,
          accountId: "123456",
          loanAmount: 5000,
          interestRate: 0.98,
          loanDuration: '12 months',
          applicationDate: '2024-07-10',
          status: 'PENDING',
        }
      ],

      creditDetail: {
        totalSavings: 50000,
        credit: 5000,
        totalCreditCardDebt: 10,
        monthlyTransactionCount: 10,
        availableCollateral: 5000,
      },

      confirmData: {
        loanId: 'L001',
        loanAmount: 5000,
        loanDuration: '12 months',
        credit: 50000,
        applicationDate: '2024-07-10',
        status: '',
        collateralAmount: 5000,
        reviewComments: '',
      },

      loanDetailId: 0,
    };
  },
  computed: {
    isCollateralInputEnabled() {
      // 当审查结果为 'APPROVED' 时，返回 true 以启用输入框
      if (this.confirmData.status === 'APPROVED'){
        return true;
      }else{
        this.confirmData.collateralAmount = 0;
        return false;
      }
    }
  },
  methods: {
    detailDialog() {
      this.detailsVisible = true;
    },

    confirmDialog(row) {
      this.confirmVisible = true;
      this.confirmData = {...row};
    },

    getCreditDetail(row) {
      this.creditDetail = {};
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      let response = axios.post("/home/examine/detail",
          {
            customerId: row.customerId,
          },
          config
      )
          .then (response => {
            let data = response.data;
            this.creditDetail.credit = data.credit;
            this.creditDetail.totalCreditCardDebt = data.totalCreditCardDebt;
            this.creditDetail.monthlyTransactionCount = data.monthlyTransactionCount;
            this.creditDetail.availableCollateral = data.availableCollateral;
            this.creditDetail.totalSavings = data.totalSavings;
          })
    },

    confirmExamine() {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      if (this.confirmData.reviewComments === null){
        this.confirmData.reviewComments = " ";
      }
      let response = axios.post('/home/examine/confirm',
          {
            loanId: this.confirmData.loanId,
            reviewerId: this.reviewerId,
            status: this.confirmData.status,
            collateralAmount: this.confirmData.collateralAmount,
            reviewComments: this.confirmData.reviewComments,
          },
          config
      )
          .then (response => {
            let data = response.data;
            if (data === "success"){
              ElMessage.success("审查成功") // 显示消息提醒
            }else if (data === "fail"){
              ElMessage.error("审查失败")
            }
            this.QueryLoan()
          })
    },

    QueryLoan() {
      this.HistoryList = [];
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      let response = axios.post('/home/examine/list',
          {
            reviewerId: this.reviewerId,
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
    this.QueryLoan();
  }
};
</script>

<style>
/* 将样式移动到<style>标签中，并使用类选择器 */

.main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  background-color: #0f184d;
  overflow-y: hidden;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow: auto;
}

.title {
  background-color: rgb(17, 71, 117);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.aside {
  min-height: calc(100vh - 60px);
  width: 180px;
  background-color: red;
}

.title3 {
  background: url("../../assets/figure2.jpg");
  height: 60px;
  display: flex;
  align-items: center;
  text-align: left;
  color: #ffffff;
  font-weight: bold;
  font-size: xx-large;
  font-family: 'Microsoft YaHei';
}

.history-trail {
  margin-left: 30px;
  font-size: medium;
  color: #ffffff;
  font-weight: normal;
}

</style>
