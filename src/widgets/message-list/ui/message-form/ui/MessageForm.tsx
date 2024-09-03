import { FormList } from "@/entities/form"
import { Button, Form, Input, InputNumber } from "antd"

export const MessageForm = () => {
    const onFormSubmit = (values: any) => {
        console.log(111, values);

    }
    const handleFormChange = () => { }
    const messageId = 2
    return (
        <Form
            onFinish={onFormSubmit}
            initialValues={{
                id: messageId,
            }}
            onChange={handleFormChange}
        >
            <Form.Item label={'ID'} className="" name={'id'}>
                <InputNumber placeholder={""} disabled={false} />
            </Form.Item>
            <Form.Item label={'Название'} className="" name={'name'}>
                <Input placeholder={""} disabled={false} />
            </Form.Item>
            <Form.Item label={'Описание'} className="" name={'text'}>
                <Input placeholder={""} disabled={false} />
            </Form.Item>
            <Form.Item label={'Изображение'} className="" name={'image'}>
                <Input placeholder={""} disabled={false} />
            </Form.Item>
            <FormList formName="buttons" itemLabel="Кнопка" initialValue={[]} itemPlaceholder="Название" listType="buttons" required={true} onChange={handleFormChange} />
            <Button htmlType="submit" type="primary" disabled={false}>Submit</Button>
        </Form>
    )
}