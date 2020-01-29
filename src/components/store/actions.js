export const REMOVE_TODO = "REMOVE_TODO";
export const ADD_TODO = "ADD_TODO";
export const SET_STATUS = "SET_STATUS";

export const removeTodo = id => ({
  type: REMOVE_TODO,
  id
});

export const addTodo = (title, id) => ({
  type: ADD_TODO,
  title: title,
  id: id,
  status: "active"
});

export const setStatus = (status, id) => ({
  type: SET_STATUS,
  id,
  status
});
