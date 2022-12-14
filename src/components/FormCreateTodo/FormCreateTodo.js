import React, {useRef} from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import MyButton from "../Button/MyButton";
import classes from "./FormCreateToso.module.less";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.js";
import PropTypes from "prop-types";

/**
 * Component for creating todo.
 *
 * @component
 * @example
 * const setProgress = 21
 * return (
 *   <FormCreateTodo setProgress={setProgress}  />
 * )
 */

export default function FormCreateTodo({ setProgress }) {
  const [inputName, setInputName] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const inputRef = useRef(null);

  const resetFileInput = () => {
    inputRef.current.value = null;
  };

  const uploadFile = (file) => {
    if (!file) return;

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref);
      }
    );
  };

  async function createTodo(e) {
    e.preventDefault();
    let file = e.target[3].files[0] || { name: "" };
    uploadFile(file);
    const storageRef = ref(storage, `/files/${file.name}`);
    const realRef = file.name ? await getDownloadURL(storageRef) : "";
    if (inputName) {
      await addDoc(collection(db, "todos"), {
        taskName: inputName,
        description: inputDescription,
        date: inputDate,
        done: false,
        fileName: file.name,
        fileUrl: realRef,
      });
      setInputName("");
      setInputDate("");
      setInputDescription('');
      file = "";
      resetFileInput();
    }
  }

  return (
    <form className={classes.wrapper} onSubmit={createTodo}>
      <label>name</label>
      <input
        className={classes.input}
        type="text"
        placeholder="Todo name"
        onChange={(e) => setInputName(e.target.value)}
        value={inputName}
      ></input>
      <label>description</label>
      <textarea
        className={classes.input}
        type="text"
        placeholder="Todo description"
        onChange={(e) => setInputDescription(e.target.value)}
        value={inputDescription}
      ></textarea>
      <label>date of completion </label>
      <input
        className={classes.input}
        type="date"
        onChange={(e) => setInputDate(e.target.value)}
        value={inputDate}
      ></input>
      <label>you can add a file to you todo</label>
      <input ref={inputRef} className={classes.input} type="file"></input>
      {inputName && inputDate ? (
        <MyButton
          type="onSubmit"
          style={{ border: "2px solid coral", borderRadius: "5px" }}
        >
          Create todo
        </MyButton>
      ) : (
        <>
          <label>fields "name" and "date" are required</label>
          <MyButton disabled>Create todo</MyButton>
        </>
      )}
    </form>
  );
}

FormCreateTodo.propTypes = {
  /**
   * setProgress
   */
   setProgress: PropTypes.number,

}

