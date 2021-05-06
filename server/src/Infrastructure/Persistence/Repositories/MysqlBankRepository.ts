import { BankRepository } from "../../../Domain/Interfaces/Repositories/BankRepository";
import MysqlBaseRepository from "./MysqlBaseRepository";
import { Bank } from "../../../Domain/Entities/Bank";
import { BankModel } from "../Mappings/Bank";

export class MysqlBankRepository
  extends MysqlBaseRepository<Bank>
  implements BankRepository {
  async findAll(): Promise<Bank[]> {
    this.initialize(BankModel);
    const data = await this.repository.find();
    return data.map((d) => Bank.fromPrimitives(d));
  }

  async persist(bank: Bank): Promise<void> {
    this.initialize(BankModel);
    await this.repository.save(bank);
  }
}
