import {combineReducers} from 'redux';
import {favoriteReducer} from './favoriteReducer';

export const rootReducer = combineReducers({
    books: favoriteReducer
});

export type RootState = ReturnType<typeof rootReducer>;