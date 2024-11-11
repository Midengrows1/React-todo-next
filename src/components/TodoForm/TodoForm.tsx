import React from "react";
import s from "./todoform.module.sass";
import { useAppDispatch } from "../../../hook";
import { useRef, useState, useEffect } from "react";
import { addTodo } from "../../store/todoSlice";
import { motion, AnimatePresence } from "framer-motion";
import { easeInOut } from "framer-motion/dom";
import CustomInput from "../CustomInput/CustomInput";
const TodoForm: React.FC = () => {
  const [value, setValue] = useState("");
  const [isShowed, setisShowed] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const listVariants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: i * 0.3,
        timingFunction: easeInOut,
        type: "spring",
        stiffness: 200,
        bounce: 2,
        damping: 9,
      },
    }),
  };
  const todoCategories = ["home", "work", "one day"] as const;
  type TodoCategory = (typeof todoCategories)[number];

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    if (!e.target.value) {
      setisShowed(false);
    }
  };
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && value) {
      setisShowed(true);
    }
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  const createTodo = () => {
    if (value) {
      setisShowed(true);
    }
  };
  const closeCategories = (ctg: TodoCategory) => {
    dispatch(addTodo({ title: value, category: ctg }));
    setisShowed(false);
    setValue("");
  };

  return (
    <div className={s.todo_form}>
      <div className={s.todo_form__inner}>
        <CustomInput
          type="text"
          placeholder="Todo..."
          value={value}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          ref={inputRef}
        />
        <button className={s.todo_form__inner__addBtn} onClick={createTodo}>
          Add
        </button>
        <AnimatePresence>
          {isShowed && (
            <motion.ul className={s.todo_form__inner__dropDown}>
              {todoCategories.map((ctg: TodoCategory, index: number) => (
                <motion.li
                  key={index}
                  initial="hidden"
                  animate="visible"
                  variants={listVariants}
                  custom={index}
                  onClick={() => closeCategories(ctg)}
                  exit={{ opacity: 0, y: 100 }}
                >
                  {ctg}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TodoForm;
