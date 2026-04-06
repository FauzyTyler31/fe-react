import {useState} from 'react';

function TodoList(){
    const [inputTodos, setInputTodos] = useState("");
    const [todos, setTodos] = useState([]);

    const addTodos = () => {
        if (inputTodos,trim() === "") return;

        setTodos([...todos, inputTodos]);
        setInputTodos("");

    }
    return(
        <>
        <h1>Todo List</h1>
        <input type="text" placeholder="Tambah Aktivitas" onChange={() => setInputTodos(e.target.value)} value={inputTodos} />

        <button onClick={addTodos}>Tambah</button>

        <ul>
            {todos.map((item, index) =>(
            <li key={index}>
                {item} <button onClick={() => deleteTodo(index)}>Delete</button>
            </li>
            ))}
            
        </ul>
        </>
    );
}

export default TodoList;