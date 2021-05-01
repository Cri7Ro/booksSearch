import {get} from '../../interfaces';

export default async function bookRequest(searchDispatch: any, isError: boolean, get: get, userInputTitle: string) {
    searchDispatch({type: 'CLEAR_BOOKLIST'});
    searchDispatch({type: 'SET_LOADER', payload: true});
    searchDispatch({type: 'SET_ERROR', payload: ''});
    console.log(userInputTitle)
    try {
        const data = await get(`http://openlibrary.org/search.json?title=${userInputTitle}`);
        if (data.numFound === 0) throw new Error();
        else data.docs.map(async (e: any, i: number) => {
                if (e.cover_i) {
                    isError = true;
                    try {
                        const fullInfo = await get(`https://openlibrary.org/books/${e.key.slice(7, -1) + 'M.json'}`);
                        const description = await get(`https://openlibrary.org${e.key + '.json'}`);

                        searchDispatch({type: 'SET_BOOKLIST', payload: 
                            {
                                coverS: `http://covers.openlibrary.org/b/id/${e.cover_i}-S.jpg`,
                                coverM: `http://covers.openlibrary.org/b/id/${e.cover_i}-M.jpg`,
                                title: e.title,
                                author: e.author_name,
                                publish_date: fullInfo.publish_date ? fullInfo.publish_date : 'No publication date',
                                isbn10: fullInfo.isbn_10 ? fullInfo.isbn_10 : 'No ISBN10',
                                isbn13: fullInfo.isbn_13 ? fullInfo.isbn_13 : 'No ISBN13',
                                publishers: fullInfo.publishers ? fullInfo.publishers : 'No publishers',
                                description: description.description ? 
                                                typeof description.description === 'string' ? description.description : description.description.value 
                                            : 'No description'
                            }});
                    } catch (err) {
                        console.log('Error ' + err);
                    }
                }
            })
    } catch (err) {
        console.log('Error' + err)
    } finally {
        searchDispatch({type: 'SET_LOADER', payload: false});
        if (!isError) searchDispatch({type: 'SET_ERROR', payload: 'Ничего не найдено'});
    }
};
