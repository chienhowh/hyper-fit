import React from "react";
import { Button } from 'antd';
import { useDispatch } from "react-redux";
import { scheduleList } from "../../redux/scheduleList/slice";

interface PropsType {
  scheduleId: string;
  handelConfirm: () => void;
  handelCancel: () => void;
}


export const MovementModal: React.FC<PropsType> = ({ scheduleId, handelConfirm, handelCancel }) => {
  const dispatch = useDispatch();
  const addMovement = () => {
    dispatch(scheduleList.actions.addMovement({
      scheduleId,
      movements: [{ id: '胸', sets: [{ reps: 8, weight: 50 }, { reps: 12, weight: 50 }, { reps: 10, weight: 50 }] }]
    }));
    console.log('add movement')
  }
  return <>
    <div>form work</div>
    <Button type="primary" danger onClick={handelCancel}>取消</Button>
    <Button type="primary" onClick={() => {
      addMovement();
      handelConfirm();
    }}>確認</Button>
  </>
}