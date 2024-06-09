<template>
  <div class="main">
    <el-container>
      <el-header class="title">
        <div style="margin-top: 12px; display: inline-block;">
          <span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">银行柜台操作系统</span>
          <span style="margin-left :30px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">出纳员：XXX</span>
          <span style="margin-left :15px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">今日办结事项：XXX</span>
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
              存款业务办理
            </span>
            <RouterLink to="/menu">
              <span class="history-trail">菜单</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/deposit">
              <span class="history-trail">存款业务</span>
            </RouterLink>
          </div>
        </el-main>
      </el-container>

      <el-container>
        <el-aside class="aside" style="display: flex; color:#0f184d">
          <el-menu active-text-color="#ffd04b" background-color="rgb(17, 71, 117)" default-active="1" text-color="#fff"
                   style="height:100%; width: 100%;" :router="true">
            <el-menu-item index="deposit">
              <el-icon>
                <Reading />
              </el-icon>
              <span>存款</span>
            </el-menu-item>
            <el-menu-item index="withdraw">
              <el-icon>
                <Postcard />
              </el-icon>
              <span>取款</span>
            </el-menu-item>
            <el-menu-item index="transfer">
              <el-icon>
                <Tickets />
              </el-icon>
              <span>转账</span>
            </el-menu-item>
            <el-menu-item index="loan">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>贷款</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <el-main>
          <el-card title="存款" class="deposit_card">
            <el-tabs v-model="activeTab" type="border-card">
              <el-tab-pane label="卡号存款" name="tab1">
                <div v-for="(item, index) in formItems1" :key="index" class="form-row">
                  <div class="form-label">{{ item.label }}</div>
                  <el-input class="form-input" :placeholder="item.placeholder" clearable />
                </div>
                <el-button type="primary" >确认</el-button>
              </el-tab-pane>
              <el-tab-pane label="存折存款" name="tab2">
                <div v-for="(item, index) in formItems2" :key="index" class="form-row">
                  <div class="form-label">{{ item.label }}</div>
                  <el-input class="form-input" :placeholder="item.placeholder" clearable />
                </div>
                <el-button type="primary" >确认</el-button>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-main>
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
        { label: '银行卡号：', placeholder: '请输入银行卡号' },
        { label: '存款币种：', placeholder: '请选择币种' },
        { label: '存款类型：', placeholder: '请选择类型' },
        { label: '存款金额：', placeholder: '请输入金额' }
      ],
      formItems2: [
        { label: '存折号：', placeholder: '请输入存折号' },
        { label: '存款币种：', placeholder: '请选择币种' },
        { label: '存款类型：', placeholder: '请选择类型' },
        { label: '存款金额：', placeholder: '请输入金额' }
      ]
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

.aside {
  min-height: calc(100vh - 60px);
  width: 180px;
  background-color: red;
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
}

/* 其他样式可以根据需要添加 */
</style>