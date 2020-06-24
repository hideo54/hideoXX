import React, { useState } from 'react';
import { shuffle } from 'lodash';
import data from '../data.json';

const Gallery = () => {
    const textTypes = [ 'followerCount', 'profile', 'latestTweet' ] as const;
    type TextType = typeof textTypes[number];
    const [ isRandom, setIsRandom ] = useState<boolean>(false);
    const [ textType, setTextType ] = useState<TextType | null>('latestTweet');
    const accounts = isRandom ? shuffle(data) : data;
    const tiles = accounts.map(account => {
        let text: string | null = null;
        switch (textType) {
            case 'followerCount':
                text = account.followersCount.toString();
                break;
            case 'profile':
                text = account.profile;
                break;
            case 'latestTweet':
                text = account.latestTweet || null;
                break;
        }
        return (
            <li className='tile'>
                <a href={`https://twitter.com/${account.screenName}`} target='_blank' rel='noopener' >
                    <img src={`icons/${account.screenName.toLowerCase()}.jpg`} />
                    <p className={textType === 'followerCount' ? 'follower-count' : undefined}>{text}</p>
                </a>
            </li>
        );
    });
    return (
        <>
            <div id='controls'>
                <div id='text-types'>
                    <span className='text-type'>
                        <input type='radio'
                            id='null'
                            name='null'
                            checked={textType === null}
                            onChange={() => {setTextType(null)}}
                        />
                        <label htmlFor='null'>None</label>
                    </span>
                    <span className='text-type'>
                        <input type='radio'
                            id='follower-count'
                            name='follower-count'
                            checked={textType === 'followerCount'}
                            onChange={() => {setTextType('followerCount')}}
                        />
                        <label htmlFor='follower-count'>Follower Count</label>
                    </span>
                    <span className='text-type'>
                        <input type='radio'
                            id='profile'
                            name='profile'
                            checked={textType === 'profile'}
                            onChange={() => {setTextType('profile')}}
                        />
                        <label htmlFor='profile'>Profile</label>
                    </span>
                    <span className='text-type'>
                        <input type='radio'
                            id='latest-tweet'
                            name='latest-tweet'
                            checked={textType === 'latestTweet'}
                            onChange={() => {setTextType('latestTweet')}}
                        />
                        <label htmlFor='latest-tweet'>Latest Tweet</label>
                    </span>
                </div>
                <div id='is-random-block'>
                    <input type='checkbox'
                        name='is-random'
                        id='is-random'
                        checked={isRandom}
                        onChange={() => {setIsRandom(!isRandom)}}
                    />
                    <label htmlFor='is-random'>Shuffle</label>
                </div>
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
                <p>Find your favorite hideo!</p>
            </header>
            <Gallery />
        </>
    );
};

export default App;
