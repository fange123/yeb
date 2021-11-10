import moment from "moment";

//TODO:职位管理
//添加职位

let posData = [
  {
    id: 10000,
    name: "技术总监",
    createData: "2021-10-20",
    enable: true,
  },
  {
    id: 10100,
    name: "运营总监",
    createData: "2021-10-21",
    enable: true,
  },
  {
    id: 10200,
    name: "市场总监",
    createData: "2021-10-23",
    enable: true,
  },
  {
    id: 10300,
    name: "研发工程师",
    createData: "2021-10-25",
    enable: true,
  },
  {
    id: 10400,
    name: "运维工程师",
    createData: "2021-10-29",
    enable: true,
  },
];
let name, id;

const addPos = function(params) {
  name = JSON.parse(params.body).name;
  id = Math.floor((Math.random() + 104) * 100);
  posData = [
    ...posData,
    { name, id, createData: moment().format("YYYY-MM-DD"), enable: true },
  ];
  return {
    code: 200,
    success: true,
    message: "添加成功",
  };
};

//获取所有职位
const getAllPos = function() {
  return {
    code: 200,
    success: true,
    message: "添加成功",
    data: posData,
  };
};

//删除单个职位

const deletePos = function(params) {
  let deleteId = JSON.parse(params.body).id;
  posData = posData
    .map((item) => (item.id !== deleteId ? item : null))
    .filter((i) => i !== null);
  return {
    code: 200,
    success: true,
    message: "删除成功",
  };
};
//批量删除职位

const deleteAllPos = function(params) {
  let idArr = JSON.parse(params.body).idArr.map((item) => item.id);

  //+根据勾选id批量删除
  posData = posData
    .map((item) => (idArr.includes(item.id) ? null : item))
    .filter((item) => item !== null);
  console.log(posData);
  return {
    code: 200,
    success: true,
    message: "批量删除成功",
  };
};

//编辑单个职位

const editPos = function(params) {
  let editId = JSON.parse(params.body).id;
  let name = JSON.parse(params.body).name;
  posData = posData.map((item) => {
    if (item.id === editId) {
      return { ...item, name };
    }
    return item;
  });

  return {
    code: 200,
    success: true,
    message: "编辑成功",
  };
};
// TODO:等级管理

let jobLevelsData = [
  {
    id: 10000,
    name: "教授",
    titleLevel: "正高级",
    createData: "2021-10-20",
    enable: true,
  },
  {
    id: 10020,
    name: "副教授",
    titleLevel: "副高级",
    createData: "2021-10-20",
    enable: true,
  },
  {
    id: 10030,
    name: "助教",
    titleLevel: "初级",
    createData: "2021-10-20",
    enable: false,
  },
  {
    id: 10090,
    name: "讲师",
    titleLevel: "中级",
    createData: "2021-10-20",
    enable: true,
  },
  {
    id: 10070,
    name: "初级工程师",
    titleLevel: "初级",
    createData: "2021-10-20",
    enable: true,
  },
];
//获取所有职称
const getJobLevels = function() {
  return {
    code: 200,
    success: true,
    message: "获取成功",
    data: jobLevelsData,
  };
};
//添加职称
let jobName, titleLevel, jobId;
const addJobLevels = function(params) {
  console.log(params);
  jobName = JSON.parse(params.body).name;
  titleLevel = JSON.parse(params.body).titleLevel;
  jobId = Math.floor((Math.random() + 104) * 100);
  jobLevelsData = [
    ...jobLevelsData,
    {
      name: jobName,
      titleLevel,
      id: jobId,
      createData: moment().format("YYYY-MM-DD"),
      enable: true,
    },
  ];
  return {
    code: 200,
    success: true,
    message: "添加成功",
  };
};

//删除单个职称

const deleteJobLevel = function(params) {
  let deleteId = JSON.parse(params.body).id;
  jobLevelsData = jobLevelsData
    .map((item) => (item.id !== deleteId ? item : null))
    .filter((i) => i !== null);
  return {
    code: 200,
    success: true,
    message: "删除成功",
  };
};

//编辑单个职位等级

const editJobLevel = function(params) {
  let editId = JSON.parse(params.body).id;
  let name = JSON.parse(params.body).name;
  let titleLevel = JSON.parse(params.body).titleLevel;
  let enable = JSON.parse(params.body).enable;

  jobLevelsData = jobLevelsData.map((item) => {
    if (item.id === editId) {
      return { ...item, name, titleLevel, enable };
    }
    return item;
  });

  return {
    code: 200,
    success: true,
    message: "编辑成功",
  };
};
//批量删除等级

