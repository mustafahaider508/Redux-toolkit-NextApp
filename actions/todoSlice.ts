import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


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



export const todos = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos,action.payload];
      localStorage.setItem("todo", JSON.stringify(state.todos));
    },
  },

});
export const { addTodo } = todos.actions;

export default todos.reducer;
