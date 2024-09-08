import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAppStore } from "@/model/store";
import { RoutePath } from "@/pages/routeConfig";

interface IPrivateRouteProps {
    isAuthRoute?: boolean;
    children: ReactNode;
}

const PrivateRoute = ({ isAuthRoute, children }: IPrivateRouteProps) => {
    const { isAuthenticated } = useAppStore(state => state.user);
    //const isAuthChecked = useAppSelector(state => state.user.isAuthChecked);;
    const location = useLocation();

    //if (!isAuthChecked) return <Spinner />

    if (isAuthRoute && !isAuthenticated) {
        console.log("isAuthRoute");
        return <>{children}</>
    }

    if (isAuthRoute && isAuthenticated) {
        const from = location?.state?.from?.pathname || { pathname: RoutePath.home };
        const { backgroundLocation } = location?.state?.from?.state || { backgroundLocation: null }
        return <Navigate replace to={from} state={{ backgroundLocation }} />
    }

    if (!isAuthenticated) {
        return (
            <Navigate replace to={{ pathname: RoutePath.login }} state={{ from: location }} />
        )
    }
    return <>{children}</>
}

export default PrivateRoute;