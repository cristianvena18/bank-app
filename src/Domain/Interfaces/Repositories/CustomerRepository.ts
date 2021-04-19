import { Customer } from "../../Entities/Customer";

export interface CustomerRepository {
  persist(customer: Customer): Promise<void>;
  findOneById(id: string): Promise<Customer>;
  findAll(page: number, size: number): Promise<Customer[]>;
  delete(customer: Customer): Promise<void>;
}
