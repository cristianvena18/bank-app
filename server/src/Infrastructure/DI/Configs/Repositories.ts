import { ContainerBuilder } from "node-dependency-injection";
import MySqlCustomerRepository from "../../Persistence/Repositories/MySqlCustomerRepository";
import MysqlAccountRepository from "../../Persistence/Repositories/MysqlAccountRepository";
import MySqlBranchRepository from "../../Persistence/Repositories/MySqlBranchRepository";
import MySqlEmployeeRepository from "../../Persistence/Repositories/MySqlEmployeeRepository";
import { MysqlBankRepository } from "../../Persistence/Repositories/MysqlBankRepository";
import { MysqlTransferRepository } from "../../Persistence/Repositories/MysqlTransferRepository";

export const registerRepositories = (container: ContainerBuilder) => {
  container.register("Repositories.customer", MySqlCustomerRepository);
  container.register("Repositories.account", MysqlAccountRepository);
  container.register("Repositories.branch", MySqlBranchRepository);
  container.register("Repositories.employee", MySqlEmployeeRepository);
  container.register("Repositories.bank", MysqlBankRepository);
  container.register('Repositories.transfer', MysqlTransferRepository);

  return container;
};
