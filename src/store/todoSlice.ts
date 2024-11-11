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
      state.list = [
        ...state.list,
        {
          id: Math.round(Math.random() * 100),
          title: action.payload.title,
          category: action.payload.category,
          completed: false,
        },
      ];
      state.specialCategory = state.list;
      console.log(state.specialCategory);
    },
    toggleComplete(state, action: PayloadAction<number>): void {
      const toggledTodo = state.list.find((todo) => todo.id === action.payload);
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
      state.specialCategory = state.list;
    },
    removeTodo(state, action: PayloadAction<number>): void {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
      state.specialCategory = state.list;
    },
    editTodo(state, action: PayloadAction<{ title: string; id: number }>) {
      const todo = state.list.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
      state.specialCategory = state.list;
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
    deleteAllTodos(state) {
      state.list = [];
      state.specialCategory = [];
    },
    checkAll(state): void {
      state.list = state.list.map((todo: Todo) => {
        return { ...todo, completed: true };
      });
      state.specialCategory = state.list;
    },
    findTodos(state, action: PayloadAction<string>) {
      const foundedTodos = state.list.filter((todo: Todo) =>
        todo.title
          .trim()
          .toLowerCase()
          .includes(action.payload.trim().toLowerCase())
      );
      if (foundedTodos) {
        state.specialCategory = foundedTodos;
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
  deleteAllTodos,
  checkAll,
  findTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
