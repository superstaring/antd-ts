import {
  AntDesignOutlined,
  CrownOutlined,
  SmileOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import Welcome from "./Welcome";
import MainPage from "./MainPage";
import ProTable from "../list";
import { LoginForm } from "../form";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  route: {
    path: "/",
    routes: [
      {
        path: "/",
        name: "欢迎",
        icon: <SmileOutlined />,
        component: Welcome,
      },
      {
        path: "/admin",
        name: "管理页",
        icon: <CrownOutlined />,
        access: "canAdmin",
        component: "./Admin",
        routes: [
          {
            path: "/admin/sub-page1",
            name: "一级页面",
            icon: <CrownOutlined />,
            component: ProTable,
          },
          {
            path: "/admin/sub-page2",
            name: "二级页面",
            icon: <CrownOutlined />,
            component: LoginForm,
          },
          {
            path: "/admin/sub-page3",
            name: "三级页面",
            icon: <CrownOutlined />,
            component: MainPage,
          },
        ],
      },
      {
        name: "列表页",
        icon: <TabletOutlined />,
        path: "/list",
        component: "./ListTableList",
        routes: [
          {
            path: "/list/sub-page",
            name: "一级列表页面",
            icon: <CrownOutlined />,
            routes: [
              {
                path: "/list/sub-page/sub-sub-page1",
                name: "一一级列表页面",
                icon: <CrownOutlined />,
                component: MainPage,
              },
              {
                path: "/list/sub-page/sub-sub-page2",
                name: "一二级列表页面",
                icon: <CrownOutlined />,
                component: MainPage,
              },
              {
                path: "/list/sub-page/sub-sub-page3",
                name: "一三级列表页面",
                icon: <CrownOutlined />,
                component: MainPage,
              },
            ],
          },
          {
            path: "/list/sub-page2",
            name: "二级列表页面",
            icon: <CrownOutlined />,
            component: MainPage,
          },
          {
            path: "/list/sub-page3",
            name: "三级列表页面",
            icon: <CrownOutlined />,
            component: MainPage,
          },
        ],
      },
      {
        path: "https://ant.design",
        name: "Ant Design 官网外链",
        icon: <AntDesignOutlined />,
      },
      {
        path: "/About",
        name: "Navigate 重定向",
        icon: <CrownOutlined />,
        component: LoginForm,
      },
    ],
  },
  location: {
    pathname: "/",
  },
};
