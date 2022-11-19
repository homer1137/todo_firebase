import React, {useState} from "react";
import classes from "./Todo.module.less";
import { IoIosRadioButtonOff, IoIosCheckmark } from "react-icons/io";
import MyButton from "../Button/MyButton";
import {
  doc,
  updateDoc,

} from "firebase/firestore";
import {db} from '../../firebase'

export default function Todo({ todo, doneToDo, todoIndex, deleteTodo }) {
 
  const [newTitle, setNewTitle] = useState(todo.taskName)

  async function updateTodo(e) {
    e.preventDefault();
    updateDoc(doc(db, 'todos', todo.id), {taskName: newTitle})
    }
  
  

  return (
    <div className={classes.todo}>
      <IoIosRadioButtonOff onClick={()=>doneToDo(todo)} className={classes.circle}/>{todo.done?<IoIosCheckmark className={classes.check}/>:null}
      <div className={classes.todoContent} >
        <strong style={todo.done?{textDecoration: 'line-through'}:null}>
          {todoIndex} 
          <form onSubmit={updateTodo}>
          <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/>
          <MyButton onClick={()=>{}}>Update todo</MyButton>
          </form> {todo.date} 
        </strong>
        
        <MyButton style={{backgroundColor: 'pink', color: 'white'}} onClick={()=>deleteTodo(todo.id)}>Delete</MyButton>
      </div>
    </div>
  );
}
