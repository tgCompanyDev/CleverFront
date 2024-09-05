import { FormList } from "@/entities/form"
import { useAppStore } from "@/model/store"
import { MessagesSelector } from "@/model/store/slices/messagesSlice"
import { TSelectOption } from "@/shared/types/form"
import { messagesApi } from "@/widgets/message-list/api/MessagesApi"
import { TMessageCard } from "@/widgets/message-list/types/messagesTypes"
import { Button, Form, Input, InputNumber, Select, Space } from "antd"
import { FC, useState } from "react"
const { Option } = Select
type TMessageFormProps = {
    messageData: TMessageCard,
    onFinish: () => void,
}
const defaultSelectOption: TSelectOption = {
    name: "Без ссылки",
    id: null,
}
export const MessageForm: FC<TMessageFormProps> = ({ messageData, onFinish }) => {
    const [loading, setLoading] = useState(false)
    const { updateMessage, messageList, bot_id, removeMessage } = useAppStore(MessagesSelector)
    const initialButtonValues = messageData.buttons.map(item => (
        { ...item, callback_data: item.callback_data ? +item.callback_data : null }
    ))
    const initialFormValues: TMessageCard = {
        ...messageData,
        buttons: initialButtonValues
    }
    const messageNameList: TSelectOption[] = messageList.map(message => ({
        name: message.name,
        id: message.id,
    }))
    const optionMessageList = [defaultSelectOption, ...messageNameList]
    const isDraftMessage = +messageData.id < 1

    const onFormSubmit = (values: TMessageCard) => {
        setLoading(true)
        const apiMethod = isDraftMessage ? "createMessage" : "updateMessage"
        messagesApi[apiMethod]({ ...messageData, ...values, bot_id })
            .then(res => {
                updateMessage(res.data.data, messageData.id)
            })
            .finally(() => {
                setLoading(false)
                onFinish()
            })
    }

    const handleRemoveMessage = () => {
        if (isDraftMessage) {
            removeMessage(messageData.id)
            onFinish()
        } else {
            setLoading(true)
            messagesApi.removeMessage(messageData.id)
                .then(() => {
                    removeMessage(messageData.id)
                })
                .finally(() => {
                    setLoading(false)
                    onFinish()
                })
        }

    }
    const handleFormChange = () => { }
    return (
        <Form
            onFinish={onFormSubmit}
            initialValues={initialFormValues}
            onChange={handleFormChange}
            className="w-[500px]"
        >
            <Form.Item label={'ID'} className="" name={'id'}>
                <InputNumber placeholder={""} disabled={true} />
            </Form.Item>
            <Form.Item label={'Название'} className="" name={'name'}>
                <Input placeholder={""} disabled={false} />
            </Form.Item>
            <Form.Item label={'Описание'} className="" name={'text'}>
                <Input placeholder={""} disabled={false} />
            </Form.Item>
            {/* //todo file uploader */}
            {/* <Form.Item label={'Изображение'} className="" name={'image'}>
                <Input placeholder={""} disabled={false} />
            </Form.Item> */}
            {messageData.first_message && (
                <Form.Item label={'Следующее сообщение'} className="" name={'next_message_id'}>
                    <Select placeholder={"Выберите ссылку"} style={{ width: '100%' }} className="capitalize" >
                        {optionMessageList.map((message, index) => (
                            <Option key={message.id+index} value={message.id} noStyle>{message.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
            )}
            <FormList
                formName="buttons"
                itemLabel="Кнопка"
                initialValue={initialButtonValues}
                itemPlaceholder="Название"
                listType="buttons"
                required={true}
                onChange={handleFormChange}
            />
            <Space>
                <Button htmlType="submit" type="primary" disabled={loading} loading={loading}>Сохранить</Button>
                <Button htmlType="button" type="primary" disabled={loading} loading={loading} danger onClick={handleRemoveMessage}>Удалить</Button>
            </Space>
        </Form>
    )
}