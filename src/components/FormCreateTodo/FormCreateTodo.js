import React from "react";
import { useState } from "react";
import MyButton from "../Button/MyButton";
import classes from "./FormCreateToso.module.css";

export default function FormCreateTodo({ setTodo }) {
  const [inputName, setInputName] = useState("");

  function createTodo(e) {
    e.preventDefault();
    if (inputName) {
      setInputName("");
      setTodo((todo) => {
        const newTodo = { id: Date.now(), text: inputName, done: false };
        return [...todo, newTodo];
      });
    }
  }

  return (
    <form className={classes.wrapper}>
      <input
      className={classes.input}
        type="text"
        placeholder="Todo description"
        onChange={(e) => setInputName(e.target.value)}
        value={inputName}
      ></input>
      {inputName ? (
        <MyButton onClick={createTodo}>Create todo</MyButton>
      ) : (
        <MyButton disabled onClick={createTodo} 
        style={{border: '2px solid coral', borderRadius: '5px'}}
        >
          Create todo
        </MyButton>
      )}
    </form>
  );
}
