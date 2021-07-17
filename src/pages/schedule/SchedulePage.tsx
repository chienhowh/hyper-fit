
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../../layouts/mainLayout';
import { useSelector } from '../../redux/hooks';
import styles from './SchedulePage.module.scss';
import { SchedulePanel } from './SchedulePanel';
import { v4 as uuid } from 'uuid';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';


interface RouteParams {
    scheduleId: string;
}

export const SchedulePage: React.FC = () => {
    const { scheduleId } = useParams<RouteParams>();
    const dispatch = useDispatch();
    /** 所有的schedule*/
    const scheduleList = useSelector(s => s.scheduleList.scheduleList);
    const schedule = scheduleList.filter(s => s.id === scheduleId)[0];


    return (
        <MainLayout>
            <div className="">
                <div className="text-xl text-center">
                    {schedule.subject}
                </div>
                {/* 基本提示 */}
                <div className="flex justify-evenly">
                    <div className={styles['header-hint']}>
                        <div> 總組數:</div>
                        <div>12組</div>
                    </div>
                    <div className={styles['header-hint']}>
                        <div >總重量:</div>
                        <div>100kg</div>
                    </div>
                    <div className={styles['header-hint']}>
                        <div>時間:</div>
                        <div>1hr20min</div>
                    </div>
                </div>
                {/* 訓練面板 */}
                <div className="w-11/12 mx-auto">
                    {schedule.movements ? schedule.movements.map(move => {
                        return <SchedulePanel move={move} key={uuid()}></SchedulePanel>

                    }) : ''}
                </div>
                <Button icon={<PlusOutlined />} className={styles.addMovement}></Button>

            </div>
        </MainLayout>
    )
}