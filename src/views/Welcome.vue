<template>
    <el-container>
  <el-header>Header</el-header>
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
      <router-view/>
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

        };
    },
    computed:{
      routes(){
        return this.$store.state.routes

      }

    },

    methods: {


    },
    components: {

    },
};
</script>

<style scoped>

</style>
