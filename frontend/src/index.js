/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-19 00:11:33
 * @FilePath: \frontend\src\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React,{Component} from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import {AliveScope} from "react-activation";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.error('An error occurred:', error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return null; // 或者返回一些错误信息的组件，或者什么也不返回
    }
    return this.props.children;
  }
}
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <AliveScope>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </AliveScope>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
