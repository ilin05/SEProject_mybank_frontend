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
              查询客户信息
            </span>
            <RouterLink to="/menu">
              <span class="history-trail">菜单</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/customer">
              <span class="history-trail">客户</span>
            </RouterLink>
          </div>
        </el-main>
      </el-container>

      <el-container>
        <el-card class="deposit_card">

          <el-form     label-position="left"
                       label-width="auto">
            <el-form-item label="身份证号">
              <el-input  v-model="idNumberToQuery"></el-input>
            </el-form-item>
            <el-form-item label="姓名" >
              <el-input v-model="customerInfo.customerName" disabled></el-input>
            </el-form-item>
            <el-form-item label="电话号" >
              <el-input  v-model="customerInfo.phoneNumber" disabled></el-input>
            </el-form-item>
            <el-form-item label="地址" >
              <el-input  v-model="customerInfo.address" disabled></el-input>
            </el-form-item>
            <el-form-item label="资产" >
              <el-input  v-model="customerInfo.assets" disabled></el-input>
            </el-form-item>
            <el-form-item label="信用额度" >
              <el-input  v-model="customerInfo.creditLine" disabled></el-input>
            </el-form-item>
            <el-form-item label="网银开户状态" >
              <el-text>{{this.customerInfo.internetBankOpen?"一开":"未开"}}</el-text>
            </el-form-item>
            <el-form-item label="名下储蓄账户卡号" >
              <el-button type="primary" @click="queryCustomerinfo" style="margin-left: auto">查询</el-button>
              <el-button type="primary" @click="this.modifyCustomerInfoVisible=true" style="margin-right: 0" :disabled="this.modifyDisabled===true">修改</el-button>
            </el-form-item>



          </el-form>
          <ul class="infinite-list" style="overflow: auto">
            <li v-for="(item, index) in accountIds" :key="index" class="infinite-list-item">{{item}}</li>
          </ul>
        </el-card>
        <el-dialog v-model="modifyCustomerInfoVisible"  title="修改客户信息" align-center>
          <el-form     :label-position="left"
                       label-width="auto">
            <el-form-item label="身份证号">
              <el-input v-model="toModifyCustomerInfo.idNumber" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="toModifyCustomerInfo.customerName "></el-input>
            </el-form-item>
            <el-form-item label="电话号">
              <el-input v-model="toModifyCustomerInfo.phoneNumber" />
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="toModifyCustomerInfo.address"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
                <span class="dialog-footer">
                    <el-button @click="modifyCustomerInfoVisible= false">取消</el-button>
                    <el-button type="primary" @click="modifyCustomerInfo">确定</el-button>
                </span>
          </template>
        </el-dialog>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      activeTab: 'tab1',
      modifyDisabled:true,
      idNumberToQuery:'',
      customerInfo:{
        customerName:'',
        phoneNumber:'',
        address:'',
        creditLine:0.0,
        assets:0.0,
        internetBankOpen:false
      },
      accountIds:[],
      toModifyCustomerInfo:{
        customerName:'',
        phoneNumber:'',
        address:'',
        idNumber:''
      },
      modifyCustomerInfoVisible:false
    }
  },
  methods:{
    queryCustomerinfo(){
      axios.get("cashier/customerInfo",{params:{
          idNumber:this.idNumberToQuery
        }
      })
          .then(
              response => {
                this.accountIds=[]
                this.customerInfo={}
                if(response.data.code == 0){
                  ElMessage.error("查询失败");
                }
                let customerInfo = response.data.payload.customerInfo;
                let accountIdList= response.data.payload.accountIdList;
                this.toModifyCustomerInfo.idNumber=this.idNumberToQuery;
                this.toModifyCustomerInfo.address=this.customerInfo.address=customerInfo.address;
                this.toModifyCustomerInfo.customerName=this.customerInfo.customerName=customerInfo.customerName;
                this.toModifyCustomerInfo.phoneNumber=this.customerInfo.phoneNumber=customerInfo.phoneNumber;
                this.customerInfo.creditLine=customerInfo.creditLine;
                this.customerInfo.assets=customerInfo.assets;
                this.customerInfo.internetBankOpen=customerInfo.internetBankOpen;
                accountIdList.forEach(item=>{
                  this.accountIds.push(item);
                })
              this.modifyDisabled=false;

              })
    },
    modifyCustomerInfo(){
      axios.post("/cashier/customerInfo",
          {
            idNumber:this.toModifyCustomerInfo.idNumber,
            customerName:this.toModifyCustomerInfo.customerName,
            phoneNumber:this.toModifyCustomerInfo.phoneNumber,
            address:this.toModifyCustomerInfo.address,
          }).then(response=>{
        if(response.data.code)
          ElMessage.success("修改成功")
        else ElMessage.error(response.data.message)// 显示消息提醒
        this.modifyCustomerInfoVisible=false;
        this.queryCustomerinfo();
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
  width: 80%;
}
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
  border-radius: 10px;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
/* 其他样式可以根据需要添加 */
</style>