export const initialState = {
  loading: false,
  results: null,
  history: []
};

export const actionTypes = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  ADD_HISTORY: 'ADD_HISTORY'
};

export function reducer(state, action) {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return { ...state, loading: true, results: null };
    case actionTypes.FETCH_SUCCESS:
      return { ...state, loading: false, results: action.payload };
    case actionTypes.ADD_HISTORY:
      return { ...state, history: [...state.history, action.payload] };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
