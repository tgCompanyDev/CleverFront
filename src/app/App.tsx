import AppRouter from "@/pages/AppRouter";
import DefaultLayout from "./layout/DefaultLayout";
import { useEffect } from "react";
import { useAppStore } from "@/model/store";
import { userSelector } from "@/model/store/slices/userSlice";
import { getToken } from "@/shared/libs/utils/auth";

const App = () => {
    const { setIsAuthenticated } = useAppStore(userSelector);

    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsAuthenticated(true);
        }
    }, [])
    return (
        <DefaultLayout>
            <AppRouter />
        </DefaultLayout>
    )

    //   return (
    //     <>
    //         <header>header</header>
    //         <main className='container'>
    //             <AppRouter />
    //         </main>
    //         <footer>footer</footer>
    //     </>
    //   );
};

export default App;