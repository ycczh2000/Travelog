/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-16 23:46:09
 * @FilePath: \frontend\src\components\WaterfallLayout\WaterfallLayout.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/components/WaterfallLayout.js
import React, { useContext, useRef, useEffect, useState } from "react"
import Masonry from "masonry-layout"
import InfCard from "../InfCard/InfCard"
import "./WaterfallLayout.css"
import { HomeContext } from "../../Context/HomeContext"
import { $getTravelogs } from "../../api/travelogApi"
import { DotLoading, ErrorBlock } from "antd-mobile"
import { baseURL } from "../../config/config"
const WaterfallLayout = () => {
  const { sorter, city, selectedFilters, searchTerm, searchMode } = useContext(HomeContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [noMatchData, setNoMatchData] = useState(false)//没有匹配的数据
  const [disconnect, setDisconnect] = useState(false)//没有连接到服务器
  // const [oldData, setOldData] = useState([])
  const momo =
    "https://img1.baidu.com/it/u=1389873612,485301600&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1712595600&t=76261ab2a1585815f46c7b306c6f66e3"
  useEffect(() => {
    console.log("searchTerm changed", searchTerm)
    setData([]) // 清空数据
  }, [searchTerm])

  const fetchData = async (sorter, city, selectedFilters, searchTerm = "", searchMode) => {
    console.log("fetchData:", sorter, city, selectedFilters, searchTerm, searchMode)
    // 如果正在加载数据，则直接返回，避免重复请求
    if (loading) return
    setDisconnect(false)
    setNoMatchData(false)
    try {
      // 调用 API 获取数据
      console.log("city, selectedFilters, searchTerm", city, selectedFilters, searchTerm, searchMode)
      const newData = await $getTravelogs(city, selectedFilters, searchTerm, searchMode)
      if (newData.length === 0) {
        setNoMatchData(true); // 没有匹配的数据
      }
      // 检查是否连接到服务器
      if (!newData) {
        setDisconnect(true); // 没有连接到服务器
      }
      console.log("newData:", newData)
      const filteredNewData = city ? filterByCity(newData, city) : newData
      const filteredOldData = city ? filterByCity(data, city) : data

      // 进行参数筛选
      const updatedData = filterByFilters([...filteredOldData, ...filteredNewData], selectedFilters)

      setData(updatedData) // 更新数据
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false) // 请求完成后，设置 loading 为 false
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      // 当滚动到页面底部的上方一定距离时，并且当前不处于加载数据状态时，触发 fetchData 函数获取更多数据
      const scrollThreshold = window.innerHeight * 0.8 // 在底部上方80%的位置触发加载
      if (!loading && window.innerHeight + window.scrollY >= document.body.offsetHeight - scrollThreshold) {
        console.log("handleScroll", sorter, city, selectedFilters, searchTerm)
        fetchData(sorter, city, selectedFilters, searchTerm, searchMode)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // 当 data 的长度小于 10 时，也触发 fetchData 函数
    if (data.length < 10) {
      console.log("Data length less than 10, triggering fetchData")
      fetchData(sorter, city, selectedFilters, searchTerm, searchMode)
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [data.length, sorter, city, selectedFilters, searchTerm])

  // 在组件加载时添加滚动事件监听器，并在组件卸载时移除监听器
  const masonryRef = useRef(null)

  useEffect(() => {
    console.log("data changed");

    if (masonryRef.current) {
      const masonry = new Masonry(masonryRef.current, {
        itemSelector: ".waterfall-item",
        columnWidth: ".waterfall-sizer",
        gutter: ".waterfall-gutter",
        percentPosition: true,
        horizontalOrder: false, // 禁用水平排序
      });
      // 更新瀑布流布局
      masonry.layout();
      // 在页面加载后的0.5秒内每隔0.25秒更新一次布局，以解决加载时瀑布流存在的问题
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          masonry.layout();
        }, 250);

        // 1秒后清除interval
        setTimeout(() => {
          clearInterval(interval);
        }, 500);
      }, 500);

      // 清除timer
      return () => clearTimeout(timer);
    }
  }, [data]);
  
  useEffect(() => {
    //sorter 发生变化时触发 handleSortData 函数
    console.log("sorter changed", sorter, city, selectedFilters, searchTerm)
    handleSortData(sorter, city, selectedFilters, searchTerm)
  }, [sorter])

  // 当筛选条件改变时进行数据筛选
  useEffect(() => {
    console.log("selectedFilters changed", selectedFilters)
    fetchData(sorter, city, selectedFilters, searchTerm, searchMode)
  }, [city, selectedFilters]) // 监听 city和selectedFilters 的变化，执行 fetchData

  const handleSortData = sorter => {
    console.log("handleSortData", sorter)
    let newData = [...data]
    if (sorter == 0) {
      console.log("is 1")
      // 打乱数组顺序
      newData = shuffleArray(newData)
    } else if (sorter == 1) {
      console.log("is 2")
      // 根据 rate 升序排序
      newData.sort((a, b) => a.rate - b.rate)
    } else if (sorter == 2) {
      console.log("is 3")
      // 根据 rate 降序排序
      newData.sort((a, b) => b.rate - a.rate)
    }
    // 更新 data 状态
    console.log("old data:", data)
    setData(newData)
    console.log("newData:", newData)
  }

  const shuffleArray = array => {
    //随机打乱（默认顺序）
    let currentIndex = array.length,
      temporaryValue,
      randomIndex
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }

  // 筛选函数
  const filterByCity = (data, city) => {
    return data.filter(item => {
      if (city == false) return true

      // 检查数据的 Location 是否与 city 的前缀匹配
      const location = item.Location
      if (!Array.isArray(location) || !location) {
        return false
      }
      if (city.length > location.length) {
        return false // 如果 city 的长度比 Location 的长度长，直接返回 false
      }
      for (let i = 0; i < city.length; i++) {
        if (city[i] !== location[i]) {
          return false // 如果任意一个位置上的元素不匹配，返回 false
        }
      }
      return true // 如果所有位置的元素都匹配，返回 true
    })
  }

  const filterByFilters = (data, selectedFilters) => {
    return data.filter(item => {
      // 筛选 tripWay
      if (Array.isArray(selectedFilters.tripWay) && selectedFilters.tripWay.length > 0) {
        if (!selectedFilters.tripWay.includes(item.tripWay)) {
          return false
        }
      }
      // 筛选 tripNum
      if (Array.isArray(selectedFilters.tripNum) && selectedFilters.tripNum.length > 0) {
        if (!selectedFilters.tripNum.includes(item.tripNum)) {
          return false
        }
      }
      // 筛选 tripDate
      if (Array.isArray(selectedFilters.tripDate) && selectedFilters.tripDate.length > 0) {
        if (!selectedFilters.tripDate.includes(item.tripDate)) {
          return false
        }
      }
      // 筛选 tripBudget
      if (Array.isArray(selectedFilters.tripBudget) && selectedFilters.tripBudget.length > 0) {
        if (!selectedFilters.tripBudget.includes(item.tripBudget)) {
          return false
        }
      }
      // 筛选 tripRate
      if (selectedFilters.tripRate && item.tripRate < selectedFilters.tripRate - 0.2) {
        return false
      }
      return true
    })
  }

  return (
    <>
      {disconnect ? (
        <ErrorBlock status='disconnected' />
      ) : noMatchData ? (
        <ErrorBlock status='empty' />
      ) : (
        <>
          {/* antd mobile的下拉刷新仅支持列表，这里放弃下拉刷新 */}
          <div ref={masonryRef} className="waterfall-layout">
            <div className="waterfall-sizer"></div>
            <div className="waterfall-gutter"></div>
            {data.map((item, index) => (
              <div key={index} className="waterfall-item">
                <InfCard
                  id={item.id}
                  city={item.Location}
                  imageUrl={item.image ? `${baseURL}images/` + item.image : { momo }}
                  title={item.title}
                  username={item.username}
                  avatar={item.avatar}
                  likesCount={item.likesCount}
                  avatarUrl={`${baseURL}getAvatar/${item.username}`}
                />
              </div>
            ))}
          </div>
          <span style={{ fontSize: 24, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <DotLoading />
          </span>
        </>
      )}
    </>

  )
}

export default WaterfallLayout
