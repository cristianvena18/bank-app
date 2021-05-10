import MySqlBaseRepository from "./MysqlBaseRepository";
import { Account } from "../../../Domain/Entities/Account";
import { AccountRepository } from "../../../Domain/Interfaces/Repositories/AccountRepository";
import { Criteria } from "../../../Domain/ValueObjects/Criteria/Criteria";
import { AccountModel } from "../Mappings/Account";
import { Filters } from "../../../Domain/ValueObjects/Criteria/Filters";
import { Filter } from "../../../Domain/ValueObjects/Criteria/Filter";
import { FilterOperator } from "../../../Domain/ValueObjects/Criteria/FilterOperator";
import { Order } from "../../../Domain/ValueObjects/Criteria/Order";
import { OrderType } from "../../../Domain/ValueObjects/Criteria/OrderType";
import { OrderBy } from "../../../Domain/ValueObjects/Criteria/OrderBy";
import { FilterField } from "../../../Domain/ValueObjects/Criteria/FilterField";
import { FilterValue } from "../../../Domain/ValueObjects/Criteria/FilterValue";
import { injectable } from "inversify";

@injectable()
export default class MysqlAccountRepository
  extends MySqlBaseRepository<Account>
  implements AccountRepository {
  async findAllByStatus(criteria: Criteria): Promise<Account[]> {
    return await this.findByCriteria(criteria, Account.fromPrimitives);
  }

  async findByCustomerId(id: string): Promise<Account[]> {
    this.initialize(AccountModel);

    const criteria = new Criteria(
      new Filters([
        new Filter(
          new FilterField("customer"),
          FilterOperator.equal(),
          new FilterValue(id)
        ),
      ]),
      new Order(new OrderBy("customer"), OrderType.fromValue("asc"))
    );

    return await this.findByCriteria(criteria, Account.fromPrimitives);
  }

  async findOneById(id: string): Promise<Account> {
    this.initialize(AccountModel);
    const data = await this.repository.findOne(id, { relations: ['customer', 'branch', 'employee'] });
    if (data) {
      return Account.fromPrimitives(data);
    }

    return undefined;
  }

  async persist(account: Account): Promise<void> {
    this.initialize(AccountModel);
    await this.save(account);
  }

  async remove(account: Account): Promise<void> {
    this.initialize(AccountModel);
    await this.repository.delete(account.getId().value);
  }
}
