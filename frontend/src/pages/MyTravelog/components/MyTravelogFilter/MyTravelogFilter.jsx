import React from "react"
import { Dropdown, Radio, Space } from "antd-mobile"
import styles from "./MyTravelogFilter.module.scss"
export default function MyTravelogHeader() {
  return (
    <>
      {/* <h3>我的游记</h3> */}
      <Dropdown className={styles.dropdown}>
        <Dropdown.Item key="filter" title="全部">
          <div style={{ padding: 2 }}>
            <Radio.Group defaultValue="default">
              <Radio block value="all">
                全部
              </Radio>
              <Radio block value="approved">
                已通过
              </Radio>
              <Radio block value="unreview">
                审核中
              </Radio>
              <Radio block value="rejected">
                未通过
              </Radio>
            </Radio.Group>
          </div>
        </Dropdown.Item>
        <Dropdown.Item key="sorter" title="最新投稿">
          <div style={{ padding: 2 }}>
            按提交日期
            <br />
            按审核日期
            <br />
          </div>
        </Dropdown.Item>
      </Dropdown>
    </>
  )
}
