import React from 'react'
import { useSelector } from 'react-redux'
import { rootState } from '../store/store'
import { Card } from '@vkontakte/vkui'
import { TodoItem } from './todoItem'
import './styles/todoList.css'

export const TodoList = () => {
  const todos = useSelector((state: rootState) => state.todos.todos)
  return (
    <Card mode='shadow' className='cardContainer'>
      {
        todos.map(todo => (
          <TodoItem key={todo.id} {...todo}/>
        ))
      }
    </Card>
  )
}
