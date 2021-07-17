
import { createSlice } from "@reduxjs/toolkit";
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
    movements?: any[];
}

/**
 * 每個動作總表
 */
export interface Movement {
    id: string;
    sets: { reps: number, weight: number }[];
}
const initialState: ScheduleListState = {
    isLoading: false,
    error: null,
    scheduleList: [
        { date: new Date(2021, 12, 22), subject: '今天練胸', id: uuid(), movements: [{ id: '胸', sets: [{ reps: 8, weight: 50 }, { reps: 12, weight: 50 }, { reps: 10, weight: 50 }] }] },
        { date: new Date(2021, 12, 12), subject: '今天練胸', id: uuid() },
        { date: new Date(2021, 12, 21), subject: '今天練腿', id: uuid() },
        { date: new Date(2021, 12, 14), subject: '今天練腿', id: uuid() },
        { date: new Date(2021, 12, 3), subject: '不想動', id: uuid() },
        { date: new Date(2021, 12, 3), subject: '加班', id: uuid() },
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
        }
    }
})