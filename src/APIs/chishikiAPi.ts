import { botAPI, IGuild } from './../types/types.d';
import axios from 'axios';
import config from '../config/config';

class ChishikiAPI implements botAPI {
    async getAllGuilds() {
        const guilds = await axios.get(`${config.apiURL}/guild`);

        return guilds ? guilds.data.guilds : null;
    }

    async registerGuild(guildId: string) {
        const newGuild = await axios.post(`${config.apiURL}/guild`, {id: guildId});
        if (!newGuild.data) throw new Error('It was not possible to register a new guild');
        return newGuild.data as unknown as IGuild;
    }
}

export default ChishikiAPI;