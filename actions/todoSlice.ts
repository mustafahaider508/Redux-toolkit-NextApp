import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import todoService from "./todoService";

export interface SongsState {
  isLoading: boolean;
  todos: Array<[]>;
  isError: boolean;
  isSuccess: boolean;
  message: string;

}

let allTodos: any = [];


if (typeof window !== "undefined") {
  allTodos = JSON.parse(localStorage.getItem("todo")!);
}

const initialState: SongsState = {
  isLoading: false,
  todos: allTodos ? allTodos : [],
  isError: false,
  isSuccess: false,
  message: "",
};

// Api Call from service
export const todoData = createAsyncThunk(
  "todos/todoData",
  async (_, thunkAPI) => {
    try {
      const res = await todoService.todoData();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.title);
    }
  }
);

export const todos = createSlice({
  name: "todos",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
    setTodo: (state, action) => {
      state.todos = action.payload;
      localStorage.setItem("todo", JSON.stringify(action.payload));
    },
     resetSongSliceValues: (state) => {
      state.todos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todoData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(todoData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        let allTodos: any = [];
        action.payload.forEach((doc: any) => {
          allTodos = [...allTodos, action.payload];
        });
        state.todos = allTodos;
        localStorage.setItem("todo", JSON.stringify(allTodos));
      })
      .addCase(todoData.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset, setTodo, resetSongSliceValues } = todos.actions;

export default todos.reducer;
