import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Header, TodoList } from '../components';
import { TodoActions } from '../actions';

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch),
  };
}

/**
 * Top-level application component. Connects to the Redux `Provider` stores,
 * passing their state through as props, as well as receives props from the
 * router.
 */
@DragDropContext(HTML5Backend)
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    todos: PropTypes.instanceOf(List).isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.actions.fetchAllTodos();
  }

  render() {
    const { actions, location, todos } = this.props;
    const filter = location.pathname.replace('/', '');

    return (
      <div>
        <Header
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
