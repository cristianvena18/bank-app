import { Money } from "../../../../Domain/ValueObjects/Money";

class MakeCommand {
    private sourceAccountId: string;
    private destinationAccountId: string;
    private amount: Money;

    public constructor(
        sourceAccountId: string,
        destinationAccountId: string,
        amount: Money
    ) {
        this.sourceAccountId = sourceAccountId;
        this.destinationAccountId = destinationAccountId;
        this.amount = amount;
    }

    public getSourceAccountId(): string {
        return this.sourceAccountId;
    }

    public getDestinationAccountId(): string {
        return this.destinationAccountId;
    }

    public getAmount(): Money {
        return this.amount;
    }
}

export default MakeCommand;