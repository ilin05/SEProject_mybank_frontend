<template>
  <div>
    <div class="main" style="overflow-y: hidden; ">
      <el-container >
        <el-header class="title" style="display: flex; justify-content: space-between;">
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

        <el-container style="width: 100%; ">

          <el-main class="background_container" style="display: flex;" :router = "true">
            <div>
              <RouterLink to="/cashier">
                <el-button class="functionBox" router-link = "/openaccount">
                <span style="font-size: xx-large; font-family: 'Microsoft YaHei';
                color: black; font-weight: bold;">出纳员管理</span>
                </el-button>
              </RouterLink>
              <RouterLink to="/loanadmin">
                <el-button class="functionBox">
                <span style="font-size: xx-large; font-family: 'Microsoft YaHei';
                color: black; font-weight: bold;">贷款审查员管理</span>
                </el-button>
              </RouterLink>

            </div>
            <RouterView class="main" style="height: 90vh; max-height: 100%; background-color: white; color: black;" />
          </el-main>

        </el-container>
      </el-container>

    </div>
  </div>



</template>

<script>
import { RouterView } from 'vue-router'
import {UserFilled} from "@element-plus/icons-vue";

export default {
  components: {UserFilled}
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
  height: auto;
  background-color: #0f184d;
}

.title {
  background-color: rgb(17, 71, 117);
  height: 60px;
}

.functionBox {
  height: 300px;
  width: 300px;
  margin-top: 20px;
  margin-left: 12px;
  margin-right: 10px;
  padding: 7.5px;
  padding-right: 10px;
  padding-top: 15px;
  box-shadow: 0 4px 8px 0 rgb(0, 105, 253), 0 6px 20px 0 rgb(0, 138, 253);
  background-color: #ffffff;
  text-align: center;
}

body{
  margin:0;
  padding:0;
  border:0
}

.background_container{
  background:url("../../assets/figure2.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}

</style>
