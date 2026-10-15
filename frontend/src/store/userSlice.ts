
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { AppDispatch } from "./store"
import { setTasks } from "./taskSlice"

interface createData {
  email: string
  password: string
}

interface userData {
  id: number
  username: string
  email: string
  password: string
  role: string
}

interface userState {
  users: userData[]
  user: userData | null
  token: string
}

const initialState: userState = {
  users: [],
  user: null,
  token: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<userData[]>) {
      state.users = action.payload
    },

    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },

    setUser(state, action: PayloadAction<userData | null>) {
      state.user = action.payload
    },

    clearUserState(state) {
      state.user = null
      state.token = ""
    },
  },
})

export const {
  setUsers,
  setToken,
  setUser,
  clearUserState,
} = userSlice.actions

export default userSlice.reducer

export function signUp(data: createData) {
  return async function signUpThunk() {
    try {
      await axios.post(
        "http://localhost:5555/user/add",
        data
      )

      alert("Registered Successfully")
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

export function getUser() {
  return async function getUserThunk(dispatch: AppDispatch) {
    try {
      const response = await axios.get(
        "http://localhost:5555/user/view",
        { withCredentials: true }
      )

      dispatch(setUsers(response.data.data))
    } catch (error) {
      console.error(error)
    }
  }
}


export function login(data: createData) {
  return async function loginThunk(dispatch: AppDispatch) {
    try {
      const response = await axios.post(
        "http://localhost:5555/user/login",
        data,
        {
          withCredentials: true,
        }
      )

      dispatch(setUser(response.data.user))
      console.log(response.data.user);
      

      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }
}


export function logout() {
  return async function logoutThunk(dispatch: AppDispatch) {
    try {
      await axios.post(
        "http://localhost:5555/user/logout",
        {},
        { withCredentials: true }
      )

      dispatch(clearUserState())
      dispatch(setTasks([]))

      localStorage.removeItem("user")

      alert("Logout Successfully")
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