const deleteJobLevels = function(params) {
  let idArr = JSON.parse(params.body).idArr.map((item) => item.id);

  //+根据勾选id批量删除
  jobLevelsData = jobLevelsData
    .map((item) => (idArr.includes(item.id) ? null : item))
    .filter((item) => item !== null);
  return {
    code: 200,
    success: true,
    message: "批量删除成功",
  };
};

//TODO:权限组管理
let permissionData = [
  {
    id: 10001,
    name: "ROLE_manager",
    nameZh: "部门经理",
  },
  {
    id: 10011,
    name: "ROLE_personnel",
    nameZh: "人事专员",
  },
  {
    id: 10020,
    name: "ROLE_recruiter",
    nameZh: "招聘主管",
  },
  {
    id: 10031,
    name: "ROLE_train",
    nameZh: "培训主管",
  },
  {
    id: 10010,
    name: "ROLE_performance",
    nameZh: "薪酬绩效主管",
  },
  {
    id: 10021,
    name: "ROLE_admin",
    nameZh: "系统管理员",
  },
];
const getPermission = function() {
  return {
    code: 200,
    success: true,
    message: "查询成功",
    data: permissionData,
  };
};

//获取权限菜单
const getPerMenu = function() {
  return {
    data: [
      {
        id: 1,
        name: "所有",
        children: [
          {
            name: "员工资料",
            id: 2,
            children: [
              { id: 3, name: "高级资料" },
              {
                id: 4,
                name: "基本资料",
              },
            ],
          },
          {
            name: "人事管理",
            id: 5,
            children: [
              {
                id: 6,
                name: "员工奖惩",
              },
              {
                id: 7,
                name: "员工资料",
              },
              {
                id: 8,
                name: "员工调动",
              },
              {
                id: 9,
                name: "员工调薪",
              },
              {
                id: 10,
                name: "员工培训",
              },
            ],
          },
          {
            name: "薪资管理",
            id: 11,
            children: [
              {
                name: "月末处理",
                id: 12,
              },
              {
                name: "工资查询",
                id: 13,
              },
              {
                name: "工资帐套管理",
                id: 14,
              },
              {
                name: "员工帐套设置",
                id: 15,
              },
              {
                name: "工资表管理",
                id: 16,
              },
            ],
          },
          {
            name: "统计管理",
            id: 17,
            children: [
              {
                name: "综合信息统计",
                id: 18,
              },
              {
                name: "人事信息统计",
                id: 19,
              },
              {
                name: "人事记录统计",
                id: 20,
              },
              {
                name: "员工积分统计",
                id: 21,
              },
            ],
          },
          {
            name: "系统管理",
            id: 22,
            children: [
              {
                name: "操作员管理",
                id: 23,
              },
              {
                name: "基础信息设置",
                id: 24,
              },
              {
                name: "基础设置",
                id: 25,
              },
              {
                name: "备份获取数据库",
                id: 26,
              },
              {
                name: "初始化据库",
                id: 27,
              },
              {
                name: "操作日志管理",
                id: 28,
              },
            ],
          },
        ],
      },
    ],

    code: 200,
    success: true,
    message: "操作成功",
  };
};
//根据id获取权限

/**
 * 生成一个从 start 到 end 的连续数组
 * @param start
 * @param end
 */
function generateArray(start, end) {
  return Array.from(new Array(end + 1).keys()).slice(start);
}
let idArr = [];
const getPerById = function(params) {
  const id = JSON.parse(params.body).rid;

  switch (id) {
    case 10001:
      idArr = generateArray(1, 28);
      break;
    case 10011:
      idArr = generateArray(6, 10);
      break;
    case 10020:
      idArr = generateArray(3, 16);
      break;
    case 10031:
      idArr = [2, 3, 4, 10];
      break;
    case 10010:
      idArr = generateArray(12, 16);
      break;
    case 10021:
      idArr = generateArray(23, 28);
      break;

    default:
      break;
  }
  return {
    code: 200,
    success: true,
    message: "操作成功",
    data: idArr,
  };
};

const editPermission = function(params) {
  const keys = JSON.parse(params.body).keys;
  idArr = keys;
  return {
    code: 200,
    success: true,
    message: "修改成功",
  };
};
const addPermission = function(params) {
  const name = JSON.parse(params.body).name;
  const nameZh = JSON.parse(params.body).nameZh;
  const id = Math.floor((Math.random() + 104) * 100);
  permissionData = [
    ...permissionData,
    {
      name,
      nameZh,
      id,
    },
  ];
  return {
    code: 200,
    success: true,
    message: "添加成功",
  };
};

//删除权限

const deletePermission = function(params) {
  let deleteId = JSON.parse(params.body).id;
  permissionData = permissionData
    .map((item) => (item.id !== deleteId ? item : null))
    .filter((i) => i !== null);
  return {
    code: 200,
    success: true,
    message: "删除成功",
  };
};

export {
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
  addPermission,
  deletePermission,
};
