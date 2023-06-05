import { createSlice } from '@reduxjs/toolkit'
import { ITodo } from '../models/ITodo'

export interface todoState {
  todos: ITodo[]
}

const initialState: todoState = {
  todos: []
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      const date = new Date()
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
      state.todos.push({
        id: formattedDate,
        text: action.payload,
        completed: false
      })
    },
    toggleComplete(state, action) {
      const toggledTodo = state.todos.find(todo => todo.id === action.payload.id)
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed
      }
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    }
  }
})

export const {addTodo, removeTodo, toggleComplete} = todoSlice.actions

export default todoSlice.reducer