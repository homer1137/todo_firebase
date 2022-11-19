import React from "react";
import MyButton from "../Button/MyButton";
import classes from "./ManageTodo.module.less";

export default function ManageTodo({
  setActive,
  setCompleted,
  deleteDone,
  result,
  active,
  completed,
}) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.text}>{result} items left</div>
      <div className={classes.wrapperButtons}>
        <MyButton
          onClick={() => {
            setActive(false);
            setCompleted(false);
          }}
          style={{
            border:
              !active && !completed ? "2px solid rgb(236,215,215)" : "none",
            borderRadius: 5,
            fontWeight: 300,
          }}
        >
          All
        </MyButton>
        <MyButton
          onClick={() => {
            setActive((prev) => !prev);
            setCompleted(false);
          }}
          style={{
            border: active ? "2px solid rgb(236,215,215)" : "none",
            borderRadius: 5,
            fontWeight: 300,
          }}
        >
          Active
        </MyButton>
        <MyButton
          onClick={() => {
            setCompleted((prev) => !prev);
            setActive(false);
          }}
          style={{
            border: completed ? "2px solid rgb(236,215,215)" : "none",
            borderRadius: 5,
            fontWeight: 300,
          }}
        >
          Completed
        </MyButton>
      </div>
      <MyButton
        onClick={deleteDone}
        style={{
          fontWeight: 300,
          fontSize: "1.3rem",
        }}
      >
        Clear completed
      </MyButton>
    </div>
  );
}
