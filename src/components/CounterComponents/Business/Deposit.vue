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
          <el-button type="primary" style="margin-top: 12px; padding-right: 10px;">
            <span style="font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: normal;">登出</span>
          </el-button>
        </RouterLink>
      </el-header>

      <el-container>
        <el-main class="background_container">
          <div class="title2">
            <span style="margin-left: 5%">
              存款业务办理
            </span>
            <RouterLink to="/menu">
              <span class="history-trail">菜单</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/business">
              <span class="history-trail">业务</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/business/deposit">
              <span class="history-trail">存款业务</span>
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
          <el-card title="存款" class="deposit_card">
            <el-tabs v-model="activeTab" type="border-card">
              <el-tab-pane label="卡号存款" name="tab1">
                <el-form-item label="活期/定期">
                  <el-select v-model="depositType" placeholder="选择存款类型">
                    <el-option label="定期存款" value="fixed"></el-option>
                    <el-option label="活期存款" value="demand"></el-option>
                  </el-select>
                </el-form-item>
                <el-form v-if="depositType==='fixed'"
                         label-position="left"
                         label-width="auto">
                  <el-form-item label="银行卡号">
                    <el-input  v-model="fixedDepositInfoForCard.accountId"></el-input>
                  </el-form-item>
                  <el-form-item label="存款金额">
                    <el-input v-model="fixedDepositInfoForCard.amount" type="number"></el-input>
                  </el-form-item>
                  <el-form-item label="定期存款类型">
                    <el-select v-model="fixedDepositInfoForCard.fixedDepositType">
                      <el-option v-for="depositType in fixedDepositTypes "  :value="depositType.depositType"> 定期存款类型 ：{{depositType.depositType}}；定期存款期限：{{depositType.depositDuration+" "}}月；定期存款利率：{{depositType.depositRate}}</el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="输入密码">
                    <el-input type="password" :prefix-icon="Lock" v-model="fixedDepositInfoForCard.password"></el-input>
                  </el-form-item>
                  <el-button type="primary" @click="newFixedDeposit(this.fixedDepositInfoForCard.accountId,this.fixedDepositInfoForCard.password,this.fixedDepositInfoForCard.fixedDepositType,this.fixedDepositInfoForCard.amount)" :disabled="this.fixedDepositInfoForCard.amount<=0||this.fixedDepositInfoForCard.accountId===''||this.fixedDepositInfoForCard.password===''||this.fixedDepositInfoForCard.fixedDepositType===''">确认</el-button>
                </el-form>
                <el-form v-if="depositType==='demand'"
                         label-position="left"
                         label-width="auto">
                  <el-form-item label="银行卡号">
                    <el-input  v-model="demandDepositInfoForCard.accountId"></el-input>
                  </el-form-item>
                  <el-form-item label="存款金额">
                    <el-input v-model="demandDepositInfoForCard.amount" type="number"></el-input>
                  </el-form-item>
                  <el-form-item label="输入密码">
                    <el-input type="password" :prefix-icon="Lock" v-model="demandDepositInfoForCard.password"></el-input>
                  </el-form-item>
                  <el-button type="primary" @click="newDemandDeposit(this.demandDepositInfoForCard.accountId,this.demandDepositInfoForCard.password,this.demandDepositInfoForCard.amount)" :disabled="this.demandDepositInfoForCard.amount<=0||this.demandDepositInfoForCard.accountId===''||this.demandDepositInfoForCard.password===''">确认</el-button>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="存折存款" name="tab2">
                <el-form-item label="活期/定期">
                  <el-select v-model="depositType" placeholder="选择存款类型">
                    <el-option label="定期存款" value="fixed"></el-option>
                    <el-option label="活期存款" value="demand"></el-option>
                  </el-select>
                </el-form-item>
                <el-form v-if="depositType==='fixed'"
                         label-position="left"
                         label-width="auto">
                  <el-form-item label="存折号">
                    <el-input  v-model="fixedDepositInfoForBook.accountId"></el-input>
                  </el-form-item>
                  <el-form-item label="存款金额">
                    <el-input v-model="fixedDepositInfoForBook.amount" type="number"></el-input>
                  </el-form-item>
                  <el-form-item label="定期存款类型">
                    <el-select v-model="fixedDepositInfoForBook.fixedDepositType">
                      <el-option v-for="depositType in fixedDepositTypes "  :value="depositType.depositType"> 定期存款类型 ：{{depositType.depositType}}；定期存款期限：{{depositType.depositDuration+" "}}月；定期存款利率：{{depositType.depositRate}}</el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="输入密码">
                    <el-input type="password" :prefix-icon="Lock" v-model="fixedDepositInfoForBook.password"></el-input>
                  </el-form-item>
                  <el-button type="primary"  @click="newFixedDeposit(this.fixedDepositInfoForBook.accountId,this.fixedDepositInfoForBook.password,this.fixedDepositInfoForBook.fixedDepositType,this.fixedDepositInfoForBook.amount)"  :disabled="this.fixedDepositInfoForBook.amount<=0||this.fixedDepositInfoForBook.accountId===''||this.fixedDepositInfoForBook.password===''||this.fixedDepositInfoForBook.fixedDepositType===''">确认</el-button>
                </el-form>
                <el-form v-if="depositType==='demand'"
                         label-position="left"
                         label-width="auto">
                  <el-form-item label="存折号">
                    <el-input  v-model="demandDepositInfoForBook.accountId"></el-input>
                  </el-form-item>
                  <el-form-item label="存款金额">
                    <el-input v-model="demandDepositInfoForBook.amount" type="number"></el-input>
                  </el-form-item>
                  <el-form-item label="输入密码">
                    <el-input type="password" :prefix-icon="Lock" v-model="demandDepositInfoForBook.password"></el-input>
                  </el-form-item>
                  <el-button type="primary" @click="newDemandDeposit(this.demandDepositInfoForBook.accountId,this.demandDepositInfoForBook.password,this.demandDepositInfoForBook.amount)" :disabled="this.demandDepositInfoForBook.amount<=0||this.demandDepositInfoForBook.accountId===''||this.demandDepositInfoForBook.password===''">确认</el-button>
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
import {Lock} from "@element-plus/icons-vue";
import {el} from "element-plus/es/locale/index";
import {ElMessage} from "element-plus";
import axios from "axios";

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
      activeTab: 'tab1',
      depositType:'fixed',//demand
      fixedDepositInfoForCard:{
        accountId:'',
        fixedDepositType:'',
        amount:0.0,
        password:''
      },
      fixedDepositInfoForBook:{
        accountId:'',
        fixedDepositType:'',
        amount:0.0,
        password:''
      },
      demandDepositInfoForCard:{
        accountId:'',
        amount:0.0,
        password:''
      },
      demandDepositInfoForBook:{
        accountId:'',
        amount:0.0,
        password:''
      },
      fixedDepositTypes:[{
        depositType:'',
        depositDuration:0,
        depositRate:0.0
      }]

    };
  },
  methods:{
    queryfixedDepositTypes(){
      axios.get("cashier/fixedDepositType")
          .then(response=>{
            this.fiixedDepositTypes =[]
            if(response.data.code){
              let fixedDepositTypes=response.data.payload;
              fixedDepositTypes.forEach(item => {this.fixedDepositTypes.push(item);})
              console.log(this.fixedDepositTypes);
            }
            else ElMessage.error(response.data.message)

          })
    },
    newFixedDeposit(accountId,password,depositType,amount){
      axios.post("/cashier/fixedDeposit",
          {
            accountId: accountId,
            password: password,
            depositType:depositType,
            amount:amount
          }).then(response=>{
        if(response.data.code)
          ElMessage.success("定期存款成功")
        else ElMessage.error(response.data.message)// 显示消息提醒
      })
    },
    newDemandDeposit(accountId,password,amount){
      axios.post("/cashier/demandDeposit",
          {
            accountId: accountId,
            password: password,
            amount:amount
          }).then(response=>{
        if(response.data.code)
          ElMessage.success("活期存款成功")
        else ElMessage.error(response.data.message)// 显示消息提醒
      })
    }
  },
  mounted() {
    this.fixedDepositTypes=[];
    this.queryfixedDepositTypes();
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