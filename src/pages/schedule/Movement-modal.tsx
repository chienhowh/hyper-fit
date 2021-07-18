import React, { useState } from "react";
import { Button, Form, Input, Select } from 'antd';
import { useDispatch } from "react-redux";
import { scheduleList } from "../../redux/scheduleList/slice";
import { v4 as uuid } from 'uuid';
interface PropsType {
  scheduleId: string;
  handelConfirm: () => void;
  handelCancel: () => void;
}

const { Option } = Select;
// string 要必須屬於他 回來看一下keyof typeof
const bodypartData: (keyof typeof actionData)[] = ['chest', 'back', 'legs'];
const actionData: { chest: any[], back: any[], legs: any[] } = {
  chest: ['push up', 'dumbell press'],
  back: ['pull up', 'pull down'],
  legs: ['squat', 'deadlift']
}

export const MovementModal: React.FC<PropsType> = ({ scheduleId, handelConfirm, handelCancel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [bodypart, setBodypart] = useState(bodypartData[0]);
  const [action, setAction] = useState(actionData[bodypartData[0]][0]);

  console.log(bodypart)
  const addMovement = () => {
    //   form.validateFields().then((value: { date: Moment, subject: string }) => {
    //     const date = value.date.toDate();
    //     const subject = value.subject
    //     // const uuid = uuid();//為什麼不行
    //     dispatch(scheduleList.actions.addScheduleList({ date, subject, id: uuid() }));
    //     setIsModalVisible(false);
    // })
    dispatch(scheduleList.actions.addMovement({
      scheduleId,
      movement: { action: '胸', id: uuid(), sets: [{ reps: 8, weight: 50 }, { reps: 12, weight: 50 }, { reps: 10, weight: 50 }] }
    }));
    console.log('add movement')
  }

  // form action start
  const onFinish = (values: any) => {
    console.log('Success:', values);
    addMovement();
    handelConfirm();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handlePartChange = (value: (keyof typeof actionData)) => {
    setBodypart(value);
    setAction(actionData[value][0])
  }

  const handleActionChange = (value: string) => {
    setAction(value);
  }
  // form action end


  return <>
    <div> <Form
      name="basic"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="請選擇部位"
        name="part"
        rules={[{ required: true, message: '請選擇部位' }]}
      >
        <Select defaultValue={bodypartData[0]} onChange={handlePartChange}>
          {
            bodypartData.map(part => (<Option key={part} value={part}>{part}</Option>))
          }
        </Select>
      </Form.Item>

      <Form.Item
        label="請選擇動作"
        name="action"
        rules={[{ required: true, message: '請選擇動作' }]}
      >
        <Select defaultValue={action} onChange={handleActionChange}>
          {actionData[bodypart].map(action => (<Option key={action} value={action}>{action}</Option>))}
        </Select>
      </Form.Item>
      <Button htmlType="button" type="primary" danger onClick={handelCancel} >
        取消
      </Button>
      <Button type="primary" htmlType="submit">
        確認
      </Button>
    </Form>
    </div>
  </>
}