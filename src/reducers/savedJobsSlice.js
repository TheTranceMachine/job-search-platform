import { createSlice } from '@reduxjs/toolkit'

export const savedJobsSlice = createSlice({
    name: 'savedJobs',
    initialState: {
        jobs: [],
        isLoading: false,
        error: ''
    },
    reducers: {
        savedJobsRequested: (state) => {
            state.jobs = [];
            state.isLoading = true;
        },
        savedJobsFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        savedJobsSuccess: (state, action) => {
            state.jobs = action.payload;
            state.isLoading = false;
        },
        saveJobRequested: (state) => {
            state.isLoading = true;
        },
        saveJobFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        saveJobSuccess: (state, action) => {
            state.jobs = [...state.jobs, action.payload];
            state.isLoading = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    savedJobsRequested,
    savedJobsFailed,
    savedJobsSuccess,
    saveJobRequested,
    saveJobFailed,
    saveJobSuccess
} = savedJobsSlice.actions

export default savedJobsSlice.reducer