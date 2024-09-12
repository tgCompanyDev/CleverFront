import { RefObject, useState } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";
import { getRandomContrastingColor } from "@/shared/libs/utils/xArrows";
import { Card } from "../message-card/MessageCard";
import { TMessageCard } from "../../types/messageTypes";
import { useAppStore } from "@/model/store";
import { classNames } from "@/shared/libs/helpers";
import { MessagesSelector } from "@/model/store/slices/messagesSlice";

//const cardList: TMessageCard[] = data.data

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

export const MessageList = () => {
    const { messageList } = useAppStore(MessagesSelector)
    const [activeCardId, setActiveCardId] = useState<number>()

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

    const onArrowButtonClick = (id: number) => {
        setActiveCardId(id);
    }

    const renderCards = (card: TMessageCard, index: number) => (
        <Card
            data={card}
            key={card.id}
            cardId={card.id}
            onChooseEnd={onChooseEnd}
            onChooseStart={onChooseStart}
            index={index}
            onArrowButtonClick={onArrowButtonClick}
            transparent={activeCardId && activeCardId !== card.id}
        />
    )

    const showArrows = () => {
        //
    }

    return (
        <section>
            <Xwrapper>
                {messageList.length > 1 && <>
                    <div className={classNames(
                        "grid grid-cols-4 gap-10",
                    )}>
                        {messageList?.map(renderCards)}
                    </div>
                    <div>{messageList?.map(renderXArrows)}</div>
                </>}
            </Xwrapper>
        </section>
    );
};