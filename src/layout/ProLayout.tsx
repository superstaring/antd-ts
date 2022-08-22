/* eslint-disable jsx-a11y/anchor-is-valid */
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { BasicLayoutProps } from "@ant-design/pro-components";
import {
  PageContainer,
  ProFormRadio,
  ProLayout,
} from "@ant-design/pro-components";
import { useState, useEffect } from "react";
import defaultProps from "./_defaultProps";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default (propsNew: any) => {
  const [pathname, setPathname] = useState("/");
  const [collapsed, setCollapsed] = useState(false);
  const [position, setPosition] = useState<"header" | "menu">("header");
  const navigate = useNavigate(); // useNavigate 代替了useHistory

  useEffect(() => {
    const nav = localStorage.getItem("nav") || "/";
    if (nav !== "/") {
      setPathname(nav);
    }
  }, []);

  const children = (
    <PageContainer>
      <div
        style={{
          height: "120vh",
        }}
      >
        <ProFormRadio.Group
          label="按钮的位置"
          options={["header", "menu"].map((value) => ({
            label: value,
            value,
          }))}
          fieldProps={{
            value: position,
            onChange: (e) => setPosition(e.target.value),
          }}
        />
        {propsNew.children}
      </div>
    </PageContainer>
  );
  const props: BasicLayoutProps = {
    ...defaultProps,
    location: {
      pathname,
    },
    navTheme: "light",
    collapsed,
    fixSiderbar: true,
    collapsedButtonRender: false,
    menuItemRender: (item, dom) => (
      <a
        onClick={() => {
          if (!item.path?.includes("http")) {
            setPathname(item.path || "/");
            navigate({ pathname: item.path });
            localStorage.setItem("nav", item.path || "/");
          } else {
            window.open(item.path);
          }
        }}
      >
        {dom}
      </a>
    ),
  };
  if (position === "menu") {
    return (
      <ProLayout
        {...props}
        onCollapse={setCollapsed}
        postMenuData={(menuData) => {
          return [
            {
              icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
              name: " ",
              onTitleClick: () => setCollapsed(!collapsed),
            },
            ...(menuData || []),
          ];
        }}
      >
        {children}
      </ProLayout>
    );
  }
  return (
    <ProLayout
      {...props}
      onCollapse={setCollapsed}
      headerContentRender={() => {
        return (
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        );
      }}
    >
      {children}
    </ProLayout>
  );
};
