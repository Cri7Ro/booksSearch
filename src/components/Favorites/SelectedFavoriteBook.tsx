import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IFavoriteList } from '../../interfaces';

const SelectedFavoriteBook: React.FC<IFavoriteList> = ({setIsVisible, currBook}) => {

    const favoriteBooks = useTypedSelector(state => state.books);

    return (
        <div className='favorite-modal-container'>
            <div className="favorite-modal">
                <div className='selected-book-content'>
                    <img src={favoriteBooks.books[currBook!].coverM} alt=""/>
                    <div>
                        <p>Title: {favoriteBooks.books[currBook!].title}</p>
                        <p>Author: {favoriteBooks.books[currBook!].author}</p>
                        <p>Publish date: {favoriteBooks.books[currBook!].publish_date}</p>
                        <p>Publishers: {favoriteBooks.books[currBook!].publishers}</p>
                        <p>ISBN10: {favoriteBooks.books[currBook!].isbn10}</p>
                        <p>ISBN13: {favoriteBooks.books[currBook!].isbn13}</p>
                    </div>
                    <button onClick={() => setIsVisible(false)} className='close-modal'><img src="./img/close.png" alt=""/></button>
                </div>
                <p className='description'>{favoriteBooks.books[currBook!].description}</p>
            </div>
        </div>
    )
};

export default SelectedFavoriteBook;