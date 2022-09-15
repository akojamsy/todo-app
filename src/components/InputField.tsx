import React, { useRef } from 'react'
import './style.css';

interface Props{
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAddTodo:(event:React.FormEvent) => void;
}

const InputField:React.FC<Props> = ({todo, setTodo, handleAddTodo, }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className='input' onSubmit={(e)=>{
        handleAddTodo(e)
        inputRef.current?.blur()
    }}>
      <input ref={inputRef} type="input" value={todo} placeholder='Enter a task' className="input__box" onChange={(e)=> setTodo(e.target.value)} />
      <button className="submit__button" type="submit">Go</button>
    </form>
  )
}

export default InputField