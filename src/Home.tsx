import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/ProTable">ProTable - 高级表格</Link>
        </li>
        <li>
          <Link to="/LoginForm">LoginForm - 登录表单</Link>
        </li>
        <li>
          <Link to="/ProLayout">ProLayout - 高级布局</Link>
        </li>
      </ul>
    </nav>
  );
}
