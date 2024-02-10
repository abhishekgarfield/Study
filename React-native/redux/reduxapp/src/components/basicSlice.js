import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import slowApi from '../slowApi';

const initialState = {
  value: 0,
};

export const incAsync = createAsyncThunk('async/counter', async (val) => {
    console.log("-------ASD--AS-D-ASD---",val)
  return await slowApi(val);
});

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrememnt: (state, action) => {
      state.value += 1;
    },
    decrement: function (state, action) {},
    increaseByAmount: (state, action) => {},
  },
  extraReducers: builder => {
    builder
      .addCase(incAsync.pending, (state, action) => {})
      .addCase(incAsync.fulfilled, (state, action) => {
        state.value += action.payload;
      });
  },
});

export const {increaseByAmount, incrememnt, decrement} = counterSlice.actions;

export default counterSlice.reducer;
