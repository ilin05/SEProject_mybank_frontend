<template>
  <div class="main">
    <el-container>
      <el-header class="title">
        <div style="margin-top: 12px; display: inline-block;">
          <span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">银行柜台操作系统</span>
          <span style="margin-left :30px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">出纳员您好！</span>
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
              挂失业务办理
            </span>
            <RouterLink to="/menu">
              <span class="history-trail">菜单</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/account">
              <span class="history-trail">账户</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/account/savingaccount">
              <span class="history-trail">储蓄账户</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/account/savingaccount/reportloss">
              <span class="history-trail">挂失</span>
            </RouterLink>
          </div>
        </el-main>
      </el-container>

      <el-container>
        <el-aside class="aside" style="display: flex; color:#0f184d">
          <el-menu active-text-color="#ffd04b" background-color="rgb(17, 71, 117)" default-active="1" text-color="#fff"
                   style="height:100%; width: 100%;" :router="true">
            <el-menu-item index="openaccount">
              <el-icon>
                <Reading />
              </el-icon>
              <span>开户</span>
            </el-menu-item>
            <el-menu-item index="queryaccount">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>查询账户信息</span>
            </el-menu-item>
            <el-menu-item index="freeze">
              <el-icon>
                <Postcard />
              </el-icon>
              <span>冻结</span>
            </el-menu-item>
            <el-menu-item index="unfreeze">
              <el-icon>
                <Tickets />
              </el-icon>
              <span>解冻</span>
            </el-menu-item>
            <el-menu-item index="reportloss">
              <el-icon>
                <CreditCard />
              </el-icon>
              <span>挂失</span>
            </el-menu-item>
            <el-menu-item index="reissue">
              <el-icon>
                <Checked />
              </el-icon>
              <span>补发</span>
            </el-menu-item>
            <el-menu-item index="closure">
              <el-icon>
                <Delete />
              </el-icon>
              <span>销户</span>
            </el-menu-item>
            <el-menu-item index="modifyaccount">
              <el-icon>
                <Edit />
              </el-icon>
              <span>修改密码</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <el-card title="挂失" class="deposit_card">
            <el-tabs v-model="activeTab" type="border-card">
              <el-tab-pane label="储蓄卡挂失" name="tab1">
                <el-form
                    :label-position="left"
                    label-width="auto"
                    :model="formItems1"
                    style="max-width: 600px"
                >
                  <el-form-item label="银行账号">
                    <el-input v-model="formItems1.accountId" placeholder="请输入银行账号"/>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input type="password" v-model="formItems1.password" placeholder="请输入密码"/>
                  </el-form-item>

                <el-button type="primary" @click="ConfirmReportLoss">确认</el-button>
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
import SHA256 from "crypto-js/sha256";

export default {
  data() {
    return {
      activeTab: 'tab1',
      formItems1:{
        accountId: '',
        password: ''
      },
      // formItems1: [
      //   { label: '银行卡号：', placeholder: '请输入银行卡号' },
      //   { label: '持卡人身份证号：', placeholder: '请输入持卡人身份证号' },
      // ],
      formItems2: [
        { label: '银行卡号：', placeholder: '请输入银行卡号' },
        { label: '持卡人身份证号：', placeholder: '请输入持卡人身份证号' },
      ]
    };
  },
  methods:{
    ConfirmReportLoss(){
      axios.post("/cashier/reportLoss",{
        accountId:this.formItems1.accountId,
        password: SHA256(this.formItems1.password).toString(),
      })
          .then(response=>{
            if(response.data.code === 1){
              ElMessage.success("挂失成功");
              console.log(response.data);
              //location.href = '/menu'
            }else{
              ElMessage.error(response.data.message)
              console.log(response.data);
            }
          })
          .catch(error =>{
            ElMessage.error("failed");
          })
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

.history-trail {
  margin-left: 30px;
  font-size: medium;
  color: #ffffff;
  font-weight: normal;
}

.content-card {
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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