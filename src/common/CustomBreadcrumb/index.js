import React from 'react'
import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

import styles from './index.module.less'

const CustomBreadcrumb = (props) => (
	<Breadcrumb className={styles.breadcrumb}>
		<Breadcrumb.Item>
			<Link to="/app/dashboard">
				<HomeOutlined className={styles.homeIcon} />
				<span className={styles.home}>首页</span>
			</Link>
		</Breadcrumb.Item>
		{props.arr &&
			props.arr.map((item) => {
				if (typeof item === 'object') {
					return (
						<Breadcrumb.Item key={item.title}>
							<Link to={item.to}>{item.title}</Link>
						</Breadcrumb.Item>
					)
				} else {
					return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
				}
			})}
	</Breadcrumb>
)
export default CustomBreadcrumb
