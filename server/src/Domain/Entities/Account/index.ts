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
import { AccountOpened } from "../../Events/AccountOpened";
import { Uuid } from "../../ValueObjects/Uuid";
import { AmountSubstracted } from "../../Events/AmountSubstracted";
import { AmountAdded } from "../../Events/AmountAdded";

export class Account extends AggregateRoot {
  private id: AccountUuid;
  private number: AccountNumber;
  private type: AccountType;
  private status: AccountStatus;
  private balance: Money;
  private currency: Currency;
  private customer: Customer;
  private employee: Employee;
  private branch: Branch;

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
      new Money(parseInt(data.balance), currency),
      data.customer ? Customer.fromPrimitives(data.customer) : undefined,
      data.employee ? Employee.fromPrimitives(data.employee) : undefined,
      data.branch ? Branch.fromPrimitives(data.branch) : undefined
    );
  }

  getId() {
    return this.id;
  }

  getNumber() {
    return this.number;
  }

  getType() {
    return this.type;
  }

  getStatus() {
    return this.status;
  }

  getBalance() {
    return this.balance;
  }

  getCurrency() {
    return this.currency;
  }

  public haveBalance(amount: Money) {
    return this.balance.isGreaterThanOrEquals(amount);
  }

  public isAvailable() {
    return this.status.value === AccountStatus.ACCOUNT_STATUS.OPEN;
  }

  public substract(amount: Money) {
    this.balance = this.balance.substract(amount);
    this.record(new AmountSubstracted(amount, this.id, this.number));
  }

  public add(amount: Money) {
    this.balance = this.balance.add(amount);
    this.record(new AmountAdded(amount, this.id, this.number));
  }

  static create(
    type: string,
    currency: string,
    customer: Customer,
    branch: Branch,
    employee: Employee
  ) {
    const id = new AccountUuid(AccountUuid.random().value);
    const account = new Account(
      id,
      new AccountNumber(""), // TODO: generate account number
      new AccountType(type),
      new AccountStatus(AccountStatus.ACCOUNT_STATUS.OPEN),
      new Currency(currency),
      new Money(0, new Currency(currency)),
      customer,
      employee,
      branch
    );

    account.record(
      new AccountOpened({
        accountId: id.toString(),
        eventId: Uuid.random().value,
        occurredOn: new Date(),
      })
    );

    return account;
  }

  public getEmployee() {
    return this.employee;
  }

  public getBranch() {
    return this.branch;
  }
}
