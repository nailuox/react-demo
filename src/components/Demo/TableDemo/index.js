import React, { Component } from 'react'
import { action } from './store'
import { connect } from 'react-redux'
import { EditOutlined } from '@ant-design/icons'
import { Table, Button, Tooltip, Modal } from 'antd'
import EditModal from './edit'
const { Column } = Table

class TableList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editModalVisible: false,
			editItem: {}
		}
	}

	render() {
		const { list } = this.props
		const { editModalVisible, editItem } = this.state
		return (
			<div>
				<Table dataSource={list} pagination={false} rowKey="id">
					<Column dataIndex="username" title="username" />
					<Column dataIndex="sex" title="sex" />
					<Column dataIndex="age" title="age" />
					<Column dataIndex="hobby" title="hobby" />
					<Column
						title="action"
						render={(text, item) => (
							<div>
								<Tooltip placement="topLeft" title="编辑当前信息">
									<Button onClick={(e) => this.showDataSource(e, item)}>
										<EditOutlined />
									</Button>
								</Tooltip>
							</div>
						)}
					/>
				</Table>
				<Modal
					title="Basic Modal"
					visible={editModalVisible}
					onCancel={this.colseModal}
					footer={[
						<Button key="submit" type="primary" onClick={this.onSubmit}>
							保存
						</Button>,
						<Button key="back" type="primary" ghost onClick={this.colseModal}>
							关闭
						</Button>
					]}
				>
					<EditModal ref="edit" editItem={editItem} list={list} />
				</Modal>
			</div>
		)
	}
	v
	showDataSource = (e, item = {}) => {
		e.preventDefault()
		this.setState({
			editModalVisible: true,
			editItem: item
		})
		// console.log(item) //当前行的数据
	}
	colseModal = () => {
		this.setState({
			editModalVisible: false
			// editItem: {}
		})
	}

	onSubmit = (e) => {
		const { editItem } = this.state
		let demo = this.refs.edit
		// console.log(editItem)

		demo.validateFields((err, values) => {
			if (!err) {
				this.props.putInfo(values)
				// console.log(values)
				// console.log()
			}
		})
		setTimeout(() => {
			this.setState({
				editModalVisible: false,
				editItem: editItem
			})
			demo.resetFields() // 添加/编辑请求结束，弹出层需重置
		}, 2000)
	}

	componentDidMount() {
		this.props.initList()
	}
}

const mapStateToProps = (state) => {
	return {
		inputValue: state.blocks_table_reducer.inputValue,
		list: state.blocks_table_reducer.list
	}
}

// 将store.dispatch()方法映射到props上
const mapDispatchToProps = (dispatch) => {
	return {
		putInfo(values) {
			dispatch(action.putInfo(values))
		},
		initList() {
			dispatch(action.getList())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TableList)
