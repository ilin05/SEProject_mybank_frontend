<template>
  <div class="main">
    <el-container>
      <el-container class="content-container">
        <el-main class="main-content">
          <div class="title2">
            <span style="margin-left: 5%">个人信息</span>
            <RouterLink to="/user">
              <span class="history-trail">贷款</span>
            </RouterLink>
            <span class="history-trail"> > </span>
            <RouterLink to="/user/homepage">
              <span class="history-trail">个人信息</span>
            </RouterLink>
          </div>

          <div class="content">
            <el-form label-width="70px" class="user-form">
              <el-form-item label="账号ID">
                <el-input v-model="userId" readonly></el-input>
              </el-form-item>
              <el-form-item label="用户姓名">
                <el-input v-model="userName" readonly></el-input>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input v-model="idNumber" readonly></el-input>
              </el-form-item>
              <el-form-item label="电话号码">
                <el-input v-model="phoneNumber" :readonly="!isEditing"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="emailNumber" :readonly="!isEditing"></el-input>
              </el-form-item>
              <el-form-item label="信用额度">
                <el-input v-model="creditLimit" readonly></el-input>
              </el-form-item>
            </el-form>
            <div class="edit-button">
              <el-button type="primary" @click="toggleEdit">{{ isEditing ? '保存' : '编辑' }}</el-button>
              <span class="note">注：点击编辑按钮修改电话号码或邮箱，并点击保存按钮保存信息</span>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Postcard, Reading, Tickets, UserFilled } from "@element-plus/icons-vue";

export default {
  components: { Tickets, Postcard, Reading, UserFilled },
  data() {
    return {
      isEditing: false,
      userId: '123456',
      userName: '张三',
      idNumber: '123456789012345678',
      phoneNumber: '13800138000',
      emailNumber: '13800138000@qq.com',
      creditLimit: '50000'
    };
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        // 保存逻辑可以在这里添加
        console.log("保存数据:", {
          phoneNumber: this.phoneNumber
        });
      }
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
  background-color: #0f184d;
  overflow-y: hidden;
}

.content-container {
  display: flex;
  flex-direction: column;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow: auto;
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

.content {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
}

.user-form {
  width: 100%; /* 调整表单宽度 */
  font-size: 18px; /* 增大字体 */
  line-height: 2; /* 增加行距 */
  margin-left: 0; /* 左移表单 */
}

.el-form-item__label {
  text-align: left;
  font-size: 18px; /* 增大标签字体 */
}

.el-input__inner {
  font-size: 18px; /* 增大输入框内字体 */
}

.edit-button {
  text-align: left; /* 按钮居左 */
  margin-top: 20px;
  margin-left: 70px; /* 按钮与表单对齐 */
}

.note {
  margin-left: 10px;
  color: red;
  font-size: medium;
  font-family: 'Microsoft YaHei', serif;
}

/* 其他样式可以根据需要添加 */
</style>
