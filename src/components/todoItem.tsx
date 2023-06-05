import { Checkbox, Card, IconButton, Text, Paragraph } from '@vkontakte/vkui'
import { Icon16Delete } from '@vkontakte/icons'
import './styles/todoItem.css'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeTodo, toggleComplete } from '../store/todoSlice'

interface TodoItemProps {
  id: string
  text: string
  completed: boolean
}

export const TodoItem: React.FC<TodoItemProps> = ({id, text, completed}) => {
  const dispatch = useDispatch()
  return (
    <Card className='mainContainer' mode='shadow'> 
    <Card mode='shadow'>
      <Paragraph weight='2' className='date'>{id}</Paragraph>
    </Card>
    <div className='textContainer'>
      <div className='checkBox'>
      <Checkbox
      className='checkBox'
      defaultChecked = {completed}
      onChange={() => dispatch(toggleComplete({id}))}
      />
      </div>
      <Text className='text' style={{textDecoration: completed ? 'line-through' : ''}}>{text}</Text>
      <IconButton onClick={() => dispatch(removeTodo({id}))}>
        <Icon16Delete className='icon'/>
      </IconButton>   
    </div>
    </Card>
  )
}