import React from "react";
import { Input } from "antd";

export default function InputSearch(props: any) {
  const { value, onChange } = props;

  const onInputChange = (e: any) => {
    onChange(e);
  };

  return <input value={value} onChange={onInputChange} />;
}
