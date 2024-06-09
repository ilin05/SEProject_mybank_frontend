<template>
  <div class="main">
    <el-container>
      <el-header class="title">
        <div style="margin-top: 12px; display: inline-block;">
          <span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">银行柜台操作系统</span>
          <span style="margin-left :30px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">出纳员：XXX</span>
          <span style="margin-left :15px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">今日办结事项：XXX</span>
        </div >
        <RouterLink to="login">
          <el-button type="primary" style="margin-top: 12px; padding-right: 10px;">
            <span style="font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: normal;">登出</span>
          </el-button>
        </RouterLink>
      </el-header>

      <el-container>
        <el-main class="background_container">
          <div class="title2">
            <span style="margin-left: 5%">
              取款业务办理
            </span>
            <RouterLink to="/menu">
              <span class="history-trail">菜单</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/business">
              <span class="history-trail">业务</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/business/withdraw">
              <span class="history-trail">取款业务</span>
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
              <el-tab-pane label="定期取款" name="tab1">
                <div class="form-row">
                  <div class="form-label">银行卡号:</div>
                  <el-input class="form-input" :placeholder="银行账户ID" clearable v-model="accountIdToWithdrawFixedDeposit" />
                </div>
                <el-button type="primary" @click="queryFixedDeposit">定期查询</el-button>
              </el-tab-pane>
              <el-tab-pane label="活期取款" name="tab2">
                <div class="form-row">
                  <div class="form-label">银行卡号：</div>
                  <el-input class="form-input" :placeholder="银行账户ID" clearable v-model="accountIdToWithdrawDemandDeposit" />
                </div>
                <el-button type="primary" @click="queryDemandDeposit">活期查询</el-button>
              </el-tab-pane>
            </el-tabs>
          </el-card>


          <el-card title="存款" class="deposit_card" v-if="activeTab === 'tab1'">
            <el-table :data="fixedDeposits">
              <el-table-column prop="fixedDepositId" label="定期存款号">
              </el-table-column>
              <el-table-column prop="depositAmount" label="存款金额">
              </el-table-column>
              <el-table-column prop="depositTime" label="存款时间">
              </el-table-column>
              <el-table-column prop="depositType" label="定期存款类型">
              </el-table-column>
              <el-table-column prop="isRenewal" label="是否自动续期">
              </el-table-column>
              <el-table-column label="取款">
                <template #default="scope">
                  <el-button style="align-content: center" type="primary" :icon="CreditCard"
                             @click="this.withdrawFixedDepositVisible=true,
                     this.toWithdrawFixedDepositInfo.fixedDepositId=scope.row.fixedDepositId,
                     this.toWithdrawFixedDepositInfo.accountId=scope.row.accountId"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-card>

          <el-card title="存款" class="deposit_card" v-if="activeTab === 'tab2'">
            <el-table :data="demandDeposit">
              <el-table-column prop="accountId" label="账户ID">
              </el-table-column>
              <el-table-column prop="amount" label="账户活期存款">
              </el-table-column>
              <el-table-column label="取款">
                <template #default="scope">
                  <el-button style="align-content: center" type="primary" :icon="CreditCard"
                             @click="this.withdrawDemandDepositVisible=true,
                     this.toWithDrawDemandDepositInfo.accountId=scope.row.accountId"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-dialog v-model="withdrawFixedDepositVisible"  title="定期取款" align-center>
            <el-form     :label-position="left"
                         label-width="auto">
              <el-form-item label="定期存款号">
                <el-input v-model="toWithdrawFixedDepositInfo.fixedDepositId" disabled></el-input>
              </el-form-item>
              <el-form-item label="账户">
                <el-input v-model="toWithdrawFixedDepositInfo.accountId " disabled></el-input>
              </el-form-item>
              <el-form-item label="取款金额">
                <el-input v-model="toWithdrawFixedDepositInfo.amount" type="number" />
              </el-form-item>
              <el-form-item label="输入密码">
                <el-input type="password" :prefix-icon="Lock" v-model="toWithdrawFixedDepositInfo.password"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="withdrawFixedDepositVisible= false">取消</el-button>
                    <el-button type="primary" @click="ConfirmWithDrawFixedDeposit" :disabled="toWithdrawFixedDepositInfo.amount<=0||toWithdrawFixedDepositInfo.password===''">确定</el-button>
                </span>
            </template>
          </el-dialog>


          <el-dialog v-model="withdrawDemandDepositVisible" title="活期取款" align-center>
            <el-form     :label-position="left"
                         label-width="auto">
              <el-form-item label="账户">
                <el-input v-model="toWithDrawDemandDepositInfo.accountId "  disabled></el-input>
              </el-form-item>
              <el-form-item label="取款金额">
                <el-input v-model="toWithDrawDemandDepositInfo.amount"  type="number"/>
              </el-form-item>
              <el-form-item label="输入密码">
                <el-input type="password" :prefix-icon="Lock"  v-model="toWithDrawDemandDepositInfo.password" ></el-input>
              </el-form-item>


            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="withdrawDemandDepositVisible= false">取消</el-button>
                    <el-button type="primary" @click="ConfirmWithDrawDemandDeposit" :disabled="toWithDrawDemandDepositInfo.amount<=0||toWithDrawDemandDepositInfo.password===''">确定</el-button>
                </span>
            </template>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>



