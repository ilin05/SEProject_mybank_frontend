<template>
  <div>
    <div class="main" style="overflow-y: hidden">
      <el-container>
        <el-main class="background_container" style="display: flex" :router="true">
          <el-card class="login_card" style="display: flex; justify-content: center; vertical-align: center">
            <div style="margin-top: 20px; font-size: 2em; font-weight: bold; color: #ffffff">互联网用户注册</div>
            <div class="form-group">
              <input type="text" id="idNumber" v-model="registerForm.idNumber" placeholder="身份证" required />
            </div>
            <div class="form-group">
              <input type="text" id="phoneNumber" placeholder="电话号码" v-model="registerForm.phoneNumber" required />
            </div>
            <div class="form-group">
              <input type="text" id="password" placeholder="密码" v-model="registerForm.password" required />
            </div>
            <div class="form-group">
              <input type="text" id="surepassword" placeholder="确认密码" v-model="registerForm.surepassword" required />
            </div>
            <button type="submit" class="login-button" style="margin-top: 20px" @click="Register">Register</button>
            <button type="submit" class="login-button" style="margin-top: 20px" @click="Back">Back</button>
          </el-card>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
.login {
  max-width: 300px;
  margin: 0 auto;
}

.form-group {
  margin: 20px auto;
}

label {
  display: block;
  margin-bottom: 0.25rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login_card {
  background-color: rgba(255, 255, 255, 20%);
  margin: auto;
  width: 500px;
  height: 60%;
  text-align: center;
  vertical-align: middle;
}

.login-button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

.background_container {
  background: url('../../assets/figure2.jpg');
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
</style>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router/index.js';
import SHA256 from 'crypto-js/sha256';
import {sha256} from "js-sha256";


export default {
  data() {
    return {
      registerForm: {
        customerName: '',
        idNumber: '',
        phoneNumber: '',
        address: '',
        password: '',
        surepassword: ''
      }
    };
  },

  methods: {
    hashString(str){
      return sha256(str)
    },
    Register() {
      console.log(this.registerForm.password)
      console.log(this.registerForm.surepassword !== this.registerForm.surepassword)
      if(this.registerForm.password !== this.registerForm.surepassword){
        ElMessage.error("密码和确认密码不一致!");
        return;
      }
      axios
          .post('/internet/register', {
            customerName: this.registerForm.customerName,
            idNumber: this.registerForm.idNumber,
            phoneNumber: this.registerForm.phoneNumber,
            password: this.hashString(this.registerForm.password),
            address: this.registerForm.address
          })
          .then((response) => {
            if (response.data.code === 1) {
              ElMessage.success({
                message:'注册成功,账号:' + response.data.payload,
                duration:0
              });
            } else {
              ElMessage.error(response.data.message);
            }
          })
          .catch((error) => {
            ElMessage.error('failed');
          });
    },
    Back() {
      router.back();
    }
  }
};
</script>
