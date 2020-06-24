import React, { useState, ChangeEvent } from 'react';
import { shuffle } from 'lodash';
import data from '../data.json';

const Gallery = () => {
    const [ isRandom, setIsRandom ] = useState<boolean>(false);
    let order = data.map(account => account.screen_name.toLowerCase());
    const handleIsRandomChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsRandom(e.target.checked);
    };
    if (isRandom) order = shuffle(order);
    const tiles = order.map(name => (
        <li>
            <img src={`icons/${name}.jpg`} />
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
