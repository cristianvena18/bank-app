import MySqlBaseRepository from "./MysqlBaseRepository";
import { Customer } from "../../../Domain/Entities/Customer";
import { CustomerRepository } from "../../../Domain/Interfaces/Repositories/CustomerRepository";
import { CustomerModel } from "../Mappings/Customer";
import { injectable } from "inversify";

@injectable()
export default class MySqlCustomerRepository
  extends MySqlBaseRepository<Customer>
  implements CustomerRepository {
  public constructor() {
    super();
  }

  public async persist(customer: Customer): Promise<void> {
    this.initialize(CustomerModel);
    await this.save(customer);
  }

  public async findOneById(id: string): Promise<Customer> {
    this.initialize(CustomerModel);
    const queryBuilder = this.repository.createQueryBuilder("customer");

    queryBuilder
      .leftJoinAndSelect(
        "customer.accounts",
        "accounts",
        "accounts.customerId = customer.id"
      )
      .leftJoinAndSelect(
        "accounts.employee",
        "employee",
        "accounts.employeeId = employee.id"
      )
      .leftJoinAndSelect(
        "accounts.branch",
        "branch",
        "accounts.branchId = branch.id"
      );

    queryBuilder.andWhere("customer.id = :id", { id });

    const data = await queryBuilder.getOne();

    if (data) {
      return Customer.fromPrimitives(data);
    }
    return undefined;
  }

  public async findAll(page: number, size: number): Promise<Customer[]> {
    this.initialize(CustomerModel);
    return await this.repository.find({ take: size, skip: page });
  }

  public async delete(customer: Customer): Promise<void> {
    this.initialize(CustomerModel);
    await this.repository.remove(customer);
  }
}
