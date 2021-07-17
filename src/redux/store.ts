import { scheduleList } from './scheduleList/slice';
import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";


// 放所有reducers
const rootReducer = combineReducers({
    scheduleList: scheduleList.reducer
})


// 建立store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({serializableCheck:false})]
})


// reducer返回型別
export type rootState = ReturnType<typeof store.getState>

export default store;