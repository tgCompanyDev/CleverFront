import { FormList } from "@/entities/form"
import { messagesApi } from "@/widgets/message-list/api/MessagesApi"
import { TMessageCard } from "@/widgets/message-list/types/messagesTypes"
import { Button, Form, Input, InputNumber } from "antd"
import { FC } from "react"
type TMessageFormProps = {
    messageData: TMessageCard
}
export const MessageForm: FC<TMessageFormProps> = ({ messageData }) => {
    const initialButtonValues = messageData.buttons.map(item => (
        {...item, callback_data: !!item.callback_data ? +item.callback_data : null}
    ))
    const initialFormValues: TMessageCard = {
        ...messageData,
        buttons: initialButtonValues
    }
    const onFormSubmit = (values: TMessageCard) => {
        messagesApi.updateMessage({...messageData, ...values}, values.id)
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