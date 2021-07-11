
import { createSlice } from "@reduxjs/toolkit";
import moment, { Moment } from "moment";
import { v4 as uuid } from 'uuid';
interface ScheduleListState {
    isLoading: boolean;
    error: null | string;
    schedule: ScheduleDetail[]
}

export interface ScheduleDetail {
    date: Moment;
    subject: string;
    id: string;
}

const initialState: ScheduleListState = {
    isLoading: false,
    error: null,
    schedule: [
        { date: moment('2021-12-22'), subject: '今天練胸', id: uuid() },
        { date: moment('2021-12-12'), subject: '今天練胸', id: uuid() },
        { date: moment('2021-12-21'), subject: '今天練腿', id: uuid() },
        { date: moment('2021-12-14'), subject: '今天練腿', id: uuid() },
        { date: moment('2021-12-03'), subject: '不想動', id: uuid() },
        { date: moment('2021-12-03'), subject: '加班', id: uuid() },
    ]
}

export const scheduleList = createSlice({
    name: 'scheduleList',
    initialState,
    reducers: {
        getScheduleList: (state) => {
            return state
        }
    }
})