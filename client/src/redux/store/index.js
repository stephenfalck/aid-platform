import { createStore } from "redux";
import { reducer } from "../reducers";

const initialState = { 
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

export const store = createStore(reducer, initialState);