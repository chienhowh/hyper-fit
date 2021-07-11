import styles from './HomePage.module.scss';
import { Calendar, Modal, Input, Button, DatePicker, Form } from 'antd';
import moment, { Moment } from 'moment';
import 'moment/locale/zh-tw';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MainLayout } from '../../layouts/mainLayout';
import { SubjectModal } from './SubjectModal';
moment.locale('zh-tw');




export const HomePage: React.FC = () => {
    const fakeCalendardata = [
        { date: 8, subject: '今天練胸' },
        { date: 9, subject: '今天練胸' },
        { date: 12, subject: '今天練腿' },
        { date: 7, subject: '今天練腿' },
        { date: 1, subject: '不想動' },
        { date: 7, subject: '加班' },
    ]
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 日曆資料內容
    const [calendarData, setCalendarData] = useState(fakeCalendardata);
    const [form] = Form.useForm();
    // modat start
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then((value: any) => {
            const date = value.date.date();
            const subject = value.subject
            setCalendarData((prevState) => [...prevState, { date, subject }]);
            setIsModalVisible(false);
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    // modat end

    // form start
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    // form end

    // calendar start
    function onPanelChange(value: Moment, mode: string) {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    /** 抓資料 */
    function getListData(value: Moment) {
        const listData = calendarData.filter(data => data.date === value.date());
        // 沒資料回空陣列
        return listData;
    }

    function onOpenBlock() {
        console.log('test')
    }


    /** 渲染資料到日曆格 */
    function dateCellRender(value: Moment) {
        const listData = getListData(value);
        return (
            <ul className={styles.events}>
                {listData.map(item => (
                    <li key={uuid()} className={styles['ant-badge-status']} onClick={(e) => {
                        e.stopPropagation()
                        onOpenBlock()
                    }}>
                        {item.subject}
                    </li>
                ))}
            </ul>
        );
    }

    function onClickDate(value: Moment) {
        form.setFieldsValue({ date: value, subject: '' });
        showModal();
    }
    // calendar end


    return (<MainLayout>
        <div>
            <Calendar onPanelChange={onPanelChange} fullscreen={false} dateCellRender={dateCellRender} onSelect={onClickDate} className={`${styles['mobile-calendar-card']} calendar`} />
        </div>

        {/* modal start */}
        <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel}
            footer={
                [
                    <Button type="primary" onClick={handleCancel} >
                        取消
                    </Button>,
                    <Button type="primary" onClick={handleOk}>
                        新增
                    </Button>
                ]
            }>
            <Form
                name="basic"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="請輸入標題"
                    name="subject"
                    rules={[{ required: true, message: 'Please input your subject!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="訓練日期"
                    name="date"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <DatePicker />
                </Form.Item>

            </Form>

        </Modal>

    </MainLayout>)
}