import React, { useEffect, useState } from 'react';
import {Iinfo} from './interfaces';

const SelectedBook: React.FC<Iinfo> = ({setIsVisible, currBook, bookList}) => {
    useEffect(() => {
        if (bookList) {
            bookList.map(e => {
                fetch(`https://openlibrary.org/books/${e.bookKeyOL}`)
                    .then(response => response.json())
                    .then(data => {
                        data.publish_date ? e.publish_date = data.publish_date : e.publish_date = 'No publication date';
                        data.isbn_10 ? e.isbn10 = data.isbn_10 : e.isbn10 = 'No ISBN10';
                        data.isbn_13 ? e.isbn13 = data.isbn_13: e.isbn13 = 'No ISBN13';
                        data.publishers ? e.publishers = data.publishers : e.publishers = 'No publishers';
                    });
                fetch(`https://openlibrary.org${e.bookKeyW}`)
                    .then(response => response.json())
                    .then(data => {
                        if(data.description) {
                            if (typeof data.description === 'string') {
                                e.description = data.description;
                            } else {
                                e.description = data.description.value;
                            }
                        } else e.description = 'No description';
                    });
                return e;
            });
        }
    }, [bookList]);

    function handleClick(): void {
        setIsVisible(false);
    };

    return (
        <div className='selected-book'>
            {
                bookList ? 
                <>
                    <div className='selected-book-content'>
                        <img src={bookList[currBook!].coverM} alt=""/>
                        <div>
                            <p>{bookList[currBook!].title}</p>
                            <p>{bookList[currBook!].author}</p>
                            <p>{bookList[currBook!].publish_date}</p>
                            <p>{bookList[currBook!].publishers}</p>
                            <p>{bookList[currBook!].isbn10}</p>
                            <p>{bookList[currBook!].isbn13}</p>
                        </div>
                    </div>
                    <p>{bookList[currBook!].description}</p>
                </>
                : false
            }
            <button onClick={handleClick}>close</button>
        </div>
    );
};

export default SelectedBook;