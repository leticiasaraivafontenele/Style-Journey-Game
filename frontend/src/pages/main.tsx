import { Route, Routes } from "react-router-dom"
import MenuPage from "./Menu/page"

export const RoutesPages = () => {
  return(
    <Routes>
        <Route path={`/`} element={<MenuPage />} />
        {/* <Route path={`${RouteLogin}`} element={<Login />} /> */}
    </Routes>
  )
}