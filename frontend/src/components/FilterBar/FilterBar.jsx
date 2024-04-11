/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-11 20:10:29
 * @FilePath: \frontend\src\components\FilterBar\FilterBar.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {  useContext,useState, useRef } from 'react';
import './FilterBar.css';
import { Dropdown, CascaderView,Popup } from 'antd-mobile'
import { ArrowDownCircleOutline, DownOutline } from 'antd-mobile-icons'
import {HomeContext} from "../../Context/HomeContext"

// import { DropdownRef } from 'antd-mobile/es/components/dropdown'
import { locations, travelogSorters } from '../../config/options'
import FilterData from '../FilterData/FilterData';


const FilterBar = () => {
    const { sorter, setSorter, city, setCity, selectedFilters, setSelectedFilters,visible, setVisible,
        modevisible, setModeVisible,seacrchPageVisible, setSeacrchPageVisible } = useContext(HomeContext);
    // const [sorter, setSorter] = useState('0');
    // const [city, setCity] = useState()
    // const [selectedFilters, setSelectedFilters] = useState({
    //     tripWay: null,
    //     tripNum: null,
    //     tripDate: null,
    //     tripBudget: null,
    //     tripRate: 0,
    // });

    const ref = useRef(null)
    return (
        <div>
            <Popup
              visible={visible}
              onMaskClick={() => {
                console.log(selectedFilters)
                setVisible(false)
              }}
              position='right'
              bodyStyle={{ width: '80vw',borderTopLeftRadius: '8px',
              borderButtonRightRadius: '8px',
              minHeight: '40vh', }}
            >
                <div style={{overflowY: 'scroll', height: '100vh',}}>
              <FilterData/>
              </div>
            </Popup>
            <Dropdown ref={ref} arrow={<DownOutline />}>
                <Dropdown.Item
                    key='sorter'
                    title={
                        sorter === '0' ? '推荐排序' :
                            sorter === '1' ? '评分降序' :
                                sorter === '2' ? '评分升序' :
                                    '排序方式'
                    }
                    arrow={<ArrowDownCircleOutline />}
                >
                    <CascaderView
                        options={travelogSorters}
                        value={[sorter]}
                        onChange={(val, extend) => {
                            setSorter(val[0]);
                            console.log('onChange', val, extend.items);
                            console.log('onChange', sorter);
                            ref.current?.close();
                        }}
                    />
                </Dropdown.Item>
                <Dropdown.Item key='city' title={city&&city.length>0 ? city : '选择城市'} style={{ width: '100px', color: city&&city.length>0  ? 'blue' : 'inherit' }}>
                    <CascaderView
                        options={locations}
                        value={city}
                        onChange={(val, extend) => {
                            setCity(val);
                            console.log('onChange', val, extend.items);
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <div style={{ flex: '1', marginRight: '0px' }}>
                            <div
                                style={{ width: '100%', height: '30px', borderRadius: '15px 0 0 15px', background: 'white', textAlign: 'center', lineHeight: '30px', cursor: 'pointer', border: '1px solid #ccc' }}
                                onClick={() => {
                                    setCity(''); // 设置城市为空值
                                    console.log('重置按钮点击');
                                    ref.current?.close()
                                }}
                            >
                                重置
                            </div>
                        </div>
                        <div style={{ flex: '1', marginLeft: '0px' }}>
                            <div
                                style={{ width: '100%', height: '30px', borderRadius: '0 15px 15px 0', background: 'red', textAlign: 'center', lineHeight: '30px', color: 'white', cursor: 'pointer', border: '1px solid #ccc' }}
                                onClick={() => {
                                    ref.current?.close()
                                }}
                            >
                                确定
                            </div>
                        </div>
                    </div>
                </Dropdown.Item>

                <Dropdown.Item key='more' title='更多筛选' onClick={() => {
                    ref.current?.close()
                    setVisible(true)
                    setSeacrchPageVisible(false)
                }}>
                </Dropdown.Item>
            </Dropdown>
        </div>
    );
};

export default FilterBar;
