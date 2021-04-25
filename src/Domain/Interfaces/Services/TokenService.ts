import { Uuid } from "../../ValueObjects/Uuid";

export class TokenPayload {
  private userId: Uuid;
  private roles: string[];

  private constructor(userId: Uuid, roles: string[]) {
    this.userId = userId;
    this.roles = roles;
  }

  public static fromPrimitives(data: { userId: string; roles: string[] }) {
    return new TokenPayload(new Uuid(data.userId), data.roles);
  }

  public toPrimitives(): any {
    return {
      userId: this.userId.value,
      roles: this.roles,
    };
  }
}

export interface TokenService {
  getInfoOfHash(hash: string): TokenPayload;
  encrypt(payload: TokenPayload): string;
}
