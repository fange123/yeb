<template>
    <div style='width:500px'>
      <el-input
      size='small'
      prefix-icon='el-icon-search'
        placeholder="输入关键字部门..."
        v-model="filterText">
      </el-input>

      <el-tree
        :data="deps"
        :props="defaultProps"
        :filter-node-method="filterNode"
        :expand-on-click-node='false'
        ref="tree">
          <span class="custom-tree-node" slot-scope="{ node, data }" style='display:flex;justify-content:space-between;width:100%'>
        <span >{{ data.name}}</span>
        <span class='del_btn'>
          <el-button
            type="primary"
            size="mini"
            @click="() => showAddDep(data)">
            添加部门
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="() => deleteDep(data)">
            删除部门
          </el-button>
        </span>
      </span>
      </el-tree>
      <el-dialog
        title="添加部门"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form :model="addDeps">
          <el-form-item label="上级部门" >
            <el-input v-model="addDeps.parentName" :disabled='true'></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="addDeps.name" ></el-input>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
          <el-button type="primary" @click="addNodeDep"  size='small'>确 定</el-button>
        </span>
      </el-dialog>

    </div>
</template>

<script>
export default {
  name:'PosManage',
    props: {

    },
    data() {
        return {
          filterText:"",
          deps:[],
          defaultProps: {
          children: 'children',
          label: 'name'
        },
        dialogVisible:false,
        addDeps:{
          parentName:'',
          name:'',
          parentId:-1
        }

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
      this.getAllDeps()

    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }

    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      getAllDeps(){
        this.getRequest('/api/system/basic/deps').then(res=> {
          if(res.data){
            this.deps = res.data

          }
        })
      },
      showAddDep(data){
        this.dialogVisible = true
        this.addDeps.parentName = data.name
        this.addDeps.parentId = data.id

      },
      addNodeDep(){
        this.postRequest('/api/system/basic/deps',{parentId:this.addDeps.parentId,name:this.addDeps.name}).then(res=> {
          if(res.success){
            this.$message.success(res.message)
             this.dialogVisible = false
             this.addDeps.parentName = ''
             this.addDeps.name = ''
             this.getAllDeps()
          }
        })


      },
      deleteDep(data){
 console.log(data);
      },

    },
    components: {

    },
};
</script>

<style scoped >
.del_btn .el-button {
  padding:2px
}

</style>
