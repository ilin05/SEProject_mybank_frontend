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
              出纳员管理
            </span>
            <RouterLink to="/adminmenu">
              <span class="history-trail">菜单</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/cashier">
              <span class="history-trail">出纳员管理</span>
            </RouterLink>
          </div>
        </el-main>
        <el-button type = "primary" @click="addCashierVisible = true" style="margin-top: 2%">
          <span >添加出纳员</span>
        </el-button>
      </el-container>

      <el-container>
        <el-card title="出纳员管理" class="cashier_table" >
          <el-table :data="cashierList">
            <el-table-column prop="cashierId" label="工号">
            </el-table-column>
            <el-table-column prop="cashierName" label="姓名">
            </el-table-column>
            <el-table-column prop="phoneNumber" label="手机号码">
            </el-table-column>
            <el-table-column prop="privilege" label="权限">
            </el-table-column>
            <el-table-column  label="点击修改信息或删除">
              <template v-slot ="scope">
                <el-button type="normal" v-model="modifyCashierVisible" @click = "this.modifyCashierInfo.cashierId = scope.row.cashierId, this.modifyCashierInfo.cashierName = scope.row.cashierName,
        this.modifyCashierInfo.idNumber = scope.row.idNumber, this.modifyCashierInfo.phoneNumber = scope.row.phoneNumber, this.modifyCashierInfo.address = scope.row.address,
        this.modifyCashierInfo.privilege = scope.row.privilege,
        modifyCashierVisible = true">修改</el-button>

                <el-button type="danger" v-model="deleteCashierVisible" @click = "this.deleteCashierInfo.cashierId = scope.row.cashierId, this.deleteCashierInfo.cashierName = scope.row.cashierName,
        this.deleteCashierInfo.idNumber = scope.row.idNumber, this.deleteCashierInfo.phoneNumber = scope.row.phoneNumber, this.deleteCashierInfo.address = scope.row.address,
        this.deleteCashierInfo.privilege = scope.row.privilege,
        deleteCashierVisible = true">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-container>
    </el-container>

    <el-dialog v-model="addCashierVisible" title="添加出纳员">
      <el-form
          :label-position="left"
          label-width="auto"
          :model="formItems1"
          style="max-width: 600px"
      >
        <el-form-item label="姓名">
          <el-input v-model="formItems1.cashierName" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="formItems1.idNumber" placeholder="请输入身份证号"/>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="formItems1.phoneNumber" placeholder="请输入电话号码"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formItems1.address" placeholder="请输入地址"/>
        </el-form-item>
        <el-form-item label="出纳员权限">
          <br>
          <el-select v-model="formItems1.privilege" placeholder="请选择权限">
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addCashierVisible = false">取消</el-button>
                    <el-button type="primary" @click="ConfirmAddCashier">
                        确认
                    </el-button>
                </span>
      </template>
    </el-dialog>

    <el-dialog v-model="deleteCashierVisible" title="删除出纳员">
      <span style="font-weight: bold;">请确认删除出纳员信息:</span>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">工号：</span>{{ deleteCashierInfo.cashierId }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">姓名：</span>{{ deleteCashierInfo.cashierName }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">身份证号：</span>{{ deleteCashierInfo.idNumber }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">手机号码：</span>{{ deleteCashierInfo.phoneNumber }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">地址：</span>{{ deleteCashierInfo.address }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">权限：</span>{{ deleteCashierInfo.privilege }}</p>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="deleteCashierVisible = false">取消</el-button>
                    <el-button type="danger" @click="ConfirmDeleteCashier">
                        删除
                    </el-button>
                </span>
      </template>
    </el-dialog>

    <el-dialog v-model="modifyCashierVisible" title="修改出纳员信息">
      <el-form
          :label-position="left"
          label-width="auto"
          :model="modifyCashierInfo"
          style="max-width: 600px"
      >
        <el-form-item label="姓名">
          <el-input v-model="modifyCashierInfo.cashierName" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="modifyCashierInfo.idNumber" placeholder="请输入身份证号"/>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="modifyCashierInfo.phoneNumber" placeholder="请输入电话号码"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="modifyCashierInfo.address" placeholder="请输入地址"/>
        </el-form-item>
        <el-form-item label="出纳员权限">
          <br>
          <el-select v-model= "modifyCashierInfo.privilege" placeholder="请选择权限">
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="modifyCashierVisible = false">取消</el-button>
                    <el-button type="primary" @click="ConfirmModifyCashier">
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
      addCashierVisible : false,
      modifyCashierVisible :false,
      deleteCashierVisible : false,
      formItems1 :{
        cashierName :'',
        idNumber : '',
        phoneNumber :'',
        address : '',
        password : '',
        privilege : '',
      },
      modifyCashierInfo :{
        cashierId : 0,
        cashierName :'',
        idNumber : '',
        phoneNumber :'',
        address : '',
        password : '',
        privilege : '',
      },
      deleteCashierInfo :{
        cashierId : 0,
        cashierName :'',
        idNumber : '',
        phoneNumber :'',
        address : '',
        password : '',
        privilege : '',
      },

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
    ConfirmAddCashier() {
      axios.post("/admin/cashier", {
        cashierName: this.formItems1.cashierName,
        idNumber: this.formItems1.idNumber,
        phoneNumber: this.formItems1.phoneNumber,
        address: this.formItems1.address,
        privilege: this.formItems1.privilege,
      })
          .then(response => {
            console.log(response.data)
            if (response.data.code === 1) {
              ElMessage.success(response.data);
              this.addCashierVisible = false;
              this.QueryCashier();
            } else {
              ElMessage.error("添加失败");
            }
          })
          .catch(error => {
            ElMessage.error("添加失败");
          })
    },

    ConfirmModifyCashier() {
      axios.put("/admin/cashier", {
        cashierId : this.modifyCashierInfo.cashierId,
        cashierName: this.modifyCashierInfo.cashierName,
        idNumber: this.modifyCashierInfo.idNumber,
        phoneNumber: this.modifyCashierInfo.phoneNumber,
        address: this.modifyCashierInfo.address,
        privilege: this.modifyCashierInfo.privilege,
      })
          .then(response => {
            console.log(response.data)
            if (response.data.code === 1) {
              ElMessage.success(response.data);
              this.modifyCashierVisible = false;
              this.QueryCashier();
            } else {
              ElMessage.error("修改失败");
            }
          })
          .catch(error => {
            ElMessage.error("修改失败");
          })
    },

    ConfirmDeleteCashier() {

      axios.delete("/admin/cashier", { params:{
          cashierId : this.deleteCashierInfo.cashierId,

        }
      })
          .then(response => {
            console.log(response.data)
            if (response.data.code === 1) {
              ElMessage.success(response.data);
              this.modifyCashierVisible = false;
              this.QueryCashier();
            } else {
              ElMessage.error("修改失败");
            }
          })
          .catch(error => {
            ElMessage.error("修改失败");
          })
    },

    QueryCashier() {
      axios.get("/admin/cashier")
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
  },
  mounted() {
    this.QueryCashier();
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