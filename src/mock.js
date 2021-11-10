// 引入mockjs
const Mock = require("mockjs");
import imgCode from "./assets/code.png";
import imgPic from "./assets/hair.jpeg";

import {
  addPos,
  getAllPos,
  deletePos,
  editPos,
  deleteAllPos,
  getJobLevels,
  addJobLevels,
  deleteJobLevel,
  editJobLevel,
  deleteJobLevels,
  getPermission,
  getPerMenu,
  getPerById,
  editPermission,
} from "./mock/sys";

//获取验证码
const getCaptcha = function() {
  return {
    code: 200,
    data: imgCode,
  };
};

//登录
const login = function(params) {
  const { username, password } = JSON.parse(params.body);
  let isLogin = false;
  if (username === "admin" && password === "123") {
    isLogin = true;
    return {
      data: {
        token: "张大宝好帅",
      },
      code: 200,
      success: true,
      message: "登录成功",
    };
  }
  return {
    code: 403,
    success: false,
    message: "用户名活密码错误",
  };
};

//登出
const logout = function() {
  return {
    code: 200,
    data: null,
    message: "注销成功",
  };
};
//获取菜单
const getMenu = function() {
  return {
    data: {
      routes: [
        {
          path: "/welcome",
          name: "员工资料",
          component: "Welcome",
          iconCls: "el-icon-s-home",
          children: [
            {
              path: "/emp/adv",
              name: "高级资料",
              component: "EmpAdv",
            },
            {
              path: "/emp/basic",
              name: "基本资料",
              component: "EmpBasic",
            },
          ],
        },
        {
          path: "/welcome",
          name: "人事管理",
          component: "Welcome",
          iconCls: "el-icon-s-management",
          children: [
            {
              path: "/per/ec",
              name: "员工奖惩",
              component: "PerEc",
            },
            {
              path: "/per/emp",
              name: "员工资料",
              component: "PerEmp",
            },
            {
              path: "/per/mv",
              name: "员工调动",
              component: "PerMv",
            },
            {
              path: "/per/salary",
              name: "员工调薪",
              component: "PerSalary",
            },
            {
              path: "/per/train",
              name: "员工培训",
              component: "PerTrain",
            },
          ],
        },
        {
          path: "/welcome",
          name: "薪资管理",
          component: "Welcome",
          iconCls: "el-icon-sugar",
          children: [
            {
              path: "/sal/month",
              name: "月末处理",
              component: "SalMonth",
            },
            {
              path: "/sal/search",
              name: "工资查询",
              component: "SalSearch",
            },
            {
              path: "/sal/sob",
              name: "工资帐套管理",
              component: "SalSob",
            },
            {
              path: "/sal/sobCfg",
              name: "员工帐套设置",
              component: "SalSobCfg",
            },
            {
              path: "/sal/table",
              name: "工资表管理",
              component: "SalTable",
            },
          ],
        },
        {
          path: "/welcome",
          name: "统计管理",
          component: "Welcome",
          iconCls: "el-icon-chat-line-round",
          children: [
            {
              path: "/sta/all",
              name: "综合信息统计",
              component: "StaAll",
            },
            {
              path: "/sta/pers",
              name: "人事信息统计",
              component: "StaPers",
            },
            {
              path: "/sta/record",
              name: "人事记录统计",
              component: "StaRecord",
            },
            {
              path: "/sta/store",
              name: "员工积分统计",
              component: "StaStore",
            },
          ],
        },
        {
          path: "/welcome",
          name: "系统管理",
          component: "Welcome",
          iconCls: "el-icon-setting",
          children: [
            {
              path: "/sys/admin",
              name: "操作员管理",
              component: "SysAdmin",
            },
            {
              path: "/sys/basic",
              name: "基础信息设置",
              component: "SysBasic",
            },
            {
              path: "/sys/config",
              name: "基础设置",
              component: "SysConfig",
            },
            {
              path: "/sys/data",
              name: "备份获取数据库",
              component: "SysData",
            },
            {
              path: "/sys/init",
              name: "初始化据库",
              component: "SysInit",
            },
            {
              path: "/sys/log",
              name: "操作日志管理",
              component: "SysLog",
            },
          ],
        },
      ],
    },
    code: 200,
    success: true,
    message: "操作成功",
  };
};

//获取用户信息

const getAdminInfo = function() {
  return {
    code: 200,
    data: {
      username: "张大宝",
      userId: 1,
      imgUrl: imgPic,
      role: "admin",
      name: "系统管理员",
      address: "爱尔兰",
      telephone: "12345612345",
    },
  };
};

// 请求该url，就可以返回内容
Mock.mock("/api/captcha", getCaptcha);
Mock.mock("/api/login", "post", login);
Mock.mock("/api/menu", getMenu);
Mock.mock("/api/admin/info", getAdminInfo);
Mock.mock("/api/logout", "post", logout);

//系统管理
Mock.mock("/api/system/basic/pos", "post", addPos);
Mock.mock("/api/system/basic/pos", getAllPos);
Mock.mock("/api/system/basic/pos/delete", "post", deletePos);
Mock.mock("/api/system/basic/pos/edit", "put", editPos);
Mock.mock("/api/system/basic/pos/all/delete", "delete", deleteAllPos);

Mock.mock("/api/system/basic/jobLevels", "post", addJobLevels);
Mock.mock("/api/system/basic/jobLevels", getJobLevels);
Mock.mock("/api/system/basic/jobLevels/delete", "post", deleteJobLevel);
Mock.mock("/api/system/basic/jobLevels/edit", "put", editJobLevel);
Mock.mock("/api/system/basic/jobLevels/all/delete", "post", deleteJobLevels);

Mock.mock("/api/system/basic/permission", "put", editPermission);
Mock.mock("/api/system/basic/permission", getPermission);
Mock.mock("/api/system/basic/permission/menus", getPerMenu);
Mock.mock("/api/system/basic/permission/select", getPerById);
