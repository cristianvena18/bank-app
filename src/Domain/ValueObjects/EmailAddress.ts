import {StringValueObject} from "./StringValueObject";

export class EmailAddress extends StringValueObject {
    constructor(email: string | StringValueObject) {
        super(typeof email === "string" ? email : email.toString());
    }

}
