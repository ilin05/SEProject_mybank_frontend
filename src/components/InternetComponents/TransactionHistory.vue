<!--Account导航页-->

<template>
	<div class="main">
		<el-container>
			<el-container>

				<el-main style="margin-left: 50px; margin-top: 40px">
					<div style="margin-bottom: 20px; font-size: 20px">交易历史查询</div>
					<div style="display: flex; margin-top: 60px">
						<div style="margin-left: 55px">
							<p>银行卡类型</p>
							<div style="margin-top: 5px">
								<el-select v-model="type" placeholder="card_type" size="large" style="width: 240px;">
								      <el-option  key="储蓄卡" label="储蓄卡" value="储蓄卡"/>
<!--									  <el-option  key="信用卡" label="信用卡" value="信用卡"/>-->
								</el-select>
								   
							</div>
						</div>
						<div style="margin-left: 55px">
							<p>银行卡号</p>
							<div style="margin-top: 5px">
								<el-input v-model="accountId" style="width: 240px" placeholder="card_id" />
								<el-button type="info" style="margin-left: 45px; width: 60px; height: 40px" @click="query" color="black">查询</el-button>
							</div>
						</div>
					</div>
					<div v-if="showTalbe" style="margin-top: 50px;background-color: #ff7300;">
						<el-table :data="tableData" style="width: 100%;" height="67vh">
							<el-table-column prop="transactionId" label="交易编号" align="center" />
							<el-table-column prop="transactionTime" label="交易时间" align="center" />
							<el-table-column prop="transactionAmount" label="交易金额" align="center" />
							<el-table-column prop="transactionType" label="交易类型" align="center" />
							<el-table-column prop="transactionChannel" label="交易渠道" align="center"  />
							<el-table-column prop="currency" label="币种" align="center" />
							<el-table-column prop="moneySource" label="钱款来源" align="center"  />
							<el-table-column prop="moneyGoes" label="钱款去向" align="center"  />
						</el-table>
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
			type:null,
			accountId:null,
			tableData: [],
			showTalbe : false
		};
	},
	methods: {
		DeleteToken() {
      localStorage.clear();
			sessionStorage.clear();
			 router.push('/login')
		},
		query() {
			if(this.type === '信用卡'){
				ElMessage.error('改功能尚未实现');
				return;
			}
			this.showTalbe = false;
			axios
				.post('/internet/history',{
					accountId:this.accountId,
					// type:this.type
				})
				.then((response) => {
					if (response.data.code === 1) {
						this.tableData = response.data.payload;
						this.showTalbe = response.data.payload.length > 0
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
