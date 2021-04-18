import React from 'react';

const Header: React.FC = () => {
    return (
        <header className='header-container'>
            <nav className='navigation'>
                <ul className='nav-links'>
                    <li className='nav-search'><a href="">Поиск</a></li>
                    <li className='nav-favorites'><a href="">Избранное</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;