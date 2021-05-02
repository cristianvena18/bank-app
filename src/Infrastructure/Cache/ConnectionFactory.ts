import { CacheConnection } from "./Connection/RedisConnection";
import RedisClient from "ioredis";

export class RedisConnectionFactory {
  public static createConnection(): CacheConnection {
    return new RedisClient({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    });
  }
}
