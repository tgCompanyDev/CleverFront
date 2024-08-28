import { NotFound } from "@/shared/ui/NotFound";

const NotFoundPage = () => {
    return ( 
        <div className="content container">
            <NotFound title="Страница не найдена" buttonText="На главную"></NotFound>
        </div>
     );
}

export default NotFoundPage;