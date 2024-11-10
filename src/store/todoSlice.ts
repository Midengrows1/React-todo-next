import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryTypes } from "../types/data";
type Todo = {
  id: number;
  title: string;
  category: CategoryTypes;
  completed: boolean;
};
type todosState = {
  list: Todo[];
  specialCategory: Todo[];
};

const initialState: todosState = {
  list: [],
  specialCategory: [],
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
      const toggledTodo = state.specialCategory.find(
        (todo) => todo.id === action.payload
      );
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    },
    removeTodo(state, action: PayloadAction<number>): void {
      state.specialCategory = state.specialCategory.filter(
        (todo) => todo.id !== action.payload
      );
    },
    editTodo(state, action: PayloadAction<{ title: string; id: number }>) {
      const todo = state.specialCategory.find(
        (todo) => todo.id === action.payload.id
      );
      if (todo) {
        todo.title = action.payload.title;
      }
    },
    filterCategories(state, action: PayloadAction<string>): void {
      if (action.payload === "all") {
        state.specialCategory = state.list;
      } else {
        state.specialCategory = state.list.filter(
          (todo) => todo.category === action.payload
        );
      }
    },
  },
});

export const {
  addTodo,
  toggleComplete,
  removeTodo,
  editTodo,
  filterCategories,
} = todoSlice.actions;
export default todoSlice.reducer;
