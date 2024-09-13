import { ReactNode } from "react"
import HomePage from "./home-page/HomePage"
import ConstructorPage from "./constructor-page/ConstructorPage"
import NotFoundPage from "./not-found-page/NotFoundPage"
import PrivateRoute from "@/shared/ui/PrivateRoute"
import AuthPage from "./auth-page/AuthPAge"
import ControlPanelPage from "./control-panel-page/ControlPanelPage"

export type TRoutes = {
    path: string,
    element: ReactNode,
}

export const RoutePath = {
    home: "/",
    promote: "/promote",
    controlPanel: "/control-panel",
    controlPanelBots: "/control-panel/bots",
    clients: "/clients",
    analytic: "/analytic",
    constructor: "/constructor",
    login: "/login",
    // register: "/signup",
    // products: "/products",
    // product: "/product/:productId",
    // cart: "/cart",
    // profile: "/profile",
    // favorites: "/favorites"
}
export const baseRoutes: TRoutes[] = [
    { path: RoutePath.home, element: <HomePage /> },
    { path: "*", element: <NotFoundPage /> },
]

export const privateRoutes: TRoutes[] = [
    { path: RoutePath.login, element: <PrivateRoute isAuthRoute><AuthPage /></PrivateRoute>},
    { path: RoutePath.constructor, element: <PrivateRoute><ConstructorPage /></PrivateRoute> },
    { path: `${RoutePath.controlPanel}/*`, element: <PrivateRoute><ControlPanelPage /></PrivateRoute> },
]