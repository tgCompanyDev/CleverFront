import { FC } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { userApi } from '../api/UserApi';
import { TAuthLoginData } from '../types';
import { useAppStore } from '@/model/store';

export const AuthForm: FC = ({}) => {
    const {setIsAuthenticated} = useAppStore(state => state.user)
    const handleFinish = (loginData:TAuthLoginData) => {
        console.log('Success:', loginData);
        userApi.authLogin(loginData)
            .finally(() => {
                setIsAuthenticated(true);
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
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};