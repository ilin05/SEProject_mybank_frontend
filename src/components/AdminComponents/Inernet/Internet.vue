<template>
  <div class="main">
    <el-container>
      <el-header class="title">
        <div style="margin-top: 12px; display: inline-block;">
          <span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">银行管理员系统</span>
          <span style="margin-left :30px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">管理员：XXX</span>
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
              网银账户管理
            </span>
            <RouterLink to="/adminmenu">
              <span class="history-trail">菜单</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/cashier">
              <span class="history-trail">网银账户管理</span>
            </RouterLink>
          </div>
        </el-main>
      </el-container>

      <el-container>
        <el-card title="网银账户管理" class="cashier_table" >
          <el-table :data="cashierList">
            <el-table-column prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="customerAccountId" label="账号">
            </el-table-column>
            <el-table-column prop="customerId" label="用户ID">
            </el-table-column>
            <el-table-column prop="isInBlackList" label="状态">
            </el-table-column>
            <el-table-column  label="点击修改信息或删除">
              <template v-slot ="scope">
                <el-button type="danger" @click = "this.blockInternetInfo.internetId = scope.row.customerAccountId,
        blockInternetVisible = true" :disabled="scope.row.isInBlackList === true">拉黑</el-button>

                <el-button type="normal" @click = "this.unblockInternetInfo.internetId = scope.row.customerAccountId,
        unblockInternetVisible = true" :disabled="scope.row.isInBlackList === false">恢复</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-container>
    </el-container>

    <el-dialog v-model="blockInternetVisible" title="确认拉黑用户?">
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="blockInternetVisible = false">取消</el-button>
                    <el-button type="primary" @click="ConfirmBlockInternet">
                        确认
                    </el-button>
                </span>
      </template>
    </el-dialog>

    <el-dialog v-model="unblockInternetVisible" title="确认恢复用户?">
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="unblockInternetVisible = false">取消</el-button>
                    <el-button type="primary" @click="ConfirmUnblockInternet">
                        确认
                    </el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";

export default {
  data() {
    return {
      blockInternetVisible: false,
      unblockInternetVisible: false,
      blockInternetInfo:{
        internetId: ''
      },
      unblockInternetInfo:{
        internetId: ''
      },
      internetList:[{
        id: '',
        customerAccountId: '',
        customerId: '',
        isInBlackList: '',
      }],


      cashierList:[{
        cashierId :0,
        cashierName : '1',
        idNumber : '2',
        phoneNumber : '3',
        address : '4',
        privilege :'5',
        password :'',
      }],



    };
  },
  methods: {

    ConfirmUnblockInternet() {
      axios.post("/admin/internet/unblock", {
          internetId: this.unblockInternetInfo.internetId
      })
          .then(response => {
            console.log(response.data)
            if (response.data.code === 1) {
              ElMessage.success(response.data);
              this.QueryInternet();
              this.unblockInternetVisible = false
            } else {
              ElMessage.error("修改失败");
            }
          })
          .catch(error => {
            ElMessage.error("修改失败");
          })
    },

    QueryInternet() {
      console.log("hello")
      axios.get("/admin/internet")
          .then(response => {
            console.log(response.data)
            if (response.data.code === 1) {
              this.cashierList = response.data.payload;
            }
          })
          .catch(error => {
            ElMessage.error("数据获取错误，请联系开发人员");
          })
    },

    ConfirmBlockInternet(){
      console.log(this.blockInternetInfo.internetId)
      axios.post("/admin/internet/block", {
          internetId: this.blockInternetInfo.internetId
      })
          .then(response => {
            console.log(response.data)
            if (response.data.code === 1) {
              ElMessage.success(response.data);
              this.QueryInternet();
              this.blockInternetVisible = false
            } else {
              ElMessage.error("拉黑失败");
            }
          })
          .catch(error => {
            ElMessage.error("修改失败");
          })
    }
  },
  mounted() {
    this.QueryInternet();
  }
}
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

.cashier_table {
  position: absolute;
  top: 20%;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  background-color: #ffffff;
  overflow-y: hidden;
}

.add_cashier_button {
  position: absolute;
  top: 20%;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  background-color: #ffffff;
  overflow-y: hidden;
}

/* 其他样式可以根据需要添加 */
</style>