import React, { useState, useRef, useEffect, onChange, forwardRef, useImperativeHandle } from "react"
import "./Editing.css"
import { Card, Dropdown, Toast, Button, Radio, Space, Checkbox, Cascader, Rate } from "antd-mobile"
import { DownOutline } from "antd-mobile-icons"
import { options } from "./cityData"

const Editing = forwardRef((props, ref) => {
  const [title, setTitle] = useState(props.editingData.title ? props.editingData.title : "") // 标题内容
  const [content, setContent] = useState(props.editingData.content ? props.editingData.content : "") // 正文内容
  const [tripWay, setTripWay] = useState(props.tripWay ? props.tripWay : "") // 出游方式
  const [tripNum, setTripNum] = useState(props.editingData.tripNum ? props.editingData.tripNum : "") // 出游人数
  const [tripDate, setTripDate] = useState(props.editingData.tripDate ? props.editingData.tripDate : "") // 出游时间
  const [tripBudget, setTripBudget] = useState(props.editingData.tripBudget ? props.editingData.tripBudget : "") // 预算
  const [city, setCity] = useState(null) //旅行城市
  const [rate, setRate] = useState(
    props.editingData.rate ? props.editingData.rate : props.editingData.tripRate ? props.editingData.tripRate : 5
  ) //评分

  const [isPublic, setIsPublic] = useState(props.editingData.isPublic ? props.editingData.isPublic : true) // 用于追踪内容是否公开发布的状态
  const maxTitleLength = 20 // 标题最大长度
  const maxContentLength = 2000 // 正文最大长度
  useEffect(() => {
    if (props.editingData) {
      const { title, content, tripWay, tripNum, tripDate, tripBudget, city, isPublic, rate, tripRate } =
        props.editingData
      setTitle(title || "")
      setContent(content || "")
      setTripWay(tripWay || "")
      setTripNum(tripNum || "")
      setTripDate(tripDate || "")
      setTripBudget(tripBudget || "")
      setRate(rate ? rate : tripRate ? tripRate : 5)
      setCity(city || null)
      setIsPublic(isPublic || true)
    }
    handleChangeRate(props.editingData.rate || props.editingData.tripRate || 5)
  }, [props.editingData])

  useImperativeHandle(ref, () => ({
    getEditingData() {
      return {
        title,
        content,
        tripWay,
        tripNum,
        tripDate,
        tripBudget,
        Location: city,
        rate,
        isPublic,
      }
    },
  }))
  const textareaRef = useRef(null)
  // 标题输入变化处理函数
  const handleTitleChange = event => {
    const newTitle = event.target.value.slice(0, maxTitleLength) // 限制标题长度
    setTitle(newTitle)
  }

  // 正文输入变化处理函数
  const handleContentChange = event => {
    const newContent = event.target.value.slice(0, maxContentLength) // 限制正文长度
    setContent(newContent)
  }
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      const newHeight = `${Math.min(textareaRef.current.scrollHeight, 0.4 * window.innerHeight)}px` // 获取实际高度，并确保不超过40%的窗口高度
      textareaRef.current.style.height = newHeight // 设置高度
    }
  }, [content])
  // 修改出游方式
  const handleTripWayChange = value => {
    setTripWay(value)
  }

  // 修改出游人数
  const handleTripNumChange = value => {
    setTripNum(value)
  }

  // 修改出游时间
  const handleTripDateChange = value => {
    setTripDate(value)
  }

  // 修改预算
  const handleTripBudgetChange = value => {
    setTripBudget(value)
  }
  const handleChangeRate = newRate => {
    setRate(newRate)
    if (onChange) {
      onChange(newRate)
    }
  }
  // 计算剩余标题字数
  const remainingTitleCharacters = maxTitleLength - title.length
  // 添加话题按钮点击事件
  const handleAddTopicClick = () => {
    setContent(content + "#")
    const textarea = document.getElementById("contentTextarea")
  }

  // 添加@用户按钮点击事件
  const handleMentionUserClick = () => {
    setContent(content + "@")
    const textarea = document.getElementById("contentTextarea")
  }
  // 勾选是否公开函数
  const handlePublicChange = () => {
    setIsPublic(!isPublic) // 切换状态
  }
  return (
    <div style={{ margin: "10px" }}>
      {/* 标题输入区 */}
      <div style={{ margin: "5px", marginTop: "20px" }}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="添加标题"
          style={{ fontSize: "1.2em", width: "90%", border: "none", borderBottom: "none", outline: "none" }}
        />
        <span style={{ color: "gray", fontSize: "1.2em" }}>{remainingTitleCharacters}</span>
      </div>
      <hr style={{ borderTop: "1px solid lightgray" }} />
      <Card>
        <Dropdown arrow={<DownOutline />}>
          <Dropdown.Item
            key="tripWay"
            title={tripWay ? tripWay : "出游方式"}
            style={{ width: "100px", color: tripWay ? "blue" : "inherit" }}>
            <div style={{ padding: 12 }}>
              <Radio.Group defaultValue={tripWay} onChange={handleTripWayChange}>
                <Space direction="vertical" block>
                  <Radio block value="">
                    默认
                  </Radio>
                  <Radio block value="骑行游">
                    骑行游
                  </Radio>
                  <Radio block value="自驾游">
                    自驾游
                  </Radio>
                  <Radio block value="火车/飞机游">
                    火车/飞机游
                  </Radio>
                  <Radio block value="大巴游">
                    大巴游
                  </Radio>
                  <Radio block value="组团游">
                    组团游
                  </Radio>
                  <Radio block value="邮轮游">
                    邮轮游
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            key="tripNum"
            title={tripNum ? tripNum : "出游人数"}
            arrow={<DownOutline />}
            style={{ width: "100px", color: tripNum ? "blue" : "inherit" }}>
            <div style={{ padding: 12 }}>
              <Radio.Group defaultValue={tripNum} onChange={handleTripNumChange}>
                <Space direction="vertical" block>
                  <Radio block value="">
                    默认
                  </Radio>
                  <Radio block value="亲子游">
                    亲子游
                  </Radio>
                  <Radio block value="情侣游">
                    情侣游
                  </Radio>
                  <Radio block value="全家游">
                    全家游
                  </Radio>
                  <Radio block value="单人游">
                    单人游
                  </Radio>
                  <Radio block value="2-5人">
                    2-5人
                  </Radio>
                  <Radio block value="5人以上">
                    5人以上
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            key="tripDate"
            title={tripDate ? tripDate : "出游时间"}
            style={{ width: "100px", color: tripDate ? "blue" : "inherit" }}>
            <div style={{ padding: 12 }}>
              <Radio.Group defaultValue={tripDate} onChange={handleTripDateChange}>
                <Space direction="vertical" block>
                  <Radio block value="">
                    默认
                  </Radio>
                  <Radio block value="小时游">
                    小时游
                  </Radio>
                  <Radio block value="半日游">
                    半日游
                  </Radio>
                  <Radio block value="单日游">
                    单日游
                  </Radio>
                  <Radio block value="2-3日游">
                    2-3日游
                  </Radio>
                  <Radio block value="3-7天游">
                    3-7天游
                  </Radio>
                  <Radio block value="7天以上游">
                    7天以上游
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            key="tripBudget"
            title={tripBudget ? tripBudget : "旅行花费"}
            style={{ width: "100px", color: tripBudget ? "blue" : "inherit" }}>
            <div style={{ padding: 12 }}>
              <Radio.Group defaultValue={tripBudget} onChange={handleTripBudgetChange}>
                <Space direction="vertical" block>
                  <Radio block value="">
                    默认
                  </Radio>
                  <Radio block value="100元以下">
                    100元以下
                  </Radio>
                  <Radio block value="100-500元">
                    100-500元
                  </Radio>
                  <Radio block value="500-1000元">
                    500-1000元
                  </Radio>
                  <Radio block value="1000-3000元">
                    1000-3000元
                  </Radio>
                  <Radio block value="3000-10000元">
                    3000-10000元
                  </Radio>
                  <Radio block value="10000元以上">
                    10000元以上
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </Dropdown.Item>
        </Dropdown>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Rate allowHalf value={rate} onChange={handleChangeRate} />
        </div>
      </Card>
      {/* 正文输入区 */}
      <div style={{ margin: "5px", marginTop: "0px" }}>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          placeholder="添加正文"
          style={{
            fontSize: "1em",
            width: "90%",
            minHeight: "100px",
            maxHeight: "40%",
            border: "none",
            borderBottom: "none",
            outline: "none",
            resize: "none",
            overflowY: "auto",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <Button
          style={{ flex: 1 }}
          onClick={async () => {
            const value = await Cascader.prompt({
              options,
              title: "选择地址",
            })

            setCity(value)

            Toast.show(value ? `你选择了 ${value.join("-")}` : "你没有进行选择")
          }}>
          {city ? city.join("-") : "选择城市"}
        </Button>
      </div>
      {/* 话题和@用户按钮 */}
      <div style={{ display: "flex", marginTop: "10px" }}>
        <Button
          style={{ backgroundColor: "lightgray", color: "black", borderRadius: "20px", marginRight: "10px" }}
          onClick={handleAddTopicClick}>
          # 话题
        </Button>
        <Button
          style={{ backgroundColor: "lightgray", color: "black", borderRadius: "20px" }}
          onClick={handleMentionUserClick}>
          @ 用户
        </Button>
      </div>

      <div style={{ float: "right" }}>
        <Checkbox
          defaultChecked
          onChange={handlePublicChange}
          style={{
            "--icon-size": "18px",
            "--font-size": "14px",
            "--gap": "6px",
          }}>
          公开发布
        </Checkbox>
      </div>
    </div>
  )
})

export default Editing
