<template>
  <div class="main">
    <el-container>
      <el-header class="title">
        <div style="margin-top: 12px; display: inline-block;">
          <span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">银行柜台操作系统</span>
          <span style="margin-left :30px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">出纳员：XXX</span>
          <span style="margin-left :15px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">今日办结事项：XXX</span>
        </div >
        <RouterLink to="/login">
          <el-button type="primary" style="margin-top: 12px; padding-right: 10px;" @click="DeleteToken">
            <span style="font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: normal;">登出</span>
          </el-button>
        </RouterLink>
      </el-header>

      <el-container>
        <el-main class="background_container">
          <div class="title2">
            <span style="margin-left: 5%">
              外汇账户
            </span>
            <RouterLink to="/menu">
              <span class="history-trail">菜单</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/account">
              <span class="history-trail">账户</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/account/foreigncurrency">
              <span class="history-trail">外汇账户</span>
            </RouterLink>
          </div>
        </el-main>
      </el-container>

      <el-container>
        <el-aside class="aside" style="display: flex; color:#0f184d">
          <el-menu active-text-color="#ffd04b" background-color="rgb(17, 71, 117)" default-active="1" text-color="#fff"
                   style="height:100%; width: 100%;" :router="true">
            <el-menu-item index="/account/savingaccount">
              <el-icon>
                <Reading />
              </el-icon>
              <span>储蓄账户</span>
            </el-menu-item>
            <el-menu-item index="/account/creditcard">
              <el-icon>
                <Postcard />
              </el-icon>
              <span>信用卡</span>
            </el-menu-item>
            <el-menu-item index="/account/foreigncurrency">
              <el-icon>
                <Tickets />
              </el-icon>
              <span>外汇账户</span>
            </el-menu-item>
            <el-menu-item index="/account/internetbank">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>网银账户</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <el-main>
          <el-card title="外汇账户开户" class="deposit_card">
            <el-tabs v-model="activeTab" type="border-card">
              <el-tab-pane label="外汇账户开户" name="tab1">
                <el-form
                    :label-position="left"
                    label-width="auto"
                    :model="foreignCurrencyInfo"
                    style="max-width: 600px"
                >
                  <el-form-item label="用户名">
                    <el-input v-model="foreignCurrencyInfo.name" placeholder="请输入姓名"/>
                  </el-form-item>
                  <el-form-item label="登录密码">
                    <el-input v-model="foreignCurrencyInfo.password" placeholder="请输入登录密码"/>
                  </el-form-item>
                  <el-form-item label="支付密码">
                    <el-input v-model="foreignCurrencyInfo.pay_password" placeholder="请输入支付密码"/>
                  </el-form-item>

                  <el-button type="primary" @click="ConfirmOpenForeignAccount">确认</el-button>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import {sha256} from "js-sha256";


export default {
  data() {
    return {
      activeTab: 'tab1',
      foreignCurrencyInfo:{
        name : '',
        password : '',
        pay_password : '',
      }
    };
  },
  methods:{
    ConfirmOpenForeignAccount(){
      // console.log(this.hashString(this.foreignCurrencyInfo.password,))
      axios.post("/cashier/openForeignAccount",{
        name : this.foreignCurrencyInfo.name,
        password: this.foreignCurrencyInfo.password,
        payPassword: this.foreignCurrencyInfo.pay_password,
        // payPassword: this.hashString(this.foreignCurrencyInfo.pay_password),
      })
          .then(response=>{
            if(response.data.code === 1){
              ElMessage.success("开户成功");
              console.log(response.data);
              //location.href = '/menu'
            } else{
              ElMessage.error(response.data.message)
            }
          })
          .catch(error =>{
            ElMessage.error("开户失败，请联系管理员");
          })
    },
    hashString(str){
      return sha256(str)
    },
    DeleteToken(){
      sessionStorage.clear()
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

.title {
  background-color: rgb(17, 71, 117);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
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

.history-trail {
  margin-left: 30px;
  font-size: medium;
  color: #ffffff;
  font-weight: normal;
}

.aside {
  min-height: calc(100vh - 60px);
  width: 180px;
  background-color: red;
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


