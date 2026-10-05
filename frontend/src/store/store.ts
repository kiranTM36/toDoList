import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import taskSlice from "./taskSlice"

export const store = configureStore({
    reducer : {
        user : userSlice,
        task : taskSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch