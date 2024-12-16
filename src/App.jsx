import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import React from "react";
import "./App.css";
import axios from "axios";
import useSWR from "swr";

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
  // const { todos, loading } = useTodos(5);
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/todos",
    (url) => axios.get(url).then((res) => res.data)
  );

  return (
    <>
      {error ? (
        "An error has occurred."
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        data.map((todo) => <Todos key={todo.id} todos={todo} />)
      )}
    </>
  );
  // const { data, error, loading } = useSWR(
  //   "https://api.github.com/repos/vercel/swr",
  //   (url) => axios.get(url).then((res) => res.data)
  // );

  // if (error) return "An error has occurred.";
  // if (loading) return "Loading...";
  // return (
  //   <div>
  //     <h1>{data.name}</h1>
  //     <p>{data.description}</p>
  //     <strong>👁 {data.subscribers_count}</strong>{" "}
  //     <strong>✨ {data.stargazers_count}</strong>{" "}
  //     <strong>🍴 {data.forks_count}</strong>
  //   </div>
  // );
}

function Todos({ todos }) {
  console.log(todos);
  return (
    <div key={todos.id}>
      <p>{todos.title}</p>
    </div>
  );
}

export default App;
