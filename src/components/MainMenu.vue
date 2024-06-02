<template>
  <div>
    <div class="main" style="overflow-y: hidden; ">
      <el-container >
        <el-header class="title" style="display: flex; justify-content: space-between;">
          <div style="margin-top: 12px; display: inline-block;">
            <span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">银行柜台操作系统</span>
            <span style="margin-left :30px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">出纳员：XXX</span>
            <span style="margin-left :15px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">今日办结事项：XXX</span>
          </div >
          <el-button type="primary" style="margin-top: 12px; padding-right: 10px;">
            <span style="font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: normal;">登出</span>
          </el-button>
        </el-header>

        <el-container style="width: 100%; ">

          <el-main class="background_container" style="display: flex;" :router = "true">
            <div>
              <RouterLink to="/openaccount">
                <el-button class="functionBox" router-link = "/openaccount">
                <span style="font-size: xx-large; font-family: 'Microsoft YaHei';
                color: black; font-weight: bold;">开户</span>
                </el-button>
              </RouterLink>
              <RouterLink to="/deposit">
                <el-button class="functionBox">
                <span style="font-size: xx-large; font-family: 'Microsoft YaHei';
                color: black; font-weight: bold;">存款</span>
                </el-button>
              </RouterLink>
              <RouterLink to="/withdraw">
                <el-button class="functionBox"
                           @click="newBookInfo.name = '', newBookInfo.category = '', newBookInfo.press = '', newBookInfo.year = '',
                 newBookInfo.author = '', newBookInfo.price = '', newBookInfo.stock = '0', newBookVisible = true">
                <span style="font-size: xx-large; font-family: 'Microsoft YaHei';
                color: black; font-weight: bold;">取款</span>
                </el-button>
              </RouterLink>
              <RouterLink to="/transfer">
                <el-button class="functionBox">
                <span style="font-size: xx-large; font-family: 'Microsoft YaHei';
                color: black; font-weight: bold;">转账</span>
                </el-button>
              </RouterLink>
              <RouterLink to="/reportloss">
                <el-button class="functionBox">
                <span style="font-size: xx-large; font-family: 'Microsoft YaHei';
                color: black; font-weight: bold;">挂失</span>
                </el-button>
              </RouterLink>
              <RouterLink to="/reissue">
                <el-button class="functionBox">
                <span style="font-size: xx-large; font-family: 'Microsoft YaHei';
                color: black; font-weight: bold;">补发</span>
                </el-button>
              </RouterLink>
              <RouterLink to="/freeze">
                <el-button class="functionBox">
                <span style="font-size: xx-large; font-family: 'Microsoft YaHei';
                color: black; font-weight: bold;">冻结</span>
                </el-button>
              </RouterLink>
              <RouterLink to="/unfreeze">
                <el-button class="functionBox">
                <span style="font-size: xx-large; font-family: 'Microsoft YaHei';
                color: black; font-weight: bold;">解冻</span>
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
  background:url("../assets/figure2.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}

</style>
