import { Bank } from "../../Entities/Bank";

export interface BankRepository {
  findAll(): Promise<Bank[]>;
  persist(bank: Bank): Promise<void>;
}
