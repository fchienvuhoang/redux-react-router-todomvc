import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import todoShape from './propShapes/todoShape';
import * as TodoActions from '../actions/TodoActions';

/**
 * Top-level application component. Connects to the Redux `Provider` stores,
 * passing their state through as props.
 * @see App
 * @see todos
 */
@connect(state => ({
  todos: state.todos.todoList
}))
export default class TodoApp extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape(todoShape)).isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const { dispatch, location, todos } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);
    const filter = location.pathname.replace('/todos/', '');

    return (
      <div>
        <TodoHeader
          addTodo={actions.addTodo}
        />
        <TodoList
          actions={actions}
          filter={filter}
          todos={todos}
        />
      </div>
    );
  }
}
