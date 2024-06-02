<template>
  <el-scrollbar height="100%" style="width: 100%;">
    <div style="margin-top: 20px; margin-left: 40px; font-size: 2em; font-weight: bold; ">图书出借/归还
      <el-button @click = "returnTableVisible = false ; bookQueryVisible = true">我要借书</el-button>
      <el-button @click = "availableBookVisible = false; returnDialogVisible = true">我要还书</el-button>
      <el-input v-model="toSearch" :prefix-icon="Search"
                style=" width: 15vw;min-width: 150px; margin-left: 30px; margin-right: 30px; float: right;" clearable />
    </div>

    <div style="display: flex;flex-wrap: wrap; justify-content: start;">

      <div class="borrowBox" v-if= "availableBookVisible" v-for="book in books" v-show="book.name.includes(toSearch)" :key="book.id">
        <div>
          <el-divider />

          <!-- 卡片内容 -->
          <div style="margin-left: 10px; text-align: start; font-size: 16px;">
            <p style="padding: 2.5px;"><span style="font-weight: bold;">书号：</span>{{ book.id }}</p>
            <p style="padding: 2.5px;"><span style="font-weight: bold;">书名：</span>{{ book.name }}</p>
            <p style="padding: 2.5px;"><span style="font-weight: bold;">类别：</span>{{ book.category }}</p>
            <p style="padding: 2.5px;"><span style="font-weight: bold;">出版社：</span>{{ book.press }}</p>
            <p style="padding: 2.5px;"><span style="font-weight: bold;">年份：</span>{{ book.year }}</p>
            <p style="padding: 2.5px;"><span style="font-weight: bold;">作者：</span>{{ book.author }}</p>
            <p style="padding: 2.5px;"><span style="font-weight: bold;">价格：</span>{{ book.price }}</p>
          </div>

          <el-divider />

          <!-- 卡片操作 -->
          <div style="margin-top: 10px;">
            <el-button type="primary" :icon="Star" @click="this.borrowBookInfo.bookID = book.id, this.borrowBookInfo.cardID = '',
            this.borrowBookInfo.name = book.name, this.borrowBookInfo.category = book.category, this.borrowBookInfo.press = book.press,
            this.borrowBookInfo.year = book.year, this.borrowBookInfo.author = book.author,
                this.borrowBookVisible = true" circle />

          </div>

        </div>
      </div>
    </div>

    <el-table v-if="returnTableVisible" :data="tableData" height="600"
              :default-sort="{ prop: 'borrowTime', order: 'ascending' }" :table-layout="'auto'"
              style="width: 100%; margin-left: 50px; margin-top: 30px; margin-right: 50px; max-width: 80vw;">
      <el-table-column prop="bookID" label="图书ID" sortable />
      <el-table-column prop="title" label="书名" />
      <el-table-column prop="borrowTime" label="借出时间" sortable />
      <el-table-column label="点击归还">
        <template v-slot ="scope">
          <el-button type="primary" :icon = "Star" v-model="returnTableVisible" @click = "this.returnBookInfo.bookID = scope.row.bookID,
        this.returnBookInfo.title = scope.row.title, this.returnBookInfo.category = scope.row.category, this.returnBookInfo.press = scope.row.press,
        this.returnBookInfo.author = scope.row.author, this.returnBookInfo.year = scope.row.year, this.returnBookInfo.price = scope.row.price,
        this.returnBookInfo.cardID = returnQueryInfo.cardID, this.returnBookInfo.borrowTimeValue = scope.row.borrowTimeValue, this.returnBookInfo.borrowTime = scope.row.borrowTime,
        ConfirmReturnVisible = true" circle/>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="ConfirmReturnVisible" title="还书确认" width="30%">
      <span style="font-weight: bold;">请确认归还图书信息:</span>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">书号：</span>{{ returnBookInfo.bookID }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">书名：</span>{{ returnBookInfo.title }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">类别：</span>{{ returnBookInfo.category }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">出版社：</span>{{ returnBookInfo.press }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">年份：</span>{{ returnBookInfo.year }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">作者：</span>{{ returnBookInfo.author }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">借阅时间：</span>{{ returnBookInfo.borrowTime }}</p>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="ConfirmReturnVisible = false">取消</el-button>
                    <el-button type="primary" @click="ConfirmReturnBook">
                        确认
                    </el-button>
                </span>
      </template>
    </el-dialog>

    <el-dialog v-model="returnDialogVisible" title="借书证号输入" width="30%">
      <span style="font-weight: bold;">请输入您的借书证号:</span>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
        <el-input v-model="this.returnQueryInfo.cardID" style="width: 12.5vw;" clearable />
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="returnDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="returnDialogVisible = false;returnTableVisible = true; QueryBorrows()">
                        确认
                    </el-button>
                </span>
      </template>
    </el-dialog>

    <el-dialog v-model="borrowBookVisible" title="图书出借" width="30%">
      <span style="font-weight: bold;">请确认图书信息:</span>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">书号：</span>{{ borrowBookInfo.bookID }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">书名：</span>{{ borrowBookInfo.name }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">类别：</span>{{ borrowBookInfo.category }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">出版社：</span>{{ borrowBookInfo.press }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">年份：</span>{{ borrowBookInfo.year }}</p>
      <p style="padding: 2.5px;"><span style="font-weight: bold;">作者：</span>{{ borrowBookInfo.author }}</p>
      <span style="font-weight: bold;">请输入借书证号码</span>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
        <el-input v-model="this.borrowBookInfo.cardID" style="width: 12.5vw;" clearable />
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="borrowBookVisible = false">取消</el-button>
                    <el-button type="primary" @click="ConfirmBorrowBook">
                        确认
                    </el-button>
                </span>
      </template>
    </el-dialog>

    <el-dialog v-model="bookQueryVisible" title="书籍查询" width="30%">
      <span style="font-weight: bold;">请键入你想借的书的信息进行查询</span>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
        书名：
        <el-input v-model="this.bookQueryConditions.title" style="width: 12.5vw;" clearable />
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
        类别：
        <el-input v-model="this.bookQueryConditions.category" style="width: 12.5vw;" clearable />
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
        出版社：
        <el-input v-model="this.bookQueryConditions.press" style="width: 12.5vw;" clearable />
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
        作者：
        <el-input v-model="this.bookQueryConditions.author" style="width: 12.5vw;" clearable />
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
        价格范围：
        <el-input v-model="this.bookQueryConditions.min_price" style="width: 12.5vw;" clearable />~
        <el-input v-model="this.bookQueryConditions.max_price" style="width: 12.5vw;" clearable />
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
        出版年份范围：
        <el-input v-model="this.bookQueryConditions.min_year" style="width: 12.5vw;" clearable />~
        <el-input v-model="this.bookQueryConditions.max_year" style="width: 12.5vw;" clearable />
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
        按照
        <el-select v-model="bookQueryConditions.sortby" size="middle" style="width: 12.5vw;">
          <el-option v-for="sort_column in sort_columns" :key="sort_column.value" :label="sort_column.label" :value="sort_column.value" />
        </el-select>
        排序
      </div>
      <div style="margin-left: 2vw; font-weight: bold; font-size: 1rem; margin-top: 20px; ">
        顺序
        <el-select v-model="bookQueryConditions.order" size="middle" style="width: 12.5vw;">
          <el-option v-for="sort_order in orders" :key="sort_order.value" :label="sort_order.label" :value="sort_order.value" />
        </el-select>
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="bookQueryVisible = false">取消</el-button>
                    <el-button type="primary" @click="ConfirmQueryBook">
                        查询
                    </el-button>
                </span>
      </template>
    </el-dialog>

  </el-scrollbar>
</template>

<script>
import {Delete, Edit, Plus, Search, Star} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

export default {
  computed: {
    Search() {
      return Search
    },
    Star() {
      return Star
    }
  },
    components: {Plus},
    data() {
      return{
        books: [{ // 图书列表
          id: 1,
          name: 'Harry Potter',
          category: 'Novel',
          press: 'Bloomsbury',
          author: 'J.K.Rowling',
          year: '1997',
          price: '9.9',
          stock: '7'
        }
        ],
        toSearch :'',
        bookQueryVisible : false, //书籍查询对话框可见性
        bookQueryConditions:{
          title : '',
          category :'',
          press:'',
          author:'',
          min_year:0,
          max_year:2024,
          min_price:0,
          max_price:99999,
          sortby:'BOOK_ID',
          order:'ASC',
        },
        borrowBookVisible : false,
        borrowBookInfo:{
          bookID : 0,
          name: '',
          category: '',
          press: '',
          author: '',
          year: '',
          price: '',
          cardID : 0,
        },
        sort_columns: [ // 借书证类型
          {
            value: 'BOOK_ID',
            label: '书号',
          },
          {
            value: 'CATEGORY',
            label: '类别',
          },
          {
            value: 'TITLE',
            label: '书名',
          },
          {
            value: 'PRESS',
            label: '出版社',
          },
          {
            value: 'PUBLISH_YEAR',
            label: '出版年份',
          },
          {
            value: 'AUTHOR',
            label: '作者',
          },
          {
            value: 'PRICE',
            label: '价格',
          },
          {
            value: 'STOCK',
            label: '库存',
          }
        ],
        orders:[
          {
           value:'ASC',
           label:'升序',
          },
          {
            value:'DESC',
            label:'降序',
          }
        ],
        availableBookVisible : false,
        returnDialogVisible : false, //还书对话框可见性，输入cardid进行未归还借书记录查询
        returnTableVisible : false,
        returnQueryInfo:{
          cardID : '',
        },
        tableData: [{ // 列表项
          bookID: 0,
          title : '',
          category : '',
          press : '',
          author : '',
          year : 2024,
          price : 0,
          borrowTime: "",
          returnTime: "",
          borrowTimeValue :0,
        }],
        ConfirmReturnVisible : false, /*这是确认归还对话框可见性*/
        returnBookInfo :{
          bookID : 0,
          cardID : 0,
          title : '',
          category : '',
          press :'',
          author : '',
          year : 2024,
          price : 0,
          borrowTime : "",
          borrowTimeValue : 0,
        },
      }
    },
    methods:{
      async ConfirmQueryBook() {
        //确定查询图书，调用书籍查询功能实现，发送GET请求
        this.bookQueryVisible = false
        this.books = []
        let response = await axios.get('/user',{params:
            {
            option: 1,
            title : this.bookQueryConditions.title,
            category:this.bookQueryConditions.category,
            press:this.bookQueryConditions.press,
            min_publish_year:this.bookQueryConditions.min_year,
            max_publish_year:this.bookQueryConditions.max_year,
            author:this.bookQueryConditions.author,
            min_price:this.bookQueryConditions.min_price,
            max_price:this.bookQueryConditions.max_price,
            sortby:this.bookQueryConditions.sortby,
            sortorder:this.bookQueryConditions.order,
        }
        })
            let results = response.data
        results.forEach(result=>{
          if(result.stock>0){
            this.books.push(result)
          }
        })
        this.availableBookVisible = true
      },
      ConfirmBorrowBook(){
        axios.post("/user",{
          option:1,
          bookID:this.borrowBookInfo.bookID,
          cardID:this.borrowBookInfo.cardID,
        })
            .then(response=>{
              if(response.status ===200){
                ElMessage.success("借阅成功");
                this.borrowBookVisible = false;
              }
            })
            .catch(error =>{
              ElMessage.error("借阅失败");
              this.borrowBookVisible = false;
            })
      },
      ConfirmReturnBook(){
        axios.post("/user",{
          option:2,
          bookID:this.returnBookInfo.bookID,
          cardID:this.returnBookInfo.cardID,
          borrowTime:this.returnBookInfo.borrowTimeValue,
        })
            .then(response=>{
              if(response.status ===200){
                ElMessage.success("还书成功");
                this.ConfirmReturnVisible = false;
                this.QueryBorrows();
              }
            })
            .catch(error =>{
              ElMessage.error("还书失败");
            })
      },
      async QueryBorrows() {
          this.tableData = [] // 清空列表
          let response = await axios.get('/user', { params: { option:2, cardID: this.returnQueryInfo.cardID } })
          let borrows = response.data // 获取响应负载
          borrows.forEach(borrow => { // 对于每一个借书记录
            if(borrow.returnTime===0){
              this.tableData.push(borrow)
            }
          });
          this.returnTableVisible = true // 显示结果列表
      }
    }
}
</script>

<style scoped>
.borrowBox {
  height: 400px;
  width: 300px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  margin-top: 40px;
  margin-left: 27.5px;
  margin-right: 10px;
  padding: 7.5px;
  padding-right: 10px;
  padding-top: 15px;
}

.returnBox {
  height: 400px;
  width: 300px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  margin-top: 40px;
  margin-left: 27.5px;
  margin-right: 10px;
  padding: 7.5px;
  padding-right: 10px;
  padding-top: 15px;
}
</style>