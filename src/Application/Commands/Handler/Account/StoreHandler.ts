import StoreCommand from "../../../Commands/Command/Account/StoreCommand";
import { injectable, inject } from "inversify";
import { INTERFACES } from "../../../../Infrastructure/DI/interfaces.types";
import { AccountRepository } from "../../../../Domain/Interfaces/Repositories/AccountRepository";
import { Account } from "../../../../Domain/Entities/Account";
import EntityNotFoundException from "../../../Exceptions/EntityNotFoundException";
import { CustomerRepository } from "../../../../Domain/Interfaces/Repositories/CustomerRepository";
import { BranchRepository } from "../../../../Domain/Interfaces/Repositories/BranchRepository";
import { EmployeeRepository } from "../../../../Domain/Interfaces/Repositories/EmployeeRepository";
import { EventBus } from "../../../../Domain/Interfaces/EventBus";

@injectable()
class StoreHandler {
  private accountRepository: AccountRepository;
  private customerRepository: CustomerRepository;
  private branchRepository: BranchRepository;
  private employeeRepository: EmployeeRepository;
  private eventBus: EventBus;

  public constructor(
    @inject(INTERFACES.AccountRepository) accountRepository: AccountRepository,
    @inject(INTERFACES.CustomerRepository)
    customerRepository: CustomerRepository,
    @inject(INTERFACES.BranchRepository) branchRepository: BranchRepository,
    @inject(INTERFACES.EmployeeRepository)
    employeeRepository: EmployeeRepository,
    @inject(INTERFACES.EventBus) eventBus: EventBus
  ) {
    this.accountRepository = accountRepository;
    this.customerRepository = customerRepository;
    this.branchRepository = branchRepository;
    this.employeeRepository = employeeRepository;
    this.eventBus = eventBus;
  }

  /**
   * Execute the given command
   *
   * @return void
   */
  public async execute(command: StoreCommand): Promise<void> {
    const customer = await this.customerRepository.findOneById(
      command.getCustomerId()
    );

    if (!customer) {
      throw new EntityNotFoundException("default", "Customer not found");
    }

    const branch = await this.branchRepository.findOneById(
      command.getBranchId()
    );

    if (!branch) {
      throw new EntityNotFoundException("default", "Branch not found");
    }

    const employee = await this.employeeRepository.findOneById(
      command.getEmployeeId()
    );

    if (!employee) {
      throw new EntityNotFoundException("default", "Employee not found");
    }

    const account = Account.create(
      command.getType(),
      command.getCurrency(),
      customer,
      branch,
      employee
    );

    await this.accountRepository.persist(account);

    await this.eventBus.publish(account.pullDomainEvents());
  }
}

export default StoreHandler;
