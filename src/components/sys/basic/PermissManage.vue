<template>
    <div>
      <div class='permission'>
         <el-input placeholder="请输入角色英文名" v-model="role.name" size='small'>
            <template slot="prepend">ROLE_</template>
          </el-input>
          <el-input v-model="role.nameZh" placeholder="请输入角色中文名"  size='small'></el-input>
         <el-button type="primary" icon="el-icon-plus" size='small'  @click='addPermission'>添加角色</el-button>

      </div>
      <div class='main'>
        <el-collapse v-model="activeName" accordion @change='change'>
          <el-collapse-item :title="item.nameZh" :name="item.id" v-for='item in roles' :key='item.id'>
           <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>可访问资源</span>
                <el-button style="float: right;color:#f00; padding: 3px 0"  icon="el-icon-delete" type='text'></el-button>
              </div>
              <div>
                <el-tree :data="allMenus" show-checkbox :props="defaultProps" ></el-tree>
              </div>
            </el-card>
          </el-collapse-item>

        </el-collapse>
      </div>
    </div>
</template>

<script>
export default {
  name:'PermissManage',
    props: {

    },
    data() {
        return {
          role:{
            name:'',
            nameZh:''
          },
          activeName:'2',
          roles:[],
           defaultProps: {
            children: 'children',
            label: 'name'
          },
          allMenus:[]

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
      this.getPermission()

    },
    watch: {

    },
    methods: {
      addPermission(){},
      getPermission(){
        this.getRequest('/api/system/basic/permission').then(res=> {
          if(res.data){
            this.roles = res.data
          }

        })
      },
      change(rid){
        if(rid){
         this.getPerMenus()

        }
      },
      getPerMenus(){
        this.getRequest('/api/system/basic/permission/menus').then(res=> {
          if(res.data){
            this.allMenus = res.data

          }
        })
      }

    },
    components: {

    },
};
</script>

<style scoped >
.permission {
  display:flex
}
.permission .el-input{
  width:300px;
  margin-right:10px
}
.main {
  width:720px;
  margin-top:20px
}

</style>
