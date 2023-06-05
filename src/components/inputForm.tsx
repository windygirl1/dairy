import React from 'react'
import { Input, IconButton, Card } from '@vkontakte/vkui'
import { Icon16Clear, Icon16CheckCircleLarge } from '@vkontakte/icons'
import './styles/inputForm.css'
import { useDispatch } from 'react-redux'
import { addTodo } from '../store/todoSlice'


export const InputForm: React.FC = () => {
  const [text, setText] = React.useState('')
  const dispatch = useDispatch()

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.trim().length) {
      dispatch(addTodo(text))
      setText('')
    }
  }

  return (
    <Card mode='shadow' className='container'>
    <form onSubmit={handleClick}>
    <Input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Напиши задачу"
      after={
        <>
        {text && (<IconButton hoverMode="opacity" aria-label="Очистить поле" onClick={() => setText('')}>
          <Icon16Clear/>
        </IconButton>)}
        {text && (<IconButton hoverMode="opacity" aria-label="Создать задачу" type='submit'>
          <Icon16CheckCircleLarge/>
        </IconButton>)}
        </>
      }
      />
    </form>
    </Card>
  )
}