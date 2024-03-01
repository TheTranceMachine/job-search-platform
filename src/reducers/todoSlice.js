import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        isLoading: false,
        error: ''
    },
    reducers: {
        todosAllRequested: (state) => {
            state.todos = [];
            state.isLoading = true;
            state.error = '';
        },
        todosAllSuccess: (state, action) => {
            state.todos = action.payload;
            state.isLoading = false;
            state.error = '';
        },
        todosAllFailed: (state, action) => {
            state.todos = [];
            state.isLoading = false;
            state.error = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { todosAllRequested, todosAllSuccess, todosAllFailed } = todoSlice.actions

export default todoSlice.reducer