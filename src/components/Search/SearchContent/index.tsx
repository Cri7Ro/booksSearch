import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SelectedBook from '../SelectedBook';
import {ISearch} from '../../../interfaces';
import BooksList from './BooksList';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const SearchContent: React.FC<ISearch> = ({searchRef, submitRef, isOpen, setIsOpen}, ref) => {

    const searchBooks = useTypedSelector(state => state.search);

    const divRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [currBook, setCurrBook] = useState<number | null>(null);

    useLayoutEffect(() => {
        if (divRef && searchRef && submitRef && searchBooks.bookList) {
            let searchWidth = searchRef.clientWidth;
            let submitWidth = submitRef.clientWidth;
            if (divRef) divRef.current!.style.width = searchWidth + submitWidth + 'px';
        }
    }, [divRef, searchRef, submitRef, searchBooks.bookList]);

    useEffect(() => {
        if (isOpen) divRef.current!.classList.add('open');
        else divRef.current!.classList.remove('open');
    }, [isOpen]);

    return (
        <>
            <div ref={divRef} className='snippet-books' >
                {
                    searchBooks.loader ? <img src="./img/Book.gif" id='loader'/> : 
                        searchBooks.error ? <p className='error'>{searchBooks.error}</p> : 
                            <BooksList setIsVisible={setIsVisible} setCurrBook={setCurrBook}/>     
                }
            </div>
            {isVisible ? <SelectedBook isVisible={isVisible} setIsVisible={setIsVisible} currBook={currBook}/> : false}
        </>
    );
};

export default SearchContent;