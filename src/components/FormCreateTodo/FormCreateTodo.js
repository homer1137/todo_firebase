import React from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import MyButton from "../Button/MyButton";
import classes from "./FormCreateToso.module.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.js";

export default function FormCreateTodo({ setProgress }) {
  const [inputName, setInputName] = useState("");
  const [inputDate, setInputDate] = useState("");


  const uploadFile = (file) => {
    if (!file) return;

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      setProgress(prog)
    
    }, (err)=>console.log(err),
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref)
      
    }
    );
  };

  async function createTodo(e) {
    e.preventDefault();
    let file = e.target[2].files[0]||{name:''};
    uploadFile(file);
    const storageRef = ref(storage, `/files/${file.name}`);
    const realRef=file.name?await getDownloadURL(storageRef):''
    if (inputName) {
      await addDoc(collection(db, "todos"), {
        taskName: inputName,
        date: inputDate,
        done: false,
        fileName: file.name,
        fileUrl: realRef,
      });
      setInputName("");
      setInputDate("");
      file='';
    }
  }

  return (
    <form className={classes.wrapper} onSubmit={createTodo}>
      <input
        className={classes.input}
        type="text"
        placeholder="Todo description"
        onChange={(e) => setInputName(e.target.value)}
        value={inputName}
      ></input>
      <input
        className={classes.input}
        type="date"
        onChange={(e) => setInputDate(e.target.value)}
        value={inputDate}
      ></input>
      <input className={classes.input} type="file"></input>
      {inputName && inputDate ? (
        <MyButton
          type="onSubmit"
          style={{ border: "2px solid coral", borderRadius: "5px" }}
        >
          Create todo
        </MyButton>
      ) : (
        <MyButton disabled>Create todo</MyButton>
      )}
    </form>
  );
}
