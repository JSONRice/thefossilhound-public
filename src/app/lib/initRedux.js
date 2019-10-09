import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const defaultState = {};

export function initializeStore (initialState = defaultState) {
    return createStore(reducers, initialState, applyMiddleware(thunk))
}