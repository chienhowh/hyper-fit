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
  const formValues = { part: bodypartData[0], action: actionData[bodypartData[0]][0] }
  const [actions, setActions] = useState(actionData[bodypartData[0]]);


  // console.log(bodypart)
  /** 新增做作 */
  const addMovement = (form: any) => {
    dispatch(scheduleList.actions.addMovement({
      scheduleId,
      movement: { ...form, id: uuid(), sets: [{ reps: '8', weight: '50', key: '1' }] }
    }));
    console.log('%c add movement success', 'background: #222; color: #bada55')
  }

  // form action start
  const onFinish = () => {
    form.validateFields().then((values: any) => {
      addMovement(values);// 新增動作
      handelConfirm();// close modal
      form.resetFields();
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handlePartChange = (part: (keyof typeof actionData)) => {
    form.setFieldsValue({ action: actionData[part][0] });
    setActions(actionData[part]);
  }

  const handleActionChange = (value: string) => {
    // setAction(value);
  }
  // form action end


  return <>
    <div> <Form
      name="basic"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={formValues}
    >
      <Form.Item
        label="請選擇部位"
        name="part"
        rules={[{ required: true, message: '請選擇部位' }]}
      >
        <Select onChange={handlePartChange}>
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
        <Select >
          {actions.map(action => (<Option key={action} value={action}>{action}</Option>))}
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