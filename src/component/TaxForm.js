import {
  Typography,
  Divider,
  Input as InputAnd,
  Table,
  Button,
  Space,
} from "antd";
import React from "react";
import "./index.css";
import { Formik } from "formik";
import { Form, Input, Radio } from "formik-antd";
import { initialValues, validationSchema } from "./validation";
import { SearchOutlined } from "@ant-design/icons";
import { responseData } from "../data";

const { Title } = Typography;

const suffix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

export const TaxForm = () => {
  const [state, setState] = React.useState({
    selectedRowKeysT1: [],
    selectedRowKeysT2: [],
    loading: false,
    value: 1,
    specificItem: false,
    allItem: false,
  });

  const columns1 = [
    {
      title: "Bracelets",
      dataIndex: "Bracelets",
      width: 1500,
    },
  ];

  const columns2 = [
    {
      title: "",
      dataIndex: "undefined",
      width: 1500,
    },
  ];

  const groupByCategory = (datas, key) => {
    return datas.reduce(function (rv, x) {
      (rv[x[key]?.name] = rv[x[key]?.name] || []).push({
        key: x.id,
        [x[key]?.name]: x.name,
      });
      return rv;
    }, {});
  };
  const groupedData = groupByCategory(responseData, "category");
  const arranged = Object.keys(groupedData).reverse();

  const onSelectChangeT1 = (selectedRowKeys) => {
    setState({ ...state, selectedRowKeysT1: selectedRowKeys });
  };

  const onSelectChangeT2 = (selectedRowKeys) => {
    setState({ ...state, selectedRowKeysT2: selectedRowKeys });
  };

  const rowSelectionT1 = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: onSelectChangeT1,
  };
  const rowSelectionT2 = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: onSelectChangeT2,
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setState({
      value: e.target.value,
    });
  };

  return (
    <div className="w-75 m-auto mt-5">
      <Title level={2} className="mb-4">
        Add Tax
      </Title>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          const resource = {
            id: Math.floor(Math.random() * 100000 + 1),
            applicable_items: state.selectedRowKeys,
            applied_to:
              state.selectedRowKeys.length === responseData.length
                ? "all"
                : "some",
            name: values.tax,
            rate: values.percentage,
          };
          console.log(resource);
          responseData.push(resource);
        }}
      >
        {({ errors, touched }) => (
          <Form name="horizontal_login" layout="inline">
            <Form.Item
              name="tax"
              validateStatus={errors.tax && touched.tax ? "error" : ""}
              help={touched.tax && errors.tax && errors.tax}
              className="w-75"
            >
              <Input name="tax" />
            </Form.Item>
            <Form.Item
              name="percentage"
              validateStatus={
                errors.percentage && touched.percentage ? "error" : ""
              }
              help={
                touched.percentage && errors.percentage && errors.percentage
              }
            >
              <Input name="percentage" placeholder="percentage" suffix="%" />
            </Form.Item>

            <div className="d-flex flex-column mt-4">
              <Radio.Group onChange={onChange} value={state.value}>
                <Space direction="vertical">
                  <Radio value={1}>Apply to all items in collection</Radio>
                  <Radio value={2}>Apply to specific items</Radio>
                </Space>
              </Radio.Group>
            </div>
            <Divider />

            <InputAnd placeholder="Search Items" size="large" prefix={suffix} />
            <div className="mt-4">
              {arranged.map((el, i) => {
                return (
                  <Table
                    key={i}
                    pagination={false}
                    rowSelection={
                      el !== "undefined" ? rowSelectionT1 : rowSelectionT2
                    }
                    columns={el !== "undefined" ? columns1 : columns2}
                    dataSource={groupedData[el]}
                  />
                );
              })}
            </div>

            <Divider className="mt-5" />
            <Button htmlType="submit" type="primary" danger className="mb-5">
              Apply tax to{" "}
              {state.selectedRowKeysT1?.length +
                state.selectedRowKeysT2?.length}{" "}
              items
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaxForm;
