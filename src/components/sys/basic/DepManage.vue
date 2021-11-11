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
        console.log(data);

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
