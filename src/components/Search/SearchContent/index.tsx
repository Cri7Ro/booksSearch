import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SelectedBook from '../SelectedBook';
import {ISearch} from '../../../interfaces';
import BooksList from './BooksList';

const SearchContent: React.FC<ISearch> = ({searchRef, submitRef, bookList, loader, error, isOpen, setIsOpen}) => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [currBook, setCurrBook] = useState<number | null>(null);

    useLayoutEffect(() => {
        if (divRef && searchRef && submitRef && bookList) {
            let searchWidth = searchRef.clientWidth;
            let submitWidth = submitRef.clientWidth;
            if (divRef) divRef.current!.style.width = searchWidth + submitWidth + 'px';
        }
    }, [divRef, searchRef, submitRef, bookList]);

    useEffect(() => {
        if (isOpen) divRef.current!.classList.add('open');
    }, [isOpen])

    document.addEventListener('click', () => {
        if (searchRef?.classList.contains('open') && submitRef?.classList.contains('open') && divRef.current?.classList.contains('open')) {
            searchRef!.classList.remove('open');
            submitRef!.classList.remove('open');
            divRef.current!.classList.remove('open');
            setIsOpen(false);
        }
    });

    return (
        <>
            <div ref={divRef} className='snippet-books' >
                {
                    loader ? <p className='loading'>Поиск...</p> : 
                        error ? <p className='error'>{error}</p> : <BooksList bookList={bookList} setIsVisible={setIsVisible} setCurrBook={setCurrBook}/>     
                }
            </div>
            {isVisible ? <SelectedBook isVisible={isVisible} setIsVisible={setIsVisible} bookList={bookList} currBook={currBook}/> : false}
        </>
    );
};

export default SearchContent;