<template>
    <div>
      <div>
        <el-input v-model="username" placeholder="根据用户名搜索" prefix-icon='el-icon-search' size='small' style="width:400px;margin-right: 10px;"></el-input>
      <el-button type="primary" icon="el-icon-search" size='small' @click='handleSearch'>搜索</el-button>
      </div>
      <div class="card_list">
        <el-card class="box-card" v-for="item in allRoles" :key='item.id'>
        <div slot="header" class="clearfix">
          <span>{{item.name}}</span>
          <el-button style="float: right; padding: 3px 0;color:#f00" type="text" icon="el-icon-delete" @click='handleDelete(item)'></el-button>
        </div>
        <div class="img_content"><img :src="item.url" alt=""></div>
        <div>
          <p>用户名：{{item.name}}</p>
          <p>手机号码：{{item.phone}}</p>
          <p>电话号码：{{item.telephone}}</p>
          <p>地址：{{item.address}}</p>
          <p>用户角色：
            <el-tag type="danger" v-for="tag in item.role" :key='tag.id' size='mini' style="margin-right:5px">{{tag.value}}</el-tag>
              <el-popover
              @show='handleShow(item)'
              @hide='handleHide'
                placement="right"
                title="用户角色"
                width="200"
                trigger="click"
                >
                  <el-select v-model="selectRoles" placeholder="请选择" size='small' multiple>
                    <el-option
                      v-for="item in allSelectRoles"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>

               <el-button slot="reference" type='text'>...</el-button>

              </el-popover>
            </p>
          <p>备注：{{item.remark}}</p>
        </div>
      </el-card>

      </div>
    </div>
</template>

<script>

export default {
  name:'SysAdmin',
    props: {

    },
    data() {
        return {
          username:'',
          allRoles:[],
          allSelectRoles:[],
          selectRoles:[]

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
      this.getAllRoles()


    },
    watch: {

    },
    methods: {
      getAllRoles(){
        this.getRequest('/api/system/admin').then(res=> {
          if(res.data){
            this.allRoles = res.data

          }
        })
      },
      getAdminSelect(){
        this.getRequest('/api/system/admin/select').then(res=> {
          if(res.data){
            this.allSelectRoles = res.data

          }
        })
      },
      handleSearch(){
        this.getRequest('/api/system/admin',{username:this.username}).then(res=> {
          if(res.data){
            this.allRoles = res.data

          }
        })
      },
      handleShow(admin){
        this.selectRoles = admin.role.map(item=>item.id)

        this.getAdminSelect()
      },
      handleHide(){
        //TODO:修改用户角色的操作请求...
      },
      handleDelete(admin){
        this.$confirm(`此操作将永久删除[${admin.name}], 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.deleteRequest('/api/system/admin',{id:admin.id}).then(res=> {
          if(res.success){
            this.$message.success(res.message)
            this.getAllRoles()
          }
        })

        }).catch(() => {
          console.log('已取消删除')
        });


      }

    },
    components: {

    },
};
</script>

<style scoped >
.card_list {
  margin-top: 20px;
  widows: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 12px;
}
.card_list::after{
    content: "";
    width: 350px;
}
.box-card{
  width: 350px;
  height: 300px;
}
.clearfix span {
  font-size: 16px;
}
p{
  color: rgb(36, 152, 247);

}
.img_content{
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.img_content img {
  width: 50px;
  height: 50px;
  border-radius: 50%;

}

</style>
