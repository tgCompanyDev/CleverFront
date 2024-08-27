import { ReactNode } from "react"
import HomePage from "./home-page/HomePage"
import NotFoundPage from "./not-found-page/NotFoundPage"

export type TRoutes = {
    path: string,
    element: ReactNode,
}

export const RoutePath = {
    home: "/",
    // login: "/signin",
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

export const privateRoutes: TRoutes[] = []