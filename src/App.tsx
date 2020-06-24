import React from 'react';
import data from '../data.json';

const App = () => {
    const tiles = data.map(account => (
        <li>
            <img src={`icons/${account.screen_name.toLowerCase()}.jpg`} />
        </li>
    ));
    return (
        <>
            <header>
                <h1>hideoXX</h1>
                <p>Find your favorite hideoXX!</p>
            </header>
            <ul className='gallary'>
                {tiles}
            </ul>
        </>
    );
};

export default App;
