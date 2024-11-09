import TodoItem from "../TodoItem/TodoItem";
import { useAppSelector } from "../../../hook";

const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.list);
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default TodoList;
