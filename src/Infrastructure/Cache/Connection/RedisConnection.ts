export interface CacheConnection {
  del(key: string): Promise<number>;
  get(key: string): Promise<string | number | null>;
  incr(key: string): Promise<number>;
  incrby(key: string, increment: number): Promise<number>;
  set(key: string, value: string, type?: string, ttl?: number): Promise<any>;
  sadd(
    key: string,
    member: string | number,
    ...param3: (string | number)[]
  ): Promise<number>;
  srem(
    key: string,
    member: string | number,
    ...param3: (string | number)[]
  ): Promise<number>;
  smembers(key: string): Promise<string[]>;
  srandmember(key: string, count: number): Promise<any>;
  sismember(key: string, member: string): Promise<number>;
  hdel(key: string, field: string, ...strings: string[]): Promise<number>;
  hexists(key: string, field: string): Promise<number>;
  hget(key: string, field: string): Promise<string | null>;
  hgetall(key: string): Promise<{ [p: string]: string }>;
}
