<template>
  <div class="main">
    <el-container>
      <el-header class="title">
        <div style="margin-top: 12px; display: inline-block;">
          <router-link to="/home/internetmenu">
            <el-button class="functionBox" color="rgb(17, 71, 117)">
                <span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">
                  用户操作系统
                </span>
            </el-button>
          </router-link>
        </div>
        <el-button type="primary" style="margin-top: 12px; padding-right: 10px;" @click="LogOut">
          <span
              style="font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: normal;">登出</span>
        </el-button>
      </el-header>

      <el-container>
        <el-main class="background_container">
          <div class="title2">
            <span style="margin-left: 5%">信用卡业务办理</span>
            <span class="history-trail">菜单 > 查询信用卡账单</span>
          </div>
        </el-main>
      </el-container>

      <el-container>
        <el-aside class="change_aside" style="display: flex; color:#0f184d">
          <el-menu active-text-color="#ffd04b" background-color="rgb(17, 71, 117)" default-active="1" text-color="#fff"
                   style="height:100%; width: 100%;" :router="true">
            <el-menu-item index="creditcard">
              <el-icon>
                <Reading/>
              </el-icon>
              <span>信用卡申请</span>
            </el-menu-item>
            <el-menu-item index="change">
              <el-icon>
                <UserFilled/>
              </el-icon>
              <span>信用卡列表</span>
            </el-menu-item>
            <el-menu-item index="payment">
              <el-icon>
                <CreditCard/>
              </el-icon>
              <span>信用卡支付</span>
            </el-menu-item>
            <el-menu-item index="bill">
              <el-icon>
                <Document/>
              </el-icon>
              <span>消费记录</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <el-card title="信用卡账单" class="credit_card">
            <el-tabs v-model="activeTab" type="border-card">
              <el-tab-pane label="按卡号查询信用卡信息" name="tab1">
                <div v-for="(item, index) in formItems1" :key="index" class="form-row">
                  <div class="form-label">{{ item.label }}</div>
                  <el-input
                      v-model="cardNumber"
                      class="form-input"
                      :placeholder="item.placeholder"
                      clearable
                  />
                </div>
              </el-tab-pane>
            </el-tabs>
            <div class="refresh">
              <el-button type="primary" style="margin-top: 12px; margin-left: 30px; padding-right: 12px;"
                         @click="fetchCardDetails">
                查询
              </el-button>
            </div>
          </el-card>

          <el-card title="修改信用卡状态" class="credit_card">
            <div>
              <el-text>信用卡号：{{ cardDetails.cardId }}</el-text>
            </div>
            <div>
              <el-text>信用卡消费：{{ cardDetails.consumption }}</el-text>
            </div>
            <div>
              <el-text>信用卡额度：{{ cardDetails.creditLimit }}</el-text>
            </div>
            <div>
              <el-text>信用卡状态：{{ cardDetails.status }}</el-text>
            </div>
            <el-button type="primary" style="margin-top: 12px; margin-left: 20px; padding-right: 12px;"
                       @click="performOperation('Password')">修改密码
            </el-button>
            <el-button type="primary" style="margin-top: 12px; margin-left: 20px; padding-right: 12px;"
                       @click="performOperation('reportLoss')">挂失
            </el-button>
            <el-button type="primary" style="margin-top: 12px; margin-left: 20px; padding-right: 12px;"
                       @click="performOperation('freeze')">冻结
            </el-button>
            <el-button type="primary" style="margin-top: 12px; margin-left: 20px; padding-right: 12px;"
                       @click="performOperation('unLoss')">取消挂失
            </el-button>
            <el-button type="primary" style="margin-top: 12px; margin-left: 20px; padding-right: 12px;"
                       @click="performOperation('unfreeze')">解除冻结
            </el-button>

            <div v-if="operation === 'Password'">
              <h3>修改密码</h3>
              <label for="current-password">当前密码:</label>
              <input v-model="currentPassword" id="current-password" type="password" placeholder="请输入当前密码"/>
              <label for="new-password">新密码:</label>
              <input v-model="newPassword" id="new-password" type="password" placeholder="请输入新密码"/>
              <label for="confirm-password">确认新密码:</label>
              <input v-model="confirmPassword" id="confirm-password" type="password"
                     placeholder="请再次输入新密码"/>
              <button @click="changePassword">确认修改</button>
            </div>
          </el-card>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import {ElMessage} from 'element-plus';
