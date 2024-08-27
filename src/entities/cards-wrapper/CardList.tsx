import { RefObject, useEffect, useState } from "react";
import s from "./styles.module.css"
import Xarrow, { Xwrapper } from "react-xarrows";
import { data } from "src/shared/constants";
import { TMessageCard } from "src/shared/types/cardMessages";
import { getRandomContrastingColor } from "src/shared/libs/utils/xArrows";
import { Card } from "../card/Card";
import { messagesApi } from "src/widgets/messages/api/MessagesApi";

type TArrowData = {
    start?: RefObject<HTMLButtonElement>,
    end?: RefObject<HTMLDivElement>,
}

//const cardList: TMessageCard[] = data.data

export const CardList = () => {
    const [cards, setCards] = useState<TMessageCard[]>([]);
    const addCard = () => {
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

    const renderCards = (card: TMessageCard) => (
        <Card data={card} key={card.id} cardId={card.id} onChooseEnd={onChooseEnd} onChooseStart={onChooseStart} />
    )

    const renderXArrows = (card: TMessageCard, cardIndex: number) => {
        switch (true) {
            case !!card.next_message_id:
                console.log('connect', card.id, card.next_message_id);
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
            case !card.next_message_id && card.buttons.length >= 1:
                return (
                    card?.buttons?.map((button, buttonIndex) => {
                        if (button.id && button.callback_data) {
                            console.log('button', button)
                            return (
                                <Xarrow
                                    key={buttonIndex}
                                    start={button.id.toString()}
                                    end={button.callback_data.toString()}
                                    color={getRandomContrastingColor()}
                                    path="smooth"
                                    strokeWidth={2}
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
                setCards(res.data.data)
            })
    }

    useEffect(() => {
        getAllMessages()
    }, [])


    return (
        <Xwrapper>
            <button className={s.button} onClick={addCard}>Добавить карточку</button>
            {cards.length > 1 && <>
                <div className={s.wrapper}>{cards?.map(renderCards)}</div>
                <div>{cards?.map(renderXArrows)}</div>
            </>}
        </Xwrapper>
    );
};