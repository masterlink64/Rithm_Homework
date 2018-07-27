const INITIAL_STATE = {
  todos: []
};

export default function rootReducer(state = INITIAL_STATE, action) {
  if (action.type === 'ADD_TODO') {
    // add a new todo in the todos array state.todos?
  }
  // can return {...state};
  return state;
}
