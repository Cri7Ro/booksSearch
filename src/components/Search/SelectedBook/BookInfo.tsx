import React, { useEffect, useRef } from 'react';
import { Iinfo } from '../../../interfaces';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const BookInfo: React.FC<Iinfo> = ({setIsVisible, currBook, isFavorite, handleFavoriteClick}) => {
    const addFavoriteRef = useRef<SVGPathElement | null>(null)
    const searchBooks = useTypedSelector(state => state.search);

    useEffect(() => {
        !isFavorite ? addFavoriteRef.current!.classList.remove('add-favorite') : addFavoriteRef.current!.classList.add('add-favorite');
    }, [isFavorite]);

    return (
        <div className='modal' onClick={e => e.stopPropagation()}>
            <div className='selected-book-content'>
                <img src={searchBooks.bookList![currBook!].coverM} alt=""/>
                <div>
                    <p>Title: {searchBooks.bookList![currBook!].title}</p>
                    <p>Author: {searchBooks.bookList![currBook!].author}</p>
                    <p>Publish date: {searchBooks.bookList![currBook!].publish_date}</p>
                    <p>Publishers: {searchBooks.bookList![currBook!].publishers}</p>
                    <p>ISBN10: {searchBooks.bookList![currBook!].isbn10}</p>
                    <p>ISBN13: {searchBooks.bookList![currBook!].isbn13}</p>
                </div>
                <button onClick={() => setIsVisible(false)} className='close-modal'><img src="./img/close.png" alt=""/></button>
                <button disabled={isFavorite} onClick={handleFavoriteClick} className='add-favorite'>
                    <svg width="25px" height='36px' >
                        <path ref={addFavoriteRef} className='favorite-icon' d='M 25 0 L 0 0 L 0 35 L 13 24 L 25 35 L 25 0'/>
                    </svg>
                </button>
            </div>
            <p className='description'>{searchBooks.bookList![currBook!].description}</p>
        </div>
    );
}

export default BookInfo;