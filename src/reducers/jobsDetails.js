import { createSlice } from '@reduxjs/toolkit'

// jobByIdRequested, jobByIdFailed, jobByIdSuccess, jobsAllRequested, jobsAllFailed, jobsAllSuccess
export const jobsSlice = createSlice({
    name: 'jobsDetails',
    initialState: {
        jobsDetails: [],
        isLoading: false,
        error: ''
    },
    reducers: {
        jobByIdRequested: (state) => {
            state.isLoading = true;
        },
        jobByIdFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        jobByIdSuccess: (state, action) => {
            state.jobsDetails = [...state.jobsDetails, action.payload];
            state.isLoading = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { jobByIdRequested, jobByIdFailed, jobByIdSuccess } = jobsSlice.actions

export default jobsSlice.reducer