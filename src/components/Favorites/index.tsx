import React, { useEffect, useState } from 'react';
import SelectedBook from '../Search/SelectedBook';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import SelectedFavoriteBook from './SelectedFavoriteBook';

const FavoriteBooks: React.FC = () => {
    const dispatchFavorites = useDispatch();
    const favoriteBooks = useTypedSelector(state => state.books);
    
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [currFavoriteBook, setCurrFavoriteBook] = useState<number | null>(null);

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(favoriteBooks.books));
    }, [favoriteBooks])

    function handleDeleteClick(event: React.SyntheticEvent) {
        if (event.target instanceof HTMLElement) {
            dispatchFavorites({type:'DELETE_FAVORITE_BOOK', payload: +event.target.dataset.index!})
        }     
    };

    function handleInfoClick(li: React.SyntheticEvent<EventTarget>): void {
        if (!(li.target instanceof HTMLImageElement || li.target instanceof HTMLParagraphElement)) {
            return;
        }
        setCurrFavoriteBook(+li.target.dataset.index!)   
        setIsVisible(true);
    };

    return (
        <section className='favorites'>
            <ul className='books' onClick={handleInfoClick}>
                {
                    !(favoriteBooks.books.length === 0) ? favoriteBooks.books.map((e: any, i: number) => 
                                <li key={i.toString()} className='favorite-item' data-index={i}>
                                    <div className='favorite-item-content' data-index={i}>
                                        <img src={e.coverS} alt="" data-index={i} className='snippet-img'/>  
                                        <div className='snippet-text' data-index={i}>
                                            <p data-index={i}>Title: {e.title}</p>
                                            <p data-index={i}>Author: {e.author}</p>
                                        </div>
                                    </div>
                                    <div className='delete-container' onClick={e => e.stopPropagation()}>
                                        <button data-index={i} onClick={handleDeleteClick} className='delete-button'><img src="./img/delete.png" alt=""/></button>
                                        <p>Убрать из избранного</p>
                                    </div>
                                </li>
                    )
                    : <p>Список избранных пуст</p>  
                }
            </ul>
            {isVisible ? <SelectedFavoriteBook currBook={currFavoriteBook} setIsVisible={setIsVisible}/> : null}
        </section>
    );
};

export default FavoriteBooks;