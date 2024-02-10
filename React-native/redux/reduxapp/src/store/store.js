import { configureStore } from "@reduxjs/toolkit";
import basicSlice from "../components/basicSlice";

export const Store = configureStore({
    reducer:{
        count:basicSlice
    }
})
