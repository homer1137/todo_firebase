import React from "react";
import classes from "./Todo.module.css";
import { IoIosRadioButtonOff, IoIosCheckmark } from "react-icons/io";

export default function Todo(props) {
  let { todo, doneToDo, todoIndex } = props;

  

  return (
    <div className={classes.todo}>
      <IoIosRadioButtonOff onClick={()=>doneToDo(todo)} className={classes.circle}/>{todo.done?<IoIosCheckmark className={classes.check}/>:null}
      <div className={classes.todoContent}>
        <strong style={todo.done?{textDecoration: 'line-through'}:null}>
          {todoIndex} {todo.text}
        </strong>
      </div>
    </div>
  );
}
