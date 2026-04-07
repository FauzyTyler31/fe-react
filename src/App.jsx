import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import './App.css'
// import TodoList from './components/TodoList.jsx';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

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
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App
