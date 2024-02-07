import { createSlice } from "@reduxjs/toolkit"


const iniitial = {
    value:0
}

export const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        incrememnt: (state,action)=>{
            state
        },
        decrement: function(state,action){

        },
        increaseByAmount:(state,action)=>{

        }
    }
})
