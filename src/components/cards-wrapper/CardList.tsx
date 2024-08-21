import { ReactNode, RefObject, useState } from "react";
import { Card } from "../card/Card";
import s from "./styles.module.css"
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { data } from "../../shared/constants";

type TArrowData = {
    start?: RefObject<HTMLButtonElement>,
    end?: RefObject<HTMLDivElement>,
}

const cardList = data.data

export const CardList = () => {
    const [cards, setCards] = useState<Array<{ id: number }>>([]);
    const [arrows, setArrows] = useState<TArrowData[]>([]);
    const addCard = () => {
        setCards([...cards, { id: cards.length + 1 }]);
    };

    const onChooseStart = (ref: RefObject<HTMLButtonElement>) => {
        setArrows((prev) => [...prev, { start: ref, end: undefined }])
    }

    const onChooseEnd = (ref: RefObject<HTMLDivElement>) => {
        console.log('onChooseEnd', ref);
        setArrows((prev) => {
            console.log(100, prev[prev.length - 1]);

            return prev[prev.length - 1]?.start ? [...prev, { start: prev[prev.length - 1].start, end: ref }] : prev
        })
    }


    return (
        <div>
            <button className={s.button} onClick={addCard}>Добавить карточку</button>
            {/*             <Xwrapper>
 */}                <div className={s.wrapper}>
                {cardList.map((card) => (
                    <Card data={card} key={card.id} cardId={card.id} onChooseEnd={onChooseEnd} onChooseStart={onChooseStart} />
                ))}
            </div>
            {/*             </Xwrapper>
 */}            <div>
                {arrows?.map((arrow, index) => (
                    arrow.start && arrow.end && <Xarrow key={index} start={arrow.start} end={arrow.end} />
                ))}
            </div>
        </div>
    );
};