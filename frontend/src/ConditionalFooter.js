/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-03 08:25:10
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-08 17:55:04
 * @FilePath: \frontend\src\ConditionalFooter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useLocation } from "react-router"
import Footer from "./components/Footer/Footer"

function ConditionalFooter() {
  const location = useLocation()
  const hideFooterOnPaths = ["/", "/register", "/publish", "/login", "/publish/"]
  // const shouldHideFooter = hideFooterOnPaths.includes(location.pathname)
  const shouldHideFooter = hideFooterOnPaths.includes(location.pathname) || /^\/update\/[^/]+$/.test(location.pathname)

  return shouldHideFooter ? null : <Footer />
}
export default ConditionalFooter
