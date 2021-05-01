export interface IBookInfo {
    coverS: string,
    coverM?: string,
    title: string,
    author: string
    publish_date?: string,
    isbn10?: string,
    isbn13?: string,
    publishers?: string,
    description?: string | object 
};

export interface Iinfo {
    currBook: number | null,
    setIsVisible: (value: boolean | ((prevHeight: boolean) => boolean)) => void,
    isVisible?: boolean,
    isFavorite?: boolean,
    handleFavoriteClick?(): void,
};

export interface ISearch {
    searchRef: HTMLInputElement | null,
    submitRef: HTMLButtonElement | null,
    isOpen: boolean,
    setIsOpen: (value: boolean | ((prevHeight: boolean) => boolean)) => void,
};

export interface IFavoriteBooks {
    books: IBookInfo[]
};

export interface IAction {
    type: string,
    payload: any
};

type currBook = number | null;
export interface IBooksList {
    setIsVisible: (value: boolean | ((prevHeight: boolean) => boolean)) => void,
    setCurrBook: (value: currBook | ((prevHeight: currBook) => currBook)) => void,
};

export type get = (url: string) => any;

export interface ISearchBooks {
    bookList?: IBookInfo[], 
    loader?: boolean, 
    error?: string
};
