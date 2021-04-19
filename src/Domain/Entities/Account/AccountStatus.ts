import {EnumValueObject} from "../../ValueObjects/EnumValueObject";

export class AccountStatus extends EnumValueObject<string> {
    public static ACCOUNT_STATUS = {
        OPEN: "open",
        LOCKED: "locked",
        CLOSED: "closed",
    }

    public constructor(status: string) {
        super(status, Object.values(AccountStatus.ACCOUNT_STATUS));
    }

    protected throwErrorForInvalidValue(value: string): void {
        throw new Error('Account status invalid')
    }

}
