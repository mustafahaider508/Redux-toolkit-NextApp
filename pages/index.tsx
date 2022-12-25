import { Inter } from '@next/font/google';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const inputRef = useRef<any>(null);
  const dispatch = useDispatch();

  const handelClick = () => {
    const newtodo = inputRef.current.value;

  }

  return (
    <>
      <div>
        <input ref={inputRef} type="text" placeholder="Add a todo..." />
      </div>
    </>
  )
}


