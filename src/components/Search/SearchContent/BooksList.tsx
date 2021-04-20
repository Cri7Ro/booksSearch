import React from 'react';
import {IBooksList} from '../../../interfaces';

const BooksList: React.FC<IBooksList> = ({bookList, setIsVisible, setCurrBook}) => {

    function handleClick(li: React.SyntheticEvent<EventTarget>): void {
        if (!(li.target instanceof HTMLElement)) {
            return;
          }
       
        if (bookList) {
            setIsVisible(true);
            setCurrBook(+li.target.dataset.index!)
        }
    };

    return (
        <ul onClick={handleClick}>
            {
                bookList ? bookList.map((e: any, i: number) =>  
                    <li key={i.toString()}  data-index={i}>
                        <img src={e.coverS} alt="" data-index={i}/>  
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