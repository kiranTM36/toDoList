import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AppDispatch } from "./store"
import axios from "axios"

interface tasksData {
    id: number
    username: number,
    title: string
    complete : boolean
    priority : boolean
}

interface createTask {
    title: string
    description: string
}

interface taskState {
    tasks: tasksData[]
}

const initialState: taskState = {
    tasks: []
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<tasksData[]>) {
            state.tasks = action.payload
        }
    }
})

export const { setTasks } = taskSlice.actions
export default taskSlice.reducer

export function getAlltasks() {
    return async function getAllTasksThunk(dispatch: AppDispatch) {
        try {
            const response = await axios.get('http://localhost:5555/task')

            if (response.status >= 200 || response.status < 300) {
                dispatch(setTasks(response.data.data))
                return true
            }
        } catch (error) {
            console.error(error);
            return false
        }
    }
}

export function getMytasks(id: number) {
    return async function getMyTasksThunk(dispatch: AppDispatch) {
        try {
            const response = await axios.get(`http://localhost:5555/task/${id}`)

            if (response.status >= 200 || response.status < 300) {
                dispatch(setTasks(response.data.data))
                console.log(response.data.data);
                
                return true
            }
        } catch (error) {
            console.error(error);
            return false
        }
    }
}
export function addTask(data: createTask) {
    return async function addTaskThunk() {

        console.log("Slice:", data)

        try {
            const response = await axios.post(
                "http://localhost:5555/task/add",
                data,
                {
                    withCredentials: true
                }
            )

            if (response.status >= 200 && response.status < 300) {
                alert("Task Added")
                return true
            }

        } catch (error) {
            console.error(error)
            return false
        }
    }
}

export function updateComplete(id : number) {
    return async function updateCompleteThunk() {
        console.log(id);
        
        try {
            const response = await axios.put(`http://localhost:5555/task/update/${id}`,{},
                {
                    withCredentials: true
                })
            
            if(response.status >= 200 && response.status < 300){
                alert("Tasks Updated to complete")
                return true
            }else{
                alert("Tasks Update failed")
                return true
            }
            
        } catch (error) {
            console.error(error);
            
        }
    }
}


export function updatePriority(id : number) {
    return async function updatePriorityThunk() {
        console.log(id);
        
        try {
            const response = await axios.put(`http://localhost:5555/task/priority/${id}`,{},
                {
                    withCredentials: true
                })

                console.log(id);
                
            
            if(response.status >= 200 && response.status < 300){
                alert("Tasks set to priority")
                return true
            }else{
                alert("Tasks Update failed")
                return true
            }
            
        } catch (error) {
            console.error(error);
            
        }
    }
}