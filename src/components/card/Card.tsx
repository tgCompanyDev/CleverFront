import { FC, ReactNode, RefObject, useRef } from "react";
import { ActionButton } from "../action-button/Button";
import s from "./styles.module.css"
import { useXarrow } from "react-xarrows";
import Draggable from "react-draggable";
import { Button, Typography } from "antd";
import { TMessageCard } from "../../shared/types/cardMessages";
const { Title, Text } = Typography

interface CardProps {
    onChooseStart: (ref: RefObject<HTMLButtonElement>) => void;
    onChooseEnd: (ref: RefObject<HTMLDivElement>) => void;
    cardId: number;
    data: TMessageCard
}

const DraggableBox = ({ children, ref }: { children: ReactNode, ref: RefObject<HTMLDivElement> }) => {
    const updateXarrow = useXarrow();
    return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow} nodeRef={ref}>
            {children}
        </Draggable>
    );
};

export const Card: FC<CardProps> = ({ cardId, onChooseStart, onChooseEnd, data }) => {
    const cardRef = useRef(null)
    //const buttonRefs = useRef(new Map<string, HTMLButtonElement>());

    const buttons = ['кнопка1', 'кнопка2', 'кнопка3']

    const handleChooseEndCard = () => {
        if (onChooseEnd) {
            onChooseEnd(cardRef)
        }
    }

    return (
        <DraggableBox ref={cardRef}>
            <div className={s.card} key={cardId} ref={cardRef} onClick={handleChooseEndCard} id={cardId.toString()}>
                <Title level={3} style={{ textAlign: "center" }}>{data.name.toUpperCase()}</Title>
                <div>
                    <Text>{data.text}</Text>
                </div>
                <div className={s.content}>
                    {data?.buttons?.map((button) => (
                        <ActionButton
                            key={button.id}
                            buttonId={button.id}
                            cardId={data.id}
                            onChooseStart={onChooseStart}
                            text={button.text}
                        />
                    ))}
                </div>
                <div>
                    <Button type="primary">Сохранить</Button>
                    <Button type="default">Изменить</Button>
                </div>
            </div>
        </DraggableBox>
    );
};