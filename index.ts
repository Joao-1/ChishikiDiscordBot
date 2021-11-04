import { SlashCommandsRest } from './src/types/types.d';
import { Intents } from 'discord.js';
import Bot from './src/bot';
import config from './src/config/config';
import axios from 'axios';
import ChishikiAPI from './src/APIs/chishikiAPi';
import { SlashCommandsInAGuild, SlashCommandsGlobally } from './src/helpers/slashCommandsRestMethods';

if (!config.token || !config.clientId) throw new Error('Missing Token or ClientId');

const intents = { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] };
const chishikiAPI = new ChishikiAPI();
let slashCommandsMethods: SlashCommandsRest;

(process.env.NODE_ENV as string).trim() === 'dev' ?
    slashCommandsMethods = new SlashCommandsInAGuild(config.clientId, config.token)
    :
    slashCommandsMethods = new SlashCommandsGlobally(config.clientId, config.token);

const bot = new Bot(intents, chishikiAPI, slashCommandsMethods);

(async () => {
    await axios.get(`${config.apiURL}/ping`)
        .then((response) => {
            if (response.status !== 200) throw new Error('Could not connect with API');
            console.log('Successfully connected to API');
        }).catch((requestError) => {
            console.log(requestError)
            throw new Error(requestError);
        });
        
    await bot.start({ clientId: config.clientId!, token: config.token! });
})();

export default bot;