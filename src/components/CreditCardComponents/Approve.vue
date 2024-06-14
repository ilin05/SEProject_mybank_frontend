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
            <span style="margin-left: 5%">申请审批</span>
            <span class="history-trail">菜单 > 申请审批</span>
          </div>
        </el-main>
      </el-container>

      <el-container>
        <el-aside class="aside" style="display: flex; color:#0f184d">
          <el-menu active-text-color="#ffd04b" background-color="rgb(17, 71, 117)" default-active="1" text-color="#fff"
                   style="height:100%; width: 100%;" :router="true">
            <!--TODO-->
            <el-menu-item index="">
              <el-icon>
                <EditPen/>
              </el-icon>
              <span>审核申请</span>
            </el-menu-item>
            <!--TODO-->
            <el-menu-item index="/checkapprove">
              <el-icon>
                <Document/>
              </el-icon>
              <span>审核记录</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <el-card title="申请记录审批" class="deposit_card">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="customerId" label="申请人ID"></el-table-column>
              <!--TODO 列出申请者信息-->
              <el-table-column prop="limit" label="信用卡额度"></el-table-column>
              <el-table-column prop="cardId" label="信用卡卡号"></el-table-column>
              <el-table-column prop="time" label="申请日期"></el-table-column>
              <el-table-column prop="comment" label="备注"></el-table-column>
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button type="success" @click="approve(scope.row)">同意</el-button>
                  <el-button type="danger" @click="reject(scope.row)">拒绝</el-button>
                </template>
              </el-table-column>
            </el-table>
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
import moment from "moment";
import {Document, EditPen} from "@element-plus/icons-vue";
import router from "@/router/index.js";

export default {
  components: {Document, EditPen},
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.refreshData();
  },
  methods: {
    getCurrentTime() {
      return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    },
    approve(row) {
      let review = {
        // auditorId: app.globalData.userId
        auditorId: localStorage.getItem('auditorId'),
        applId: row.applId,
        approved: true,
        time: this.getCurrentTime()
      }
      axios.put('/api/application/review',review)
          .then(response => {
            // console.log(response)
            if (response.data.success) {
              ElMessage.success("操作成功");
            } else {
              ElMessage.error("无审核权限");
            }
            this.refreshData();  // 刷新数据
          })
          .catch(error => {
            ElMessage.error("审批失败");
            // console.error('审批通过时出错:', error);
          });
    },
    reject(row) {
      let review = {
        // auditorId: app.globalData.userId,
        auditorId: localStorage.getItem('auditorId'),
        applId: row.applId,
        approved: false,
        time: this.getCurrentTime()
      }
      axios.put('/api/application/review', review)
          .then(response => {
             console.log(response)
            if (response.data.success) {
              ElMessage.success("操作成功");
            } else {
              ElMessage.error("无审核权限");
            }
            this.refreshData();  // 刷新数据
          })
          .catch(error => {
            ElMessage.error("审批失败");
            // console.error('审批拒绝时出错:', error);
          });
    },
    refreshData() {
      axios.get('/api/application')
          .then(response => {
            this.tableData = response.data.data;
            ElMessage.success("数据成功刷新");
          })
          .catch(error => {
            ElMessage.error("刷新数据时出错");
            // console.error('刷新数据时出错:', error);
          });
      // console.log('刷新数据');
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

.refresh {
  display: flex;
  justify-content: flex-start;
  padding: 20px;
}

.deposit_card {
  background-color: rgba(255, 255, 255, 0.7);
  margin: auto;
  padding: 20px;
  border-radius: 10px;
}
</style>
