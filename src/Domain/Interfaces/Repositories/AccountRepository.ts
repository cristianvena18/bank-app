import { Account } from "../../Entities/Account";
import { Criteria } from "../../ValueObjects/Criteria/Criteria";

export interface AccountRepository {
  findOneById(id: string): Promise<Account>;
  persist(account: Account): Promise<void>;
  remove(account: Account): Promise<void>;
  findByCustomerId(id: string): Promise<Account[]>;
  findAllByStatus(criteria: Criteria): Promise<Account[]>;
}
