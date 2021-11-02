<template>
     <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="部门管理" name="DepManageVue">
      <DepManageVue/>
    </el-tab-pane>
    <el-tab-pane label="职位管理" name="PosManageVue">
      <PosManageVue/>
    </el-tab-pane>
    <el-tab-pane label="职称管理" name="JobLebelManageVue">
      <JobLebelManageVue/>
    </el-tab-pane>
    <el-tab-pane label="奖惩规则" name="fourth">
      <EcManageVue/>
    </el-tab-pane>
    <el-tab-pane label="权限组" name="EcManageVue">
      <PermissManageVue/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import DepManageVue from "../../components/sys/basic/DepManage.vue";
import PosManageVue from "../../components/sys/basic/PosManage.vue";
import PermissManageVue from "../../components/sys/basic/PermissManage.vue";
import JobLebelManageVue from "../../components/sys/basic/JobLebelManage.vue";
import EcManageVue from "../../components/sys/basic/EcManage.vue";

export default {
  name:'SysBasic',
    props: {

    },
    data() {
        return {
          activeName:'DepManageVue'

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {
      DepManageVue,
      PosManageVue,
      PermissManageVue,
      JobLebelManageVue,
      EcManageVue

    },
};
</script>

<style scoped >

</style>
