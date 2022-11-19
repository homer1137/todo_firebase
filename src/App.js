import React from "react";
import { useState, useEffect } from "react";
import "./App.less";
import Todo from "./components/Todo/Todo";
import FormCreateTodo from "./components/FormCreateTodo/FormCreateTodo";
import ManageTodo from "./components/ManageTodo/ManageTodo";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {db} from './firebase'

function App() {
  

  const [todo, setTodo] = useState([]);


  useEffect(() => {
    const res = query(collection(db, "todos"));
    const todos = onSnapshot(res, (querySnapshot)=>{
      let todoArray = [];
      querySnapshot.forEach((doc)=>{todoArray.push({...doc.data(), id: doc.id})
      setTodo(todoArray)
    })
    })
    return ()=>todos()
  }, []);

  console.log('todos', todo)
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [edit, setEdit] = useState(false);

  const sortedPosts = () => {
    if (active) return [...todo].filter((item) => item.done === false);
    if (completed) return [...todo].filter((item) => item.done === true);
    else return todo;
  };


  function doneToDo(currentDodo) {
    updateDoc(doc(db, 'todos', currentDodo.id), {done: !currentDodo.done})
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
    todo.forEach(item=>item.done!==false&&deleteDoc(doc(db,'todos',item.id)))
    setTodo(todo.filter((td) => td.done !== true));

  }

  let result = todo.filter((item) => item.done !== true).length;

  //firebas functions:

  const changeTodo = (e) => {
    e.preventDefault();
  };

  const deleteTodo =async(id)=>{
    await deleteDoc(doc(db, 'todos', id))
  }

  return (
    <div className="App">
      <section>
        <h1>todos</h1>
        <div>
          <h2 className="todo-title">What is need to be done</h2>
          {todo.length > 0 ? (
            sortedPosts().map((item, index) => (
              <Todo
                todo={item}
                todoIndex={index + 1}
                doneToDo={doneToDo}
                key={item.id}
                deleteTodo={deleteTodo}
              />
            ))
          ) : (
            <h2>There are no todo. Create a todo</h2>
          )}
        </div>
        
        <ManageTodo
          result={result}
          setActive={setActive}
          setCompleted={setCompleted}
          active={active}
          completed={completed}
          deleteDone={deleteDone}
        />
        {progress>0&&<h2>Uploaded {progress}%</h2>}
        <FormCreateTodo setProgress={setProgress} />
      </section>
    </div>
  );
}

export default App;
