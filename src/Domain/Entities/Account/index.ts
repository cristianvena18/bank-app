import { Branch } from "../Branch";
import { Customer } from "../Customer";
import { Employee } from "../Employee";
import { Money } from "../../ValueObjects/Money";
import { Currency } from "../../ValueObjects/Currency";
import { AccountUuid } from "./AccountUuid";
import { AccountNumber } from "./AccountNumber";
import { AggregateRoot } from "../../ValueObjects/AggregateRoot";
import { AccountType } from "./AccountType";
import { AccountStatus } from "./AccountStatus";

export class Account extends AggregateRoot {
  private id: AccountUuid;
  private number: AccountNumber;
  private type: AccountType;
  private status: AccountStatus;
  private balance: Money;
  private currency: Currency;
  public customer: Customer;
  public employee: Employee;
  public branch: Branch;

  private constructor(
    id: AccountUuid,
    number: AccountNumber,
    type: AccountType,
    status: AccountStatus,
    currency: Currency,
    balance: Money,
    customer: Customer,
    employee: Employee,
    branch: Branch
  ) {
    super();
    this.id = id;
    this.number = number;
    this.balance = balance;
    this.type = type;
    this.status = status;
    this.currency = currency;
    this.customer = customer;
    this.employee = employee;
    this.branch = branch;
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      number: this.number.value,
      type: this.type.value,
      status: this.status.value,
      balance: this.balance.getAmount(),
      currency: this.currency.value,
      customer: this.customer.getId().value,
      employee: this.employee.getId().value,
      branch: this.branch.getId().value,
    };
  }

  public static fromPrimitives(data: any) {
    const currency = new Currency(data.currency);
    return new Account(
      new AccountUuid(data.id),
      new AccountNumber(data.number),
      new AccountType(data.type),
      new AccountStatus(data.status),
      currency,
      new Money(data.balance, currency),
      Customer.fromPrimitives(data.customer),
      Employee.fromPrimitives(data.employee),
      Branch.fromPrimitives(data.branch)
    );
  }

  getRelations(): string[] {
    return ["customer", "employee", "branch"];
  }

  getId() {
    return this.id;
  }

  static create(
    type: string,
    currency: string,
    customer: Customer,
    branch: Branch,
    employee: Employee
  ) {
    return new Account(
      new AccountUuid(AccountUuid.random().value),
      new AccountNumber(""), // TODO: generate account number
      new AccountType(type),
      new AccountStatus(AccountStatus.ACCOUNT_STATUS.OPEN),
      new Currency(currency),
      new Money(0, new Currency(currency)),
      customer,
      employee,
      branch
    );
  }
}
