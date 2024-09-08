import { RefObject, useEffect, useState } from "react";
import s from "./styles.module.css"
import Xarrow, { Xwrapper } from "react-xarrows";
import { messagesApi } from "../api/MessagesApi";
import { TMessageCard } from "../types/messagesTypes";
import { getRandomContrastingColor } from "@/shared/libs/utils/xArrows";
import { Card } from "./message-card/MessageCard";
import { Button } from "antd";
import { useAppStore } from "@/model/store";
import { MessagesSelector } from "@/model/store/slices/messagesSlice";
import { findMaxId } from "@/shared/libs/helpers";

//const cardList: TMessageCard[] = data.data

export const MessageList = () => {
    const { messageList, addMessage, setMessageList } = useAppStore(MessagesSelector)
    const addCard = () => {
        messageList && addMessage(findMaxId(messageList));
        
        //addMessage(messageList.length)
        //setCards([...cards, { id: cards.length + 1 }]);
    };

    const onChooseStart = (ref: RefObject<HTMLButtonElement>) => {
        //setArrows((prev) => [...prev, { start: ref, end: undefined }])
    }

    const onChooseEnd = (ref: RefObject<HTMLDivElement>) => {
        // console.log('onChooseEnd', ref);
        // setArrows((prev) => {
        //     console.log(100, prev[prev.length - 1]);

        //     return prev[prev.length - 1]?.start ? [...prev, { start: prev[prev.length - 1].start, end: ref }] : prev
        // })
    }

    const renderCards = (card: TMessageCard, index: number) => (
        <Card data={card} key={card.id} cardId={card.id} onChooseEnd={onChooseEnd} onChooseStart={onChooseStart} index={index}/>
    )

    const showArrows = () => {
        //
    }

    const renderXArrows = (card: TMessageCard, cardIndex: number) => {
        switch (true) {
            //Стрелка от карточки
            case !!card.next_message_id:
                return (
                    <Xarrow
                        key={cardIndex}
                        start={card.id.toString()}
                        end={card.next_message_id.toString()}
                        color={getRandomContrastingColor()}
                        path="smooth"
                        strokeWidth={2}
                    />
                )
            //Стрелка от кнопки
            case !card.next_message_id && card.buttons.length >= 1:
                return (
                    card?.buttons?.map((button, buttonIndex) => {
                        if (button.id && button.text.toLocaleLowerCase() !== "назад" && button.callback_data) {
                            return (
                                <Xarrow
                                    key={buttonIndex}
                                    start={button.id?.toString() || Math.floor(Math.random() * 2000).toString()}
                                    end={button.callback_data.toString()}
                                    color={getRandomContrastingColor()}
                                    path="smooth"
                                    strokeWidth={2}
                                    zIndex={0}
                                />
                            )
                        }
                    })
                )
            default:
                break;
        }
    }

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
        <section>
            <Xwrapper>
                <Button type="primary" onClick={addCard}>Добавить карточку</Button>
                {messageList.length > 1 && <>
                    <div className={s.wrapper}>{messageList?.map(renderCards)}</div>
                    <div>{messageList?.map(renderXArrows)}</div>
                </>}
            </Xwrapper>
        </section>
    );
};