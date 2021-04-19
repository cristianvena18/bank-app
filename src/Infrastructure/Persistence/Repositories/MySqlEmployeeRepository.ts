import { Employee } from "../../../Domain/Entities/Employee";
import { EmployeeRepository } from "../../../Domain/Interfaces/Repositories/EmployeeRepository";
import MySqlBaseRepository from "./MysqlBaseRepository";
import { EmployeeModel } from "../Mappings/Employee";
import { injectable } from "inversify";

@injectable()
export default class MySqlEmployeeRepository
  extends MySqlBaseRepository<Employee>
  implements EmployeeRepository {
  public constructor() {
    super();
  }

  public async persist(employee: Employee): Promise<void> {
    this.initialize(EmployeeModel);
    await this.save(employee);
  }

  public async findOneById(id: string): Promise<Employee> {
    this.initialize(EmployeeModel);
    const data = await this.repository.findOne(id);
    if (data) {
      return Employee.fromPrimitives(data);
    }

    return undefined;
  }

  public async findAll(page: number, size: number): Promise<Employee[]> {
    this.initialize(EmployeeModel);
    return await this.repository.find({ take: size, skip: page });
  }

  public async delete(employee: Employee): Promise<void> {
    this.initialize(EmployeeModel);
    await this.repository.remove(employee);
  }
}
