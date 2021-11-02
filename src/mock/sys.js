import moment from "moment";
//添加职位

let posData = [
  {
    id: 1,
    name: "技术总监",
    createData: "2021-10-20",
    enable: true,
  },
  {
    id: 2,
    name: "运营总监",
    createData: "2021-10-21",
    enable: true,
  },
  {
    id: 3,
    name: "市场总监",
    createData: "2021-10-23",
    enable: true,
  },
  {
    id: 4,
    name: "研发工程师",
    createData: "2021-10-25",
    enable: true,
  },
  {
    id: 5,
    name: "运维工程师",
    createData: "2021-10-29",
    enable: true,
  },
];
let name, id;

const addPos = function(params) {
  name = JSON.parse(params.body).name;
  id = JSON.parse(params.body).number + 1;
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
  posData.splice(deleteId, 1);
  return {
    code: 200,
    success: true,
    message: "删除成功",
    data: posData,
  };
};

export { addPos, getAllPos, deletePos };