import axios from 'axios';
import moment from 'moment';
import router from "@/router/index.js";

export default {
  data() {
    return {
      activeTab: 'tab1',
      formItems1: [
        {label: '信用卡号：', placeholder: '请输入信用卡号'},
      ],
      cardNumber: "",
      cardDetails: "",//
      operation: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  },
  methods: {
    checkFormValue() {
      if (this.cardNumber.length !== 23) {
        ElMessage.error("卡号长度不为23");
        return false;
      }
      return true;
    },
    getCurrentTime() {
      return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    },
    fetchCardDetails() {
      if (this.checkFormValue()) {
        axios.get('/api/card/detail/' + this.cardNumber)
            .then(response => {
              console.log(response)
              this.cardDetails = response.data.data;
              ElMessage.success("查询成功");
            })
            .catch(error => {
              console.log(this.cardNumber);
              ElMessage.error('获取卡详情时出错');
            });
      }
    },
    performOperation(op) {
      this.operation = op;
      if (op === 'reportLoss') {
        this.reportLoss();
      } else if (op === 'freeze') {
        this.freezeCard();
      } else if (op === 'unfreeze') {
        this.unfreezeCard();
      } else if (op === 'unLoss') {
        this.unLoss();
      } else if (op === 'changePassword') {
        this.changePassword();
      }
    },
    reportLoss() {
      axios.put('/api/card/update/' + this.cardNumber, {status: 'LOST'})
          .then(response => {
            ElMessage.success("挂失成功");
            this.fetchCardDetails();
          })
          .catch(error => {
            ElMessage.error("挂失失败");
          });
    },
    freezeCard() {
      axios.put('/api/card/update/' + this.cardNumber, {status: 'FROZEN'})
          .then(response => {
            ElMessage.success("冻结成功");
            this.fetchCardDetails();
          })
          .catch(error => {
            ElMessage.error("冻结失败");
          });
    },
    unLoss() {
      axios.put('/api/card/update/' + this.cardNumber, {status: 'ACTIVE'})
          .then(response => {
            ElMessage.success("取消挂失成功");
            this.fetchCardDetails();
          })
          .catch(error => {
            ElMessage.error("取消挂失失败");
          });
    },
    unfreezeCard() {
      axios.put('/api/card/update/' + this.cardNumber, {status: 'ACTIVE'})
          .then(response => {
            ElMessage.success("解除冻结成功");
            this.fetchCardDetails();
          })
          .catch(error => {
            ElMessage.error("解除冻结失败");
          });
    },
    changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        ElMessage.error('新密码不一致');
        return;
      }

      console.log(this.currentPassword)
      console.log(this.newPassword)

      axios.put('/api/card/password/' + this.cardNumber, {
        oldPassword: this.currentPassword,
        newPassword: this.newPassword
      })
          .then(response => {
            if (response.data.success)
              ElMessage.success('密码修改成功');
            else
              ElMessage.error('密码修改失败');
          })
          .catch(error => {
            ElMessage.error('密码修改失败');
          });
    },
    refreshData() {
      this.fetchCardDetails();
    },
    LogOut(){
      sessionStorage.clear()
      router.push('/login')
    }
  },
};
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

.change_aside {
  min-height: calc(100vh - 60px);
  width: 180px;
  background-color: red;
}

.title {
  background-color: rgb(17, 71, 117);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.title2 {
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

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-label {
  width: 100px;
  font-weight: bold;
}

.form-input {
  flex: 1;
  margin-left: 20px;
  margin-right: 20px;
}

.credit_card {
  background-color: rgba(255, 255, 255, 0.7);
  margin: auto;
  padding: 20px;
  border-radius: 10px;
}

.refresh {
  margin-top: 20px;
}
</style>
