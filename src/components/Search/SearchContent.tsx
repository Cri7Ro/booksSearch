import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface ISearch {
    searchRef: HTMLInputElement | null,
    submitRef: HTMLInputElement | null,
    bookList: Array<Object> | null,
    loader: boolean,
    error: string,
    isOpen: boolean,
    setIsOpen: (value: boolean | ((prevHeight: boolean) => boolean)) => void,
};

const SearchContent: React.FC<ISearch> = ({searchRef, submitRef, bookList, loader, error, isOpen, setIsOpen}) => {
    const divRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (divRef && searchRef && submitRef && bookList) {
            let searchWidth = searchRef.clientWidth;
            let submitWidth = submitRef.clientWidth;
            if (divRef) divRef.current!.style.width = searchWidth + submitWidth + 'px';
        }
    }, [divRef, searchRef, submitRef, bookList]);

    useEffect(() => {
        if (isOpen) divRef.current!.classList.add('open');
        console.log(divRef.current?.className)
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
        <div ref={divRef} className='snippet-books'>
            {
                loader ? <p className='loading'>Поиск...</p> : 
                    error ? <p className='error'>{error}</p> : 
                        <ul>
                            {
                                bookList ? bookList.map((e: any, i: number) =>  
                                    <li key={i.toString()}>
                                    {e.cover}
                                    <div className='snippet-text'>
                                        <p>{e.title}</p>
                                        <p>{e.author}</p>
                                    </div>
                                    </li> 
                                ) 
                                : false
                            }
                        </ul>
            }
            </div>
    );
};

export default SearchContent;