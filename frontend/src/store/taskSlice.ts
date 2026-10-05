import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AppDispatch } from "./store"
import axios from "axios"

interface tasksData {
    id : number
    username : number,
    title : string
}

interface taskState{
    tasks : tasksData[]
}

const initialState : taskState = {
    tasks : []
}

const taskSlice = createSlice({
    name : "task",
    initialState ,
    reducers : {
        setTasks(state , action:PayloadAction<tasksData[]>){
            state.tasks = action.payload
        }
    }
})

export const {setTasks} = taskSlice.actions
export default taskSlice.reducer

export function getAlltasks(){
    return async function getAllTasksThunk(dispatch:AppDispatch) {
        try {
            const response = await axios.get('http://localhost:5555/task')

            if(response.status >= 200 || response.status < 300){
                dispatch(setTasks(response.data.data))
                return true
            }
        } catch (error) {
            console.error(error);
            return false
        }
    }
}