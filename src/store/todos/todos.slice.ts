import { createSlice } from '@reduxjs/toolkit'
import { todosList } from "@/store/todos/data/data";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: todosList,
    reducers: {
        todoAdded(state,{payload}: {payload: string}) {
            state.push({
                id: Date.now(),
                name: payload,
                isComplete: false,
            })
        },
        todoToggledComplete(state, {payload}: {payload: number}) {
            const todo = state.find((todo) => todo.id === payload)
            if (todo) {
                todo.isComplete = !todo.isComplete
            }
        },
        clearCompleted(state) {
            return state.filter(t => !t.isComplete)
        },
    },
})

export const { todoAdded, todoToggledComplete, clearCompleted } = todosSlice.actions