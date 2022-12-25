import { Inter } from '@next/font/google';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../actions/todoSlice';
import { RootState } from '../store/store';



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [input,setInput] = useState<any>([]);
  const dispatch = useDispatch();

  const handelClick = () => {
   
    dispatch(addTodo(input));
    setInput("");


  }

    const { todos } = useSelector((state: RootState) => {
      return state.todos;
    });
  console.log(todos);
  return (
    <>
      <div>
        <input
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          type="text"
          placeholder="Add a todo..."
        />
        <button onClick={handelClick}>add Todo</button>
      </div>

      {todos?.map((todo: any) => (
        <p>{todo}</p>
      ))}
    </>
  );
}


