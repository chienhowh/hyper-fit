import { configureStore, combineReducers } from "@reduxjs/toolkit";


// 放所有reducers
const rootReducer = combineReducers({

})

const store = configureStore({
    reducer: rootReducer
})


// reducer返回型別
export type rootState = ReturnType<typeof store.getState>

export default store;