import React, { useState } from "react";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown, Menu, Space, Tag } from "antd";
import { useRef } from "react";
import request from "umi-request";
import InputSearch from "./InputSearch";

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const cascaderOptions = [
  {
    field: "front end",
    value: "fe",
    language: [
      {
        field: "Javascript",
        value: "js",
      },
      {
        field: "Typescript",
        value: "ts",
      },
    ],
  },
  {
    field: "back end",
    value: "be",
    language: [
      {
        field: "Java",
        value: "java",
      },
      {
        field: "Go",
        value: "go",
      },
    ],
  },
];

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
  },
  {
    title: "标题",
    dataIndex: "title",
    copyable: true,
    ellipsis: true,
    tip: "标题过长会自动收缩",
    formItemProps: {
      rules: [
        {
          required: true,
          message: "此项为必填项",
        },
      ],
    },
    // search: false,   // 是否作为查询条件
  },
  {
    disable: true,
    title: "状态",
    dataIndex: "state",
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: "select", // 显示类型，比如 radio:单选;radioButton:单选按钮;checkbox:多选;cascader:级联选择器;treeSelect:树形下拉框
    valueEnum: {
      all: { text: "超长".repeat(50) },
      open: {
        text: "未解决",
        status: "Error",
      },
      closed: {
        text: "已解决",
        status: "Success",
        disabled: true,
      },
      processing: {
        text: "解决中",
        status: "Processing",
      },
    },
    initialValue: "open", // 查询条件默认值
  },
  {
    title: "树形下拉框",
    key: "treeSelect",
    dataIndex: "treeSelect",
    width: 100,
    fieldProps: {
      options: cascaderOptions,
      fieldNames: {
        children: "language",
        label: "field",
      },
    },
    valueType: "treeSelect",
  },
  {
    title: "自定义查询条件", // 自定义查询条件
    key: "tmp",
    dataIndex: "tmp",
    width: 100,
    renderFormItem: (schema, config, form) => {
      return <InputSearch />;
    },
  },
  {
    disable: true,
    title: "标签",
    dataIndex: "labels",
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: "创建时间",
    key: "showTime",
    dataIndex: "created_at",
    valueType: "dateTime",
    sorter: true,
    hideInSearch: true,
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    valueType: "dateRange",
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: "copy", name: "复制" },
          { key: "delete", name: "删除" },
        ]}
      />,
    ],
  },
];

const menu = (
  <Menu
    items={[
      {
        label: "1st item",
        key: "1",
      },
      {
        label: "2nd item",
        key: "1",
      },
      {
        label: "3rd item",
        key: "1",
      },
    ]}
  />
);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const actionRef = useRef<ActionType>();

  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        return request<{
          data: GithubIssueItem[];
        }>("https://proapi.azurewebsites.net/github/issues", {
          params,
        });
      }}
      editable={{
        type: "multiple",
      }}
      columnsState={{
        persistenceKey: "pro-table-singe-demos",
        persistenceType: "localStorage",
        onChange(value) {
          console.log("value: ", value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: "auto",
        // searchText: "搜索",
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === "get") {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
        <Dropdown key="menu" overlay={menu}>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
      rowSelection={{
        // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
        // 注释该行则默认不显示下拉选项
        // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        defaultSelectedRowKeys: [1],
      }}
      onRow={(record) => {
        return {
          onClick: (event) => {
            alert("onClick");
          }, // 点击行
          // onDoubleClick: (event) => {},
          // onContextMenu: (event) => {},
          // onMouseEnter: (event) => {}, // 鼠标移入行
          // onMouseLeave: (event) => {},
        };
      }}
    />
  );
};
