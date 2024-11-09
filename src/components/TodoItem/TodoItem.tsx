import { ITodo } from "../../types/data";
import { useAppDispatch } from "../../../hook";
import { toggleComplete, removeTodo } from "../../store/todoSlice";
import { editTodo } from "../../store/todoSlice";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import s from "./todoitem.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSquareCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
interface ItodoItem extends ITodo {}

const TodoItem = forwardRef<HTMLDivElement, ItodoItem>(
  ({ id, title, completed, category }, ref) => {
    const dispatch = useAppDispatch();
    const [editStatus, setEditStatus] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>("");
    const editRef = useRef<HTMLInputElement>(null);
    const editCurrentTodo = () => {
      if (editStatus && editValue) {
        dispatch(editTodo({ title: editValue, id }));
        setEditStatus(false);
      } else {
        setEditStatus(true);
      }
    };
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === "Enter" && editValue) {
        dispatch(editTodo({ title: editValue, id }));
        setEditStatus(false);
      }
    };
    useEffect(() => {
      if (editRef.current) editRef.current.focus();
    }, [editStatus]);
    return (
      <div className={s.todoItem} ref={ref}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(toggleComplete(id))}
        />
        {editStatus ? (
          <input
            type="text"
            value={editValue}
            onKeyDown={handleKeyDown}
            ref={editRef}
            onChange={(e) => setEditValue(e.target.value)}
          />
        ) : (
          <div className={s.todoItem__title_wrapper}>
            <p>{title}</p>
            <span>{category}</span>
          </div>
        )}
        <div className={s.todoItem__btns}>
          <button
            className={s.todoItem__btns__delete}
            onClick={() => dispatch(removeTodo(id))}
          >
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </button>

          <button
            className={s.todoItem__btns__edit}
            onClick={() => editCurrentTodo()}
          >
            {editStatus ? (
              <FontAwesomeIcon icon={faSquareCheck} />
            ) : (
              <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
            )}
          </button>
        </div>
      </div>
    );
  }
);
const MotionTodoItem = motion(TodoItem);
export default MotionTodoItem;
