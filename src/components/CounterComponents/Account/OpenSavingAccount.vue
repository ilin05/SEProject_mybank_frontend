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
              开户业务办理
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
            <RouterLink to="/account/savingaccount/openaccount">
              <span class="history-trail">开户</span>
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
          <el-card title="开户" class="deposit_card">
            <el-tabs v-model="activeTab" type="border-card">
              <el-tab-pane label="身份证开户" name="tab1">
                <el-form
                    :label-position="left"
                    label-width="auto"
                    :model="formItems1"
                    style="max-width: 600px"
                >
                  <el-form-item label="开户人姓名">
                    <el-input v-model="formItems1.customerName" placeholder="请输入姓名"/>
                  </el-form-item>
                  <el-form-item label="身份证号">
                    <el-input v-model="formItems1.idNumber" placeholder="请输入身份证号"/>
                  </el-form-item>
                  <el-form-item label="电话号码">
                    <el-input v-model="formItems1.phoneNumber" placeholder="请输入电话号码"/>
                  </el-form-item>
<!--                  <el-form-item label="账户币种">-->
<!--                    <el-input v-model="formItems1." placeholder="请输入账户币种"/>-->
<!--                  </el-form-item>-->
                  <el-form-item label="开户金额">
                    <el-input v-model="formItems1.openAmount" placeholder="请输入开户金额"/>
                  </el-form-item>
                  <el-form-item label="地址">
                    <el-input v-model="formItems1.address" placeholder="请输入地址"/>
                  </el-form-item>
                  <el-form-item label="账户密码">
                    <el-input type="password" :prefix-icon="Lock" v-model="formItems1.password" placeholder="请输入密码"/>
                  </el-form-item>
                  <el-form-item label="账户形式">
                    <el-select v-model="formItems1.accountForm" placeholder = "请选择账户形式">
                      <el-option label="存折" value="存折"></el-option>
                      <el-option label="银行卡" value="银行卡"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-button type="primary" @click="ConfirmOpenAccount">确认</el-button>
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
      formItems1:{
        customerName: '',
        idNumber: '',
        phoneNumber: '',
        openAmount: '',
        address: '',
        password: '',
        accountForm : '',
      }
    };
  },
  methods:{
    ConfirmOpenAccount(){
      console.log("hello2")
      console.log(this.hashString(this.formItems1.password,))
      axios.post("/cashier/openAccount",{
        customerName: this.formItems1.customerName,
        idNumber: this.formItems1.idNumber,
        phoneNumber: this.formItems1.phoneNumber,
        openAmount: +this.formItems1.openAmount,
        password: this.formItems1.password,

        // password: this.hashString(this.formItems1.password,),
        address: this.formItems1.address,

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
            ElMessage.error("failed");
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


