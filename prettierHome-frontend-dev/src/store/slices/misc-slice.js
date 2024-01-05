import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentOperation: null,
    currentRecord: null,
    listRefreshToken: null,
    componentMode: null,
    currentObject: null,
    advertsCurrentRecord: null,

}

export const miscSlice = createSlice({
    name:"misc",
    initialState,
    reducers:{
        setOperation: (state, action) => {
            state.currentOperation = action.payload;
        },
        setCurrentRecord: (state, action) => {
            state.currentRecord = action.payload;
        },

        setListRefreshToken: (state, action) => {
            state.listRefreshToken = action.payload;
        },
        setComponentMode: (state, action) => {
            state.componentMode = action.payload;
        },
        setCurrentObject: (state, action) => {
            state.currentObject = action.payload;
        }, setAdvertsCurrentRecord: (state, action) => {
            state.advertsCurrentRecord= action.payload;
        }


    }
})

export const { setOperation, setCurrentRecord, setListRefreshToken, setComponentMode, setCurrentObject,setAdvertsCurrentRecord } = miscSlice.actions;
export default miscSlice.reducer;