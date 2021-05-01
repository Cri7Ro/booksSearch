import {combineReducers} from 'redux';
import {favoriteReducer} from './favoriteReducer';
import searchReducer from './searchReducer';


export const rootReducer = combineReducers({
    books: favoriteReducer,
    search: searchReducer
});

export type RootState = ReturnType<typeof rootReducer>;