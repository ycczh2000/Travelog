import React, { useContext,useState } from 'react';
import { Selector, Rate } from 'antd-mobile';
import { tripWays, tripNums, tripDates, tripBudgets } from '../../config/options';
import {HomeContext} from "../../Context/HomeContext"

const FilterData = () => {
    const {  sorter, setSorter, city, setCity, selectedFilters, setSelectedFilters } = useContext(HomeContext);
    // const [resetKey, setResetKey] = useState(0); // 用于触发组件重新渲染的状态
    // const [selectedFilters, setSelectedFilters] = useState({
    //     tripWay: null,
    //     tripNum: null,
    //     tripDate: null,
    //     tripBudget: null,
    //     tripRate: 0,
    // });

    const handleReset = () => {
        console.log('重置按钮点击');
        setSelectedFilters({
            tripWay: null,
            tripNum: null,
            tripDate: null,
            tripBudget: null,
            tripRate: 0,
        });
        // setResetKey(prevKey => prevKey + 1); // 触发组件重新渲染
    };

    const handleConfirm = () => {
        console.log('确定按钮点击',sorter,  city, selectedFilters);
        // todo 关闭弹出栏方法
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h3>出行方式</h3>
                <Selector
                    style={{
                        '--border-radius': '100px',
                        '--border': 'solid transparent 1px',
                        '--checked-border': 'solid var(--adm-color-primary) 1px',
                        '--padding': '8px 24px',
                    }}
                    showCheckMark={false}
                    options={tripWays}
                    value={selectedFilters.tripWay}
                    onChange={(arr, extend) => {
                        setSelectedFilters(prevFilters => ({
                            ...prevFilters,
                            tripWay: arr.length > 0 ? arr : null
                        }));
                        // console.log(arr, extend.items);
                        // console.log(selectedFilters);
                    }}

                // disabled={resetClicked} // 如果重置按钮已点击，则禁用选项组
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <h3>出行人数</h3>
                <Selector
                    style={{
                        '--border-radius': '100px',
                        '--border': 'solid transparent 1px',
                        '--checked-border': 'solid var(--adm-color-primary) 1px',
                        '--padding': '8px 24px',
                    }}
                    showCheckMark={false}
                    options={tripNums}
                    value={selectedFilters.tripNum}
                    onChange={(arr, extend) => {
                        setSelectedFilters(prevFilters => ({
                            ...prevFilters,
                            tripNum: arr.length > 0 ? arr : null
                        }));
                        // console.log(arr, extend.items);
                        // console.log(selectedFilters);
                    }}
                // disabled={resetClicked}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <h3>出行日期</h3>
                <Selector
                    style={{
                        '--border-radius': '100px',
                        '--border': 'solid transparent 1px',
                        '--checked-border': 'solid var(--adm-color-primary) 1px',
                        '--padding': '8px 24px',
                    }}
                    showCheckMark={false}
                    options={tripDates}
                    value={selectedFilters.tripDate}
                    onChange={(arr, extend) => {
                        setSelectedFilters(prevFilters => ({
                            ...prevFilters,
                            tripDate: arr.length > 0 ? arr : null
                        }));
                        // console.log(arr, extend.items);
                        // console.log(selectedFilters);
                    }}
                // disabled={resetClicked}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <h3>出行预算</h3>
                <Selector
                    style={{
                        '--border-radius': '100px',
                        '--border': 'solid transparent 1px',
                        '--checked-border': 'solid var(--adm-color-primary) 1px',
                        '--padding': '8px 24px',
                    }}
                    showCheckMark={false}
                    options={tripBudgets}
                    value={selectedFilters.tripBudget}
                    onChange={(arr, extend) => {
                        setSelectedFilters(prevFilters => ({
                            ...prevFilters,
                            tripBudget: arr.length > 0 ? arr : null
                        }));
                        // console.log(arr, extend.items);
                        // console.log(selectedFilters);
                    }}
                // disabled={resetClicked}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <h3>旅行评价</h3>
                <Rate allowHalf 
                value={selectedFilters.tripRate}
                onChange={val => {
                        setSelectedFilters(prevFilters => ({
                            ...prevFilters,
                            tripRate: val > 0 ? val : null
                        }));
                        // console.log(val);
                        // console.log(selectedFilters);
                    }}
                     />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: '1', marginRight: '0px' }}>
                    <div
                        style={{ width: '100%', height: '30px', borderRadius: '15px 0 0 15px', background: 'white', textAlign: 'center', lineHeight: '30px', cursor: 'pointer', border: '1px solid #ccc' }}
                        onClick={handleReset}
                    >
                        重置
                    </div>
                </div>
                <div style={{ flex: '1', marginLeft: '0px' }}>
                    <div
                        style={{ width: '100%', height: '30px', borderRadius: '0 15px 15px 0', background: 'red', textAlign: 'center', lineHeight: '30px', color: 'white', cursor: 'pointer', border: '1px solid #ccc' }}
                    onClick={handleConfirm}
                    >
                        确定
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterData;
