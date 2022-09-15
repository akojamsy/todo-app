import React from 'react'
import { Todo } from './models'
import SingleTodo from './SingleTodo'
import { Droppable } from 'react-beautiful-dnd';

interface TODO{
  todos: Todo[],
  completedTodos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList:React.FC<TODO> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
  
  return (
    <div className='todos'>
      <div className="active_wrapper">
        <Droppable droppableId='active' >
          {
            (provided, snapshot)=>(
              <div className= {`active ${snapshot.isDraggingOver? 'dragover': ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                <span className="heading__text">Active Todos</span>
                {todos.map((todo, index)=>(
                  <SingleTodo index={index} key={todo.id} todo ={todo} todos={todos} setTodos = {setTodos} />
                ))}
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </div>
      <div className="completed_wrapper">
        <Droppable droppableId='completed'>
        {
            (provided, snapshot)=>(
              <div className={`completed remove ${snapshot.isDraggingOver? 'dragcomplete': ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                <span className="heading__text">Completed Todos</span>
                {completedTodos.map((todo, index)=>(
                  <SingleTodo index={index} setTodos={setCompletedTodos} key={todo.id} todo ={todo} todos={completedTodos} />
                ))}
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </div>
    </div>
  )
}

export default TodoList