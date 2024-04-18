/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-10 21:08:56
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-19 07:58:29
 * @FilePath: \frontend\src\config\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const baseURL = "http://47.102.221.158:8000/"
// export const baseURL = "http://localhost:8000/"
export const localURL = "http://localhost:3000"
export const maliciousPattern = /\b(drop|delete|update|insert|exec|javascript|http|https)\b/i;//用于检测注入式攻击
