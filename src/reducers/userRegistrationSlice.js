import { createSlice } from '@reduxjs/toolkit'

export const userRegistrationSlice = createSlice({
    name: 'user',
    initialState: {
        registration: null,
        isLoading: false,
        error: ''
    },
    reducers: {
        userRegistrationRequested: (state) => {
            state.registration = null;
            state.isLoading = true;
        },
        userRegistrationSuccess: (state, action) => {
            state.registration = action.payload;
            state.isLoading = false;
        },
        userRegistrationFailed: (state, action) => {
            state.registration = null;
            state.isLoading = false;
            state.error = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { userRegistrationRequested, userRegistrationSuccess, userRegistrationFailed } = userRegistrationSlice.actions

export default userRegistrationSlice.reducer