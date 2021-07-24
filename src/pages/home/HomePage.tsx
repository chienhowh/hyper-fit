import styles from './HomePage.module.scss';
import { Calendar, Modal, Input, Button, DatePicker, Form } from 'antd';
import moment, { Moment } from 'moment';

import 'moment/locale/zh-tw';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MainLayout } from '../../layouts/mainLayout';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/hooks';
import { scheduleList } from '../../redux/scheduleList/slice';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
moment.locale('zh-tw');




export const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const calendarData = useSelector(state => state.scheduleList.scheduleList);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    // modat start
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then((value: { date: Moment, subject: string }) => {
            const date = value.date.toDate();
            const subject = value.subject
            // const uuid = uuid();//為什麼不行
            dispatch(scheduleList.actions.addScheduleList({ date, subject, id: uuid() }));
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


    function onOpenScheduleDetail(id: string) {
        console.log('test', id);
        history.push(`/schedule/${id}`);
    }


    /** 渲染資料到日曆格 */
    function dateCellRender(value: Moment) {
        const listData = calendarData.filter(data => data.date.getDate() === value.date());

        return (
            <ul className={styles.events}>
                {listData.map(item => (
                    <li key={item.id} className={styles['ant-badge-status']} onClick={(e) => {
                        e.stopPropagation()
                        onOpenScheduleDetail(item.id)
                    }}>
                        {item.subject}
                    </li>
                ))}
            </ul>
        );
    }

    function handleNewSchedule() {
        form.setFieldsValue({ date: moment(), subject: '' });
        showModal();
    }
    // calendar end


    useEffect(() => {
        // dispatch(scheduleList.actions.getScheduleList());
    }, [])

    return (<MainLayout>
        <div className="relative">
            <Calendar onPanelChange={onPanelChange} fullscreen={false} dateCellRender={dateCellRender} className={`${styles['mobile-calendar-card']} calendar`} />
            <Button icon={<PlusOutlined />} className="add-icon" onClick={handleNewSchedule}>新增課表</Button>
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