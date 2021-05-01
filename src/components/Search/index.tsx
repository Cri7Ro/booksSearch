import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import SearchContent from './SearchContent';
import bookRequest from './bookRequest';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';

const Search: React.FC = () => {

    const searchDispatch = useDispatch();
    const searchBooks = useTypedSelector(state => state.search);
    
    const [userInputTitle, setUserInputTitle] = useState<string>('');  
    const [timerID, setTimerID] = useState<number>(0);
    
    const [start, setStart] = useState<boolean>(false);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {get} = useFetch();

    const searchRef = useRef<HTMLInputElement | null>(null);
    const submitRef = useRef<HTMLButtonElement | null>(null);

    let isError: boolean = false; 

    useEffect(() => {
        if (timerID) clearTimeout(timerID);
        if (!searchBooks.loader && start) setTimerID(window.setTimeout(() => bookRequest(searchDispatch, isError, get, userInputTitle), 1000));
    }, [userInputTitle]);

    function handleSubmit(event: React.SyntheticEvent): void {
        event.preventDefault();
        if (timerID) clearTimeout(timerID);
        if (!searchBooks.loader) bookRequest(searchDispatch, isError, get, userInputTitle);
    };

    useLayoutEffect(() => {
        if (searchRef && submitRef) {
            submitRef.current!.style.height = searchRef.current!.offsetHeight + 'px';
        }
    }, [searchRef, submitRef])

    useEffect(() => {
        if (searchRef && submitRef) {
            if (!searchRef.current?.classList.contains('open') && !submitRef.current?.classList.contains('open')) {  
                if (userInputTitle && (searchBooks.loader || searchBooks.error || searchBooks.bookList!.length > 0)) {
                    searchRef.current!.classList.add('open');
                    submitRef.current!.classList.add('open');
                    setIsOpen(true)
                };
            } else {
                if (!userInputTitle) {
                    searchRef.current!.classList.remove('open');
                    submitRef.current!.classList.remove('open');
                    setIsOpen(false)
                }
            };
        };
    }, [searchBooks.loader, searchBooks.error, searchBooks.bookList, userInputTitle]);

    return (
        <section className='main-content' onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSubmit} className='search-form'>
                <input 
                    className='search'
                    ref={searchRef}
                    type="text"
                    value={userInputTitle}
                    onChange={event => {setStart(true); setUserInputTitle(event.target.value);}}
                    placeholder='Введите название книги'
                />
                <button className='submit' type="submit" ref={submitRef}> <img src="./img/search.png" alt=""/> </button>
            </form>
            <SearchContent isOpen={isOpen} setIsOpen={setIsOpen} searchRef={searchRef.current} submitRef={submitRef.current}/>
        </section>
    );
};

export default Search;