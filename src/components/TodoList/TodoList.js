import React from "react";
import { connect } from "react-redux";
import { removeTodo, addTodo, setStatus } from "../store/actions";
import { todosLength } from "../store/selectors";

import "./TodoList.css";

class _TodoList extends React.Component {
  state = {
    title: "",
    id: null
  };

  changeHandler = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  removeTodo = id => {
    this.props.removeTodo(id);
  };

  addTodo = (title, id) => {
    this.props.addTodo(title, id);
  };

  toggleToHold = id => {
    this.props.setStatus("hold", id);
  };

  toggleToDone = id => {
    this.props.setStatus("done", id);
  };

  render() {
    const rendId = Math.floor(Math.random() * 100000);
    console.log(this.props.todos);
    let nameClass = "";
    return (
      <div>
        {this.props.todos.map(todo => {
          todo.status === "done"
            ? (nameClass = "todoItem_title todoItem--done")
            : todo.status === "hold"
            ? (nameClass = "todoItem_title todoItem--hold")
            : (nameClass = "todoItem_title");
          // todo.status === "done"
          //   ? (nameClass = "todoItem--done")
          //   : (nameClass = null);
          // if (todo.status === "done") aditionClass = "todoItem--done";
          return (
            <div className={"todoItem "} key={todo.id}>
              <span
                className={nameClass}
                onClick={() => this.toggleToDone(todo.id)}
              >
                {todo.title}
              </span>
              <button
                className={"btn btn-remove"}
                onClick={() => this.removeTodo(todo.id)}
              >
                Remove
              </button>
              <button
                className={"btn btn-hold"}
                onClick={() => this.toggleToHold(todo.id)}
              >
                Hold
              </button>
            </div>
          );
        })}
        <div>Count - {this.props.todosCount}</div>
        <input type="text" name="title" onChange={this.changeHandler} />
        <button onClick={() => this.addTodo(this.state.title, rendId)}>
          Add
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
    todosCount: todosLength(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeTodo: id => dispatch(removeTodo(id)),
    addTodo: (title, id) => dispatch(addTodo(title, id)),
    setStatus: (status, id) => dispatch(setStatus(status, id))
  };
};

const TodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TodoList);

export default TodoList;
