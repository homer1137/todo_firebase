import React from "react";
import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo/Todo";
import FormCreateTodo from "./components/FormCreateTodo/FormCreateTodo";
import ManageTodo from "./components/ManageTodo/ManageTodo";

function App() {
  const [todo, setTodo] = useState([
    { id: 1, text: "hello", done: false },
    { id: 2, text: "hi again", done: false },
    { id: 3, text: "to do task", done: false },
  ]);

  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  const sortedPosts = () => {
    if (active) return [...todo].filter((item) => item.done === false);
    if (completed) return [...todo].filter((item) => item.done === true);
    else return todo;
  };

  function doneToDo(currentDodo) {
    setTodo(
      todo.map((td) => {
        if (td.id === currentDodo.id) {
          let done = !td.done;
          return { ...td, done: done };
        } else return { ...td };
      })
    );
  }

  function deleteDone() {
    setTodo(todo.filter((td) => td.done !== true));
  }

  let result = todo.filter((item) => item.done !== true).length;

  return (
    <div className="App">
      <section>
        <h1>todos</h1>
        <div>
          <h2 className="todo-title">What is need to be done</h2>
          {todo.length>0?sortedPosts().map((item, index) => (
            <Todo
              todo={item}
              todoIndex={index+1}
              doneToDo={doneToDo}
              key={item.id}
            />
          )):<h2>There are no todo. Create a todo</h2>}
        </div>
      <ManageTodo
        result={result}
        setActive={setActive}
        setCompleted={setCompleted}
        active={active}
        completed={completed}
        deleteDone={deleteDone}
      />
      <FormCreateTodo setTodo={setTodo} />
      </section>
    </div>
  );
}

export default App;
