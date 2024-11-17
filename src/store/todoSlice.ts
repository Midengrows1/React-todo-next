import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  fetchedList: [] | unknown;
  loading: boolean;
  error: string | null;
};

const initialState: todosState = {
  list: [],
  specialCategory: [],
  fetchedList: [],
  loading: false,
  error: null
};

export const fetchTodos = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>("todos/fetchTodos", async function (_, { rejectWithValue }) {
  const response = await fetch(
    "https://jsonplaceholder.typecode.com/todos?_limit=10"
  );

  if (!response.ok) {
    return rejectWithValue("Server error!");
  }
  const data = await response.json();
  return data;
});

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
          completed: false
        }
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.fetchedList = action.payload;
      });
  }
});

export const {
  addTodo,
  toggleComplete,
  removeTodo,
  editTodo,
  filterCategories,
  deleteAllTodos,
  checkAll,
  findTodos
} = todoSlice.actions;
export default todoSlice.reducer;
