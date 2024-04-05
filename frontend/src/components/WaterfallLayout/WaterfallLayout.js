/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-06 00:15:56
 * @FilePath: \frontend\src\components\WaterfallLayout\WaterfallLayout.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/components/WaterfallLayout.js
import React, { useContext, useRef, useEffect, useState } from 'react';
import Masonry from 'masonry-layout';
import InfCard from '../InfCard/InfCard';
import './WaterfallLayout.css';
import { HomeContext } from "../../Context/HomeContext"

const WaterfallLayout = () => {
    const { sorter, city, selectedFilters, searchTerm } = useContext(HomeContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); // 新增 loading 状态
    // const [oldData, setOldData] = useState([]);
    useEffect(() => {
        //todo:搜索前保存旧数据，取消搜索后直接调用旧数据
        // if (searchTerm == null) {
        //     setData(oldData);//将旧数据重新放到首页
        // }
        // else {
        //     setOldData(data); // 保存旧数据
            let newData = [];
            setData(newData); // 清空数据
            fetchData(sorter, city, selectedFilters, searchTerm);//重新获取数据
        // }
    }, [searchTerm])

    useEffect(() => {
        fetchData(sorter, city, selectedFilters,searchTerm);
    }, []); // 在组件加载时发送请求获取数据

    const fetchData = (sorter, city, selectedFilters,searchTerm='') => {
        console.log('fetchData:', sorter, city, selectedFilters);
        // 如果正在加载数据，则直接返回，避免重复请求
        if (loading) return;

        setLoading(true); // 设置 loading 为 true，表示正在加载数据

        // 发送 GET 请求获取数据
        fetch(process.env.PUBLIC_URL + '/testHome.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(newData => {
                // 进行城市筛选
                const filteredNewData = city ? filterByCity(newData, city) : newData;
                const filteredOldData = city ? filterByCity(data, city) : data;

                // 进行参数筛选
                const updatedData = filterByFilters([...filteredOldData, ...filteredNewData], selectedFilters);

                setData(updatedData); // 更新数据
            })
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => {
                setLoading(false); // 请求完成后，设置 loading 为 false
            });
    };

    useEffect(() => {
        const handleScroll = () => {
            // 当滚动到页面底部时，并且当前不处于加载数据状态时，触发 fetchData 函数获取更多数据
            if (!loading && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                fetchData(sorter, city, selectedFilters, searchTerm);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sorter, city, selectedFilters, loading,searchTerm]);
    // 在组件加载时添加滚动事件监听器，并在组件卸载时移除监听器
    const masonryRef = useRef(null);

    useEffect(() => {
        if (masonryRef.current) {
            const masonry = new Masonry(masonryRef.current, {
                itemSelector: '.waterfall-item',
                columnWidth: '.waterfall-sizer',
                gutter: '.waterfall-gutter',
                percentPosition: true,
                horizontalOrder: false // 禁用水平排序
            });
            // 更新瀑布流布局
            masonry.layout();
        }
    }, [data]);

    useEffect(() => {//sorter 发生变化时触发 handleSortData 函数
        console.log('sorter changed', sorter)
        handleSortData(sorter);
    }, [sorter]);

    const handleSortData = (sorter) => {
        console.log('handleSortData', sorter)
        let newData = [...data];
        if (sorter == 0) {
            console.log('is 1')
            // 打乱数组顺序
            newData = shuffleArray(newData);
        } else if (sorter == 1) {
            console.log('is 2')
            // 根据 rate 降序排序
            newData.sort((a, b) => b.rate - a.rate);
        } else if (sorter == 2) {
            console.log('is 3')
            // 根据 rate 升序排序
            newData.sort((a, b) => a.rate - b.rate);
        }
        // 更新 data 状态
        console.log('old data:', data)
        setData(newData);
        console.log('newData:', newData)
    };

    const shuffleArray = (array) => {//随机打乱（默认顺序）
        let currentIndex = array.length, temporaryValue, randomIndex;
        // 当数组中仍有元素待洗牌时...
        while (0 !== currentIndex) {

            // 随机选取一个剩余元素...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // 并将其与当前元素交换位置。
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    // 筛选函数
    const filterByCity = (data, city) => {
        return data.filter(item => {
            // 检查数据的 Location 是否与 city 的前缀匹配
            const location = item.Location;
            if (city.length > location.length) {
                return false; // 如果city的长度比Location的长度长，直接返回false
            }
            for (let i = 0; i < city.length; i++) {
                if (city[i] !== location[i]) {
                    return false; // 如果任意一个位置上的元素不匹配，返回false
                }
            }
            return true; // 如果所有位置的元素都匹配，返回true
        });
    };

    const filterByFilters = (data, selectedFilters) => {
        return data.filter(item => {
            // 筛选 tripWay
            if (Array.isArray(selectedFilters.tripWay) && selectedFilters.tripWay.length > 0) {
                if (!selectedFilters.tripWay.includes(item.tripWay)) {
                    return false;
                }
            }
            // 筛选 tripNum
            if (Array.isArray(selectedFilters.tripNum) && selectedFilters.tripNum.length > 0) {
                if (!selectedFilters.tripNum.includes(item.tripNum)) {
                    return false;
                }
            }
            // 筛选 tripDate
            if (Array.isArray(selectedFilters.tripDate) && selectedFilters.tripDate.length > 0) {
                if (!selectedFilters.tripDate.includes(item.tripDate)) {
                    return false;
                }
            }
            // 筛选 tripBudget
            if (Array.isArray(selectedFilters.tripBudget) && selectedFilters.tripBudget.length > 0) {
                if (!selectedFilters.tripBudget.includes(item.tripBudget)) {
                    return false;
                }
            }
            // 筛选 tripRate
            if (selectedFilters.tripRate && item.tripRate < selectedFilters.tripRate - 0.2) {
                return false;
            }
            return true;
        });
    };

    // 当筛选条件改变时进行数据筛选
    useEffect(() => {
        fetchData(sorter, city, selectedFilters);
    }, [city, selectedFilters]); // 监听 city和selectedFilters 的变化，执行 fetchData

    return (
        <div ref={masonryRef} className="waterfall-layout">
            <div className="waterfall-sizer"></div>
            <div className="waterfall-gutter"></div>
            {data.map((item, index) => (
                <div key={index} className="waterfall-item">
                    <InfCard
                        imageUrl={item.imageUrl}
                        title={item.title}
                        username={item.username}
                        avatar={item.avatar}
                        likes={item.likes}
                    />
                </div>
            ))}
        </div>
    );
};

export default WaterfallLayout;