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
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        logout: () => initialState
    }
});

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer