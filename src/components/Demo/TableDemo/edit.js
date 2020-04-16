import React from 'react'

import { Form, Row, Col } from 'antd'
// import '@ant-design/compatible/assets/index.css'

import { Select, Input } from 'antd'

const { Option } = Select
class EditModal extends React.Component {
	render() {
		const { editItem } = this.props
		return (
			<Form>
				<Row gutter={[20, 20]}>
					<Col span={24}>
						<Form.Item label="id" initialValue={editItem.id}>
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[20, 20]}>
					<Col span={24}>
						<Form.Item label="username" initialValue={editItem.username}>
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[20, 20]}>
					<Col span={24}>
						<Form.Item label="Sex" initialValue={editItem.sex}>
							<Select>
								<Option value="male">男</Option>
								<Option value="female">女</Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[20, 20]}>
					<Col span={24}>
						<Form.Item label="age" initialValue={editItem.age}>
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[20, 20]}>
					<Col span={24}>
						<Form.Item label="hobby" initialValue={editItem.hobby}>
							<Input />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		)
	}
}

export default EditModal
