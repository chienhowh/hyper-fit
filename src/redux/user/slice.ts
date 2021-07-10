import { createSlice } from "@reduxjs/toolkit";


interface UserState {
    loading: boolean;
    error: string | null;
    token: string | null;
}

const initialState: UserState = {
    loading: false,
    error: null,
    token: null
}

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})