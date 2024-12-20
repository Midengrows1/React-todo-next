import React from "react";
import s from "./tasks.module.sass";
import { useAppDispatch, useAppSelector } from "../../../hook";
import MotionTodoItem from "../TodoItem/TodoItem";
import { motion, AnimatePresence } from "framer-motion";
import { faTrash, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../CustomButton/CustomButton";
import { deleteAllTodos, findTodos } from "../../store/todoSlice";
import { checkAll } from "../../store/todoSlice";
import CustomInput from "../CustomInput/CustomInput";
const Tasks: React.FC = () => {
  const { specialCategory } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };
  const findTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(findTodos(e.target.value));
  };
  return (
    <div className={s.tasks}>
      <div className={s.tasks__btns}>
        <CustomButton
          className="delete"
          icon={faTrash}
          text="Clear"
          onClick={() => dispatch(deleteAllTodos())}
        />
        <CustomButton
          className="edit"
          icon={faCheckCircle}
          text="Check all"
          onClick={() => dispatch(checkAll())}
        />
      </div>
      <div className={s.tasks__search}>
        <CustomInput placeholder="Search..." onChange={(e) => findTodo(e)} />
      </div>
      <motion.ul>
        <AnimatePresence>
          {specialCategory.map((todo) => (
            <MotionTodoItem
              key={todo.id}
              {...todo}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout // Для плавной перестановки элементов
            />
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
};

export default Tasks;
