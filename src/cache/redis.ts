import Redis from "ioredis";
import { IGuildCache } from "../structure";

class RedisInstance {
	readonly client: Redis.Redis;

	constructor() {
		this.client = new Redis({
			port: 6379,
			host: "127.0.0.1",
		});
	}

	async get(key: string): Promise<IGuildCache | null> {
		const guildFromCache = await this.client.get(key);

		return guildFromCache ? (JSON.parse(guildFromCache) as IGuildCache) : null;
	}

	set(key: string, value: any, timeExp: number): Promise<string | null> {
		return this.client.set(key, JSON.stringify(value), "EX", timeExp);
	}

	del(key: string): Promise<number> {
		return this.client.del(key);
	}

	async delPrefix(prefix: string): Promise<number> {
		const keys = (await this.client.keys(`cache:${prefix}:*`)).map((key: string) => key.replace("cache:", ""));

		return this.client.del(keys);
	}
}

export default RedisInstance;
