

import {createSlice } from '@reduxjs/toolkit';

const UIInitialState={cartisVisible:true , notification:null }

const uiSlice = createSlice({
    name:'UI',
    initialState:UIInitialState,
    reducers:{
        toggle(state){
            state.cartisVisible=!state.cartisVisible;
        },
        showNotification(state,action){
            state.notification={
                status:action.payload.status,
                title:action.payload.title,
                message:action.payload.message,
            }
        }
    }
})

export const UIActions=uiSlice.actions; //initalstate ke parts saarey 
export default uiSlice.reducer