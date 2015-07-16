import expect from 'expect.js';
import Immutable from 'immutable';

import todos from '../../js/reducers/todos';

describe('todos reducer', () => {
  const state = Immutable.fromJS({
    todoList: [{
      id: 1,
      label: 'Hello',
      isComplete: true
    }, {
      id: 2,
      label: 'World',
      isComplete: false
    }]
  });

  it('exposes a function', () => {
    expect(todos).to.be.a('function');
  });

  describe('addTodo handler', () => {
    const action = {
      type: 'ADD_TODO',
      payload: {
        todo: {
          id: 3,
          label: 'New',
          isComplete: false
        }
      }
    };

    it('appends a new todo', () => {
      const subject = todos(state, action).get('todoList');
      expect(subject.size).to.be(3);
      expect(subject.last().get('label')).to.be('New');
    });
  });

  describe('clearCompleteTodos handler', () => {
    const action = {
      type: 'CLEAR_COMPLETE_TODOS'
    };

    it('removes todos where isComplete = true', () => {
      const subject = todos(state, action).get('todoList');
      expect(subject.size).to.be(1);
      expect(subject.every(todo => !todo.get('isComplete'))).to.be(true);
    });
  });

  describe('deleteTodo handler', () => {
    const action = {
      type: 'DELETE_TODO',
      payload: {
        id: 2
      }
    };

    it('removes the correct todo', () => {
      const subject = todos(state, action).get('todoList');
      expect(subject.size).to.be(1);
      expect(subject.every(todo => todo.get('id') !== 2)).to.be(true);
    });
  });

  describe('editTodo handler', () => {
    const action = {
      type: 'EDIT_TODO',
      payload: {
        id: 2,
        label: 'New label'
      }
    };

    it('modifies the correct todo', () => {
      const subject = todos(state, action)
        .get('todoList')
        .find(todo => todo.get('id') === 2);

      expect(subject.get('label')).to.be('New label');
    });
  });


  describe('fetchAllTodos handler', () => {
    const action = {
      type: 'FETCH_ALL_TODOS',
      payload: {
        id: 2,
        todos: [{
          id: 1,
          label: 'A couple',
          isComplete: true
        }, {
          id: 2,
          label: 'of new',
          isComplete: true
        }, {
          id: 3,
          label: 'todos',
          isComplete: true
        }, {
          id: 4,
          label: 'all completed',
          isComplete: true
        }]
      }
    };

    it('sets todoList to the new fetched todos', () => {
      const subject = todos(state, action).get('todoList');
      expect(subject.size).to.be(4);
      expect(subject.every(todo => todo.get('isComplete'))).to.be(true);
    });
  });

  describe('markAllTodos handler', () => {
    const action = {
      type: 'MARK_ALL_TODOS',
      payload: {
        id: 2,
        isComplete: true
      }
    };

    it('modifies all todos', () => {
      const subject = todos(state, action).get('todoList');
      expect(subject.every(todo => todo.get('isComplete'))).to.be(true);
    });
  });

  describe('markTodo handler', () => {
    const action = {
      type: 'MARK_TODO',
      payload: {
        id: 2,
        isComplete: true
      }
    };

    it('modifies the correct todo', () => {
      const subject = todos(state, action)
        .get('todoList')
        .find(todo => todo.get('id') === 2);

      expect(subject.get('isComplete')).to.be(true);
    });
  });
});
