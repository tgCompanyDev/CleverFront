import AppRouter from "@/pages/AppRouter";
import DefaultLayout from "./layout/DefaultLayout";

const App = () => {
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