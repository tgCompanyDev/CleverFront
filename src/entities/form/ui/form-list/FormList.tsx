import { useAppStore } from "@/model/store";
import { MessagesSelector } from "@/model/store/slices/messagesSlice";
import { TMessageButton } from "@/widgets/message-list"
import { MinusCircleOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select } from "antd"
import { FC } from "react"
const { Option } = Select;

type TFormListProps = {
    formName: string,
    initialValue?: string[] | TMessageButton[],
    itemLabel: string,
    itemPlaceholder?: string,
    listType: "buttons",
    required?: boolean,
    onChange?: () => void,
}

export const FormList: FC<TFormListProps> = ({ initialValue, itemLabel, itemPlaceholder, formName, listType, required = false, onChange }) => {

    const { messageList } = useAppStore(MessagesSelector)

    const isButtonsType = listType === "buttons"
    const firstInputName = itemLabel
    const secondInputName = "Ссылка"
    // const handleDeletePicture = (fieldName: number) => {
    //     remove(field.name)
    // }
    //console.log(222, messageList.length >= 1  && messageList.map(message => {message.name, message.id}));
    
    return (
        <>
        <Form.List name={formName} initialValue={initialValue}>
            {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map((field, index) => {
                        return (
                            <Form.Item
                                label={`${itemLabel} ${index + 1}`}
                                required={false}
                                key={field.key + index}
                                style={{display: "flex"}}
                            >
                                <Form.Item
                                    {...field}
                                    key={1}
                                    name={isButtonsType ? [field.name, firstInputName] : field.name}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: required,
                                            whitespace: true,
                                            message: `Please input ${itemLabel} or delete this field`,
                                        },
                                    ]}
                                    label={itemLabel}
                                    noStyle
                                >
                                    <Input placeholder={itemPlaceholder} style={{ width: '40%' }} />
                                </Form.Item>
                                {isButtonsType && (
                                    <Form.Item
                                        {...field}
                                        key={2}
                                        name={[field.name, secondInputName]}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: required,
                                                whitespace: true,
                                                message: `Please input ${itemLabel} or delete this field`,
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Select placeholder={secondInputName} style={{ width: '40%' }} className="capitalize">
                                            <Option value="male">Меню</Option>
                                            <Option value="male">Второе сообщение</Option>
                                            <Option value="male">Стартовое сообщение</Option>
                                        </Select>
                                    </Form.Item>
                                )}
                                {fields.length >= 1 && (
                                    <MinusCircleOutlined
                                        className="mx-2"
                                        onClick={() => {
                                            remove(field.name)
                                            onChange()
                                        }}
                                    />
                                )}
                            </Form.Item>
                        )
                    })}
                    <Form.Item>
                        <Button type="dashed" onClick={() => {
                            add()
                            onChange()
                        }} block>
                            {`Add ${itemLabel}`}
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
        </>
    )
}