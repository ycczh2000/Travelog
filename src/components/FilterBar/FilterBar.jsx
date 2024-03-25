import React from 'react';
import './FilterBar.css';
import { Dropdown, Radio, Space } from 'antd-mobile'
// import { DemoBlock } from 'demos'
import { ArrowDownCircleOutline, DownOutline } from 'antd-mobile-icons'

const FilterBar = () => {
    return (
        <div>
            {/* <DemoBlock title='自定义arrow' padding={'0'}> */}
                <Dropdown arrow={<DownOutline />}>
                    <Dropdown.Item key='sorter' title='排序'>
                        <div style={{ padding: 12 }}>
                            排序内容
                            <br />
                            排序内容
                            <br />
                            排序内容
                            <br />
                            排序内容
                            <br />
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                        key='bizop'
                        title='商机筛选'
                        arrow={<ArrowDownCircleOutline />}
                    >
                        <div style={{ padding: 12 }}>
                            商机筛选内容
                            <br />
                            商机筛选内容
                            <br />
                            商机筛选内容
                            <br />
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item key='more' title='更多筛选'>
                        <div style={{ padding: 12 }}>
                            更多筛选内容
                            <br />
                            更多筛选内容
                            <br />
                        </div>
                    </Dropdown.Item>
                </Dropdown>
            {/* </DemoBlock> */}
        </div>
    );
};

export default FilterBar;
