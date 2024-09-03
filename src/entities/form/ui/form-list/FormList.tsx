import { useAppStore } from "@/model/store";
import { MessagesSelector } from "@/model/store/slices/messagesSlice";
import { TMessageButton } from "@/widgets/message-list"
import { CloseOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select, Space } from "antd"
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
    const defaultSelectOption = {
        name: "Без ссылки",
        id: null,
    }
    const messageNameList = messageList && [defaultSelectOption, ...messageList?.map(message => ({
        name: message.name,
        id: message.id,
    }))]

    const isButtonsType = listType === "buttons"
    const firstInputName = "text"
    const secondInputName = "callback_data"
    // const handleDeletePicture = (fieldName: number) => {
    //     remove(field.name)
    // }

    return (
        <>
            <Form.List name={formName} initialValue={initialValue}>
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => {
                            return (
                                <Form.Item
                                    label={itemLabel}
                                    required={false}
                                    key={field.key + index}
                                    style={{ display: "flex" }}
                                >

                                    <Space.Compact>
                                        <Form.Item
                                            {...field}
                                            key={1}
                                            name={isButtonsType ? [field.name, firstInputName] : field.name}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true, //required,
                                                    whitespace: true,
                                                    message: `Введите значение или удалите поле`,
                                                },
                                            ]}
                                            label={itemLabel}
                                            noStyle
                                        >
                                            <Input placeholder={itemPlaceholder} style={{ width: '50%' }} />
                                        </Form.Item>
                                        {isButtonsType && (
                                            <Form.Item
                                                {...field}
                                                key={2}
                                                name={[field.name, secondInputName]}
                                                validateTrigger={['onChange', 'onBlur']}
                                                /*                                         rules={[
                                                                                            {
                                                                                                required: false, //required,
                                                                                                whitespace: true,
                                                                                                message: `Please input ${itemLabel} or delete this field`,
                                                                                            },
                                                                                        ]} */
                                                noStyle
                                            >
                                                <Select placeholder={"Выберите ссылку"} style={{ width: '50%' }} className="capitalize" >
                                                    {messageNameList.map(message => (
                                                        <Option value={message.id} noStyle>{message.name}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        )}

                                    </Space.Compact>
                                    {fields.length >= 1 && (
                                        <CloseOutlined
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
                                Добавить кнопку
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </>
    )
}