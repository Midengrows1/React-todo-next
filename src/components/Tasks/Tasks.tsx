import React from "react";
import s from "./tasks.module.sass";
import { useAppSelector } from "../../../hook";
import MotionTodoItem from "../TodoItem/TodoItem";
import { motion, AnimatePresence } from "framer-motion";
const Tasks: React.FC = () => {
  const { list } = useAppSelector((state) => state.todos);
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };
  return (
    <div className={s.tasks}>
      <motion.ul>
        <AnimatePresence>
          {list.map((todo) => (
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
