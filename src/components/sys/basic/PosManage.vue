<template>
    <div>
      <div>
          <el-input
          class="add_input"
              size='small'
              placeholder="请输入职位"
              suffix-icon="el-icon-plus"
              v-model="pos.name"
              @keydown.enter.native='addPositions'
              >
          </el-input>
           <el-button type="primary" icon="el-icon-plus" size='small' @click='addPositions'>添加</el-button>
      </div>
      <div class="main">
        <el-table
        stripe
        border
        size='small'
      :data="positions"
      @selection-change="handleSelectionChange"
      style="width: 70%">
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
        label="职位"
        >
      </el-table-column>
      <el-table-column
        prop="createData"
        label="创建时间"
         ></el-table-column>
      <el-table-column
        label="操作"
         >
         <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template></el-table-column>

    </el-table>
    <el-dialog
        title="编辑职位"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <div>
          <el-tag>职位名称</el-tag>
          <el-input v-model="updatePos.name" class="input_position"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
          <el-button type="primary" @click="updateInfo" size='small'>确 定</el-button>
  </span>
</el-dialog>
 <el-button type="danger" size='small' style="
 marginTop:10px" :disabled='this.multipleSelection.length === 0' @click='handleDeleteAll'>批量删除</el-button>
      </div>


    </div>
</template>

<script>
export default {
  name:'DepManage',
    props: {

    },
    data() {
        return {
          pos:{
            name:'',
          },
          positions: [],
          dialogVisible:false,
          updatePos:{
            name:''
          },
          currentId:'',
          multipleSelection:[]

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
      this.getPositions()

    },
    watch: {

    },
    methods: {
      getPositions(){
        this.getRequest('/api/system/basic/pos').then(res=> {
          if(res.data){
              this.positions = res.data
              this.pos.name = ''
          }
        })
      },
      handleEdit(_,data){
        this.dialogVisible = true
        //!放置修改原数据
        this.updatePos = Object.assign({},data)
        this.currentId = data.id

      },
      updateInfo(){

        this.putRequest('/api/system/basic/pos/edit',{
          id:this.currentId,
          name:this.updatePos.name
        }).then((res)=> {
          this.dialogVisible = false
          this.$message.success(res.message)
          this.getPositions()
        })

      },
      handleDelete(_,data){
        this.$confirm('此操作将永久删除该职位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest("/api/system/basic/pos/delete",{id:data.id}).then(res=> {
            if(res.success){
              this.$message.success(res.message)
              this.getPositions()

            }
          })

        }).catch(() => {
          console.log('已取消删除')
        });
      },
      handleDeleteAll(){
        this.$confirm('确定批量删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest("/api/system/basic/pos/all/delete",{idArr:this.multipleSelection}).then(res=> {
            if(res.success){
              this.$message.success(res.message)
              this.getPositions()

            }
          })

        }).catch(() => {
          console.log('已取消删除');
        });
      },
      addPositions(){
        if(this.pos.name){
          this.postRequest('/api/system/basic/pos',{...this.pos,number:this.positions.length}).then(res=> {
            if(res.success){
              this.$message.success(res.message)
              this.getPositions()

            }
          })

        }else {
           this.$message.error('职位名称不能为空');
        }
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
      }


    },
    components: {

    },
};
</script>

<style scoped>
.add_input {
  width: 300px;
  margin-right: 10px;
}
.main {
  margin-top: 10px;
}
.input_position {
  width: 300px;
  margin-left: 20px;

}

</style>

