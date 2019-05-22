export function reducer(state, action) {
    switch (action.type) {
        case "SET_AUTHENTICATED_USER":
           return {
               ...state,
               current_user: action.payload.user
           };
        case "SET_JWT_TOKEN":
            return {
                ...state,
                token: action.payload.token
            }
       default:
           return state;
            }
} 