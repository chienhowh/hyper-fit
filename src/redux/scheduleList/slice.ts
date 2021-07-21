
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import moment, { Moment } from "moment";
import { v4 as uuid } from 'uuid';
interface ScheduleListState {
    isLoading: boolean;
    error: null | string;
    scheduleList: ScheduleDetail[]
}
/**
 * 每個紀錄總表(包含所有動作)
 */
export interface ScheduleDetail {
    date: Date;
    subject: string;
    id: string;
    movements: Movement[];
}

/**
 * 每個動作總表(一個card)
 */
export interface Movement {
    //動作部位
    part: string
    // 動作名稱
    action: string;
    // 動作id
    id: string;
    sets: SetDetail[];
}
/** 單組內容 */
export interface SetDetail {
    reps: string;
    weight: string;
    key: string;
}

const initialState: ScheduleListState = {
    isLoading: false,
    error: null,
    scheduleList: [
        { date: new Date(2021, 12, 22), subject: '今天練胸', id: uuid(), movements: [{ part: '胸', action: '槓鈴臥推', id: uuid(), sets: [{ reps: '8', weight: '50', key: '1' }, { reps: '12', weight: '50', key: '2' }, { reps: '10', weight: '50', key: '3' }] }] },
        { date: new Date(2021, 12, 12), subject: '今天練胸', id: uuid(), movements: [] },
        { date: new Date(2021, 12, 21), subject: '今天練腿', id: uuid(), movements: [] },
        { date: new Date(2021, 12, 14), subject: '今天練腿', id: uuid(), movements: [] },
        { date: new Date(2021, 12, 3), subject: '不想動', id: uuid(), movements: [] },
        { date: new Date(2021, 12, 3), subject: '加班', id: uuid(), movements: [] },
    ]
}

export const scheduleList = createSlice({
    name: 'scheduleList',
    initialState,
    reducers: {
        //mutuable 連return都不用
        getScheduleList: (state) => { },
        addScheduleList: (state, action) => {
            state.scheduleList.push(action.payload);
        },
        // 新增動作到當日課表
        addMovement: (state, action: PayloadAction<{ scheduleId: string, movement: any }>) => {
            state.scheduleList.forEach(s => {
                if (s.id === action.payload.scheduleId) {
                    s.movements.unshift(action.payload.movement);
                }
            })
            console.log(current(state))
        },
        //新增重量、次數到動作
        addSets: (state, action: PayloadAction<{ scheduleId: string, movementId: string, sets: SetDetail[] }>) => {
            state.scheduleList.forEach(s => {
                if (s.id === action.payload.scheduleId) {
                    s.movements.forEach(m => {
                        if (m.id === action.payload.movementId) {
                            m.sets = action.payload.sets;
                        }
                    })
                }
            })
        }
    }
})