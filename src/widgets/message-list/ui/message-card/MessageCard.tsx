import { FC, RefObject, useRef, useState } from "react";
import s from "./styles.module.css"
import { Button, Space, Typography } from "antd";
import { TMessageCard } from "@/widgets/message-list";
import { ActionButton } from "../action-button/Button";
import { RiseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ModalPortal } from "@/shared/ui/ModalPortal";
import { MessageForm } from "../message-form/MessageForm";
import { useAppStore } from "@/model/store";
import { MessagesSelector } from "@/model/store/slices/messagesSlice";
const { Title, Text } = Typography
interface ICardProps {
    onChooseStart: (ref: RefObject<HTMLButtonElement>) => void;
    onChooseEnd: (ref: RefObject<HTMLDivElement>) => void;
    cardId: number;
    data: TMessageCard,
    index?: number,
}

export const Card: FC<ICardProps> = ({ cardId, onChooseStart, onChooseEnd, data, index }) => {
    const {moveCard} = useAppStore(MessagesSelector)
    const cardRef = useRef(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    //const buttonRefs = useRef(new Map<string, HTMLButtonElement>());

    const handleChooseEndCard = () => {
        if (onChooseEnd) {
            onChooseEnd(cardRef)
        }
    }

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }
    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
    const handleMoveLeftCard = () => {
        moveCard(index, index-1)
    }
    const handleMoveRightCard = () => {
        moveCard(index, index + 1)
    }

    return (
        <>
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
                            buttonId={button.id?.toString()}
                            cardId={data.id}
                            onChooseStart={onChooseStart}
                            text={button.text}
                        />
                    ))}
                </div>
                <div className="flex">
                    <Button onClick={handleMoveLeftCard}><LeftOutlined /></Button>
                    <Button type="default" onClick={handleOpenModal} block>Изменить</Button>
                    <Button onClick={handleMoveRightCard}><RightOutlined /></Button>
                </div>
                
            </div>
            <ModalPortal isOpen={isModalOpen} title={data.name.toUpperCase()} onClose={handleCloseModal}>
                <div className="">
                    <MessageForm messageData={data} onFinish={handleCloseModal}/>
                </div>
            </ModalPortal>
        </>
    );
};

{/* <DraggableBox ref={cardRef}>
    ...
</DraggableBox> */}