</template>

<script>
import {ElMessage} from "element-plus";
import axios from "axios";
import {CreditCard, Edit, Lock} from "@element-plus/icons-vue";
import {el} from "element-plus/es/locale/index";

export default {
  computed: {
    CreditCard() {
      return CreditCard
    },
    Lock() {
      return Lock
    },
    el() {
      return el
    },
    Edit() {
      return Edit
    }
  },
  data() {
    return {
      activeTab: 'tab1',
      accountIdToWithdrawFixedDeposit:'',
      accountIdToWithdrawDemandDeposit:'',
      toWithdrawFixedDepositInfo:{
        accountId: '',
        password: '',
        fixedDepositId: 0,
        amount: 0.0
      },
      toWithDrawDemandDepositInfo:{
        accountId: '',
        password: '',
        amount: 0.0
      },
      withdrawFixedDepositVisible:false,
      withdrawDemandDepositVisible:false,
      fixedDeposits:[],
      demandDeposit:[],
    };
  },
  methods:{
    queryFixedDeposit(){
      axios.get("cashier/fixedDeposit",{params:{
          accountId:this.accountIdToWithdrawFixedDeposit
        }
      })
          .then(
              response => {
                this.fixedDeposits=[];
                if(response.data.code == 0){
                  ElMessage.error(response.data.message);
                }
                let fixedDeposits = response.data.payload;
                fixedDeposits.forEach(item => {this.fixedDeposits.push(item);})
              })
    },
    queryDemandDeposit(){
      axios.get("cashier/accountInfo",{params:{
          accountId:this.accountIdToWithdrawDemandDeposit
        }
      })
          .then(
              response => {
                this.demandDeposit=[];
                if(response.data.code == 0){
                  ElMessage.error(response.data.message);
                }
                let accountInfo = response.data.payload;
                let demandDeposit={
                  accountId:'',
                  amount:0.0
                }
                demandDeposit.accountId=accountInfo.accountId;
                demandDeposit.amount=accountInfo.balance;
                console.log(demandDeposit)
                this.demandDeposit.push(demandDeposit)
              })
    },
    ConfirmWithDrawFixedDeposit(){
      axios.post("/cashier/withdrawFixed",
          {
            accountId: this.toWithdrawFixedDepositInfo.accountId,
            password: this.toWithdrawFixedDepositInfo.password,
            fixedDepositId:this.toWithdrawFixedDepositInfo.fixedDepositId,
            amount: +this.toWithdrawFixedDepositInfo.amount
          }).then(response=>{
        if(response.data.code)
          ElMessage.success("取款成功")
        else ElMessage.error(response.data.message)// 显示消息提醒
        this.withdrawFixedDepositVisible = false // 将对话框设置为不可见
        this.queryFixedDeposit() // 重新查询借书证以刷新页面
      })
    },
    ConfirmWithDrawDemandDeposit(){
      axios.post("/cashier/withdrawDemand",
          {
            accountId: this.toWithDrawDemandDepositInfo.accountId,
            password: this.toWithDrawDemandDepositInfo.password,
            amount: +this.toWithDrawDemandDepositInfo.amount
          }).then(response=>{
        if(response.data.code)
          ElMessage.success("取款成功")
        else ElMessage.error(response.data.message)// 显示消息提醒
        this.withdrawDemandDepositVisible = false // 将对话框设置为不可见
        this.queryDemandDeposit() // 重新查询借书证以刷新页面
      })
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