import React from "react";
import { Collapse } from 'antd';
import { Movement } from "../../redux/scheduleList/slice";
import { v4 as uuid } from 'uuid';

interface PropsType {
    move: Movement;
}

export const SchedulePanel: React.FC<PropsType> = ({ move }) => {
    return (
        <Collapse>
            <Collapse.Panel header={move.action} key="1">
                <ul>
                    {move.sets.map(set => {
                        return <li key={uuid()}>{set.reps}下 {set.weight}公斤</li>
                    })}
                </ul>
            </Collapse.Panel>
        </Collapse>
    )
}