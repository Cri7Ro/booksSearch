import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {Iinfo} from '../../interfaces';

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
            {
                bookList ? 
                <div className='modal' onClick={e => e.stopPropagation()}>
                    <div className='selected-book-content'>
                        <img src={bookList[currBook!].coverM} alt=""/>
                        <div>
                            <p>Title: {bookList[currBook!].title}</p>
                            <p>Author: {bookList[currBook!].author}</p>
                            <p>Publish date: {bookList[currBook!].publish_date}</p>
                            <p>Publishers: {bookList[currBook!].publishers}</p>
                            <p>ISBN10: {bookList[currBook!].isbn10}</p>
                            <p>ISBN13: {bookList[currBook!].isbn13}</p>
                        </div>
                        <button onClick={() => setIsVisible(false)} className='close-modal'><img src="./close.png" alt=""/></button>
                        <button disabled={isFavorite} onClick={handleFavoriteClick} className='add-favorite'>
                            { isFavorite ? 'Уже в избранном' : 'Добавить в избранное'}
                        </button>
                    </div>
                    <p className='description'>{bookList[currBook!].description}</p>
                </div>
                : false
            }
        </div>
    );
};

export default SelectedBook;