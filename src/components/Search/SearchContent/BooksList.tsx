import React from 'react';
import {IBooksList} from '../../../interfaces';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const BooksList: React.FC<IBooksList> = ({setIsVisible, setCurrBook}) => {

    const searchBooks = useTypedSelector(state => state.search);

    function handleClick(li: React.SyntheticEvent<EventTarget>): void {
        if (!(li.target instanceof HTMLImageElement || li.target instanceof HTMLParagraphElement)) {
            return;
          }
       
        if (searchBooks.bookList) {
            setIsVisible(true);
            setCurrBook(+li.target.dataset.index!)
        }
    };

    return (
        <ul onClick={handleClick}>
            {
                searchBooks.bookList ? searchBooks.bookList.map((e: any, i: number) =>  
                    <li key={i.toString()}  data-index={i}>
                        <img src={e.coverS} alt="" data-index={i} className='snippet-img'/>  
                        <div className='snippet-text'>
                            <p data-index={i}>Title: {e.title}</p>
                            <p data-index={i}>Author: {e.author}</p>
                        </div>
                    </li> 
                ) 
                : null
            }
        </ul>
    );
};

export default BooksList;