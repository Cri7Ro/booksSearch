import React, { useEffect, useState } from 'react';
import {IBookInfo} from '../../interfaces';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const FavoriteBooks: React.FC = () => {
    const dispatchFavorites = useDispatch();
    const favoriteBooks = useTypedSelector(state => state.books);
    
    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(favoriteBooks.books));
    }, [favoriteBooks])

    function handleDeleteClick(event: React.SyntheticEvent) {
        if (event.target instanceof HTMLElement) {
            dispatchFavorites({type:'DELETE_FAVORITE_BOOK', payload: +event.target.dataset.index!})
        }     
    };

    return (
        <section className='favorites'>
            <ul className='books'>
                {
                    !(favoriteBooks.books.length === 0) ? favoriteBooks.books.map((e: any, i: number) => 
                        <li key={i.toString()}>
                            <img src={e.coverS} alt=""/>  
                            <div className='snippet-text'>
                                <p>Title: {e.title}</p>
                                <p>Author: {e.author}</p>
                            </div>
                            <button data-index={i} onClick={handleDeleteClick}>delete</button>
                        </li>)
                    : <p>Список избранных пуст</p>  
                }
            </ul>
        </section>
    );
};

export default FavoriteBooks;