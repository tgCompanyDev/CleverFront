import { useAppStore } from "@/model/store";
import { MessageList } from "./message-list/MessageList"
import { findMaxId } from "@/shared/libs/helpers";
import { Button } from "antd";
import { useEffect } from "react";
import { messagesApi } from "../api/ConstructorApi";
import { MessagesSelector } from "@/model/store/slices/messagesSlice";

export const Constructor = () => {
    const { messageList, addMessage, setMessageList } = useAppStore(MessagesSelector)
    const addCard = () => {
        addMessage(findMaxId(messageList));
        //addMessage(messageList.length)
        //setCards([...cards, { id: cards.length + 1 }]);
    };

    const getAllMessages = () => {
        messagesApi
            .fetchAllMessages()
            .then((res) => {
                setMessageList(res.data.data)
                //setMessageList(res.data.data)
            })
    }

    useEffect(() => {
        getAllMessages()
    }, [])

    return (
        <div className="flex flex-col gap-10">
            <div>
                <Button type="primary" onClick={addCard}>Добавить</Button>
            </div>
            <MessageList />
        </div>
    )
}