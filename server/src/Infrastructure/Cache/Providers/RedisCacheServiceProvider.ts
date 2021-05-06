import { CacheService } from "../../../Domain/Interfaces/Services/CacheService";
import { CacheConnection } from "../Connection/RedisConnection";

export class RedisCacheServiceProvider implements CacheService {
  private connection: CacheConnection;
  public constructor(redisConnection: CacheConnection) {
    this.connection = redisConnection;
  }

  public async deleteKey(key: string): Promise<number> {
    return await this.connection.del(key);
  }
  public async getString(key: string): Promise<string | number | null> {
    return await this.connection.get(key);
  }
  public async incrementCount(key: string): Promise<number> {
    return await this.connection.incr(key);
  }
  public async incrementCountBy(
    key: string,
    increment: number
  ): Promise<number> {
    return await this.connection.incrby(key, increment);
  }
  public async setString(key: string, value: string): Promise<any> {
    return await this.connection.set(key, value, "ex", 100000);
  }
  public async addToSet(
    key: string,
    member: string | number,
    ...members: (string | number)[]
  ): Promise<number> {
    return await this.connection.sadd(key, member, ...members);
  }
  public async removeFromSet(
    key: string,
    member: string | number,
    ...members: (string | number)[]
  ): Promise<number> {
    return await this.connection.srem(key, member, ...members);
  }
  public async getAllMembersFromSet(key: string): Promise<string[]> {
    return await this.connection.smembers(key);
  }
  public async getRandomMemberFromSet(
    key: string,
    count?: number
  ): Promise<any> {
    return await this.connection.srandmember(key, count);
  }
  public async isMemberOfSet(key: string, member: string): Promise<number> {
    return await this.connection.sismember(key, member);
  }

  public async deleteHash(
    key: string,
    field: string,
    ...fields: string[]
  ): Promise<number> {
    return await this.connection.hdel(key, field, ...fields);
  }
  public async existsInHash(key: string, field: string): Promise<number> {
    return await this.connection.hexists(key, field);
  }
  public async getFromHash(key: string, field: string): Promise<string | null> {
    return await this.connection.hget(key, field);
  }
  public async getAllFromHash(
    key: string
  ): Promise<{ [propName: string]: string }> {
    return await this.connection.hgetall(key);
  }
}
