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
              <el-tab-pane label="账号存款" name="tab1">
                <el-form-item label="活期/定期">
                  <el-select v-model="depositType" placeholder="选择存款类型">
                    <el-option label="定期存款" value="fixed"></el-option>
                    <el-option label="活期存款" value="demand"></el-option>
                  </el-select>
                </el-form-item>
                <el-form v-if="depositType==='fixed'"
                         label-position="left"
                         label-width="auto">
                  <el-form-item label="银行账号">
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
                  <el-form-item label="是否自动续期">
                    <el-select v-model="fixedDepositInfoForCard.isRenewal">
                      <el-option label = "是" value = "true"></el-option>
                      <el-option label = "否" value = "false"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-button type="primary" @click="CardInputPassordVisible = true" :disabled="this.fixedDepositInfoForCard.amount<=0||this.fixedDepositInfoForCard.accountId===''||this.fixedDepositInfoForCard.fixedDepositType===''">确认</el-button>
                </el-form>
                <el-form v-if="depositType==='demand'"
                         label-position="left"
                         label-width="auto">
                  <el-form-item label="银行账号">
                    <el-input  v-model="demandDepositInfoForCard.accountId"></el-input>
                  </el-form-item>
                  <el-form-item label="存款金额">
                    <el-input v-model="demandDepositInfoForCard.amount" type="number"></el-input>
                  </el-form-item>
<!--                  <el-form-item label="输入密码">-->
<!--                    <el-input type="password" :prefix-icon="Lock" v-model="demandDepositInfoForCard.password"></el-input>-->
<!--                  </el-form-item>-->
                  <el-button type="primary" @click="DemandInputPassordVisible=true" :disabled="this.demandDepositInfoForCard.amount<=0||this.demandDepositInfoForCard.accountId===''">确认</el-button>
                </el-form>
              </el-tab-pane>

            </el-tabs>

            <el-dialog v-model="ShowDemandDeposit" title="活期存款信息" width="40%" align-center>
              <el-form
                  label-width="auto"
                  style="max-width: 600px"
              >
                <el-form-item label = "流水号">{{demandDepositInfoForCard.transactionId}}</el-form-item>
                <el-form-item label = "银行卡号">{{demandDepositInfoForCard.accountId}}</el-form-item>
                <el-form-item label = "存款金额">{{demandDepositInfoForCard.amount}}</el-form-item>
                <el-form-item label = "存款类型">活期存款</el-form-item>
                <el-form-item label = "存款时间">{{demandDepositInfoForCard.demandDepositTime}}</el-form-item>
                <span>
                  <el-button @click="this.ShowDemandDeposit=false">确定</el-button>
                </span>
              </el-form>
            </el-dialog>

            <el-dialog v-model="ShowFixedDeposit" title="定期存款信息" width="40%" align-center>
              <el-form
                  label-width="auto"
                  style="max-width: 600px"
              >
                <el-form-item label = "存款序列号">{{fixedDepositInfoForCard.fixedDepositId}}</el-form-item>
                <el-form-item label = "银行卡号">{{fixedDepositInfoForCard.accountId}}</el-form-item>
                <el-form-item label = "存款金额">{{fixedDepositInfoForCard.amount}}</el-form-item>
                <el-form-item label = "定期存款类型">{{fixedDepositInfoForCard.fixedDepositType}}</el-form-item>
                <el-form-item label = "存款时间">{{fixedDepositInfoForCard.fixedDepositTime}}</el-form-item>
                <span>
                  <el-button @click="this.ShowFixedDeposit=false">确定</el-button>
                </span>
              </el-form>
            </el-dialog>

            <el-dialog v-model="CardInputPassordVisible" title="输入密码验证" width="40%" align-center>
              <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
                密码：
                <el-input type="password" :prefix-icon="Lock" v-model="fixedDepositInfoForCard.password" style="width: 12.5vw;" clearable></el-input>
