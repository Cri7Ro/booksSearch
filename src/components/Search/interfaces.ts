export interface IBookInfo {
    coverS: string,
    coverM: string,
    bookKeyOL: string,
    bookKeyW: string,
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
    bookList: Array<IBookInfo> | null,
    setIsVisible: (value: boolean | ((prevHeight: boolean) => boolean)) => void,
    isVisible: boolean
};

export interface ISearch {
    searchRef: HTMLInputElement | null,
    submitRef: HTMLInputElement | null,
    bookList: Array<IBookInfo> | null,
    loader: boolean,
    error: string,
    isOpen: boolean,
    setIsOpen: (value: boolean | ((prevHeight: boolean) => boolean)) => void,
};