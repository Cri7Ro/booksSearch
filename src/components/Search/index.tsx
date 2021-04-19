import React, { useEffect, useRef, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import SearchContent from './SearchContent';
import {IBookInfo} from '../../interfaces';

const Search: React.FC = () => {

    const [bookList, setBookList] = useState<Array<IBookInfo>>([]); 
    const [userInputTitle, setUserInputTitle] = useState<string>('');  
    const [timerID, setTimerID] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false);
    const [start, setStart] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {get} = useFetch();

    const searchRef = useRef<HTMLInputElement | null>(null);
    const submitRef = useRef<HTMLInputElement | null>(null);

    let isError: boolean = false; 

    useEffect(() => {
        if (timerID) clearTimeout(timerID);
        if (!loader && start) setTimerID(window.setTimeout(() => bookRequest(), 1000));
    }, [userInputTitle]);

    async function bookRequest() {
        setBookList([]);
        setLoader(true);
        setError('');
        try {
            const data = await get(`http://openlibrary.org/search.json?title=${userInputTitle}`);
            if (data.numFound === 0) throw new Error();
            else data.docs.map(async (e: any, i: number) => {
                    if (e.cover_i) {
                        isError = true;
                        try {
                            const fullInfo = await get(`https://openlibrary.org/books/${e.key.slice(7, -1) + 'M.json'}`);
                            const description = await get(`https://openlibrary.org${e.key + '.json'}`);

                            setBookList (prev => [...prev, {
                                coverS: `http://covers.openlibrary.org/b/id/${e.cover_i}-S.jpg`,
                                coverM: `http://covers.openlibrary.org/b/id/${e.cover_i}-M.jpg`,
                                title: e.title,
                                author: e.author_name,
                                publish_date: fullInfo.publish_date ? fullInfo.publish_date : 'No publication date',
                                isbn10: fullInfo.isbn_10 ? fullInfo.isbn_10 : 'No ISBN10',
                                isbn13: fullInfo.isbn_13 ? fullInfo.isbn_13 : 'No ISBN13',
                                publishers: fullInfo.publishers ? fullInfo.publishers : 'No publishers',
                                description: description.description ? 
                                                typeof description.description === 'string' ? description.description : description.description.value 
                                            : 'No description'
                            }]);
                        } catch (err) {
                            console.log('Error ' + err);
                        }
                    }
                })
        } catch (err) {
            console.log('Error' + err)
        } finally {
            setLoader(false);
            if (!isError) setError('Ничего не найдено ☹');
        }
    };

    function handleSubmit(event: React.SyntheticEvent): void {
        event.preventDefault();
        if (timerID) clearTimeout(timerID);
        if (!loader) bookRequest();
    };

    function handleFocus(): void {
        if (searchRef && submitRef) {
            if (!searchRef.current?.classList.contains('open') && !submitRef.current?.classList.contains('open')) {
                searchRef.current!.classList.add('open');
                submitRef.current!.classList.add('open');
                setIsOpen(true);
            }
        }
    };

    return (
        <section className='main-content' onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSubmit} className='search-form'>
                <input 
                    className='search'
                    ref={searchRef}
                    onFocus={handleFocus}
                    type="text"
                    value={userInputTitle}
                    onChange={e => {setStart(true); setUserInputTitle(e.target.value)}}
                    placeholder='Введите название книги'
                />
                <input className='submit' type="submit" ref={submitRef}/>
            </form>
            <SearchContent isOpen={isOpen} setIsOpen={setIsOpen} loader={loader} error={error} searchRef={searchRef.current} submitRef={submitRef.current} bookList={bookList}/>
        </section>
    );
};

export default Search;