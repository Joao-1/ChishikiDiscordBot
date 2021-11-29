import Redis from "ioredis";
import { IGuildCache } from "../types/types.d";

class Cache {
	private redis;

	constructor() {
		this.redis = new Redis({
			port: (process.env.REDIS_PORT as unknown as number) || 6379, // Redis port
			host: process.env.REDIS_HOST || "127.0.0.1", // Redis host
			// password: processs.env.REDIS_PASSWORD,
			keyPrefix: "cache:",
		});
	}

	async get(key: string): Promise<IGuildCache | null> {
		const guildFromCache = await this.redis.get(key);

		return guildFromCache ? (JSON.parse(guildFromCache) as IGuildCache) : null;
	}

	set(key: string, value: unknown, timeExp: number): Promise<"OK" | null> {
		return this.redis.set(key, JSON.stringify(value), "EX", timeExp);
	}

	del(key: string): Promise<number> {
		return this.redis.del(key);
	}

	async delPrefix(prefix: string): Promise<number> {
		const keys = (await this.redis.keys(`cache:${prefix}:*`)).map((key) => key.replace("cache:", ""));

		return this.redis.del(keys);
	}
}

export default Cache;
