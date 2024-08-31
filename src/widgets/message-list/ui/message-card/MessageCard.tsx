import { FC, RefObject, useRef } from "react";
import s from "./styles.module.css"
import { Button, Space, Typography } from "antd";
import { TMessageCard } from "@/widgets/message-list";
import { DraggableBox } from "@/shared/ui/DraggableBox";
import { ActionButton } from "../action-button/Button";
import { RiseOutlined } from "@ant-design/icons";
import { messagesApi } from "../../api/MessagesApi";
const { Title, Text } = Typography

interface ICardProps {
    onChooseStart: (ref: RefObject<HTMLButtonElement>) => void;
    onChooseEnd: (ref: RefObject<HTMLDivElement>) => void;
    cardId: number;
    data: TMessageCard
}

export const Card: FC<ICardProps> = ({ cardId, onChooseStart, onChooseEnd, data }) => {
    const cardRef = useRef(null)
    //const buttonRefs = useRef(new Map<string, HTMLButtonElement>());

    const handleSaveMessage = () => {
        data && messagesApi.createMessage({...data, id: undefined, bot_id: 1})
    }

    const handleChooseEndCard = () => {
        if (onChooseEnd) {
            onChooseEnd(cardRef)
        }
    }

    return (
        <DraggableBox ref={cardRef}>
            <div className={s.card} key={cardId} ref={cardRef} onClick={handleChooseEndCard} id={cardId.toString()}>
                <Space>
                    <Title level={3} style={{ textAlign: "center" }}>{data.name.toUpperCase()}</Title>
                    <Button type="text"><RiseOutlined /></Button>
                </Space>
                
                <div>
                    <Text>{data.text}</Text>
                </div>
                <div className={s.content}>
                    {data?.buttons?.map((button) => (
                        <ActionButton
                            key={button.id}
                            buttonId={button.id.toString()}
                            cardId={data.id}
                            onChooseStart={onChooseStart}
                            text={button.text}
                        />
                    ))}
                </div>
                <Space align="center"  className="justify-center">
                    <Button type="primary" onClick={handleSaveMessage}>Сохранить</Button>
                    <Button type="default">Изменить</Button>
                </Space>
            </div>
        </DraggableBox>
    );
};