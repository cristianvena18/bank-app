import RedisClient from "ioredis";
import { CacheConnection } from "./RedisConnection";

export class Connection extends RedisClient implements CacheConnection {}
