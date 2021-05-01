import {ISearchBooks, IAction} from '../../interfaces';

const defaultState: ISearchBooks = {
    bookList: [],
    loader: false,
    error: ''
};

const SET_BOOKLIST = 'SET_BOOKLIST';
const CLEAR_BOOKLIST = 'CLEAR_BOOKLIST';
const SET_LOADER = 'SET_LOADER';
const SET_ERROR = 'SET_ERROR';

export default function searchReducer(state = defaultState, action: IAction): ISearchBooks {
    switch(action.type) {
        case SET_BOOKLIST:
            return {...state, bookList: [...state.bookList!, action.payload]};
        case CLEAR_BOOKLIST:
            return {...state, bookList: []};
        case SET_LOADER:
            return {...state, loader: action.payload};
        case SET_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    };
};