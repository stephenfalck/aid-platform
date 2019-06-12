import {FETCH_REQUESTS_BEGIN, FETCH_REQUESTS_SUCCESS, FETCH_REQUESTS_FAILURE}  from '../actions'

const initialState = { 
    items: [], 
    loading: false,
    error: null
}

export default function requestsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_REQUESTS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_REQUESTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.requests
            };
        case FETCH_REQUESTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            }
       default:
           return state;
        }
} 

/*export default function requestsReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_REQUESTS":
            return {
                ...state,
                list: action.payload.requests
            }
       default:
           return state;
        }
} */