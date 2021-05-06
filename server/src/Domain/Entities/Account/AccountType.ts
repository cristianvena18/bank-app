import {EnumValueObject} from "../../ValueObjects/EnumValueObject";

export class AccountType extends EnumValueObject<string> {
    public static ACCOUNT_TYPES = {
        SALARY: "SALARY",
        SAVING: "SAVING",
        CURRENT: "CURRENT",
    }

    constructor(type: string) {
        super(type, Object.values(AccountType.ACCOUNT_TYPES));
    }

    protected throwErrorForInvalidValue(value: string): void {
        throw new Error('Account type not valid');
    }

}
