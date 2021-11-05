import { Typography, Divider, Input as InputAnd, Table, Button, Space } from "antd";
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
    selectedRowKeys: [],
    loading: false,
    value: 1,
    specificItem: false,
    allItem: false
  });

  const columns = [
    {
      title: "Bracelets",
      dataIndex: "bracelets",
      width: 1500,
    },
  ];

  const data = [];
  responseData.forEach((el) => {
    data.push({
      key: el.id,
      bracelets: el.name,
    });
  });

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setState({...state, selectedRowKeys });
  };

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: onSelectChange,
  };

  const onChange = e => {
    console.log('radio checked', e.target.value);
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
              id: Math.floor((Math.random() * 100000) + 1),
              applicable_items: state.selectedRowKeys,
              applied_to: state.selectedRowKeys.length === responseData.length ? "all" : "some" ,
              name: values.tax,
              rate: values.percentage
          }
           console.log(resource)
          responseData.push(resource)
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
          <Radio value={1}>Option A</Radio>
          <Radio value={2}>Option B</Radio>
          <Radio value={3}>Option C</Radio>
        </Space>
      </Radio.Group>
            </div>






            <Divider />

            <InputAnd placeholder="Search Items" size="large" prefix={suffix} />
            <div className="mt-4">
              <Table
                pagination={false}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
              />
            </div>

            <Divider className="mt-5" />
            <Button
              htmlType="submit"
              type="primary"
              danger
              className="mb-5"
            >
              Apply tax to {state.selectedRowKeys.length} items
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaxForm;
