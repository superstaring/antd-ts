import ProTable from "./list";
import { LoginForm } from "./form";
import { ProLayout, _defaultProps, NotFoundPage } from "./layout";
import Home from "./Home";

const routes: any = [
  {
    path: "/ProTable",
    title: "ProTable - 高级表格",
    component: ProTable,
  },
  {
    path: "/LoginForm",
    title: "LoginForm - 登录表单",
    component: LoginForm,
  },
  {
    path: "/ProLayout",
    title: "ProLayout - 高级布局",
    component: ProLayout,
  },
  {
    path: "*", // path属性取值为*时，可以匹配任何（非空）路径，该匹配拥有最低的优先级。可以用于设置 404 页面
    title: "404页面",
    component: NotFoundPage,
  },
];

let newRoute: any = [...routes];
const _defaultRouter = _defaultProps.route.routes;

function forArr(arr: any) {
  for (let item of arr) {
    if (!!item.routes) {
      forArr(item.routes);
    } else {
      newRoute.push(item);
    }
  }
}

forArr(_defaultRouter);

export default newRoute;
