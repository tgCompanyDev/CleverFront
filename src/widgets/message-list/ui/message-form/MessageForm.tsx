import { FormList } from "@/entities/form"
import { useAppStore } from "@/model/store"
import { MessagesSelector } from "@/model/store/slices/messagesSlice"
import { TSelectOPtion } from "@/shared/types/form"
import { messagesApi } from "@/widgets/message-list/api/MessagesApi"
import { TMessageCard } from "@/widgets/message-list/types/messagesTypes"
import { Button, Form, Input, InputNumber, Select } from "antd"
import { FC } from "react"
const { Option } = Select
type TMessageFormProps = {
    messageData: TMessageCard
}
const defaultSelectOption: TSelectOPtion = {
    name: "Без ссылки",
    id: null,
}
export const MessageForm: FC<TMessageFormProps> = ({ messageData }) => {
    const { updateMessage, messageList } = useAppStore(MessagesSelector)
    const initialButtonValues = messageData.buttons.map(item => (
        { ...item, callback_data: !!item.callback_data ? +item.callback_data : null }
    ))
    const initialFormValues: TMessageCard = {
        ...messageData,
        buttons: initialButtonValues
    }
    const messageNameList = messageList && [defaultSelectOption, ...messageList?.map(message => ({
        name: message.name,
        id: message.id,
    }))]
    const onFormSubmit = (values: TMessageCard) => {
        messagesApi
            .updateMessage({ ...messageData, ...values }, values.id)
            .then(res => updateMessage(res.data.data))
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
                        {messageNameList.map(message => (
                            <Option value={message.id} noStyle>{message.name}</Option>
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
            <Button htmlType="submit" type="primary" disabled={false}>Сохранить</Button>
        </Form>
    )
}