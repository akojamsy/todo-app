import React, { useState } from 'react'
import { Todo } from './models'
import { BsCheckLg } from 'react-icons/bs';
import { AiFillDelete,AiFillEdit } from 'react-icons/ai';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  index: number,
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({todo, todos, setTodos, index}: Props) => {

  const [edit, setEdit] = useState<Boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
 
  const handleCompleted = (id:number)=>{
    setTodos(todos.map((todo)=>todo.id === id? {...todo, isDone:!todo.isDone}: todo))
  }

  const handleDelete =(id:number)=>{
    setTodos(todos.filter((todo)=>todo.id !== id));
  }

  const handleSubmit = (e:React.FormEvent, id:number) =>{
    e.preventDefault()
    setTodos(todos.map((todo)=> todo.id === id? {...todo, todo:editTodo}: todo))
    setEdit(false)
  }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided)=>(
          <form className = "todo__single" onSubmit={(e)=>handleSubmit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            { edit? <input type='text' className='edit__input' value={editTodo} onChange={(e)=>setEditTodo(e.target.value)} /> :(
            todo.isDone? <s className='todo__single__text' >{todo.todo}</s>:<span className='todo__single__text' >{todo.todo}</span>)
            }
            <div className='icon__wrapper'>
              <span className='icon edit' onClick={()=>{
                if(!edit && !todo.isDone){
                  setEdit(!edit)
                }
              }}><AiFillEdit/></span>
              <span className='icon delete' onClick={()=>handleDelete(todo.id)}><AiFillDelete/></span>
              <span className='icon completed' onClick={()=>handleCompleted(todo.id)}><BsCheckLg/></span>
            </div>
          </form>
        )
      }
    </Draggable>
  )
}

export default SingleTodo