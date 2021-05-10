import { AccountNumber } from "../Entities/Account/AccountNumber";
import { AccountUuid } from "../Entities/Account/AccountUuid";
import { DomainEvent } from "../Interfaces/EventBus/DomainEvent";
import { Money } from "../ValueObjects/Money";
import { Uuid } from "../ValueObjects/Uuid";

export class AmountAdded extends DomainEvent {
    public static EVENT_NAME = 'amount.added';
    private amount: Money;
    private accountNumber: string;
    public constructor(amount: Money, id: AccountUuid, accountNumber: AccountNumber) {
        super(AmountAdded.EVENT_NAME, id.toString(), Uuid.random().toString(), new Date());
        this.amount = amount;
        this.accountNumber = accountNumber.value;
    }

    toPrimitive(): Object {
        return {
            accountNumber: this.accountNumber,
            amount: this.amount.getAmount(),
            currency: this.amount.getCurrency().toString(),
            id: this.aggregateId,
            eventId: this.eventId,
            eventName: this.eventName,
            occurredOn: this.occurredOn,
        }
    }
}