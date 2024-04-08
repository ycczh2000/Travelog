import { useLocation } from "react-router"
import Footer from "./components/Footer/Footer"

function ConditionalFooter() {
  const location = useLocation()
  const hideFooterOnPaths = ["/", "/register", "/publish"]
  const shouldHideFooter = hideFooterOnPaths.includes(location.pathname)

  return shouldHideFooter ? null : <Footer />
}
export default ConditionalFooter
