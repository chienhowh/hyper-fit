
import { Form, Input, Button } from 'antd';
import styles from './SigninForm.module.scss';
import { Link } from 'react-router-dom';

export const SigninForm: React.FC = () => {

    // 表單 start
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
            className={styles['signin-form']}
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
            <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                    登入
                </Button>
            </Form.Item>
            <Link to='/register'>register now!</Link>
        </Form >
    );
};

