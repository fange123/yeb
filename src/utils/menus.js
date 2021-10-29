import { getRequest } from "./api";

export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return;
  }

  getRequest("/api/menu").then((res) => {
    if (res.data) {
      //~格式化router
      let fmtRoutes = formatRouter(res.data.routes);

      //~添加到路由
      router.addRoutes(fmtRoutes);

      //~把数据存入vuex

      store.commit("initRoutes", fmtRoutes);
    }
  });
};

export const formatRouter = (routes) => {
  let fmtRoutes = [];
  routes.forEach((routes) => {
    let { path, name, component, iconCls, children } = routes;
    if (children && children instanceof Array) {
      //~递归
      children = formatRouter(children);
    }
    let fmtRoute = {
      path: path,
      name: name,
      iconCls: iconCls,
      children: children,
      //!把字符串转成组件。。不太懂，以后再仔细了解
      component(resolve) {
        if (component && component.startsWith("Emp")) {
          require(["../views/emp/" + component + ".vue"], resolve);
        } else if (component.startsWith("Per")) {
          require(["../views/per/" + component + ".vue"], resolve);
        } else if (component.startsWith("Sal")) {
          require(["../views/sal/" + component + ".vue"], resolve);
        } else if (component.startsWith("Sta")) {
          require(["../views/sta/" + component + ".vue"], resolve);
        } else if (component.startsWith("Sys")) {
          require(["../views/sys/" + component + ".vue"], resolve);
        } else if (component.startsWith("Wel")) {
          require(["../views/" + component + ".vue"], resolve);
        }
      },
    };
    fmtRoutes.push(fmtRoute);
  });

  return fmtRoutes;
};
