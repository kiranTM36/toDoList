import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { AppDispatch } from "./store"

interface createData {
    email : string
    password : string
}

interface signUpData{
    username : string
    email : string
    password : string
}

interface userData {
    username : string
    email : string
    password : string
    role : string
}

interface userState {
    user : userData[]
    token : string
}

const initialState : userState = {
    user : [],
    token : ''
}

const userSlice = createSlice({
    name : "user",
    initialState ,
    reducers : {
        setUser(state , action : PayloadAction<userData[]>){
            state.user = action.payload
        },
        setToken(state , action : PayloadAction<string>){
            state.token = action.payload
        }
    }
})

export const {setUser , setToken} = userSlice.actions
export default userSlice.reducer

export function signUp( data : createData ){
    return async function signUpThunk() {
        try {
            const response = await axios.post('http://localhost:5555/user/add', data, {
                withCredentials : true
            })

            if(response.status >= 200 || response.status < 300){
                alert("Registered Successful")
                return true
            }
        } catch (error) {
            console.error(error);
            return false
        }
    }
}

export function getUser(){
    return async function getUserThunk(dispatch : AppDispatch) {
        try {
            const response = await axios.get('http://localhost:5555/user/view')

            if(response.status >= 200 || response.status < 300){
                dispatch(setUser(response.data.data))
            }
        } catch (error) {
            console.error(error);
        }
    }
}



export function login( data : createData ){
    return async function loginThunk(dispatch : AppDispatch) {
        try {
            const response = await axios.post('http://localhost:5555/user/login', data, {
                withCredentials : true
            })

            if(response.status >= 200 || response.status < 300){
                dispatch(setUser(response.data.data))
                dispatch(setToken(response.data.token))
                localStorage.setItem('user' , JSON.stringify(response.data.user))
                return true
            }
        } catch (error) {
            console.error(error);
            return false
        }
    }
}

export function logout(  ){
    return async function loginThunk() {
        try {
            const response = await axios.post('http://localhost:5555/user/logout',{},{
                withCredentials : true
            })

            if(response.status >= 200 || response.status < 300){
                alert("Logout Successfully")
                return true
            }
        } catch (error) {
            console.error(error);
            return false
        }
    }
}