<!--Account导航页-->

<template>
	<div class="main">
		<el-container>

			<el-container>

				<el-main>
					<el-card title="开户" class="deposit_card">欢迎使用网银系统</el-card>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		DeleteToken() {
			sessionStorage.clear();
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