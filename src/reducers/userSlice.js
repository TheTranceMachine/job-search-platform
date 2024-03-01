import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLoading: false,
        authenticated: false,
        error: ''
    },
    reducers: {
        userLoginRequested: (state) => {
            state.user = null;
            state.isLoading = true;
            state.authenticated = false;
        },
        userLoginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.authenticated = true;
        },
        userLoginFailed: (state, action) => {
            state.user = null;
            state.isLoading = false;
            state.authenticated = false;
            state.error = action.payload;
        },
        userLogoutSuccess: (state) => {
            state.user = null;
            state.authenticated = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const { userLoginRequested, userLoginSuccess, userLoginFailed, userLogoutSuccess } = userSlice.actions

export default userSlice.reducer