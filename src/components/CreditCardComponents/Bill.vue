<template>
  <div class="main">
    <el-container>
      <el-header class="title">
        <div style="margin-top: 12px; display: inline-block;">
          <router-link to='/home/internetmenu'>
            <el-button class="functionBox" router-link="/home/internetmenu" color="rgb(17, 71, 117)">
					<span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">
						用户操作系统
					</span>
            </el-button>
          </router-link>
        </div>
        <el-button type="primary" style="margin-top: 12px; padding-right: 10px;" @click="LogOut">
          <span style="font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: normal;">登出</span>
        </el-button>
      </el-header>

      <el-container>
        <el-main class="background_container">
          <div class="title2">
              <span style="margin-left: 5%">
                信用卡业务办理
              </span>
            <span class="history-trail">菜单 > 查询信用卡账单</span>
          </div>
        </el-main>
      </el-container>

      <el-container>
        <el-aside class="aside" style="display: flex; color:#0f184d">
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
              <el-tab-pane label="按卡号查询账单" name="tab1">
                <div v-for="(item, index) in formItemsCard" :key="index" class="form-row">
                  <div class="form-label">{{ item.label }}</div>
                  <el-input v-model="cardNumber" class="form-input" :placeholder="item.placeholder" clearable/>
                </div>
                <el-button type="primary" @click="searchCard">查询</el-button>
              </el-tab-pane>
            </el-tabs>
          </el-card>

          <el-card title="信用卡账单" class="credit_card">
            <el-table :data="data" style="width: 100%">
              <el-table-column prop="creditCardId" label="信用卡号">
              </el-table-column>
              <el-table-column prop="time" label="支付日期">
              </el-table-column>
              <el-table-column prop="consumption" label="支付金额">
              </el-table-column>
              <el-table-column prop="type" label="支付类型">
              </el-table-column>
            </el-table>
          </el-card>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import {ElMessage} from 'element-plus';
import Axios from 'axios';
import app from "@/App.vue";
import router from "@/router/index.js";

export default {
  data() {
    return {
      activeTab: 'tab1',
      formItemsCard: [
        {label: '信用卡号：', placeholder: '请输入信用卡号'},
      ],
      cardNumber: "",
      data: null
    };
  },
  methods: {
    searchCard() {
      let card_id = this.cardNumber;
      Axios.get('/api/bill/card/' + card_id)
          .then(response => {
            // 处理成功响应，更新数据
            this.data = response.data.data;
            ElMessage.success('数据已刷新');

            if (response.data.success === false)
              ElMessage.error('找不到卡' + response.data.message);
          })
          .catch(error => {
            // 处理错误响应
            ElMessage.error('刷新数据时出错:', error);
          });
      //ElMessage.success('刷新数据');
    },
    searchUser() {
      // let user_id = app.globalData.userId;
      let user_id = localStorage.getItem("user-id");
      Axios.get('/api/bill/user/' + user_id)
          .then(response => {
            this.data = response.data.object;
            ElMessage.success('数据已刷新');
          })
          .catch(error => {
            ElMessage.error('刷新数据时出错', error);
          });
    },
    LogOut(){
      sessionStorage.clear()
      router.push('/login')
    }
  }
};
</script>

<style scoped>
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

.aside {
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
  margin-left: 30px;
  margin-right: 30px;
}

.deposit_card {
  background-color: rgba(255, 255, 255, 0.7);
  margin: auto;
  padding: 20px;
  border-radius: 10px;
}

/* 其他样式可以根据需要添加 */
</style>
