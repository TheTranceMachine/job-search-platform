import { createSlice } from '@reduxjs/toolkit'

// jobByIdRequested, jobByIdFailed, jobByIdSuccess, jobsAllRequested, jobsAllFailed, jobsAllSuccess
export const jobsSlice = createSlice({
    name: 'jobsAll',
    initialState: {
        jobs: [],
        isLoading: false,
        error: ''
    },
    reducers: {
        jobsAllRequested: (state) => {
            state.jobs = [];
            state.isLoading = true;
        },
        jobsAllFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        jobsAllSuccess: (state, action) => {
            state.jobs = action.payload;
            state.isLoading = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { jobsAllRequested, jobsAllFailed, jobsAllSuccess } = jobsSlice.actions

export default jobsSlice.reducer