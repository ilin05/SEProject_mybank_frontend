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
              转账业务办理
            </span>
            <RouterLink to="/menu">
              <span class="history-trail">菜单</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/business">
              <span class="history-trail">业务</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/business/transfer">
              <span class="history-trail">转账业务</span>
            </RouterLink>
          </div>
        </el-main>
      </el-container>

<!--      转账金额过大可能需要身份验证      -->

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
          <el-card title="转账" class="deposit_card">
            <el-tabs v-model="activeTab" type="border-card">
              <el-tab-pane label="账户转账" name="tab1">
                <el-form     :label-position="left"
                             label-width="auto">
                  <el-form-item label="转出账号">
                    <el-input  v-model="transferInfo.cardId"></el-input>
                  </el-form-item>
                  <el-form-item label="转入账号">
                    <el-input v-model="transferInfo.moneyGoes"></el-input>
                  </el-form-item>
                  <el-form-item label="转账金额" >
                    <el-input v-model="transferInfo.transactionAmount" type="number"></el-input>
                  </el-form-item>
<!--                  <el-form-item label="输入密码">-->
<!--                    <el-input type="password" :prefix-icon="Lock" v-model="transferInfo.password"></el-input>-->
<!--                  </el-form-item>-->
                  <el-button type="primary" @click="InputPassordVisible = true" :disabled="this.transferInfo.transactionAmount<=0||this.transferInfo.cardId===''||this.transferInfo.moneyGoes===''">确认</el-button>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-card>

          <el-dialog v-model="ShowTransaction" title="转账信息" width="40%" align-center>
            <el-form
                label-width="auto"
                style="max-width: 1000px"
            >
              <el-form-item label = "账单流水号">{{transferInfo.transactionId}}</el-form-item>
              <el-form-item label = "转出方银行账号">{{transferInfo.cardId}}</el-form-item>
              <el-form-item label = "转入方银行账号">{{transferInfo.moneyGoes}}</el-form-item>
              <el-form-item label = "转账金额">{{transferInfo.transactionAmount}}</el-form-item>
              <el-form-item label = "转账时间">{{transferInfo.transactionTime}}</el-form-item>
              <span>
                  <el-button @click="this.ShowTransaction=false">确定</el-button>
                </span>
            </el-form>
          </el-dialog>

          <el-dialog v-model="InputPassordVisible" title="输入密码验证" width="40%" align-center>
            <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
              密码：
              <el-input type="password" :prefix-icon="Lock" v-model="transferInfo.password" style="width: 12.5vw;" clearable></el-input>
              <!--                <el-input type="password" v-model="formItems1.password" style="width: 12.5vw;" clearable />-->
            </div>
            <template #footer>
                <span>
                  <el-button @click="this.InputPassordVisible=false">取消</el-button>
                  <el-button type="primary" @click="confirmTransfer" :disabled="this.transferInfo.password===''">
                    确定
                  </el-button>
                </span>
            </template>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {Edit, Lock} from "@element-plus/icons-vue";
import {el} from "element-plus/es/locale/index";
import axios from "axios";
import {ElMessage} from "element-plus";
import SHA256 from "crypto-js/sha256";

export default {
  computed: {
    Lock() {
      return Lock
    },
    el() {
      return el
    }
  },
  data() {
    return {
      ShowTransaction: false,
      InputPassordVisible :false,
      activeTab: 'tab1',
      transferInfo:{
        cardId:'',
        password:'',
        transactionAmount:0.0,
        moneyGoes:'',
        transactionTime: '',
        transactionId: '',
      }

    };
  },
  methods:{
    confirmTransfer(){
      if(this.transferInfo.cardId === this.transferInfo.moneyGoes){
        ElMessage.error("转入方和转出方不能是同一张卡号！")
      }else if(this.transferInfo.transactionAmount <= 0){
        ElMessage.error("转账金额必须大于0！")
      }else{
        axios.post("/cashier/transfer",
            {
              cardId:this.transferInfo.cardId,
              password:SHA256(this.transferInfo.password).toString(),
              transactionAmount:this.transferInfo.transactionAmount,
              moneyGoes:this.transferInfo.moneyGoes
            }).then(response=>{
          if(response.data.code){
            ElMessage.success("转账成功")
            this.transferInfo.transactionId = response.data.payload.transactionId
            this.transferInfo.transactionTime = response.data.payload.transactionTime
            this.ShowTransaction = true;
            this.InputPassordVisible = false;
            this.transferInfo.password='';
          }
          else ElMessage.error(response.data.message)// 显示消息提醒
        })
      }
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