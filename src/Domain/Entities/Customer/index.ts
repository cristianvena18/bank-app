import { AggregateRoot } from "../../ValueObjects/AggregateRoot";
import { CustomerId } from "./CustomerId";
import { CustomerName } from "./CustomerName";
import { CustomerSurname } from "./CustomerSurname";
import { CustomerEmail } from "./CustomerEmail";
import { Account } from "../Account";

export class Customer extends AggregateRoot {
  private id: CustomerId;
  private name: CustomerName;
  private surname: CustomerSurname;
  private email: CustomerEmail;
  private accounts: Account[];

  private constructor(
    id: CustomerId,
    name: CustomerName,
    surname: CustomerSurname,
    email: CustomerEmail
  ) {
    super();
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.accounts = [];
  }

  public getId() {
    return this.id;
  }

  public getAccounts(): Account[] {
    return this.accounts;
  }

  private addAccount(account: Account) {
    this.accounts.push(account);
  }

  public static fromPrimitives(data: any) {
    const customer = new Customer(
      new CustomerId(data.id),
      new CustomerName(data.name),
      new CustomerSurname(data.surname),
      new CustomerEmail(data.email)
    );

    if (data.accounts && data.accounts.length) {
      data.accounts.forEach((account) => {
        const copyWithoutAccounts = data;
        delete copyWithoutAccounts.accounts;
        customer.addAccount(
          Account.fromPrimitives({ ...account, customer: copyWithoutAccounts })
        );
      });
    }

    return customer;
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      surname: this.surname.value,
      email: this.email.value,
    };
  }
}
