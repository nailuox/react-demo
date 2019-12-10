import React from "react";

import { Form, Select, Input } from "antd";

const { Option } = Select;
class EditModal extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const { form, editItem } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <Form.Item label="id">
          {getFieldDecorator("id", {
            initialValue: editItem.id
          })(<Input />)}
        </Form.Item>
        <Form.Item label="username">
          {getFieldDecorator("username", {
            initialValue: editItem.username
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Sex">
          {getFieldDecorator("sex", {
            initialValue: editItem.sex
          })(
            <Select placeholder="Select a option and change input text above">
              <Option value="male">男</Option>
              <Option value="female">女</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="age">
          {getFieldDecorator("age", {
            initialValue: editItem.age
          })(<Input />)}
        </Form.Item>
        <Form.Item label="hobby">
          {getFieldDecorator("hobby", {
            initialValue: editItem.hobby
          })(<Input />)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(EditModal);
