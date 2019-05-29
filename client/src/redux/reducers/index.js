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
            };
        case "LOG_OUT_USER":
            return {
                ...state,
                token: {
                    token: null
                },
                current_user: {
                    id: null,
                    first_name: null,
                    last_name: null,
                    email: null
                }
            }
       default:
           return state;
        }
} 