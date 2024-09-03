import { MessageForm } from "@/widgets/message-list/ui/message-form/ui/MessageForm";
import { MessageList } from "@/widgets/message-list/ui/MessageList";
import { FC } from "react";

const HomePage:FC = () => {
    return (
        <>
            <MessageList />
            <div className="max-w-[400px] p-2 m-10 border">
                <MessageForm />
            </div>
        </>
    )
}

export default HomePage;