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
            <button type="button" class="login-button" style="margin-top:20px" @click="InternetLoginVisible = true; cashierLoginVisible=false">网银登录</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="AuditorLoginVisible = true; cashierLoginVisible=false">信用卡审查员登录</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="LoanLoginVisible = true; cashierLoginVisible=false">贷款审查员登录</button>
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
            <button type="button" class="login-button" style="margin-top:20px" @click="adminLoginVisible = false; InternetLoginVisible=true">网银登录</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="AuditorLoginVisible = true; adminLoginVisible=false">信用卡审查员登录</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="LoanLoginVisible = true; adminLoginVisible=false">贷款审查员登录</button>
          </el-card>

          <el-card title="网银登录" v-show="InternetLoginVisible" class="login_card" style="display: flex; justify-content: center ; vertical-align: center">
            <div style="margin-top: 20px;  font-size: 2em; font-weight: bold; color: #ffffff">
              互联网用户登录
            </div>
            <div class="form-group">
              <label for="cashierId" style="color: white">CustomerAccountId:</label>
              <input type="text" id="cashierId" v-model="internetLoginInfo.internetId" required>
            </div>
            <div class="form-group">
              <label for="password" style="color: white">Password:</label>
              <input type="password" id="password" v-model="internetLoginInfo.password" required>
            </div>
            <button type="submit" class="login-button" style="margin-top:20px" @click="ConfirmInternetLogin">Login</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="adminLoginVisible = true; InternetLoginVisible=false">管理员登录</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="cashierLoginVisible = true; InternetLoginVisible=false">出纳员登录</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="AuditorLoginVisible = true; InternetLoginVisible=false">信用卡审查员登录</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="LoanLoginVisible = true; InternetLoginVisible=false">贷款审查员登录</button>
            <button type="submit" class="login-button" style="margin-top:20px" @click="Register">Register</button>
          </el-card>

          <el-card title="信用卡审查员登录" v-show="AuditorLoginVisible" class="login_card" style="display: flex; justify-content: center ; vertical-align: center">
            <div style="margin-top: 20px;  font-size: 2em; font-weight: bold; color: #ffffff">
              信用卡审查员登录
            </div>
            <div class="form-group">
              <label for="cashierId" style="color: white">CustomerAccountId:</label>
              <input type="text" id="cashierId" v-model="auditorLoginInfo.auditorId" required>
            </div>
            <div class="form-group">
              <label for="password" style="color: white">Password:</label>
              <input type="password" id="password" v-model="auditorLoginInfo.password" required>
            </div>
            <button type="submit" class="login-button" style="margin-top:20px" @click="ConfirmAuditorLogin">Login</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="adminLoginVisible = true; AuditorLoginVisible=false">管理员登录</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="cashierLoginVisible = true; AuditorLoginVisible=false">出纳员登录</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="InternetLoginVisible = true; AuditorLoginVisible=false">网银登录</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="LoanLoginVisible = true; AuditorLoginVisible=false">贷款审查员登录</button>
          </el-card>

          <el-card title="贷款审查员登录" v-show="LoanLoginVisible" class="login_card" style="display: flex; justify-content: center ; vertical-align: center">
            <div style="margin-top: 20px;  font-size: 2em; font-weight: bold; color: #ffffff">
              贷款审查员登录
            </div>
            <div class="form-group">
              <label for="cashierId" style="color: white">CustomerAccountId:</label>
              <input type="text" id="loanId" v-model="loanLoginInfo.loanId" required>
            </div>
            <div class="form-group">
              <label for="password" style="color: white">Password:</label>
              <input type="password" id="password" v-model="loanLoginInfo.password" required>
            </div>
            <button type="submit" class="login-button" style="margin-top:20px" @click="ConfirmLoanLogin">Login</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="adminLoginVisible = true; LoanLoginVisible=false">管理员登录</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="cashierLoginVisible = true; LoanLoginVisible=false">出纳员登录</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="AuditorLoginVisible = true; LoanLoginVisible=false">信用卡审查员登录</button>
            <button type="button" class="login-button" style="margin-top:20px" @click="InternetLoginVisible = true; LoanLoginVisible=false">网银登录</button>
          </el-card>

          <el-card class="login_card" v-show="InternetRegisterVisible" style="display: flex; justify-content: center; vertical-align: center">
            <div style="margin-top: 20px; font-size: 2em; font-weight: bold; color: #ffffff">互联网用户注册</div>
            <div class="form-group">
              <input type="text" id="idNumber" v-model="registerForm.idNumber" placeholder="身份证" required />
            </div>
            <div class="form-group">
              <input type="text" id="phoneNumber" placeholder="电话号码" v-model="registerForm.phoneNumber" required />
            </div>
            <div class="form-group">
              <input type="password" id="password" placeholder="密码" v-model="registerForm.password" required />
            </div>
            <div class="form-group">
              <input type="password" id="surepassword" placeholder="确认密码" v-model="registerForm.surepassword" required />
            </div>
            <button type="submit" class="login-button" style="margin-top: 20px" @click="ConfirmRegister">Register</button>
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
  height: 80%;
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
      auditorLoginInfo:{
        auditorId: '',
        password: ''
      },
      loanLoginInfo:{
        loanId: '',
        password: ''
      },
      registerForm: {
        customerName: '',
        idNumber: '',
        phoneNumber: '',
        address: '',
        password: '',
        surepassword: ''
      },
      internetLoginInfo:{
        internetId : '',
        password : '',
      },
      InternetLoginVisible: false,
      adminLoginVisible : false,
      InternetRegisterVisible: false,
      cashierLoginVisible : true,
      AuditorLoginVisible: false,
      LoanLoginVisible: false
    }

  },

  methods:{
    // Register(){
    //   console.log("hello")
    //   router.push('/internet/register');
    // },
    Register(){
      this.InternetLoginVisible = false;
      this.InternetRegisterVisible = true;
    },
    Back(){
      this.InternetLoginVisible = true;
      this.InternetRegisterVisible = false;
    },
    ConfirmRegister() {
      console.log(this.registerForm.password)
      console.log(this.registerForm.surepassword !== this.registerForm.surepassword)
      if(this.registerForm.password !== this.registerForm.surepassword){
        ElMessage.error("密码和确认密码不一致!");
        return;
      }
      axios
          .post('/internet/register', {
            idNumber: this.registerForm.idNumber,
            phoneNumber: this.registerForm.phoneNumber,
            password: this.registerForm.password
          })
          .then((response) => {
            console.log("hello1")
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
    ConfirmAdminLogin(){
      //console.log("hello")
      //console.log(this.adminLoginInfo.password)
      console.log(SHA256(this.adminLoginInfo.password).toString())
      axios.post("/admin/login",{
        username:this.adminLoginInfo.username,
        password:SHA256(this.adminLoginInfo.password).toString(),
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
        password:SHA256(this.cashierLoginInfo.password).toString(),
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

    ConfirmInternetLogin(){
      axios.post("/internet/login",{
        customerAccountId:this.internetLoginInfo.internetId,
        password:this.internetLoginInfo.password,
      })
          .then(response=>{
            if(response.data.code === 1){
              ElMessage.success(response.data);
              sessionStorage.setItem("token", response.data.payload.token);
              localStorage.setItem("user-id", response.data.payload.customerId);
              localStorage.setItem("customerId",response.data.payload.customerId);
              router.push('/home/internetmenu')
            }else if(response.data.code === 900){
              ElMessage.error("账号不存在");
            }else{
              ElMessage.error("用户名或密码错误");
            }
          })
          .catch(error =>{
            ElMessage.error("用户名或密码错误");
          })
    },

    ConfirmAuditorLogin(){
      console.log(this.auditorLoginInfo.auditorId)
      console.log(this.auditorLoginInfo.password)
      axios.post("/auditor/login",{
        auditorId:this.auditorLoginInfo.auditorId,
        password:this.auditorLoginInfo.password
      })
          .then(response=>{
            if(response.data.code === 1){
              ElMessage.success(response.data);
              sessionStorage.setItem("token", response.data.payload);
              localStorage.setItem("auditorId", this.auditorLoginInfo.auditorId);
              router.push('/auditor/menu')
            }else if(response.data.code === 900){
              ElMessage.error("账号不存在");
            }else{
              ElMessage.error("用户名或密码错误");
            }
          })
          .catch(error =>{
            ElMessage.error("用户名或密码错误");
          })
    },

    ConfirmLoanLogin(){
      axios.post("admin/loan/login",{
        loanId:this.loanLoginInfo.loanId,
        password:this.loanLoginInfo.password
      })
          .then(response=>{
            if(response.data.code === 1){
              ElMessage.success(response.data);
              localStorage.setItem("reviewerId", this.loanLoginInfo.loanId);
              sessionStorage.setItem("token", response.data.payload);
              router.push('/loan/menu')
            }else if(response.data.payload === "900"){
              ElMessage.error("账号不存在");
            }else{
              ElMessage.error("用户名或密码错误");
            }
          })
          .catch(error =>{
            ElMessage.error("用户名或密码错误");
          })
    }
  }
}

</script>