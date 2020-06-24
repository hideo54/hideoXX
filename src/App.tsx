import React, { useState, ChangeEvent } from 'react';
import { shuffle } from 'lodash';
import data from '../data.json';

const Gallery = () => {
    const [ isRandom, setIsRandom ] = useState<boolean>(false);
    const handleIsRandomChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsRandom(e.target.checked);
    };
    const accounts = isRandom ? shuffle(data) : data;
    const tiles = accounts.map(account => (
        <li className='tile'>
            <img src={`icons/${account.screen_name.toLowerCase()}.jpg`} />
            <p>{account.status?.text}</p>
        </li>
    ));
    return (
        <>
            <div id='controls'>
                <input type='checkbox'
                    id='is-random'
                    name='is-random'
                    checked={isRandom}
                    onChange={handleIsRandomChange}
                />
                <label htmlFor='is-random'>Shuffle</label>
            </div>
            <ul className='gallary'>
                {tiles}
            </ul>
        </>
    );
};

const App = () => {
    return (
        <>
            <header>
                <h1>hideoXX</h1>
                <p>Find your favorite hideoXX!</p>
            </header>
            <Gallery />
        </>
    );
};

export default App;
