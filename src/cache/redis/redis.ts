import Redis from "ioredis";
import config from "../../config";
import { IGuildCache } from "../../structure";

class RedisInstance {
	readonly client: Redis.Redis;

	constructor() {
		this.client = new Redis({ port: config.cache.PORT, host: config.cache.HOST });
	}

	async get(key: string): Promise<IGuildCache | null> {
		const guildFromCache = await this.client.get(key);

		return guildFromCache ? (JSON.parse(guildFromCache) as IGuildCache) : null;
	}

	async set(key: string, value: any, timeExp: number): Promise<string | null> {
		return this.client.set(key, JSON.stringify(value), "EX", timeExp);
	}

	async del(key: string): Promise<number> {
		return this.client.del(key);
	}

	async delPrefix(prefix: string): Promise<number> {
		const keys = (await this.client.keys(`cache:${prefix}:*`)).map((key: string) => key.replace("cache:", ""));

		return this.client.del(keys);
	}
}

export default RedisInstance;
