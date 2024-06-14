<template>
  <div class="main">
    <el-container>
      <el-container>
        <el-main class="background_container">
          <div class="title2">
            <span style="margin-left: 5%">贷款申请</span>
            <RouterLink to="/home/internetmenu">
              <span class="history-trail">用户主菜单</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/home/loan/application">
              <span class="history-trail">贷款申请</span>
            </RouterLink>
          </div>
          <div class="content">
            <el-form label-width="80px" style="max-width: 600px" class="user-form">
              <el-form-item label="储蓄卡号" required>
                <el-select v-model="LoanData.accountId" placeholder="请选择贷款储蓄卡">
                  <el-option
                      v-for="item in AvailableCardId"
                      :key="item.accountId"
                      :label="item.accountId"
                      :value="item.accountId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="贷款金额" required>
                <el-input v-model.number="LoanData.loanAmount" placeholder="输入贷款金额"></el-input>
              </el-form-item>
              <el-form-item label="贷款期限" required>
                <el-select v-model.number="LoanData.loanDuration" placeholder="输入贷款期限">
                  <el-option label="一个月" value="一个月"></el-option>
                  <el-option label="三个月" value="三个月"></el-option>
                  <el-option label="六个月" value="六个月"></el-option>
                  <el-option label="一年" value="一年"></el-option>
                  <el-option label="三年" value="三年"></el-option>
                  <el-option label="五年" value="五年"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="贷款用途" required>
                <el-select v-model="LoanData.loanType" placeholder="请选择贷款用途">
                  <el-option label="购房贷款" value="购房贷款"></el-option>
                  <el-option label="购车贷款" value="购车贷款"></el-option>
                  <el-option label="个人贷款" value="个人贷款"></el-option>
                  <el-option label="助学贷款" value="助学贷款"></el-option>
                  <el-option label="商业贷款" value="商业贷款"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="footer">
              <el-button type="success" @click="showApplicationDialog">申请</el-button>
              <el-button type="warning" @click="getCredit(); showCreditDialog()">查看个人信用额度</el-button>
            </div>
          </div>
        </el-main>
      </el-container>

      <el-dialog v-model="CreditVisible" title="个人信用额度">
        <el-divider></el-divider>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; margin-bottom: 20px">
          信用额度：
          {{ this.credit }}
        </div>
        <el-divider></el-divider>
      </el-dialog>

      <el-dialog v-model="applicationVisible" title="确认申请">
        <el-divider></el-divider>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          储蓄卡号：
          {{ LoanData.accountId }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          贷款金额：
          {{ LoanData.loanAmount }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          贷款期限：
          {{ this.durationTransform(LoanData.loanDuration) }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          贷款类别：
          {{ LoanData.loanType }}
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="confirmApplication">确认</el-button>
            <el-button type="primary" @click="this.applicationVisible = false">取消</el-button>
          </span>
        </template>
        <el-divider></el-divider>
      </el-dialog>

    </el-container>
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
      applicationVisible: false,
      CreditVisible: false,
      customerId: localStorage.getItem("customerId"),
      interestRate: 0.02,

      credit: 5000,

      LoanData: {
        customerId: 2,
        accountId: '',
        loanAmount: 0,
        loanDuration: '',
        loanType: '',
      },

      AvailableCardId:[
        {
          accountId: "123456",
        }
      ]
    };
  },
  methods: {
    durationTransform(duration){
      switch (duration){
        case "一个月": return 1;
        case "三个月": return 3;
        case "六个月": return 6;
        case "一年": return 12;
        case "三年": return 36;
        case "五年": return 60;
        default: return 0;
      }
    },
    showApplicationDialog() {
      this.applicationVisible = true;
    },
    showCreditDialog(){
      this.CreditVisible = true;
    },
    confirmApplication() {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      let response = axios.post('/home/loan/application/apply',
          {
            customerId: this.customerId,
            accountId: this.LoanData.accountId,
            loanAmount: this.LoanData.loanAmount,
            loanDuration: this.durationTransform(this.LoanData.loanDuration),
            loanType: this.LoanData.loanType,
          },

      )
          .then(response => {
            let data = response.data;
            if (data === "success"){
              this.applicationVisible = false;
              ElMessage.success("提交申请成功") // 显示消息提醒
            }else if (data === "fail"){
              ElMessage.error("提交申请失败")
            }
            this.getAvailableCards();
          })
    },
    getCredit(){
      this.CreditVisible = true;
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      let response = axios.post('/home/loan/application/credit',
          {
            customerId: this.customerId,
          },
          config,
      )
          .then(response => {
            this.credit = response.data
          })
    },
    async getAvailableCards() {
      this.AvailableCardId = [];
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      let response = axios.post('/home/loan/application/card',
          {
            customerId: this.customerId,
          },
          config,
      )
      .then(response => {
        let data = response.data;
        data.forEach((item) => {
          this.AvailableCardId.push(item);
        })
      })
    }
  },
  mounted() {
    this.getAvailableCards();
  },
}
</script>

<style scoped>
.main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: #0f184d;
  overflow-y: hidden;
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
  width: 200px;
  background-color: red;
}

.background_container {
  flex-grow: 1;
  padding: 20px;
  overflow: auto;
  background-color: #fff;
}

.title2 {
  background: url("../../assets/figure1.png");
  height: 60px;
  display: flex;
  align-items: center;
  text-align: left;
  color: #ffffff;
  font-weight: bold;
  font-size: xx-large;
  font-family: 'Microsoft YaHei', serif;
}

.history-trail {
  margin-left: 30px;
  font-size: medium;
  color: #ffffff;
  font-weight: normal;
}

.content {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
}

.user-form {
  width: 100%; /* 调整表单宽度 */
  font-size: 14px; /* 增大字体 */
  line-height: 2; /* 增加行距 */
  margin-left: 0; /* 左移表单 */
}

.el-form-item__label {
  text-align: left;
  font-size: 18px; /* 增大标签字体 */
}

.el-input__inner {
  font-size: 18px; /* 增大输入框内字体 */
}

.edit-button {
  text-align: left; /* 按钮居左 */
  margin-top: 20px;
  margin-left: 70px; /* 按钮与表单对齐 */
}

/* 其他样式可以根据需要添加 */
</style>
