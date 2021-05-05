import {IFavoriteBooks, IAction} from '../../interfaces';

const ADD_FAVORITE_BOOK = 'ADD_FAVORITE_BOOK';
const DELETE_FAVORITE_BOOK = 'DELETE_FAVORITE_BOOK';
const INFO_CURRENT_FAVORITE_BOOK = 'INFO_CURRENT_FAVORITE_BOOK';

const defaultState: IFavoriteBooks = {
    books: (localStorage.getItem('books')) ? JSON.parse(localStorage.getItem('books')!) : [],
    currentBook: null
};

export const favoriteReducer = (state = defaultState, action: IAction): IFavoriteBooks => {
    switch (action.type) {
        case ADD_FAVORITE_BOOK: 
            return {...state, books: [...state.books, action.payload]};
        case DELETE_FAVORITE_BOOK: 
            return {...state, books: [...state.books.slice(0, action.payload),  ...state.books.slice(action.payload + 1)]};
        case INFO_CURRENT_FAVORITE_BOOK:
            return {...state, currentBook: action.payload}
        default: 
            return state;
    }
};