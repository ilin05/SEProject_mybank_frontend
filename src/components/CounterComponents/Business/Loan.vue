<template>
  <div class="main">
    <el-container>
      <el-header class="title">
        <div style="margin-top: 12px; display: inline-block;">
          <span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">银行柜台操作系统</span>
          <span style="margin-left :30px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">出纳员您好！</span>
        </div >
        <RouterLink to="/login">
          <el-button type="primary" style="margin-top: 12px; padding-right: 10px;">
            <span style="font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: normal;">登出</span>
          </el-button>
        </RouterLink>
      </el-header>

      <el-container>
        <el-main class="background_container">
          <div class="title2">
            <span style="margin-left: 5%">
              贷款申请
            </span>
            <RouterLink to="/menu">
              <span class="history-trail">菜单</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/business">
              <span class="history-trail">业务</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/business/loan">
              <span class="history-trail">贷款申请</span>
            </RouterLink>
          </div>
        </el-main>
      </el-container>

      <el-container>
        <el-aside class="aside" style="display: flex; color:#0f184d">
          <el-menu active-text-color="#ffd04b" background-color="rgb(17, 71, 117)" default-active="1" text-color="#fff"
                   style="height:100%; width: 100%;" :router="true">
            <el-menu-item index="deposit">
              <el-icon>
                <Reading />
              </el-icon>
              <span>存款</span>
            </el-menu-item>
            <el-menu-item index="withdraw">
              <el-icon>
                <Postcard />
              </el-icon>
              <span>取款</span>
            </el-menu-item>
            <el-menu-item index="transfer">
              <el-icon>
                <Tickets />
              </el-icon>
              <span>转账</span>
            </el-menu-item>
            <el-menu-item index="loan">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>贷款</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <el-main>
          <el-card title="贷款申请" class="loan_card">
            <el-tabs v-model="activeTab" type="border-card">
              <el-tab-pane label="贷款申请" name="tab1">
                <el-form label-width="80px" style="max-width: 600px" class="user-form">
                  <el-form-item label="储蓄账号" >
                    <el-input v-model="LoanData.accountId" placeholder="请填写贷款储蓄账号">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="贷款金额" >
                    <el-input v-model.number="LoanData.loanAmount" placeholder="输入贷款金额"></el-input>
                  </el-form-item>
                  <el-form-item label="贷款期限" >
                    <el-select v-model.number="LoanData.loanDuration" placeholder="输入贷款期限">
                      <el-option label="一个月" value="一个月"></el-option>
                      <el-option label="三个月" value="三个月"></el-option>
                      <el-option label="六个月" value="六个月"></el-option>
                      <el-option label="一年" value="一年"></el-option>
                      <el-option label="三年" value="三年"></el-option>
                      <el-option label="五年" value="五年"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="贷款用途" >
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
                <el-button type="primary" @click="showApplicationDialog">申请</el-button>
                </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-main>
      </el-container>

      <el-dialog v-model="applicationVisible" title="确认申请">
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          储蓄账号：
          {{ LoanData.accountId }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          贷款金额：
          {{ LoanData.loanAmount }}
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          贷款期限：
          {{ this.durationTransform(LoanData.loanDuration) }}月
        </div>
        <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
          贷款类别：
          {{ LoanData.loanType }}
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="confirmApplication">确认</el-button>
            <el-button type="normal" @click="this.applicationVisible = false">取消</el-button>
          </span>
        </template>
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
      activeTab: 'tab1',
      applicationVisible: false,
      customerId: localStorage.getItem("customerId"),

      LoanData: {
        customerId: 1,
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
    confirmApplication() {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      let response = axios.post('/home/loan/application/apply',
          {
            customerId: this.LoanData.customerId,
            accountId: this.LoanData.accountId,
            loanAmount: this.LoanData.loanAmount,
            loanDuration: this.durationTransform(this.LoanData.loanDuration),
            loanType: this.LoanData.loanType,
          })
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
    async getAvailableCards() {
      this.AvailableCardId = [];
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      let response = axios.post('/home/loan/application/card',
          {
            customerId: 1,
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
    // this.getAvailableCards();
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
  height: auto;
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
  width: 180px;
  background-color: red;
}

.title2 {
  background: url("../../../assets/figure2.jpg");
  height: 60px;
  display: flex;
  align-items: center;
  text-align: left;
  color: #ffffff;
  font-weight: bold;
  font-size: xx-large;
  font-family: 'Microsoft YaHei';
}

.aside {
  min-height: calc(100vh - 60px);
  width: 180px;
  background-color: red;
}

.history-trail {
  margin-left: 30px;
  font-size: medium;
  color: #ffffff;
  font-weight: normal;
}

.loan_card {
  background-color: rgba(255, 255, 255, 0.7);
  margin: auto;
  padding: 20px;
  border-radius: 10px;
}


/* 其他样式可以根据需要添加 */
</style>
