
<template>
  <div>
    <div class="main" style="overflow-y: hidden; ">
      <el-container >
        <el-header class="title" style="display: flex; justify-content: space-between;">
          <div style="margin-top: 12px; display: inline-block;">
            <span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">在线银行系统</span>
          </div >
          <RouterLink to="/user/homepage">
            <el-button type="primary" style="margin-top: 12px; padding-right: 10px;" @click="DeleteToken">
              <span style="font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: normal;">登出</span>
            </el-button>
          </RouterLink>
        </el-header>

        <el-container>
          <!-- 侧边栏 -->
          <el-aside class="aside" style="color:#0f184d">
            <el-scrollbar>
              <el-menu active-text-color="#ffd04b" background-color="rgb(17, 71, 117)" default-active="1" text-color="#fff" @select="handleSelect"
                       opacity="0.5" :router="true">
                <el-menu-item index="/home/internetmenu">
                  <span>首页</span>
                </el-menu-item>
                <el-sub-menu index="1">
                  <template #title>
                    <span>个人信息</span>
                  </template>
                  <el-menu-item index="/home/internet/banlance">余额</el-menu-item>
                  <el-menu-item index="/home/internet/transactionHistory">交易历史</el-menu-item>
                  <el-menu-item index="/home/internet/select">储蓄卡查询</el-menu-item>
                  <el-menu-item index="/home/internet/modify">修改网银密码</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="/home/internet/transfer">
                  <span>转账</span>
                </el-menu-item>
                <el-menu-item index="/home/internet/loss">
                  <span>挂失</span>
                </el-menu-item>
                <!-- 贷款子功能 -->
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon><message /></el-icon>贷款
                  </template>
                  <el-menu-item index="/home/loan/application">
                    <el-icon>
                      <Reading />
                    </el-icon>
                    <span>贷款申请</span>
                  </el-menu-item>
                  <el-menu-item index="/home/loan/withdraw">
                    <el-icon>
                      <Postcard />
                    </el-icon>
                    <span>申请结果</span>
                  </el-menu-item>
                  <el-menu-item index="/home/loan/repayment">
                    <el-icon>
                      <Postcard />
                    </el-icon>
                    <span>贷款还款</span>
                  </el-menu-item>
                  <el-menu-item index="/home/loan/history">
                    <el-icon>
                      <Postcard />
                    </el-icon>
                    <span>记录查询</span>
                  </el-menu-item>
                </el-sub-menu>

                <!-- 信用卡子功能 -->
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon><message /></el-icon>信用卡
                  </template>
                  <el-menu-item index="/creditcard/menu">
                    <el-icon>
                      <Postcard />
                    </el-icon>
                    <span>信用卡</span>
                  </el-menu-item>
                </el-sub-menu>

<!--                &lt;!&ndash; 外汇子功能 &ndash;&gt;-->
<!--                <el-sub-menu index="4">-->
<!--                  <template #title>-->
<!--                    <el-icon><message /></el-icon>外汇-->
<!--                  </template>-->
<!--                  <el-menu-item index="4-1">-->
<!--                    <el-icon>-->
<!--                      <Postcard />-->
<!--                    </el-icon>-->
<!--                    <span>外汇</span>-->
<!--                  </el-menu-item>-->
<!--                </el-sub-menu>-->
                <el-menu-item>
                  <span >
                    <el-link style="color: white" href="http://localhost:8000/login.html"><el-icon><message /></el-icon>外汇</el-link>
                  </span>
                </el-menu-item>
              </el-menu>
            </el-scrollbar>
          </el-aside>

          <el-container>
            <!-- 主界面 -->
            <el-main class="background_container" style="display: flex;" :router = "true">
              <RouterView class="main" style=" max-height: 100%; background-color: white; color: black;" />
            </el-main>
          </el-container>

        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import {UserFilled} from "@element-plus/icons-vue";
import {RouterView} from "vue-router";

export default {
  components: {UserFilled},
  methods:{
    DeleteToken(){
      sessionStorage.clear()
    }
  }
}
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
  width: 200px;
  background-color: rgb(17, 71, 117);
}

.background_container {
  width:calc(100vw - 200px);
  height:calc(100vh - 60px);
  position:fixed;
  background-size:100% 100%;
}

/* 其他样式可以根据需要添加 */
</style>