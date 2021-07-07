
import { Form, Input, Button } from 'antd';
import styles from './RegisterForm.module.scss';

export const RegisterForm: React.FC = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout='vertical'
            className={styles['register-form']}
        >
            <Form.Item
                label="用戶名稱"
                name="username"
                rules={[{ required: true, message: '請輸入用戶名' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密碼"
                name="password"
                rules={[{ required: true, message: '請輸入密碼' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="確認密碼"
                name="confirmPassword"
                rules={[{ required: true, message: '請輸入確認密密碼' },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('與密碼不符'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >
    );
};

