import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import socket from './socket';


const initialState = {
    users: [],
    loading: true,
    error: {},
    user: {}
}


//middleware
export const getUsers = createAsyncThunk(
    "api/getUsers",
    async (thunkAPI, { rejectWithValue }) => {
        try {
            let res = await axios.get('http://localhost:3030/api/user/getAll');
            //  console.log(res.data)
            return res.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const loginUsers = createAsyncThunk(
    "api/login",
    async (userData, { rejectWithValue }) => {
        try {
            let res = await axios.post('http://localhost:3030/api/user/login', userData);
            console.log("data", res.data)
            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const logout = createAsyncThunk("user/logout", async () => {  
    return {};
  });
const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.loading = true
            state.users = []
            state.error = null
        },
        [getUsers.rejected]: (state, { payload }) => {
            state.loading = false
            state.users = []
            state.error = payload;
        },
        [getUsers.fulfilled]: (state, { payload }) => {
            state.users = payload;
            state.loading = false
            state.error = null
        },
        [loginUsers.pending]: (state) => {
            state.loading = true
            state.user = {}
            state.error = null
        },
        [loginUsers.rejected]: (state, { payload }) => {
            state.loading = false
            state.user = {}
            state.error = payload;
        },
        [loginUsers.fulfilled]: (state, { payload }) => {
            state.user = payload;
            state.loading = false
            state.error = null
        },
        [logout.pending]: (state) => {
            state.loading = true
            state.user = {}
            state.error = null
        },
        [logout.rejected]: (state, { payload }) => {
            state.loading = false
            state.user = {}
            state.error = payload;
        },
        [logout.fulfilled]: (state, { payload }) => {
            state.user = payload;
            state.loading = false
            state.error = null
        }
    }
})


export default userSlice.reducer