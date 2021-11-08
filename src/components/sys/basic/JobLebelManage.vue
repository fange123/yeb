<template>
    <div>
      <div class='nav'>
        <el-input v-model="jl.name" suffix-icon="el-icon-plus" size='small' placeholder="请输入职称名称" style='width:300px;marginRight:10px'></el-input>
          <el-select v-model="jl.titleLevel" placeholder="职称等级"  size='small'>
            <el-option
              v-for="item in titleLevels"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
     <el-button type="primary" icon="el-icon-plus" size='small' style='marginLeft:10px' @click='addJobLevels'>添加</el-button>
      </div>
      <div>
        <el-table
        size='small'
        :data="jls"
        border
         @selection-change="handleSelectionChange"
        style="width: 80%">
        <el-table-column
        type="selection"
        width="55">
      </el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="职称名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="titleLevel"
          label="职称等级"
          width="150">
        </el-table-column>
        <el-table-column
          prop="createData"
          label="创建日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="enable"
          label="是否启用"
          >
           <template slot-scope="scope">
              <el-tag type="success" v-if='scope.row.enable'>已启用</el-tag>
              <el-tag type="danger" v-else>未启用</el-tag>


      </template>
        </el-table-column>
        <el-table-column
          label="操作">
           <template slot-scope="scope">
        <el-button
          size="mini"
          @click="showVisible(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" style='margin-top:20px' @click='handleDeleteAll' :disabled='this.multipleSelection.length === 0'>批量删除</el-button>
      <el-dialog
        title="编辑职称"
        :visible.sync="dialogVisible"
          width="30%">
          <el-form ref="form" :model="jlsEdit" label-width="80px" size="mini">
               <el-form-item label="职位名称" >
                <el-input v-model="jlsEdit.name"></el-input>
              </el-form-item>
              <el-form-item label="职位等级">
              <el-select v-model="jlsEdit.titleLevel" placeholder="请选择职位等级">
                <el-option  v-for='item in titleLevels' :label='item' :value="item" :key='item'></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="是否开启">
              <el-switch v-model="jlsEdit.enable"></el-switch>
            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
          <el-button type="primary" @click="handleSubmit" size='small'>确 定</el-button>
        </span>
      </el-dialog>
      </div>

    </div>
</template>

<script>
export default {
  name:'JobLebelManage',
    props: {

    },
    data() {
        return {
          jl:{
            name:'',
            titleLevel:''
          },
          titleLevels:['正高级','副高级','中级','初级','员级'],
        jls:[],
        dialogVisible:false,
        jlsEdit:{
          name:'',
          titleLevel:'',
          enable:false

        },
        currentId:"",
        multipleSelection:[]


        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
      this.getJobLevels()

    },
    watch: {

    },
    methods: {

      handleDeleteAll(){
         this.$confirm(`此操作将永久删除所选职位, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.postRequest('/api/system/basic/jobLevels/all/delete',{idArr:this.multipleSelection}).then(res=> {
          if(res.success){
            this.$message.success(res.message)
            this.getJobLevels()
          }
        })

        }).catch(() => {
          console.log('已取消删除')
        });

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      showVisible(_,data){
        this.dialogVisible = true
        Object.assign(this.jlsEdit,data)
        this.currentId = data.id
      },
      handleDelete(_,data){
        this.$confirm(`此操作将永久删除该${data.name}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest("/api/system/basic/jobLevels/delete",{id:data.id}).then(res=> {
            if(res.success){
              this.$message.success(res.message)
              this.getJobLevels()

            }
          })

        }).catch(() => {
          console.log('已取消删除')
        });
      },
      getJobLevels(){
        this.getRequest('/api/system/basic/jobLevels').then(res=> {
          this.jls = res.data
          this.jl.name = ''
          this.jl.titleLevel = ''
        })
      },
      addJobLevels(){
        if(this.jl.name && this.jl.titleLevel){
        this.postRequest('/api/system/basic/jobLevels',{name:this.jl.name,titleLevel:this.jl.titleLevel}).then(res=> {
          if(res.success){
            this.$message.success(res.message)
            this.getJobLevels()
          }
        })

        }else{
          this.$message.error('字段不能为空')
        }

      },
      handleSubmit(){
       if(this.jlsEdit.name && this.jlsEdit.titleLevel ){
          this.putRequest('/api/system/basic/jobLevels/edit',{id:this.currentId,name:this.jlsEdit.name,enable:this.jlsEdit.enable,titleLevel:this.jlsEdit.titleLevel}).then(res=> {
          if(res.success){
            this.$message.success(res.message)
            this.dialogVisible = false
            this.getJobLevels()

          }
        })

        }else {
          this.$message.error('字段不能为空')
        }
       }

    },
    components: {

    },
};
</script>

<style scoped >
.nav {
  margin-bottom:20px
}

</style>
