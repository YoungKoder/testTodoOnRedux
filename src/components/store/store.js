import { createStore } from "redux";
import { REMOVE_TODO, ADD_TODO, SET_STATUS } from "./actions";

const initialState = {
  todos: [
    {
      id: 1,
      title: "Drink kofee",
      status: "active"
    },
    {
      id: 2,
      title: "Buy car",
      status: "active"
    },
    {
      id: 3,
      title: "Clean house",
      status: "active"
    }
  ]
};

const todoReducer = (state = initialState, action) => {
  const { todos } = state;
  switch (action.type) {
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    case ADD_TODO:
      const newItm = {
        id: action.id,
        title: action.title,
        status: action.status
      };
      return { ...state, todos: [newItm, ...state.todos] };
    case SET_STATUS:
      const el = todos.findIndex(el => el.id === action.id);

      const oldItm = todos[el];
      const newItem = { ...oldItm, status: action.status };
      // const newArr = [...todos.slice(0, el), newItem, ...todos.slice(el + 1)];

      return {
        ...state,
        todos: [...todos.slice(0, el), newItem, ...todos.slice(el + 1)]
      };

    default:
      return { ...state };
  }
};

export const store = createStore(todoReducer);
