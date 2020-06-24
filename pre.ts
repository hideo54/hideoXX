import Twitter from 'twitter';
import axios from 'axios';
import { range } from 'lodash';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const twitter = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY!,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY!,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

// https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object
interface TwitterStatus {
    created_at: string;
    id_str: string;
    text: string;
}

// https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/user-object
interface TwitterUser {
    name: string;
    screen_name: string;
    description: string;
    protected: boolean;
    followers_count: number;
    friends_count: number;
    statuses_count: number;
    profile_image_url_https: string;
    status?: TwitterStatus;
}

const numbers = range(10, 100);

(async () => {
    const users = await twitter.get('users/lookup', {
        screen_name: numbers.map(num => `hideo${num}`).join(',')
    }) as TwitterUser[];
    const savedData = users.map((user: TwitterUser) => ({
        screenName: user.screen_name,
        iconImageUrl: user.profile_image_url_https.replace('_normal', ''),
        followersCount: user.followers_count,
        profile: user.description,
        latestTweet: user.status?.text,
    }));
    await fs.writeFile('data.json', JSON.stringify(savedData), 'utf-8');
})();