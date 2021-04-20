import React from 'react';
import { Iinfo } from '../../../interfaces';


const BookInfo: React.FC<Iinfo> = ({setIsVisible, currBook, bookList, isFavorite, handleFavoriteClick}) => {
    return (
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
    );
}

export default BookInfo;