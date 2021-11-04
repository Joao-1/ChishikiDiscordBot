import getEnv from '../utils/getEnv';

require('dotenv').config({
    path: getEnv(),
});

export default {
    clientId: process.env.CLIENT_ID,
    token: process.env.BOT_TOKEN,
    apiURL: process.env.URL_API,
    botPrefix: 'c!'
};
