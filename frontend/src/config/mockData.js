/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-11 01:50:06
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-18 22:23:03
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
export const hotTravelogs = [{ title: '3小时速通上海大学', id: '66211868b5f4b0091904594c' },
                            { title: '哈尔滨冰雪大世界', id: '66211868b5f4b0091904594c' },
                            { title: '顾村公园樱花季', id: '66211868b5f4b0091904594c' },
                            { title: '淄博烧烤自助餐', id: '66211868b5f4b0091904594c' },
                            { title: '南京中科院游学营', id: '66211868b5f4b0091904594c' },
                            { title: '3小时速通上海大学', id: '66211868b5f4b0091904594c' },
                            { title: '3小时速通上海大学', id: '66211868b5f4b0091904594c' },
                            { title: '3小时速通上海大学', id: '66211868b5f4b0091904594c' },
                            { title: '3小时速通上海大学', id: '66211868b5f4b0091904594c' },
                            { title: '3小时速通上海大学', id: '66211868b5f4b0091904594c' }
                            ]
export  const recommendations = [
    {
        id: '66211868b5f4b0091904594c',
        title: "美食推荐",
        image: "https://img1.baidu.com/it/u=4101549484,174560294&fm=253&fmt=auto&app=120&f=JPEG?w=881&h=647",
        label: "火爆"
    },
    {
        id: '66211868b5f4b0091904594c',
        title: "景点推荐",
        image: "https://img0.baidu.com/it/u=3938177606,837693604&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
        label: "超值"
    },
    {
        id: '66211868b5f4b0091904594c',
        title: "购物推荐",
        image: "https://img0.baidu.com/it/u=2263858049,459404824&fm=253&fmt=auto&app=138&f=JPEG?w=607&h=420",
        label: "特价"
    },
    {
        id: '66211868b5f4b0091904594c',
        title: "超值推荐",
        image: "https://img1.baidu.com/it/u=1756962904,60485959&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375",
        label: "限时"
    }
];