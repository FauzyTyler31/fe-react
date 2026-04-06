import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import TodoList from './components/TodoList.jsx';

function CallName(props){
  return (
  <>
    <h1>I'm learning React Today {props.name},</h1>
    <p> alamatku {props.address}</p>
    <p>Jenis Kelamin</p>
  </>
  );
}

function User({user}) {
  return (
    <>
    <h1>Nama {user.nama}</h1>
    <p>Phone {user.phone}</p>
    </>
  )
}

function App() {
  
  return (
    <>
    <TodoList />
    </>
  )
}

export default App
