import React, { useState, useEffect } from "react";
import classes from "./Todo.module.less";
import { IoIosRadioButtonOff, IoIosCheckmark } from "react-icons/io";
import MyButton from "../Button/MyButton";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as dayjs from 'dayjs';

export default function Todo({ todo, doneToDo, todoIndex, deleteTodo }) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.taskName);
  const [newDescription, setNewDescription] = useState(todo.description);
  const [expired, setExpired] = useState(false)

  async function updateTodo(e) {
    e.preventDefault();
    updateDoc(doc(db, "todos", todo.id), {
      taskName: newTitle,
      description: newDescription,
    });
    setEditMode(false);
  }
  useEffect(()=>{
    const todayDay=new Date()
    if (dayjs(todayDay) > dayjs(todo.date)){
      console.log('expired')
      setExpired(true)
    } else {
      setExpired(false)
      console.log('not expired')
    }
  },[todo.date])

  return (
    <div className={classes.todo}>
      <IoIosRadioButtonOff
        onClick={() => doneToDo(todo)}
        className={classes.circle}
      />
      {todo.done ? <IoIosCheckmark className={classes.check} /> : null}
      {editMode ? (
        <div className={classes.todoContent}>
          <strong>{todoIndex}</strong>
            
            <form className={classes.edit} onSubmit={updateTodo}>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <MyButton onClick={() => {}}>Save</MyButton>
            </form>{" "}
            {dayjs(todo.date).format('DD MMMM YYYY')}
          
          <MyButton
            style={{ backgroundColor: "pink", color: "white" }}
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </MyButton>
        </div>
      ) : (
        <div className={classes.todoContent}>
          <strong style={todo.done ? { textDecoration: "line-through" } : null}>
            {todoIndex} {todo.taskName}
            <MyButton
              onClick={() => {
                setEditMode(true);
              }}
            >
              Update todo 
            </MyButton>
          </strong>

          <div className={classes.label}>description:</div>
          <div className={classes.text}>{todo.description}</div>
          <div className={classes.label}>date:</div>
          <div className={classes.text}>{dayjs(todo.date).format('DD MMMM YYYY')}</div>
          {todo.fileName && (
            <>
              <div className={classes.label}>file:</div>
              <a target='blank' href={todo.fileUrl}>
              <div className={classes.text}>{todo.fileName} </div>
              </a>
              
            </>
          )}
          {expired&&<div className={classes.expired}>your task is expired</div>}
          <MyButton
            style={{ backgroundColor: "pink", color: "white" }}
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </MyButton>
        </div>
      )}
    </div>
  );
}
