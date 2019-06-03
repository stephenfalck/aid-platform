import { createStore } from "redux";
import { reducer } from "../reducers";

const initialState = { 
    requests: []
}

export const store = createStore(reducer, initialState);