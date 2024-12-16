import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import React from "react";
import "./App.css";
import axios from "axios";

function useTodos(n) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
        setTodos(res.data);
        setLoading(false);
      });
    }, n * 1000);
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      setTodos(res.data);
      setLoading(false);
    });
    return () => {
      clearInterval(interval);
    };
  }, [n]);

  return { todos, loading };
}
function App() {
  const { todos, loading } = useTodos(5);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        todos.map((todo) => {
          return <Todos todos={todo} />;
        })
      )}
    </>
  );
}

function Todos({ todos }) {
  return (
    <div key={todos.id}>
      <p>{todos.title}</p>
    </div>
  );
}

export default App;
