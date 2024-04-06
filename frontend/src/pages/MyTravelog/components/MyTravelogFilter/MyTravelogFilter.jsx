import React, { useState,useContext } from "react"
import { Dropdown, Radio, Space } from "antd-mobile"
import styles from "./MyTravelogFilter.module.scss"
import { UserSpaceContent } from "../../UserSpaceContent"
export default function MyTravelogHeader() {
  const { filter, setFilter, sorter, setSorter} = useContext(UserSpaceContent)
  // const [filter, setFilter] = useState("all")
  // const [sorter, setSorter] = useState("new")
  const handleFilterChange = (value) => {
    setFilter(value)
  }
  const handleSorterChange = (value) => {
    setSorter(value)
  }
  return (
    <>
      {/* <h3>我的游记</h3> */}
      <Dropdown className={styles.dropdown}>
        <Dropdown.Item
          key="filter"
          title={filter === 'all' ? '全部' : filter === 'approved' ? '已通过' : filter === 'unreview' ? '审核中' : '未通过'}
        >
          <div style={{ padding: 2 }}>
            <Radio.Group defaultValue="all" onChange={handleFilterChange} style={{opacity: 0.075}}>
              <Radio block value="all" style={{ padding: 6 }}>
                全部
              </Radio>
              <Radio block value="approved" style={{ padding: 6 }}>
                已通过
              </Radio>
              <Radio block value="unreview" style={{ padding: 6 }}>
                审核中
              </Radio>
              <Radio block value="rejected" style={{ padding: 6 }}>
                未通过
              </Radio>
            </Radio.Group>
          </div>
        </Dropdown.Item>

        <Dropdown.Item key="sorter" title={sorter === 'examine' ? '最新审核' : '最新发布'}>
          <div style={{ padding: 2 }}>
            <Radio.Group defaultValue="new" onChange={handleSorterChange}>
              <Radio block value="new" style={{ padding: 6 }}>
                按发布时间排序
              </Radio>
              <Radio block value="examine" style={{ padding: 6 }}>
                按审核时间排序
              </Radio>
            </Radio.Group>
          </div>
        </Dropdown.Item>
      </Dropdown>
    </>
  )
}
