import moment from "moment";
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
  posData = posData.map((item, index) => {
    if (index === editId) {
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

export { addPos, getAllPos, deletePos, editPos, deleteAllPos };
