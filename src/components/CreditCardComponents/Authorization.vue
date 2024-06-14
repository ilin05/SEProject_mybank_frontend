<template>
    <div class="main">
      <el-container>
        <el-header class="title">
          <div style="margin-top: 12px; display: inline-block;">
            <el-button class="functionBox" color="rgb(17, 71, 117)">
              <span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">
                审查员操作系统
              </span>
            </el-button>
            <span style="margin-left: 30px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">
              管理员您好!
            </span>
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
              <span style="margin-left: 5%">审查员权限管理</span>
              <RouterLink to="/adminmenu">
                <span class="history-trail">菜单</span>
              </RouterLink>
              <span class="history-trail"> > </span>
              <RouterLink to="/authorization">
                <span class="history-trail">审查员权限管理</span>
              </RouterLink>
            </div>
          </el-main>
        </el-container>
  
        <el-container>
          <el-main>
            <el-card title="审查员管理" class="management_card">
              <el-tabs v-model="activeTab" type="border-card">
                <el-tab-pane label="添加审查员" name="addAuditor">
                  <div v-for="(item, index) in formItems" :key="index" class="form-row">
                    <div class="form-label">{{ item.label }}</div>
                    <el-input
                      v-model="formValues2[item.label]"
                      class="form-input"
                      :placeholder="item.placeholder"
                      clearable
                    />
                  </div>
                  <el-button type="primary" @click="addAuditor">确认添加</el-button>
                </el-tab-pane>
                <el-tab-pane label="管理审查员权限" name="manageAuditor">
                  <el-button type="primary" @click="fetchAuditors" style="margin-bottom: 20px;">
                    刷新
                  </el-button>
                  <el-table :data="auditorData" style="width: 100%">
                    <el-table-column prop="name" label="审查员姓名"></el-table-column>
                    <el-table-column prop="auditorId" label="审查员ID"></el-table-column>
                    <el-table-column prop="auth" label="权限"></el-table-column>
                    <el-table-column label="操作">
                      <template #default="scope">
                        <el-button type="success" @click="grantPermission(scope.row)">授权</el-button>
                        <el-button type="danger" @click="revokePermission(scope.row)">撤销</el-button>
                        <el-button type="warning" @click="deleteAuditor(scope.row)">删除</el-button>
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
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  import router from "@/router/index.js";
  
  export default {
    data() {
      return {
        activeTab: 'addAuditor',
        formItems: [
          { label: '审查员姓名', placeholder: '请输入姓名' },
          { label: '电话', placeholder: '请输入电话' },
          { label: '密码', placeholder: '请输入密码' }
        ],
        formValues: {
          name:'',
          password:'',
          phone:'',
          auth:''
        },
        formValues2:{
          
        },
        auditorData: []
      };
    },
    created() {
      this.fetchAuditors();
    },
    methods: {
      fetchAuditors() {
       
        axios.get('/api/administrator/auditors')
          .then(response => {
            console.log(response);
            this.auditorData = response.data.data;
            ElMessage.success('数据刷新成功');
          })
          .catch(error => { 
            ElMessage.success('刷新');
            ElMessage.error('获取审查员数据失败');
            console.error('获取审查员数据时出错:', error);
          });
      },
      addAuditor() {
        this.formValues.name = this.formValues2['审查员姓名'];
        this.formValues.password = this.formValues2['密码'];
        this.formValues.phone = this.formValues2['电话'];
        this.formValues.auth = "REVIEW_APPLICATIONS";
        if (this.formValues.phone.length !== 11) {
          ElMessage.error('请输入有效电话')
          return
        }
        axios.post('/api/administrator/add-auditor', this.formValues)
          .then(response => {
            if (response.data.success)
              ElMessage.success('审查员添加成功');
            else 
              ElMessage.error('审查员添加失败');
            this.fetchAuditors();  // 刷新数据
          })
          .catch(error => {
            console.log(this.formValues);
            ElMessage.error('添加审查员失败');
            console.error('添加审查员时出错:', error);
          });
      },
      grantPermission(row) {
        axios.put('/api/administrator/grant-permission/'+row.auditorId, {auth: "REVIEW_APPLICATIONS"})
          .then(response => {
            ElMessage.success('权限授权成功');
            this.fetchAuditors();  // 刷新数据
          })
          .catch(error => {
            ElMessage.error('权限授权失败');
            console.error('授权权限时出错:', error);
          });
      },
      revokePermission(row) {
        axios.put('/api/administrator/revoke-permission/'+row.auditorId, {auth: "REVIEW_APPLICATIONS"})
          .then(response => {
            ElMessage.success('权限撤销成功');
            this.fetchAuditors();  // 刷新数据
          })
          .catch(error => {
            ElMessage.error('权限撤销失败');
            console.error('撤销权限时出错:', error);
          });
      },
      deleteAuditor(row) {
        axios.delete('/api/administrator/delete-auditor/'+row.auditorId, { authority: 'REVIEW_APPLICATIONS' })
          .then(response => {
            ElMessage.success('审查员删除成功');
            this.fetchAuditors();  // 刷新数据
          })
          .catch(error => {
            ElMessage.error('删除审查员失败');
            console.error('删除审查员时出错:', error);
          });
      },
      LogOut(){
        sessionStorage.clear()
        router.push('/login')
      }
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
    width: 120px;
    font-weight: bold;
  }
  
  .form-input {
    flex: 1;
    margin-left: 10px;
  }
  
  .management_card {
    background-color: rgba(255, 255, 255, 0.7);
    margin: auto;
    padding: 20px;
    border-radius: 10px;
  }

  </style>
  