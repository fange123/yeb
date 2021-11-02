<template>
    <el-container>
  <el-header class="home_header">
    <div class="title">logo</div>
    <el-dropdown class="user_info" @command="handleCommand">
      <span class="el-dropdown-link">
        {{user.name }}<i><img :src="user.imgUrl" alt=""></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
        <el-dropdown-item command="setting">设置</el-dropdown-item>
        <el-dropdown-item command="logout">注销登录</el-dropdown-item>

      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu router unique-opened>
      <el-submenu :index="index+''" v-if="!item.hidden" v-for="(item,index) in routes" :key='index'>
        <template slot="title"><i :class='item.iconCls' style="color:#3498db"></i>{{item.name}}</template>
          <el-menu-item :index="children.path" v-for="(children,i) in item.children" :key='i'>{{children.name}}</el-menu-item>
        </el-submenu>
        </el-menu>
    </el-aside>
    <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path !== '/welcome'">
          <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="welcome" v-if="this.$router.currentRoute.path === '/welcome'">
          欢迎欢迎，热烈欢迎~~~
        </div>
      <router-view class="home_route_view"/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>


export default {
  name:'Welcome',
    props: {

    },
    data() {
        return {
          user:JSON.parse(sessionStorage.getItem('user'))

        };
    },
    computed:{
      routes(){
        return this.$store.state.routes

      }

    },

    methods: {
      handleCommand(command) {
        switch (command) {
          case 'userInfo':

            break;
          case 'setting':

            break;
          case 'logout':
            this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest('/api/logout').then((res)=> {
              sessionStorage.removeItem('token')
              sessionStorage.removeItem('user')
              this.$router.replace('/')
              this.$store.commit('initRoutes',[])
              this.$message({
            type: 'success',
            message: res.message
          });
            })
        }).catch(() => {

        });

            break;

          default:
            break;
        }
      }


    },
    components: {

    },
};
</script>

<style scoped>
.home_header{
  background: #1e90ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.home_header .title {
  font-size: 30px;
  text-transform: uppercase;
  font-weight: bolder;
  font-family:Arial, Helvetica, sans-serif;
  color: #ffffff;
}

.home_header .user_info {
  cursor: pointer;
  color: #ffffff;
}
.el-dropdown-link img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-left: 20px;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
}
.welcome {
  text-align: center;
  font-size: 30px;
  margin-top: 60px;
  color: #70a1ff;
}
.home_route_view {
  margin-top: 20px;
}

</style>
