import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import {Iinfo} from '../../../interfaces';
import BookInfo from './BookInfo';

const SelectedBook: React.FC<Iinfo> = ({setIsVisible, currBook, bookList}) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    
    const dispatchFavorites = useDispatch();
    const favoriteBooks = useTypedSelector(state => state.books);

    useEffect(() => {
        favoriteBooks.books.map(e => {
            if (JSON.stringify(e) === JSON.stringify(bookList![currBook!])) setIsFavorite(true);
            return e;
        });
    }, []);

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(favoriteBooks.books));
    }, [favoriteBooks])

    function handleFavoriteClick(): void {
        dispatchFavorites({type: 'ADD_FAVORITE_BOOK', payload: bookList![currBook!]})
        setIsFavorite(true);
    }

    return (
        <div className='selected-book' onClick={e => setIsVisible(false)}>
            { bookList ? 
                <BookInfo 
                    setIsVisible={setIsVisible}
                    currBook={currBook}
                    bookList={bookList}
                    isFavorite={isFavorite}
                    handleFavoriteClick={handleFavoriteClick}
                /> 
                : null }
        </div>
    );
};

export default SelectedBook;