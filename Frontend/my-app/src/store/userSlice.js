import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    username: "",
    email: "",
    password: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => ({...action.payload}),
        logout: () => initialState
    }
});

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer