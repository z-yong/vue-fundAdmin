<template>
    <div class="wrapper">
        <el-dialog :title="dialog.title" :visible.sync="dialog.show" :modal-append-to-body='false'>
          <el-form :model="dialog.form" ref="form" :rules="rules">
            <el-form-item label="收支类型" :label-width="formLabelWidth" prop="type">
              <el-select v-model="dialog.form.type" placeholder="请选择收支类型">
                <el-option :label="type" :value="type" v-for="(type,index) in types" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收支描述" :label-width="formLabelWidth" prop="describe">
              <el-input v-model="dialog.form.describe" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="收入" :label-width="formLabelWidth" prop="income">
              <el-input v-model="dialog.form.income" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="支出" :label-width="formLabelWidth" prop="expend">
              <el-input v-model="dialog.form.expend" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账户现金" :label-width="formLabelWidth" prop="cash">
              <el-input v-model="dialog.form.cash" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="dialog.form.remark" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item class="dialog-footer">
              <el-button type="primary " @click="submitForm('form')" class="submit" size="medium">提交</el-button>
              <el-button @click="dialog.show = false" type="info" class="exit" size="medium ">取 消</el-button>
            </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button type="primary " @click="submitForm('form')" class="submit" size="medium">提交</el-button>
              <el-button @click="dialog.show = false" type="info" class="exit" size="medium ">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  props: {
    dialog:{
        type: Object,
        required: true
    }
  },
  data(){
    return {
        types: [
          '提现','提现手续费','充值','充值优惠券','充值礼券','支付宝转账','微信转账'
        ],
        formLabelWidth: '120px',
        rules: {
           type:[
            {required: true,message: '请选择收支类型',}
          ],
          describe:[
            {required: true,message: '请填写收支描述',}
          ],
          income:[
            {required: true,message: '请填写收入',}
          ],
          expend:[
            {required: true,message: '请填写支出',}
          ],
          cash:[
            {required: true,message: '请填写目前账户现金!',}
          ],
        }
    }
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              const data = this.dialog.form;
              if(this.dialog.title === '修改资金信息'){
                // 编辑
                this.axios.post('/api/profile/edit/'+this.dialog.id,data).then(result =>{
                  // 友情提示
                  this.$message({
                    type: 'sucess',
                    message: '修改成功!'
                  });
                  // 隐藏dialog弹框
                  this.dialog.show = false
                },err =>{
                  console.log(err.response)
                })
              }else if(this.dialog.title === '添加资金信息'){
                // 添加
                this.axios.post('/api/profile/add',data).then(result =>{
                  // 将添加的数据push到父组件的tableData中
                  // this.dialog.tableData.push(result.data);
                  this.$emit('updata') //自定义事件 
                  // 友情提示
                  this.$message({
                    type: 'sucess',
                    message: '数据添加成功!'
                  })
                  // 隐藏dialog弹框
                  this.dialog.show = false;
                },err =>{
                  console.log(err.response);
                })
              }  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  }
}
</script>

<style scoped>
  .dialog-footer{
    text-align: center;
  }
  .exit{
    margin-left: 50px !important
  }
  .submit,.exit{
    padding: 15px 32px !important
  }
  
</style>

