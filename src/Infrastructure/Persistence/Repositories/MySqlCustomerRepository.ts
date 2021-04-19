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
    const data = await this.repository.findOne(id);
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
