import { DomainEvent } from "../Interfaces/EventBus/DomainEvent";
import { Uuid } from "../ValueObjects/Uuid";

export class AccountOpened extends DomainEvent {
  static readonly EVENT_NAME = "account.opened";

  public constructor({
    accountId,
    eventId,
    occurredOn,
  }: {
    accountId: string;
    eventId: string;
    occurredOn: Date;
  }) {
    super(AccountOpened.EVENT_NAME, accountId, eventId, occurredOn);
  }

  toPrimitive(): Object {
    return {
      id: this.eventId,
      accountId: this.aggregateId,
      eventName: this.eventName,
    };
  }
}
