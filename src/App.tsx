import React, { useEffect, useState } from 'react';


function App() {
  const [bookList, setBookList] = useState<Array<Object> | null>(null); 
  const [userInputTitle, setUserInputTitle] = useState<string>('');
  
  const [cover, setCover] = useState<JSX.Element>();
  const [bookTitle, setBookTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  useEffect(() => {
    if (bookList) {
      setBookList([...bookList, {
          cover: <img src={`http://covers.openlibrary.org/b/id/${cover}-S.jpg`} alt=""/> , 
          title: bookTitle,
          author: author
        }
      ]);
    } else if (cover) setBookList([{
        cover: <img src={`http://covers.openlibrary.org/b/id/${cover}-S.jpg`} alt=""/> , 
        title: bookTitle,
        author: author
    }]);
  }, [cover]);

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    fetch(`http://openlibrary.org/search.json?title=${userInputTitle}`)
      .then(response => response.json())
      .then(data => data.docs.map((e: any, i: number) => {
          if (e.cover_i) {
            setBookTitle(e.title);
            setAuthor(e.author_name);
            setCover(e.cover_i);
          };
        })
      );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={userInputTitle} onChange={e => setUserInputTitle(e.target.value)}/>
      <ul>
        {
          bookList ? bookList.map((e: any, i: number) =>  
              <li key={i.toString()}>
                {e.cover}
                <p>{e.title}</p>
                <p>{e.author}</p>
              </li> 
            ) 
          : false
        }
      </ul>
      <input type="submit"/>
    </form>
  );
}

export default App;
