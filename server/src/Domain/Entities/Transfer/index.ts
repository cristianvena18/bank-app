import { AggregateRoot } from "../../ValueObjects/AggregateRoot";
import { Money } from "../../ValueObjects/Money";
import { Uuid } from "../../ValueObjects/Uuid";
import { Account } from "../Account";
import { TransferId } from "./TransferId";

export class Transfer extends AggregateRoot {
    private id: TransferId;
    private sourceAccount: Account;
    private destinationAccount: Account;
    private amount: Money;
    private date: Date;
    private constructor(id: TransferId, sourceAccount: Account, destinationAccount: Account, amount: Money, date: Date) {
        super();
        this.id = id;
        this.sourceAccount = sourceAccount;
        this.destinationAccount = destinationAccount;
        this.amount = amount;
        this.date = date;
    }

    public static fromPrimitives(data: any) {
        return new Transfer(
            new TransferId(data.id),
            Account.fromPrimitives(data.sourceAccount),
            Account.fromPrimitives(data.destinationAccount),
            new Money(data.amount, data.currency),
            new Date(data.date)
        )
    }

    public static create(sourceAccount: Account, destinationAccount: Account, amount: Money) {
        return new Transfer(
            new TransferId(Uuid.random().toString()),
            sourceAccount,
            destinationAccount,
            amount,
            new Date()
        );
    }

    public toPrimitives() {
        return {
            id: this.id.value,
            sourceAccount: this.sourceAccount.getId().toString(),
            destinationAccount: this.destinationAccount.getId().toString(),
            amount: this.amount.getAmount(),
            currency: this.amount.getCurrency().toString(),
            date: this.date.toISOString(),
        }
    }

}