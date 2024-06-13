<!--Account导航页-->

<template>
	<div class="main">
		<el-container>
			<el-container>
				<el-main style="margin-left: 20px; margin-top: 40px">
					<div style="margin-bottom: 30px; font-size: 20px">余额查询</div>
					<div style="margin-left: 55px; margin-top: 20px">
						<p>储蓄卡号</p>
						<div style="margin-top: 30px">
							<el-input v-model="accountId" style="width: 240px" placeholder="account_id" />
							<el-button type="info" style="margin-left: 45px; width: 60px; height: 40px" @click="query" color="black">查询</el-button>
						</div>
						<div
							v-show="showMoney"
							style="
								font-size: 18px;
								background-color: #9aa7b1;
								width: 305px;
								height: 50px;
								margin-top: 20px;
								display: flex;
								justify-content: center;
								align-items: center;
							"
						>
							<div style="font-weight: 600">余额:{{money}}</div>
						</div>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import axios from 'axios';
import router from "@/router/index.js";
import { ElMessage } from 'element-plus';
export default {
	data() {
		return {
			showMoney: false,
			accountId : null,
			money : 0
		};
	},
	methods: {
		DeleteToken() {
			sessionStorage.clear();
			 router.push('/login')
		},
		query() {
			this.showMoney = false;
			axios.get('/internet/query', {params:{
          accountId: this.accountId
        }
      })
				.then((response) => {
					if (response.data.code === 1) {
						this.showMoney = true;
						this.money = response.data.payload.balance
					} else if (response.data.code === 404) {
						ElMessage.error(response.data.message);
					} else {
						ElMessage.error(response.data);
					}
				})
				.catch((error) => {
					console.log(error);
					ElMessage.error('出错了');
				});
			
		}
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
