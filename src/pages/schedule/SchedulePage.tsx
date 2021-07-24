
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../../layouts/mainLayout';
import { useSelector } from '../../redux/hooks';
import styles from './SchedulePage.module.scss';
import { SchedulePanel } from './SchedulePanel';
import { v4 as uuid } from 'uuid';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { createContext, useState } from 'react';
import React from 'react';
import { Modal } from 'antd';
import { MovementModal } from './Movement-modal';


interface RouteParams {
    scheduleId: string;
}




export const SchedulePage: React.FC = () => {
    const { scheduleId } = useParams<RouteParams>();
    const dispatch = useDispatch();
    /** 所有的schedule*/
    const scheduleList = useSelector(s => s.scheduleList.scheduleList);
    const schedule = scheduleList.find(s => s.id === scheduleId);
    const totalSets = schedule?.movements.map(s => s.sets.length).reduce((prev, ele) => prev + ele);
    const totalWeight = schedule?.movements.map(m => m.sets).map(s=>s.map(w=>+w.weight)).reduce((prev, ele) => prev.concat(ele)).reduce((prev, ele) => prev + ele);
    console.log(totalWeight);
    /** 創建movement Modal start */
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    /** 創建movement Modal end */

    return (

        <MainLayout>
            <div className="">
                <div className="text-xl text-center">
                    {schedule?.subject}
                </div>
                {/* 基本提示 */}
                <div className="flex justify-evenly">
                    <div className={styles['header-hint']}>
                        <div> 總組數:</div>
                        <div>{totalSets}組</div>
                    </div>
                    <div className={styles['header-hint']}>
                        <div >總重量:</div>
                        <div>{totalWeight}kg</div>
                    </div>
                    <div className={styles['header-hint']}>
                        <div>時間:</div>
                        <div>1hr20min</div>
                    </div>
                </div>
                {/* 訓練面板 */}
                <div className="w-11/12 mx-auto">
                    {schedule?.movements ? schedule.movements.map(move => {
                        return <SchedulePanel move={move} scheduleId={schedule.id} key={uuid()}></SchedulePanel>

                    }) : ''}
                </div>
                {/* add movement */}
                <Button icon={<PlusOutlined />} className={styles.addMovement} onClick={showModal}></Button>
            </div>
            {/* modal start */}
            <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel}
                footer={null}>
                <MovementModal handelConfirm={handleOk} handelCancel={handleCancel} scheduleId={scheduleId}></MovementModal>
            </Modal>
            {/* modal end */}
        </MainLayout>

    )
}