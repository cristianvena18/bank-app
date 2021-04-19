import { Employee } from "../../Entities/Employee";

export interface EmployeeRepository {
  persist(employee: Employee): Promise<void>;
  findOneById(id: string): Promise<Employee>;
  findAll(page: number, size: number): Promise<Employee[]>;
  delete(employee: Employee): Promise<void>;
}
