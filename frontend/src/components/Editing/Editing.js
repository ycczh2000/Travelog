import React, { useState, useRef, useEffect } from 'react';
import './Editing.css';
import { Card, Dropdown, Toast, Button, Radio, Space, Tag, Checkbox } from 'antd-mobile';
import { ArrowDownCircleOutline, DownOutline } from 'antd-mobile-icons';

const Editing = () => {
    const [title, setTitle] = useState(''); // 标题内容
    const [content, setContent] = useState(''); // 正文内容
    const textareaRef = useRef(null);
    const [tripWay, setTripWay] = useState(''); // 出游方式
    const [tripNum, setTripNum] = useState(''); // 出游人数
    const [tripDate, setTripDate] = useState(''); // 出游时间
    const [tripBudget, setTripBudget] = useState(''); // 预算
    const [isPublic, setIsPublic] = useState(false); // 用于追踪内容是否公开发布的状态
    const maxTitleLength = 20; // 标题最大长度
    const maxContentLength = 2000; // 正文最大长度

    // 标题输入变化处理函数
    const handleTitleChange = (event) => {
        const newTitle = event.target.value.slice(0, maxTitleLength); // 限制标题长度
        setTitle(newTitle);
    };

    // 正文输入变化处理函数
    const handleContentChange = (event) => {
        const newContent = event.target.value.slice(0, maxContentLength); // 限制正文长度
        setContent(newContent);
    };
    useEffect(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'; // 先将高度设置为自动以便获取内容高度
          const newHeight = `${Math.min(textareaRef.current.scrollHeight, 0.4 * window.innerHeight)}px`; // 获取实际高度，并确保不超过60%的窗口高度
          textareaRef.current.style.height = newHeight; // 设置高度
        }
      }, [content]);
    // 修改出游方式
    const handleTripWayChange = (value) => {
        setTripWay(value);
    };

    // 修改出游人数
    const handleTripNumChange = (value) => {
        setTripNum(value);
    };

    // 修改出游时间
    const handleTripDateChange = (value) => {
        setTripDate(value);
    };

    // 修改预算
    const handleTripBudgetChange = (value) => {
        setTripBudget(value);
    };

    // 计算剩余标题字数
    const remainingTitleCharacters = maxTitleLength - title.length;
    // 添加话题按钮点击事件
    const handleAddTopicClick = () => {
        setContent(content + '#');
        const textarea = document.getElementById('contentTextarea');
        // textarea.focus();
        // textarea.setSelectionRange(content.length + 1, content.length + 1);
    };

    // 添加@用户按钮点击事件
    const handleMentionUserClick = () => {
        setContent(content + '@');
        const textarea = document.getElementById('contentTextarea');
        // textarea.focus();
        // textarea.setSelectionRange(content.length + 1, content.length + 1);
    };
    // 勾选项变化处理函数
    const handlePublicChange = () => {
        setIsPublic(!isPublic); // 切换状态
    };
    return (
        <div style={{ margin: '10px' }}>
            {/* 标题输入区 */}
            <div style={{ margin: '5px', marginTop: '20px' }}>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="添加标题"
                    style={{ fontSize: '1.2em', width: '90%', border: 'none', borderBottom: 'none', outline: 'none' }}
                />
                <span style={{ color: 'gray', fontSize: '1.2em' }}>{remainingTitleCharacters}</span>
            </div>
            <hr style={{ borderTop: '1px solid lightgray' }} />
            <Card>
                <Dropdown arrow={<DownOutline />}>
                    <Dropdown.Item key='tripWay' title={`出游方式：${tripWay}`} style={{ color: tripWay ? 'blue' : 'inherit' }}>
                        <div style={{ padding: 12 }}>
                            <Radio.Group defaultValue={tripWay} onChange={handleTripWayChange}>
                                <Space direction='vertical' block>
                                    <Radio block value='自驾游'>
                                        自驾游
                                    </Radio>
                                    <Radio block value='火车/飞机游'>
                                        火车/飞机游
                                    </Radio>
                                    <Radio block value='大巴游'>
                                        大巴游
                                    </Radio>
                                    <Radio block value='组团游'>
                                        组团游
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                        key='tripNum'
                        title={`出游人数：${tripNum}`}
                        arrow={<DownOutline />}
                        style={{ color: tripNum ? 'blue' : 'inherit' }}
                    >
                        <div style={{ padding: 12 }}>
                            <Radio.Group defaultValue={tripNum} onChange={handleTripNumChange}>
                                <Space direction='vertical' block>
                                    <Radio block value='1人'>
                                        1人
                                    </Radio>
                                    <Radio block value='2-5人'>
                                        2-5人
                                    </Radio>
                                    <Radio block value='5人以上'>
                                        5人以上
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item key='tripDate' title={`出游时间：${tripDate}`} style={{ color: tripDate ? 'blue' : 'inherit' }}>
                        <div style={{ padding: 12 }}>
                            <Radio.Group defaultValue={tripDate} onChange={handleTripDateChange} >
                                <Space direction='vertical' block>
                                    <Radio block value='小时游'>
                                        小时游
                                    </Radio>
                                    <Radio block value='半日游'>
                                        半日游
                                    </Radio>
                                    <Radio block value='单日游'>
                                        单日游
                                    </Radio>
                                    <Radio block value='2-3日游'>
                                        2-3日游
                                    </Radio>
                                    <Radio block value='3-7天游'>
                                        3-7天游
                                    </Radio>
                                    <Radio block value='7天以上游'>
                                        7天以上游
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item key='tripBudget' title={`预算：${tripBudget}`} style={{ color: tripBudget ? 'blue' : 'inherit' }}>
                        <div style={{ padding: 25 }}>
                            <Radio.Group defaultValue={tripBudget} onChange={handleTripBudgetChange}>
                                <Space direction='vertical' block>
                                    <Radio block value='100元以下'>
                                        100元以下
                                    </Radio>
                                    <Radio block value='100-500元'>
                                        100-500元
                                    </Radio>
                                    <Radio block value='500-1000元'>
                                        500-1000元
                                    </Radio>
                                    <Radio block value='1000-3000元'>
                                        1000-3000元
                                    </Radio>
                                    <Radio block value='3000-10000元'>
                                        3000-10000元
                                    </Radio>
                                    <Radio block value='10000元以上'>
                                        10000元以上
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                    </Dropdown.Item>
                </Dropdown>
            </Card>
{/* 正文输入区 */}
<div style={{ margin: '5px', marginTop: '0px' }}>
        <textarea
          ref={textareaRef} // 引用
          value={content}
          onChange={handleContentChange}
          placeholder="添加正文"
          style={{ 
            fontSize: '1em', 
            width: '90%', 
            minHeight: '100px', 
            maxHeight: '40%', 
            border: 'none', 
            borderBottom: 'none', 
            outline: 'none',
            resize: 'none', // 禁止手动改变大小
            overflowY: 'auto' // 根据内容超出最大高度动态添加滚动条
          }}
        />
      </div>
            {/* <Space>
                <Tag round
                    fill='outline'
                    style={{ '--background-color': '#C0C0C0' }}>#话题</Tag>
                <Tag round
                    fill='outline'
                    style={{ '--background-color': '#C0C0C0' }}>@用户</Tag>
            </Space> */}
            {/* 话题和@用户按钮 */}
            <div style={{ display: 'flex', marginTop: '10px' }}>
                <Button style={{ backgroundColor: 'lightgray', color: 'black', borderRadius: '20px', marginRight: '10px' }} onClick={handleAddTopicClick}># 话题</Button>
                <Button style={{ backgroundColor: 'lightgray', color: 'black', borderRadius: '20px' }} onClick={handleMentionUserClick}>@ 用户</Button>
            </div>
            <div style={{ float: 'right' }}>
                <Checkbox defaultChecked onChange={handlePublicChange} style={{
                    '--icon-size': '18px',
                    '--font-size': '14px',
                    '--gap': '6px',
                }}>公开发布</Checkbox>
            </div>
        </div>
    );
};

export default Editing;
