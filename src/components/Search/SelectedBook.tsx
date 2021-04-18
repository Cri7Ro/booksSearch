import React, { useLayoutEffect, useState } from 'react';
import {Iinfo} from './interfaces';

const SelectedBook: React.FC<Iinfo> = ({setIsVisible, currBook, bookList}) => {
    return (
        <div className='selected-book' onClick={e => setIsVisible(false)}>
            {
                bookList ? 
                <div className='modal' onClick={e => e.stopPropagation()}>
                    <div className='selected-book-content'>
                        <img src={bookList[currBook!].coverM} alt=""/>
                        <div>
                            <p>Author: {bookList[currBook!].title}</p>
                            <p>Title: {bookList[currBook!].author}</p>
                            <p>Publish date: {bookList[currBook!].publish_date}</p>
                            <p>Publishers: {bookList[currBook!].publishers}</p>
                            <p>ISBN10: {bookList[currBook!].isbn10}</p>
                            <p>ISBN13: {bookList[currBook!].isbn13}</p>
                        </div>
                        <button onClick={() => setIsVisible(false)}><img src="./close.png" alt=""/></button>
                    </div>
                    <p className='description'>{bookList[currBook!].description}</p>
                </div>
                : false
            }
        </div>
    );
};

export default SelectedBook;