import {EnumValueObject} from "./EnumValueObject";
import {InvalidArgumentError} from "./InvalidArgumentError";

export class Currency extends EnumValueObject<string> {
    public static VALID_VALUES = {
        USD: 'USD',
        ARS: "ARS",
        EUR: "EUR"
    }

    public constructor(value: string) {
        super(value, Object.values(Currency.VALID_VALUES));
    }

    protected throwErrorForInvalidValue(value: string): void {
        throw new InvalidCurrency()
    }

}


export default class InvalidCurrency extends InvalidArgumentError {
    constructor(message: string = 'Invalid Currency') {
        super(message);
    }
}
