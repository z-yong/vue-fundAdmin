<template>
    <div class="wraapper">
        <!-- 筛选时间 -->
        <div class="header">
             <div class="time">
                <p class="text">投标时间筛选:</p>
                <div class="block">
                    <el-date-picker v-model="value1" type="datetime" placeholder="选择开始时间">
                    </el-date-picker>
                </div>
                <span class="line">--</span>
                <div class="block right">
                    <el-date-picker v-model="value2" type="datetime" placeholder="选择结束时间">
                    </el-date-picker>
                </div>
            </div>
            <div class="selectData">
                <el-button type="primary" size="small" @click="selectData">筛选</el-button>
            </div>
            <div class="addData">
                <el-button type="primary" v-if="show" @click="changeTable('add')" size="small">添加</el-button>
            </div>
        </div>
        <router-view></router-view>
        <!-- 表格 -->
        <div id="box">
            <el-table width='80%' id="table" max-height="400" v-if="tableData.length > 0" :data="tableData" style="width: 100%" :border="true" :stripe='true'>
                <!-- type="index" 也可以添加序号 但有删除功能 会影响序号排列 所以需要手动添加序号-->
                <el-table-column label="序号" width="80" align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.index }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="创建时间" width="240" align='center'>
                    <template slot-scope="scope">
                         <i class="el-icon-time"></i>
                        <span>{{ scope.row.date }}</span>
                    </template>
                </el-table-column>

                <el-table-column label= '收支类型' width="140" align='center' prop="type">
                </el-table-column>

                <el-table-column label= '收支描述' width="140" align='center' prop="describe">
                </el-table-column>

                <el-table-column label= '收入' width="120" align='center' prop="income">
                    <template slot-scope="scope">
                        <span style="color: #00d053">{{ scope.row.income }}</span>
                    </template>
                </el-table-column>

                <el-table-column label= '支出' width="120" align='center' prop="expend">
                    <template slot-scope="scope">
                        <span style="color: #f56767">{{ scope.row.expend }}</span>
                    </template>
                </el-table-column>

                <el-table-column label= '账户现金' width="140" align='center' prop="cash">
                    <template slot-scope="scope">
                        <span style="color: #4db3ff">{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>

                <el-table-column label= '备注' width="140" align='center' prop="remark">
                </el-table-column>

                <el-table-column label="操作" width="180" align='center' fixed="right">
                    <template v-if="show" slot-scope="scope">
                        <el-button type="warning" size="mini" @click="changeTable('edit',scope.row._id)">
                            编辑
                        </el-button>
                        <el-button  size="mini" type="danger" @click="changeTable('delete',scope.row._id)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
         <div class="block page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="paging.currentPage"
            :page-sizes="paging.pageSizes"
            :page-size="paging.pageSize"
            :layout= paging.layout
            :total="paging.dataLen">
            </el-pagination>
        </div>
        <my-dialog :dialog='dialog' @updata='getTable'></my-dialog>
    </div>
</template>

<script>
import Dialog from './fund/Dialog.vue'

export default {
    components:{
        myDialog: Dialog
    },
    data() {
      return {
            show: false,
            tableData: [],////当前展示数据
            allTableData: [],//实际总数据
            dialog: {
                show: false,
                form: {}
            },
            paging: {
                currentPage: 1,//当前页
                pageSizes: [5,10,15,20],//每页显示多少条
                pageSize: 5,// 当前页显示多少条
                dataLen: 0,
                layout: "total, sizes, prev, pager, next, jumper"
            },
            value1: '',
            value2: '',
      }
    },
    // 过滤筛选条件
    computed: {
        identity(){
            // 获取用户身份
            return this.$store.getters.user.identity
        },
        getEntry(){
            //这里需要筛选总的数据 因为可能会多次筛选 那么每次都是从总数据内筛选 而不是在当前数据筛选
            return this.allTableData.filter( item =>{ 
                      const time = new Date(item.date).getTime()
                      if(this.value1 && this.value2){
                          return time >= this.value1.getTime() && time <= this.value2.getTime()
                      }else {
                          return true
                      }
            })
        }
    },
    // 初始化资金管理页面
    created(){
       this.getTable();
    //    设置权限  若该用户是管理员 即可以查看 添加 删除 修改数据 
    //    反之只能查看数据
       if(this.identity === 'manager') this.show = true
    },
    methods: {
        // 获取数据 单独拧出来 便于重复使用
        getTable(){  
           this.axios.get('/api/profile').then(data =>{
                this.allTableData = data.data;
                // 添加序号索引
                this.allTableData.forEach((ele,index) =>{
                    ele.index = index+1
                })
                // 设置分页
                this.paging.dataLen = this.allTableData.length; //总长度
                this.setPaging()
            },err =>{
                console.log(err.response)
            })
        }, 
       // 筛选
        selectData(){
            if(this.value1 && this.value2){
                // 过滤筛选条件之后再过滤其当前分页数 然后展示最后的数据
                this.tableData = this.getEntry.filter((item,index) =>{
                    return index < this.paging.pageSize
                } );
            }else{
                this.setPaging() //还原之前显示的数据条目
                this.$message({
                    type: 'warning',
                    message: '请选择时间区间'
                });
            }
        },
    //   过滤分页条件
        setPaging(){
            this.tableData = this.allTableData.filter((item,index) =>{
                return index < this.paging.pageSize //过滤当前展示数据数量
            })
        },
    //   每页多少条 事件触发
        handleSizeChange(pageSize) {
            // console.log(`每页 ${pageSize} 条`);
            this.paging.pageSize = pageSize;
            this.setPaging() 
        },
    // 当前哪一页
        handleCurrentChange(pageIndex) {
            // console.log(`当前页: ${pageIndex}`);
            this.paging.currentPage = pageIndex;
            const start = this.paging.pageSize * (pageIndex - 1);
            const end = start + this.paging.pageSize;
            this.tableData = this.allTableData.filter((item,index) =>{
                return index < end && index >= start //过滤当前展示数据数量 
            })
        },
    //   添加/编辑/删除
        changeTable(value,id){
            // 把tableData传过去 让dialog组件添加或者修改其内容 然后通过updataMyTable方法接收
            this.dialog.tableData = this.allTableData;
            if(value == 'add'){
                // 添加
                this.dialog.show = true//显示dialog
                this.dialog.title = '添加资金信息'
                this.dialog.form = {}//让其为空
            }else if(value == 'edit'){
                // 编辑
                this.dialog.title = '修改资金信息';
                this.dialog.show = true//显示dialog
                this.dialog.id = id;//将此条数据id传递给子组件dialog
                if(id){
                    //   将用户修改的内容返回给dialog弹框
                    this.tableData.forEach(ele =>{
                        if(ele._id === id){
                            this.dialog.form = ele;
                        }
                    })
                }
            }else if(value == 'delete'){
                //   删除
                this.open(id)
            }  
        },
        // 确认删除蒙层
        open(id) {
            this.$confirm('将永久删除该文件, 是否继续?', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.axios.delete('/api/profile/delete/'+id).then(result =>{

                    // this.getTable()// 可以重新post数据 但比较浪费性能

                    // 也可以在数组中找到相应的id返回其下标 将其删除 更高效 当前数据及总数据都删掉
                    this.deleteData(this.allTableData,id);
                    this.deleteData(this.tableData,id);
                    // 重新添加序号索引
                    this.allTableData.forEach((ele,index) =>{
                        ele.index = index+1
                    })
                    this.paging.dataLen = this.allTableData.length; // 总数据条目重新赋值
                    this.$message({
                        type: 'sucess',
                        message: '删除成功!'
                    });
                },err =>{
                    console.log(err.response)
                })
            
            }).catch(() => {
            //   this.$message({
            //     type: 'info',
            //     message: '已取消删除'
            //   });          
            });
        },
        deleteData(data,id){
            data.forEach(ele =>{
                for( const item in ele){
                    if(ele[item] === id){
                        const index = data.indexOf(ele);
                        data.splice(index,1)
                    }
                }
            })
        }
    }
  }
