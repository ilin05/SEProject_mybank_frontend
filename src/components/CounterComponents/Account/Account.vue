<!--Account导航页-->

<template>
  <div class="main">
    <el-container>
      <el-header class="title">
        <div style="margin-top: 12px; display: inline-block;">
          <span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">银行柜台操作系统</span>
          <span style="margin-left :30px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">出纳员：XXX</span>
          <span style="margin-left :15px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">今日办结事项：XXX</span>
        </div >
        <el-button type="primary" style="margin-top: 12px; padding-right: 10px;">
          <span style="font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: normal;">登出</span>
        </el-button>
      </el-header>

      <el-container>
        <el-main class="background_container">
          <div class="title2">
            <span style="margin-left: 5%">
              账户
            </span>
            <RouterLink to="/menu">
              <span class="history-trail">菜单</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/account">
              <span class="history-trail">账户</span>
            </RouterLink>
          </div>
        </el-main>
      </el-container>

      <el-container>
                <el-aside class="aside" style="display: flex; color:#0f184d">
                  <el-menu active-text-color="#ffd04b" background-color="rgb(17, 71, 117)" default-active="1" text-color="#fff"
                           style="height:100%; width: 100%;" :router="true">
                    <el-menu-item index="account/savingaccount">
                      <el-icon>
                        <Reading />
                      </el-icon>
                      <span>储蓄账户</span>
                    </el-menu-item>
                    <el-menu-item index="account/creditcard">
                      <el-icon>
                        <Postcard />
                      </el-icon>
                      <span>信用卡</span>
                    </el-menu-item>
                    <el-menu-item index="account/foreigncurrency">
                      <el-icon>
                        <Tickets />
                      </el-icon>
                      <span>外汇账户</span>
                    </el-menu-item>
                    <el-menu-item index="account/internetbank">
                      <el-icon>
                        <UserFilled />
                      </el-icon>
                      <span>网银账户</span>
                    </el-menu-item>

                  </el-menu>
                </el-aside>

      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'tab1',
      formItems1: [
        { label: '开户人姓名：', placeholder: '请输入姓名' },
        { label: '身份证号：', placeholder: '请输入身份证号' },
        { label: '电话号码：', placeholder: '请输入电话号码' },
        { label: '账户币种：', placeholder: '请选择币种' },
        { label: '开户金额：', placeholder: '请输入金额' },
        { label: '账户密码：', placeholder: '等待用户输入' },
      ],
    };
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