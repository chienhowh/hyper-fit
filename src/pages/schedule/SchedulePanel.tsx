import React, { useState } from "react";
import { Collapse, Form, Input, InputNumber, Table, Typography, Button } from 'antd';
import { Movement, scheduleList, SetDetail } from "../../redux/scheduleList/slice";
import { v4 as uuid } from 'uuid';
import styles from './SchedulePanel.module.scss';
import { useDispatch } from "react-redux";
interface PropsType {
    move: Movement;
    scheduleId: string;
}


/** 修改row */
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: SetDetail;
    index: number;
    children: React.ReactNode; // 沒在修改的td
}

const EditableCell: React.FC<EditableCellProps> = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return <td {...restProps}>{editing ? (
        <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
                {
                    required: true,
                    message: `Please Input ${title}!`,
                },
            ]}
        >
            {inputNode}
        </Form.Item>
    ) : (
        children
    )}</td>
}


export const SchedulePanel: React.FC<PropsType> = ({ move, scheduleId }) => {
    console.log('reset')
    const dataSource: SetDetail[] = move.sets;
    const dispatch = useDispatch();
    const [data, setData] = useState(dataSource);
    const [form] = Form.useForm();
    /** 修改中的cell */
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record: SetDetail) => record.key === editingKey;

    const edit = (record: Partial<SetDetail> & { key: React.Key }) => {
        form.setFieldsValue({ reps: '', weight: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    /** 新增組數 */
    const newSet = () => {
        let [newSet] = data.slice(-1);
        if (!newSet) { newSet = { reps: '10', weight: '50', key: '' } };
        const newData = [...data, { ...newSet, key: uuid() }];
        dispatch(scheduleList.actions.addSets({ scheduleId: scheduleId, movementId: move.id, sets: newData }));
    }
    /** 儲存修改資料 */
    const save = async (key: React.Key) => {
        try {
            //修改後的cell
            const row = (await form.validateFields()) as SetDetail;

            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                // 修改前的cell
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                // 找不到相等key，代表沒這個cell，則新增
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
            dispatch(scheduleList.actions.addSets({ scheduleId: scheduleId, movementId: move.id, sets: newData }))
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        { title: '次數', dataIndex: 'reps', editable: true },
        { title: '重量(kg)', dataIndex: 'weight', editable: true },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: SetDetail) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button onClick={() => save(record.key)} style={{ marginRight: 8 }}>修改</Button>
                        <Button onClick={cancel}>取消</Button>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },]

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: SetDetail) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Collapse >
            <Collapse.Panel header={move.action} key="1" forceRender={true}>
                {/* <Table columns={columns} dataSource={dataSource} pagination={false}></Table> */}
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        pagination={false}
                    />
                </Form>
                <Button onClick={newSet}>新增</Button>
            </Collapse.Panel>
        </Collapse >
    )
}