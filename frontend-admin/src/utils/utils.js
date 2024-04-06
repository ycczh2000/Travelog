export const convertUTCToBeijingTime = utcTimeString => {
  const date = new Date(utcTimeString)
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai",
  }
  let formattedDate = date.toLocaleString("zh-CN", options)
  formattedDate = formattedDate.replace(/\//g, "-").replace(",", "")
  return formattedDate
}
