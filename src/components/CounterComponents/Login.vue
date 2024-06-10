<template>
  <div>
    <div class="main" style="overflow-y: hidden; ">
      <el-container>

        <el-main class="background_container" style="display: flex;" :router = "true">
          <el-card title="出纳员登录" v-show="cashierLoginVisible" class="login_card" style="display: flex; justify-content: center ; vertical-align: center">
            <div style="margin-top: 20px;  font-size: 2em; font-weight: bold; color: #ffffff">
              柜台系统登录
            </div>
            <div class="form-group">
              <label for="cashierId" style="color: white">cashierId:</label>
              <input type="text" id="cashierId" v-model="cashierLoginInfo.cashierId" required>
            </div>
            <div class="form-group">
              <label for="password" style="color: white">Password:</label>
              <input type="password" id="password" v-model="cashierLoginInfo.password" required>
            </div>
            <button type="submit" class="login-button" style="margin-top:20px" @click="ConfirmCashierLogin">Login</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="adminLoginVisible = true; cashierLoginVisible=false">管理员登录</button>
          </el-card>

          <el-card title="管理员登录" v-show="adminLoginVisible" class="login_card" style="display: flex; justify-content: center ; vertical-align: center">
            <div style="margin-top: 20px;  font-size: 2em; font-weight: bold; color: #ffffff">
              系统管理员登录
            </div>
            <div class="form-group">
              <label for="username" style="color: white">Username:</label>
              <input type="text" id="username" v-model="adminLoginInfo.username" required>
            </div>
            <div class="form-group">
              <label for="password" style="color: white">Password:</label>
              <input type="password" id="password" v-model="adminLoginInfo.password" required>
            </div>
            <button type="submit" class="login-button" style="margin-top:20px" @click="ConfirmAdminLogin">Login</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="adminLoginVisible = false; cashierLoginVisible=true">出纳员登录</button>
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
  margin: auto;
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
  background-color:rgba(255,255,255,20%);
  margin: auto;
  width: 500px;
  height: 50%;
  text-align: center;
  vertical-align:middle;
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

.background_container{
  background:url("../../assets/figure2.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";
import SHA256 from "crypto-js/sha256";

export default {

  data(){
    return{
      cashierLoginInfo :{
        cashierId : '',
        password : '',
      },
      adminLoginInfo :{
        username : '',
        password : '',
      },

      adminLoginVisible : false,
      cashierLoginVisible : true,
    }

  },

  methods:{
    ConfirmAdminLogin(){
      //console.log("hello")
      //console.log(this.adminLoginInfo.password)
      console.log(SHA256(this.adminLoginInfo.password).toString())
      axios.post("/admin/login",{
        username:this.adminLoginInfo.username,
        password:this.adminLoginInfo.password,
      })
          .then(response=>{
            if(response.data.code === 1){
              ElMessage.success("登录成功");
              sessionStorage.setItem("token", response.data.payload);
              router.push('/adminmenu');
            }else{
              ElMessage.error(response.data)
            }
          })
          .catch(error =>{
            ElMessage.error("用户名或密码错误");
          })
    },

    ConfirmCashierLogin(){
      axios.post("/cashier/login",{
        cashierId:+this.cashierLoginInfo.cashierId,
        password:this.cashierLoginInfo.password,
      })
          .then(response=>{
            console.log(response.data)
            if(response.data.code === 1){
              ElMessage.success(response.data);
              sessionStorage.setItem("token", response.data.payload);
              router.push('/menu')
              // setTimeout(500,()=>{
              //location.href = '/menu'
              // })
            }else{
              ElMessage.error("用户名或密码错误");
            }
          })
          .catch(error =>{
            ElMessage.error("用户名或密码错误");
          })
    },
  }
}

</script>