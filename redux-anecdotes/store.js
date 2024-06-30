import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./src/reducers/filterReducer";
import notificationReducer from "./src/reducers/notificationReducer";
import anecdoteReducer from "./src/reducers/anecdoteReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export default store;
