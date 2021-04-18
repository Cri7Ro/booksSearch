import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SelectedBook from './SelectedBook';
import {ISearch} from './interfaces';

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

    function handleClick(li: React.SyntheticEvent<EventTarget>): void {
        if (!(li.target instanceof HTMLElement)) {
            return;
          }
       
        if (bookList) {
            setIsVisible(true);
            setCurrBook(+li.target.dataset.index!)
        }
    };

    return (
        <>
            <div ref={divRef} className='snippet-books' >
                {
                    loader ? <p className='loading'>Поиск...</p> : 
                        error ? <p className='error'>{error}</p> : 
                            <ul onClick={handleClick}>
                                {
                                    bookList ? bookList.map((e: any, i: number) =>  
                                        <li key={i.toString()}  data-index={i}>
                                            <img src={e.coverS} alt="" data-index={i}/>  
                                            <div className='snippet-text'>
                                                <p data-index={i}>Title: {e.title}</p>
                                                <p data-index={i}>Author: {e.author}</p>
                                            </div>
                                        </li> 
                                    ) 
                                    : false
                                }
                            </ul>
                }
            </div>
            {isVisible ? <SelectedBook isVisible={isVisible} setIsVisible={setIsVisible} bookList={bookList} currBook={currBook}/> : false}
        </>
    );
};

export default SearchContent;