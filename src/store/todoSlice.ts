import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CategoryTypes = "home" | "work" | "one day";
type Todo = {
  id: number;
  title: string;
  category: CategoryTypes;
  completed: boolean;
};
type todosState = {
  list: Todo[];
};

const initialState: todosState = {
  list: [],
};
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(
      state,
      action: PayloadAction<{ title: string; category: CategoryTypes }>
    ): void {
      state.list.push({
        id: Math.round(Math.random() * 100),
        title: action.payload.title,
        category: action.payload.category,
        completed: false,
      });
    },
    toggleComplete(state, action: PayloadAction<number>): void {
      const toggledTodo = state.list.find((todo) => todo.id === action.payload);
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    },
    removeTodo(state, action: PayloadAction<number>): void {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    editTodo(state, action: PayloadAction<{ title: string; id: number }>) {
      const todo = state.list.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    },
  },
});

export const { addTodo, toggleComplete, removeTodo, editTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
