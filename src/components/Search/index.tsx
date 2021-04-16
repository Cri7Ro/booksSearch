import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SearchContent from './SearchContent';

const Search: React.FC = () => {

    const [bookList, setBookList] = useState<Array<Object> | null>(null); 
    const [userInputTitle, setUserInputTitle] = useState<string>('');  
    const [cover, setCover] = useState<JSX.Element>();
    const [bookTitle, setBookTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [timerID, setTimerID] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false);
    const [start, setStart] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const searchRef = useRef<HTMLInputElement | null>(null);
    const submitRef = useRef<HTMLInputElement | null>(null);
    let isError: boolean = false;

    useEffect(() => {
        if (bookList) {
            setBookList([...bookList, {
                    cover: <img src={`http://covers.openlibrary.org/b/id/${cover}-S.jpg`} alt=""/> , 
                    title: bookTitle,
                    author: author
                }
            ]);
        } else if (cover) setBookList([{
                cover: <img src={`http://covers.openlibrary.org/b/id/${cover}-S.jpg`} alt=""/> , 
                title: bookTitle,
                author: author
            }]);
    }, [cover]);

   

    useEffect(() => {
        if (timerID) clearTimeout(timerID);
        if (!loader && start) setTimerID(window.setTimeout(() => bookRequest(), 1000));
    }, [userInputTitle]);

    function bookRequest(): void {
        setBookList(null);
        setLoader(true);
        setError('');
        fetch(`http://openlibrary.org/search.json?title=${userInputTitle}`)
            .then(response => response.json())
            .then(data => data.docs.map((e: any, i: number) => {
                    if (e.cover_i) {
                        setBookTitle(e.title);
                        setAuthor(e.author_name);
                        setCover(e.cover_i);
                        isError = true;
                    };
                    return e; 
                })
            )
            .catch(err => console.log('Error ' + err))
            .finally(() => {
                setLoader(false);
                if (!isError) setError('Ничего не найдено ☹');
            });
    };

    function handleSubmit(event: React.SyntheticEvent): void {
        event.preventDefault();
        if (timerID) clearTimeout(timerID);
        if (!loader) bookRequest();
    };

    function handleFocus(): void {
        if (searchRef && submitRef) {
            if (!searchRef.current?.classList.contains('open') && !submitRef.current?.classList.contains('open')) { //&& !divRef.current?.classList.contains('open')
                searchRef.current!.classList.add('open');
                submitRef.current!.classList.add('open');
                setIsOpen(true);
                //
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