

import { createSlice } from "@reduxjs/toolkit";
import moment, { Moment } from "moment";
import { v4 as uuid } from 'uuid';
import { useSelector } from "../hooks";
import { ScheduleDetail } from "../scheduleList/slice";

interface ScheduleDetailState {
    isLoading: boolean;
    error: null | string;
    schedule: ScheduleDetail | null
}



const initialState: ScheduleDetailState = {
    isLoading: false,
    error: null,
    schedule: null
}



export const scheduleDetail = createSlice({
    name: 'scheduleDetail',
    initialState,
    reducers: {
        getScheduleById: (state, action) => {
            console.log(action.payload);
            console.log(state.schedule)
            return state
        }
    }
})