import styles from './HomePage.module.scss';
import { Calendar,Modal } from 'antd';
import moment, { Moment } from 'moment';
import 'moment/locale/zh-tw';
import { useState } from 'react';
moment.locale('zh-tw');




export const HomePage: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);


    function onPanelChange(value: Moment, mode: string) {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    /** 抓資料 */
    function getListData(value: Moment) {
        let listData: any[] = [];
        switch (value.date()) {
            case 8:
                listData = [
                    { content: '今天練胸' },
                ];
                break;
            case 10:
                listData = [
                    { content: '今天練背' },
                ];
                break;
            case 15:
                listData = [
                    { content: '今天練背' },
                ];
                break;
            default:
        }
        return listData || [];
    }

    /** 渲染資料到日曆格 */
    function dateCellRender(value: Moment) {
        const listData = getListData(value);
        return (
            <ul className={styles.events}>
                {listData.map(item => (
                    <li key={item.content} className={styles['ant-badge-status']}>
                        {item.content}
                    </li>
                ))}
            </ul>
        );
    }

    function onClickDate(value: Moment) {
        showModal();
    }

    //modal start
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (<>
        <div>
            <Calendar onPanelChange={onPanelChange} fullscreen={false} dateCellRender={dateCellRender} onSelect={onClickDate} className={styles['mobile-calendar-card']} />
        </div>

        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    </>)
}