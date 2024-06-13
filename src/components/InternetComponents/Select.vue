<!--Account导航页-->

<template>
	<div class="main">
		<el-container>

			<el-container>

				<el-main style="margin-left: 50px; margin-top: 40px">
					<div style="margin-bottom: 20px; font-size: 20px">储蓄卡查询</div>
					<div style="display: flex; margin-top: 60px">
						<div style="margin-left: 55px">
							<p>输入查询信息</p>
							<div style="margin-top: 5px">
								<el-input v-model="formItems1.accountId" style="width: 240px" placeholder="请输入网银账号" />
							</div>
              <div>
                <el-input v-model="formItems1.password" style="width: 240px" placeholder="请输入密码" />
                <el-button type="info" style="margin-left: 45px; width: 60px; height: 40px" @click="query" color="black">查询</el-button>
              </div>
						</div>
					</div>
					<div v-if="showTabel" style="margin-top: 50px;background-color: #ff7300;">
            <el-card title="账户信息查询" class="deposit_card">
              <el-table :data="queryResult">
                <el-table-column prop="accountId" label="银行卡号">
                </el-table-column>
                <el-table-column prop="customerId" label="用户ID">
                </el-table-column>
                <el-table-column prop="customerName" label="用户姓名">
                </el-table-column>
                <el-table-column prop="idNumber" label="身份证号">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="phoneNumber" label="电话">
                </el-table-column>
                <el-table-column prop="balance" label="账户余额">
                </el-table-column>
                <el-table-column prop="openTime" label="开户时间">
                </el-table-column>
                <el-table-column prop="openAmount" label="开户金额">
                </el-table-column>
                <el-table-column prop="freezeState" label="是否冻结">
                </el-table-column>
                <el-table-column prop="lossState" label="是否挂失">
                </el-table-column>
                <el-table-column prop="deleted" label="是否已销户">
                </el-table-column>
              </el-table>
            </el-card>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import { ElMessage } from 'element-plus';
import router from "@/router/index.js";
import axios from "axios";
export default {
	data() {
		return {
			type:null,
			showTabel : false,
      formItems1:{
        accountId: '',
        password: ''
      },
      queryResult:[{
        accountId:'',
        customerId:'',
        customerName:'',
        idNumber: '',
        address: '',
        phoneNumber:'',
        balance:'',
        openTime:'',
        openAmount:'',
        freezeState:'',
        lossState:'',
        deleted:'',
      }]
		};
	},
	methods: {
		DeleteToken() {
			sessionStorage.clear();
			 router.push('/login')
		},
		query(){
      console.log("hello1")
      this.queryResult = []
      axios.post("/internet/query",
          {
            customerAccountId: this.formItems1.accountId,
              password: this.formItems1.password
          })
          .then(response => {
            if(response.data.code == 1){
              ElMessage.success("OK!")
              this.queryResult = response.data.payload
              this.showTabel = response.data.payload.length>0
              this.showTabel = true
            }else if (response.data.code === 404) {
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