import { Form } from "antd"

export const CustomForm = () => {
    const handleSubmitForm = () => {
        //
    }
    return (
        <Form
            onFinish={handleSubmitForm}
            //initialValues={formInitialValues}
            disabled={false}
        >

        </Form>
    )
}