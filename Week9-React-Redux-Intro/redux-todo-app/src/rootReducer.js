const INITIAL_STATE = {
  todos: []
};

export default function rootReducer(state = INITIAL_STATE, action) {
  if (action.type === 'ADD_TODO') {
    // add a new todo in the todos array state.todos? do NOT mutate array
    // ...state will unpack other keys in the object if present
    return { ...state, todos: [...state.todos, action.todo] };
  }
  if (action.type === 'DELETE') {
    // filter to return array WITHOUT the targeted id
    // action.id
    return {
      ...state,
      todos: state.todos.filter(todo => {
        return todo.id !== action.id;
      })
    };
  }
  // can return {...state};
  return state;
}
