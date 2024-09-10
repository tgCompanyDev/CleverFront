import { FC, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { userApi } from '../api/UserApi';
import { TAuthLoginData } from '../types';
import { useAppStore } from '@/model/store';
import { setToken } from '@/shared/libs/utils/auth';

export const AuthForm: FC = ({}) => {
    const {setIsAuthenticated} = useAppStore(state => state.user)
    const [authPending, setAuthPending] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const handleFinish = (loginData:TAuthLoginData) => {
        setAuthPending(true)
        userApi.authLogin(loginData)
            .then(auth => {
                setToken(auth.data.token);
                setIsAuthenticated(true);
            })
            .catch(error => {
                setErrorMessage(typeof error === "string" ? error : error.message);
            })
            .finally(() => {
                setAuthPending(false)
            })
    };

    const onFinishFailed: FormProps<TAuthLoginData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{
                email: "admin@admin.com",
                password: "password"
            }}
            onFinish={handleFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"

        >
            <Form.Item<TAuthLoginData>
                label="Username"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<TAuthLoginData>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={authPending}>
                    Submit
                </Button>
            </Form.Item>
            {errorMessage && (
                <p className='text-red-500 font-bold text-center'>{errorMessage}</p>
            )}
        </Form>
    )
};