import React from 'react';
import {NavLink} from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className='header-container'>
            <h3 id='logo'>BooksSearch</h3>
            <nav className='navigation'>
                <ul className='nav-links'>
                    <li className='nav-search'>
                        <NavLink to='/' activeStyle={{color: 'yellow'}} exact>Поиск</NavLink>
                    </li>
                    <li className='nav-favorites'>
                        <NavLink to='/favorites' activeStyle={{color: 'yellow'}}>Избранное</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;