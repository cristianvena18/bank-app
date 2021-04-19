import { DomainEvent } from "../Interfaces/EventBus/DomainEvent";
import { Uuid } from "../ValueObjects/Uuid";

export class AccountOpened extends DomainEvent {
  static readonly EVENT_NAME = "account.opened";
  private accountId: string;

  public constructor({
    branchId,
    accountId,
    eventId,
    occurredOn,
  }: {
    branchId: string;
    accountId: string;
    eventId: string;
    occurredOn: Date;
  }) {
    super(
      `${branchId}.${AccountOpened.EVENT_NAME}`,
      Uuid.random().value,
      eventId,
      occurredOn
    );
    this.accountId = accountId;
  }

  toPrimitive(): Object {
    return {
      id: this.eventId,
      accountId: this.accountId,
      eventName: this.eventName,
    };
  }
}
