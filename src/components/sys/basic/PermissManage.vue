<template>
    <div>
      <div class='permission'>
         <el-input placeholder="请输入角色英文名" v-model="role.name" size='small'>
            <template slot="prepend">ROLE_</template>
          </el-input>
          <el-input v-model="role.nameZh" placeholder="请输入角色中文名"  size='small' @keydown.enter.native='addPermission()'></el-input>
         <el-button type="primary" icon="el-icon-plus" size='small'  @click='addPermission()' >添加角色</el-button>

      </div>
      <div class='main'>
        <el-collapse v-model="activeName" accordion @change='change'>
          <el-collapse-item :title="item.nameZh" :name="item.id" v-for='(item,index) in roles' :key='item.id'>
           <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>可访问资源</span>
                <el-button style="float: right;color:#f00; padding: 3px 0"  icon="el-icon-delete" type='text' @click='handleDelete(item)'></el-button>
              </div>
              <div>
                <el-tree :key='Math.random()' ref="tree" :data="allMenus" show-checkbox :props="defaultProps" node-key="id"
  :default-checked-keys="selectMenus"></el-tree>
              </div>
              <div class='btn'>
                <el-button size="mini" @click='handleCancel()'>取消修改</el-button>
                <el-button type="primary" size="mini" @click='handleEdit(item.id,index)'>确认修改</el-button>
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
          activeName:'',
          roles:[],
           defaultProps: {
            children: 'children',
            label: 'name'
          },
          allMenus:[],
          selectMenus:[]

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
      handleEdit(id,index){
         //TODO:这个功能mock不了
        this.putRequest('/api/system/basic/permission',{keys:this.$refs.tree[index].getCheckedNodes(true)}).then(res=> {
          if(res.success){
            this.$message.success(res.message)
            this.getSelectMenus()
            this.activeName = -1

          }
        })

      },
      handleDelete(role){
        this.$confirm(`此操作将永久删除[${role.nameZh}], 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/api/system/basic/permission',{id:role.id}).then(res=> {
            if(res.success){
              this.$message.success(res.message)
              this.getPermission()

            }
          })

        }).catch(() => {
          console.log('已取消删除')
        });

      },
      handleCancel(){
        this.activeName = -1
      },
      addPermission(){
        if(this.role.name && this.role.nameZh){
          this.postRequest('/api/system/basic/permission',{name:this.role.name,nameZh:this.role.nameZh}).then(res=> {
            if(res.success){
            this.$message.success(res.message)
            this.role.name = ''
            this.role.nameZh = ''
            this.getPermission()
          }
          })


        }else{
          this.$message.error('字段不能为空')
        }
      },
      getSelectMenus(rid){
        this.getRequest('/api/system/basic/permission/select',{rid}).then(res=> {
          if(res.data){
            this.selectMenus = res.data
          }

        })
      },
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
         this.getSelectMenus(rid)

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
.btn {
  margin-top:10px;
  display:flex;
  justify-content:flex-end;
}

</style>
