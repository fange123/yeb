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
        ref="tree">
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
      }

    },
    components: {

    },
};
</script>

<style scoped >

</style>