<!--                <el-input type="password" v-model="formItems1.password" style="width: 12.5vw;" clearable />-->
              </div>
              <template #footer>
                <span>
                  <el-button @click="this.CardInputPassordVisible=false">取消</el-button>
                  <el-button type="primary" @click="newFixedDeposit(this.fixedDepositInfoForCard.accountId,this.fixedDepositInfoForCard.password,this.fixedDepositInfoForCard.fixedDepositType,this.fixedDepositInfoForCard.amount,this.fixedDepositInfoForCard.isRenewal)" :disabled="this.fixedDepositInfoForCard.amount<=0||this.fixedDepositInfoForCard.accountId===''||this.fixedDepositInfoForCard.password===''||this.fixedDepositInfoForCard.fixedDepositType===''">
                    确定
                  </el-button>
                </span>
              </template>
            </el-dialog>

            <el-dialog v-model="DemandInputPassordVisible" title="输入密码验证" width="40%" align-center>
              <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
                密码：
                <el-input type="password" :prefix-icon="Lock" v-model="demandDepositInfoForCard.password" style="width: 12.5vw;" clearable></el-input>
                <!--                <el-input type="password" v-model="formItems1.password" style="width: 12.5vw;" clearable />-->
              </div>
              <template #footer>
                <span>
                  <el-button @click="this.DemandInputPassordVisible=false">取消</el-button>
                  <el-button type="primary" @click="newDemandDeposit(this.demandDepositInfoForCard.accountId,this.demandDepositInfoForCard.password,this.demandDepositInfoForCard.amount)" :disabled="this.demandDepositInfoForCard.amount<=0||this.demandDepositInfoForCard.accountId===''||this.demandDepositInfoForCard.password===''">
                    确定
                  </el-button>
                </span>
              </template>
            </el-dialog>

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
      activeTab: 'tab1',
      depositType:'fixed',//demand
      ShowFixedDeposit: false,
      ShowDemandDeposit: false,
      CardInputPassordVisible: false,
      DemandInputPassordVisible:false,
      fixedDepositInfoForCard:{
        accountId:'',
        fixedDepositType:'',
        amount:0.0,
        password:'',
        fixedDepositId:'',
        fixedDepositTime:'',
        isRenewal : false,
      },
      fixedDepositInfoForBook:{
        accountId:'',
        fixedDepositType:'',
        amount:0.0,
        password:'',
        isRenewal : false,
      },
      demandDepositInfoForCard:{
        accountId:'',
        amount:0.0,
        password:'',
        transactionId: '',
        demandDepositTime:''
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
    newFixedDeposit(accountId,password,depositType,amount,isRenewal){
      axios.post("/cashier/fixedDeposit",
          {
            accountId: accountId,
            password: SHA256(password).toString(),
            depositType:depositType,
            amount:amount,
            isRenewal : isRenewal,
          }).then(response=>{
        if(response.data.code){
          ElMessage.success("定期存款成功")
          this.fixedDepositInfoForCard.fixedDepositId = response.data.payload.fixedDepositId
          this.fixedDepositInfoForCard.fixedDepositTime = response.data.payload.depositTime
          this.ShowFixedDeposit = true;
          this.CardInputPassordVisible = false;
          this.fixedDepositInfoForCard.password='';
        }
        else ElMessage.error(response.data.message)// 显示消息提醒
      })
    },
    newDemandDeposit(accountId,password,amount){
      axios.post("/cashier/demandDeposit",
          {
            accountId: accountId,
            password: SHA256(password).toString(),
            amount:amount
          }).then(response=>{
        if(response.data.code){
          ElMessage.success("活期存款成功")
          this.demandDepositInfoForCard.transactionId = response.data.payload.transactionId
          this.demandDepositInfoForCard.demandDepositTime = response.data.payload.transactionTime
          this.ShowDemandDeposit = true;
          this.DemandInputPassordVisible = false;
          this.demandDepositInfoForCard.password='';
        }
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