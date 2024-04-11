/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-11 01:50:06
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-11 22:25:06
 * @FilePath: \frontend\src\config\mockData.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//此处保存模拟数据流，全部用于推荐功能
//id为实际服务器上的，所以如果不修改此处的id，则不会与服务器上的数据流进行匹配，导致打开空页面
//由于只是模拟，推荐的笔记实际上是同一个，所有打开的页面一样是正常的
//请将recommendations和hotTravelogs中的id修改为实际服务器上的_id
export const HotSearches = ["热搜词1", "热搜词2", "热搜词3"];
export const searchArray = ['', '上海大学', '顾村公园', '钱伟长图书馆'];
export const hotSearchWords = ['热搜词1', '热搜词2', '热搜词3', '热搜词4', '热搜词5', '热搜词6', '热搜词7', '热搜词8'];
export const fireSearchWords = ['上海大学', '顾村公园'];
export const searchHistory = ['上海大学', '顾村公园', '钱伟长图书馆'];
export const hotTravelogs = [{ title: '3小时速通上海大学', id: '661556cfa9879f1482323604' },
                            { title: '哈尔滨冰雪大世界', id: '661556cfa9879f1482323604' },
                            { title: '顾村公园樱花季', id: '661556cfa9879f1482323604' },
                            { title: '淄博烧烤自助餐', id: '661556cfa9879f1482323604' },
                            { title: '南京中科院游学营', id: '661556cfa9879f1482323604' },
                            { title: '3小时速通上海大学', id: '661556cfa9879f1482323604' },
                            { title: '3小时速通上海大学', id: '661556cfa9879f1482323604' },
                            { title: '3小时速通上海大学', id: '661556cfa9879f1482323604' },
                            { title: '3小时速通上海大学', id: '661556cfa9879f1482323604' },
                            { title: '3小时速通上海大学', id: '661556cfa9879f1482323604' }
                            ]
export  const recommendations = [
    {
        id: '661556cfa9879f1482323604',
        title: "美食推荐",
        image: "https://img1.baidu.com/it/u=4101549484,174560294&fm=253&fmt=auto&app=120&f=JPEG?w=881&h=647",
        label: "火爆"
    },
    {
        id: '661556cfa9879f1482323604',
        title: "景点推荐",
        image: "https://img1.baidu.com/it/u=4101549484,174560294&fm=253&fmt=auto&app=120&f=JPEG?w=881&h=647",
        label: "超值"
    },
    {
        id: '6615217f2568b8d59d05a1d8',
        title: "购物推荐",
        image: "https://img0.baidu.com/it/u=2263858049,459404824&fm=253&fmt=auto&app=138&f=JPEG?w=607&h=420",
        label: "特价"
    },
    {
        id: '6615217f2568b8d59d05a1d8',
        title: "购物推荐",
        image: "https://img0.baidu.com/it/u=2263858049,459404824&fm=253&fmt=auto&app=138&f=JPEG?w=607&h=420",
        label: "限时"
    }
];