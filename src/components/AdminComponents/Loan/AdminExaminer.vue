<template>
  <div class="main">
    <el-container class="content-container">
      <el-header class="title">
        <div style="margin-top: 12px; display: inline-block;">
          <span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">银行管理员系统</span>
          <span style="margin-left :30px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">管理员您好！</span>
        </div >
        <RouterLink to="/login">
          <el-button type="primary" style="margin-top: 12px; padding-right: 10px;">
            <span style="font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: normal;">登出</span>
          </el-button>
        </RouterLink>
      </el-header>

      <el-main class="main-content">
        <div class="title2">
          <span style="margin-left: 5%">审查员管理</span>
          <RouterLink to="/adminmenu">
            <span class="history-trail">菜单</span>
          </RouterLink>
          <span class="history-trail"> > </span>
          <RouterLink to="/loanadmin">
            <span class="history-trail">审查员管理</span>
          </RouterLink>
        </div>
        <el-button type = "primary" @click="this.addExaminerVisible=true" style="horiz-align: right; margin-left: 20px; margin-top:20px; margin-bottom: 20px">
          <span >添加审查员</span>
        </el-button>

        <el-card title="审查员管理" class="history_table" >
          <el-table :data="examinerList">
            <el-table-column prop="id" label="审查员id">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="password" label="密码">
            </el-table-column>
            <el-table-column prop="approvalLevel" label="权限">
            </el-table-column>
            <el-table-column label="点击修改信息或删除">
              <template v-slot ="scope">
                <el-button type="success"  @click="getModifyExaminerInfo(scope.row)">修改</el-button>
                <el-button type="danger"  @click="getDeleteExaminerInfo(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-dialog v-model="addExaminerVisible" title="添加审查员">
          <el-divider></el-divider>
          <el-form
              label-width="auto"
              style="max-width: 600px"
          >
            <el-form-item label="姓名" required>
              <el-input v-model="addExaminerInfo.name" placeholder="请输入姓名"/>
            </el-form-item>
            <el-form-item label="密码" required>
              <el-input v-model="addExaminerInfo.password" placeholder="请输入密码"/>
            </el-form-item>
            <el-form-item label="审查员权限" required>
              <el-select v-model.number="addExaminerInfo.approvalLevel" placeholder="请选择权限">
                <el-option label="小额" value=0></el-option>
                <el-option label="大额" value=1></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-divider></el-divider>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="ConfirmAddExaminer">确认</el-button>
              <el-button @click="addExaminerVisible = false">取消</el-button>
            </span>
          </template>
        </el-dialog>

        <el-dialog v-model="deleteExaminerVisible" title="删除审查员">
          <span style="font-weight: bold; font-size: 1rem; margin-top: 20px; margin-left: 20px">请确认删除审查员信息:</span>
          <el-divider></el-divider>
          <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
            审查员id：
            {{ deleteExaminerInfo.id }}
          </div>
          <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
            审查员姓名：
            {{ deleteExaminerInfo.name }}
          </div>
          <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
            密码：
            {{ deleteExaminerInfo.password }}
          </div>
          <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
            审查员权限：
            {{ deleteExaminerInfo.approvalLevel }}
          </div>
          <el-divider></el-divider>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="danger" @click="ConfirmDeleteExaminer">确认</el-button>
              <el-button @click="deleteExaminerVisible = false">取消</el-button>
            </span>
          </template>
        </el-dialog>

        <el-dialog v-model="modifyExaminerVisible" title="修改审查员信息">
          <el-divider></el-divider>
          <el-form
              label-width="auto"
              style="max-width: 600px"
          >
            <el-form-item label="姓名" required>
              <el-input v-model="modifyExaminerInfo.name" placeholder="请输入姓名"/>
            </el-form-item>
            <el-form-item label="密码" required>
              <el-input v-model="modifyExaminerInfo.password" placeholder="请输入密码"/>
            </el-form-item>
            <el-form-item label="审查员权限" required>
              <br>
              <el-select v-model.number="modifyExaminerInfo.approvalLevel" placeholder="请选择权限">
                <el-option label="小额" value=0></el-option>
                <el-option label="大额" value=1></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-divider></el-divider>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="ConfirmModifyExaminer">确认</el-button>
              <el-button @click="modifyExaminerVisible = false">取消</el-button>
            </span>
          </template>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";

export default {
  data() {
    return {
      addExaminerVisible : false,
      modifyExaminerVisible :false,
      deleteExaminerVisible : false,

      examinerList:[{
        id : 1,
        name :'',
        password : '',
        approvalLevel : '',
      }],

      addExaminerInfo: {
        id : 1,
        name :'',
        password : '',
        approvalLevel : '',
      },

      modifyExaminerInfo :{
        id : 1,
        name :'',
        password : '',
        approvalLevel : '',
      },

      deleteExaminerInfo :{
        id : 1,
        name :'',
        password : '',
        approvalLevel : '',
      },
    };
  },
  methods: {
    getModifyExaminerInfo(row){
      this.modifyExaminerVisible = true;
      this.modifyExaminerInfo = {...row};
    },

    getDeleteExaminerInfo(row){
      this.deleteExaminerVisible = true;
      this.deleteExaminerInfo = {...row};
    },

    ConfirmAddExaminer() {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      axios.post("/admin/examiner/add",
          {
          name: this.addExaminerInfo.name,
          password: this.addExaminerInfo.password,
          approvalLevel: this.addExaminerInfo.approvalLevel,
        },
          config
      )
          .then(response => {
            let data = response.data
            if (response.data === "success") {
              ElMessage.success("添加成功");
              this.addExaminerVisible = false;
              this.QueryExaminer();
            } else {
              ElMessage.error("添加失败");
            }
          })
    },

    ConfirmModifyExaminer() {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      axios.post("/admin/examiner/modify",
          {
            id: this.modifyExaminerInfo.id,
            name: this.modifyExaminerInfo.name,
            password: this.modifyExaminerInfo.password,
            approvalLevel: this.modifyExaminerInfo.approvalLevel,
        },
          config
        )
          .then(response => {
            let data = response.data
            if (data === "success") {
              ElMessage.success("修改成功");
              this.modifyExaminerVisible = false;
              this.QueryExaminer();
            } else {
              ElMessage.error("修改失败");
            }
          })
    },

    ConfirmDeleteExaminer() {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      axios.post("/admin/examiner/delete",
          {
          id : this.deleteExaminerInfo.id
        },
        config
      )
          .then(response => {
            let data = response.data
            if (data === "success") {
              ElMessage.success("删除成功");
              this.deleteExaminerVisible = false;
              this.QueryExaminer();
            } else {
              ElMessage.error("删除失败");
            }
          })
    },

    QueryExaminer() {
      this.examinerList = [];
      axios.get("/admin/examiner/list")
          .then(response => {
            let data = response.data;
            data.forEach(item => {
              this.examinerList.push(item)
            })
          })
    },
  },
  mounted() {
    this.QueryExaminer();
  }
}
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

.title2 {
  background: url("../../../assets/figure2.jpg");
  height: 60px;
  display: flex;
  align-items: center;
  width: 100%; /* 占据整个页面宽度 */
  color: #ffffff;
  font-weight: bold;
  font-size: xx-large;
  font-family: 'Microsoft YaHei';
}

.history-trail {
  margin-left: 30px;
  font-size: medium;
  color: #ffffff;
}

.examiner_table {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  background-color: #ffffff;
  overflow-y: hidden;
}

.add_examiner_button {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  background-color: #ffffff;
  overflow-y: hidden;
}

/* 其他样式可以根据需要添加 */
</style>