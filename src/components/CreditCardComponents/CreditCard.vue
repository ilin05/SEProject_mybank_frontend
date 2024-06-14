<template>
  <div class="main">
    <el-container>
      <el-header class="title">
        <div style="margin-top: 12px; display: inline-block;">
          <router-link to='/home/internetmenu'>
            <el-button class="functionBox" router-link="/home/internetmenu" color="rgb(17, 71, 117)">
					<span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">
						用户操作系统
					</span>
            </el-button>
          </router-link>
        </div>
        <el-button type="primary" style="margin-top: 12px; padding-right: 10px;" @click="LogOut">
          <span style="font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: normal;">
            登出
          </span>
        </el-button>
      </el-header>

      <el-container>
        <el-main class="background_container">
          <div class="title2">
            <span style="margin-left: 5%">信用卡申请业务办理</span>
            <span class="history-trail">菜单 > 信用卡申请业务</span>
          </div>
        </el-main>
      </el-container>

      <el-container>
        <el-aside class="aside" style="display: flex; color:#0f184d">
          <el-menu active-text-color="#ffd04b" background-color="rgb(17, 71, 117)" default-active="1" text-color="#fff"
                   style="height:100%; width: 100%;" :router="true">
            <el-menu-item index="creditcard">
              <el-icon>
                <Reading/>
              </el-icon>
              <span>信用卡申请</span>
            </el-menu-item>
            <el-menu-item index="change">
              <el-icon>
                <UserFilled/>
              </el-icon>
              <span>信用卡列表</span>
            </el-menu-item>
            <el-menu-item index="payment">
              <el-icon>
                <CreditCard/>
              </el-icon>
              <span>信用卡支付</span>
            </el-menu-item>
            <el-menu-item index="bill">
              <el-icon>
                <Document/>
              </el-icon>
              <span>消费记录</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <el-card title="申请新卡" class="deposit_card">
            <el-tabs v-model="activeTab" type="border-card">
              <el-tab-pane label="信用卡申请" name="tab1">
                <div v-for="(item, index) in formItems1" :key="index" class="form-row">
                  <div class="form-label">{{ item.label }}</div>
                  <el-input
                      v-model="formValues[item.key]"
                      class="form-input"
                      :placeholder="item.placeholder"
                      clearable
                      :show-password="item.type === 'password'"
                  />
                </div>
                <el-button type="primary" :disabled="!formUnfinished()" @click="submitForm">确认</el-button>
              </el-tab-pane>
              <el-tab-pane label="申请记录">
                <el-table :data="appls" style="width: 100%">
                  <el-table-column prop="limit" label="信用卡额度"></el-table-column>
                  <el-table-column prop="time" label="申请时间"></el-table-column>
                  <el-table-column prop="statusText" label="申请状态"></el-table-column>
                  <el-table-column prop="cardId" label="信用卡卡号"></el-table-column>
                  <el-table-column prop="comment" label="备注"></el-table-column>
                  <el-table-column label="操作">
                    <template #default="scope">
                      <el-button v-if="scope.row.status === 'REVIEWING'" type="danger" @click="cancel(scope.row)">取消
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {ElMessage} from 'element-plus';
import axios from 'axios';
import app from "@/App.vue";
import moment from 'moment';
import {Checked, Delete, Document, Edit, Postcard, Reading, Tickets} from "@element-plus/icons-vue";
import router from "@/router/index.js";

export default {
  components: {Document, Edit, Delete, Checked, Tickets, Postcard, Reading},
  data() {
    return {
      activeTab: 'tab1',
      appls: [],
      formItems1: [
        /*{key: 'name', label: '申请人姓名：', type: 'text'},
        {key: 'id_number', label: '身份证号：', type: 'text'},
        {key: 'phone', label: '电话号码：', type: 'text'},*/
        {key: 'depositId', label: '储蓄卡号：', type: 'text'},
        {key: 'limit', label: '消费金额：', type: 'text'},
        {key: 'password', label: '信用卡密码：', type: 'password'},
        {key: 'comment', label: '备注', placeholder: '可为空', type: 'text'}
      ],
      formValues: {
        name: '',
        id_number: '',
        phone: '',
        depositId: '',
        limit: '',
        password: '',
        comment: ''
      },
      statusMap: {
        'REVIEWING': '审核中',
        'CANCELED': '已取消',
        'APPROVED': '已通过',
        'REJECTED': '已拒绝'
      },
      application: {}
    };
  },
  methods: {
    getCurrentTime() {
      return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    },
    formUnfinished() {
      return this.formValues.name === '' || this.formValues.id_number === '' || this.formValues.phone === ''
          || this.formValues.depositId === '' || this.formValues.limit === '' || this.formValues.password === '';
    },
    checkFormValue() {

      if (this.formValues.limit <= 0) {
        ElMessage.error("消费金额必须大于0");
        return false;
      }
      return true;
    },
    submitForm() {
      console.log(this.formValues)
      if (!this.checkFormValue()) return;

      // this.formValues.customerId = app.globalData.userId;
      this.formValues.customerId = localStorage.getItem("user-id");
      this.formValues.time = this.getCurrentTime();
      axios.post('/api/application/add', this.formValues)
          .then(response => {
            if (response.data.success)
              ElMessage.success("提交成功");
            else
              ElMessage.error("提交失败");

            this.refreshData();
            // console.log('成功提交表单:', response);
          })
          .catch(error => {
            // 处理错误响应
            ElMessage.error('提交表单时出错');
            // console.log('提交表单时出错:', error)
          });
    },
    refreshData() {
      // axios.get('/api/application/history/' + app.globalData.userId)
      axios.get('/api/application/history/' + localStorage.getItem("user-id"))
          .then(response => {
            this.appls = response.data.data;
            this.appls.forEach(appl => {
              appl.statusText = this.statusMap[appl.status];
            })
            // console.log(this.appls)
            ElMessage.success("数据成功刷新");
          })
          .catch(error => {
            ElMessage.error("刷新数据时出错");
            // console.error('刷新数据时出错:', error);
          })
    },
    cancel(row) {
      axios.put('api/application/cancel/' + row.applId)
          .then(response => {
            if (response.data.success)
              ElMessage.success("已取消申请");
            else
              ElMessage.error("操作失败");

            this.refreshData();
            // console.log('成功取消:', response);
          })
          .catch(error => {
            ElMessage.error('操作出现错误');
            // console.log('取消时出错:', error);
          });
    },
    LogOut(){
      sessionStorage.clear()
      router.push('/login')
    }
  },
  mounted() {
    this.refreshData();
  }
};
</script>

<style scoped>
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

.aside {
  min-height: calc(100vh - 60px);
  width: 180px;
  background-color: red;
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
  background: url("../../assets/figure2.jpg");
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
</style>

