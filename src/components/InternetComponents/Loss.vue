<!--Account导航页-->

<template>
	<div class="main">
		<el-container>
			<el-container>
				<el-main style="margin-left: 50px; margin-top: 40px">
					<div style="margin-bottom: 20px; font-size: 20px">挂失</div>
					<div style="display: flex; margin-top: 60px">
						<div style="margin-left: 55px">
							<p>银行卡号</p>
							<div style="margin-top: 5px">
								<el-input v-model="accountId" style="width: 240px" placeholder="card_id" />
							</div>
						</div>
					</div>
					
					<div style="margin-left: 55px;margin-top: 45px;">
						<p>请输入密码</p>
						<div style="margin-top: 5px">
							<el-input v-model="password" type="password" style="width: 240px" placeholder="password" />
						</div>
					</div>
					
					<div style="margin-left: 55px;">
						<el-button type="info" style="width: 60px; height: 40px;margin-top: 45px" @click="reportLoss" color="black">挂失</el-button>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import router from "@/router/index.js";
  import axios from "axios";
  import {ElMessage} from "element-plus";
export default {
	data() {
		return {
      accountId:'',
      password:''
    };
	},
	methods: {
		DeleteToken() {
			sessionStorage.clear();
			 router.push('/login')
		},
    reportLoss(){
      axios.post("/internet/reportLoss",{
        accountId:this.accountId,
        password: this.password
      })
          .then(response=>{
            if(response.data.code === 1){
              ElMessage.success("挂失成功");
              console.log(response.data);
              //location.href = '/menu'
            }else{
              ElMessage.error(response.data.message)
              console.log(response.data);
            }
          })
          .catch(error =>{
            ElMessage.error("failed");
          })
    },
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
	background: url('../../assets/figure2.jpg');
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