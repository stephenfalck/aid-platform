export function reducer(state, action) {
    switch (action.type) {
        case "SET_REQUESTS":
            return {
                ...state,
                requests: action.payload.requests
            }
       default:
           return state;
        }
} 