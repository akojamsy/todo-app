import React, {useState} from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/models';
import TodoList from './components/TodoList';

function App() {

  const [todo, setTodo] = useState<string>('');
  // const [todos, setTodos] = useState<Todo[]>([]);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAddTodo = (event:React.FormEvent) => {
    event.preventDefault();
    if(todo){
      setTodos([
        ...todos, {id: Date.now(), todo, isDone:false}
      ])
      setTodo('');
    }
  }  

  const onDragEnd =(result: DropResult)=>{

    const {source, destination} = result;

    if(!destination) return;

    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add, active = todos, completed = completedTodos

    if(source.droppableId === 'active'){
      add = active[source.index];
      active.splice(source.index,1);
    }else{
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if(destination.droppableId === 'active'){
      active.splice(destination.index, 0, add)
    }else{
      completed.splice(destination.index, 0, add)
    }

    setTodos(active)
    setCompletedTodos(completed)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <h2 className='heading'>TODO</h2>
      <InputField todo={todo} setTodo ={setTodo} handleAddTodo={handleAddTodo} />
      <TodoList todos = {todos} setTodos = {setTodos} completedTodos = {completedTodos} setCompletedTodos={setCompletedTodos} />
    </div>
    </DragDropContext>
  );
}

export default App;