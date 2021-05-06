export interface CacheService {
  deleteKey(key: string): Promise<number>;
  getString(key: string): Promise<string | number | null>;
  incrementCount(key: string): Promise<number>;
  incrementCountBy(key: string, increment: number): Promise<number>;
  setString(key: string, value: string): Promise<any>;

  addToSet(
    key: string,
    member: string | number,
    ...members: (string | number)[]
  ): Promise<number>;
  removeFromSet(
    key: string,
    member: string | number,
    ...members: (string | number)[]
  ): Promise<number>;
  getAllMembersFromSet(key: string): Promise<string[]>;
  getRandomMemberFromSet(key: string, count?: number): any;
  isMemberOfSet(key: string, member: string): Promise<number>;

  deleteHash(key: string, field: string, ...fields: string[]): Promise<number>;
  existsInHash(key: string, field: string): Promise<number>;
  getFromHash(key: string, field: string): Promise<string | null>;
  getAllFromHash(key: string): Promise<{ [propName: string]: string }>;
}
