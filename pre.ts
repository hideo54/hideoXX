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
    protected: boolean;
    followers_count: number;
    friends_count: number;
    statuses_count: number;
    profile_image_url_https: string;
}

const jobPerUser = async (user: TwitterUser) => {
    const iconUrl = user.profile_image_url_https;
    const originalIconUrl = iconUrl.replace('_normal', '');
    const res = await axios.get(originalIconUrl, {
        responseType: 'arraybuffer',
    });
    await fs.writeFile(`icons/${user.screen_name}.jpg`, res.data, 'binary');
};

const numbers = range(10, 100);

(async () => {
    const users = await twitter.get('users/lookup', {
        screen_name: numbers.map(num => `hideo${num}`).join(',')
    }) as TwitterUser[];
    for (const user of users) {
        await jobPerUser(user);
    }
})();