</script>
<style scoped>
    .header{
        width: 90%;
        display: flex;
        justify-content: space-between;
        margin: 10px auto 20px;
    }
    #box{
        width: 100%;
        height: 100%;
        padding: 16px;
        /* border: 1px solid #ddd */
    }
    .time{
        position: relative;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap; 
        margin-left: -50px
    }
    .line{
        line-height: 40px;
        margin: 0 5px
    }
    .text{
        line-height: 40px;
        margin-left: 10px;
        width: 100px;
        font-size: 14px
    }
    .el-button{
        height: 35px;
        margin-top: 2.5px;
        /* max-width: 56px; */
    }
    .selectData{
        margin-left: -320px
    }
    .page{
        margin-left: 43vw
    }
    .el-icon-time{
        margin-right: 10px
    }

    /* 媒体查询 */
    @media screen and (max-width:1200px) {
        .time{
            max-width: 300px;
            margin-left: 0;
            flex-direction: column;
        }
        .header .el-button{
            margin-top: 83px
        }
    }
    @media screen and (max-width: 1000px){
        .selectData{
            margin-left: -100px
        }
    }
    @media screen and (max-width: 754px){
        .selectData{
            margin-left: 0px
        }
    }
    @media screen and (max-width: 645px){
        .header{
            flex-direction: column;
            align-items: flex-start
        }
        .header .el-button{
            margin: 30px 0;
        }
        .header .selectData{
            margin-top: -20px
        }
        .addData{
            margin: -93px 0 0 120px
        }
    }
</style>


