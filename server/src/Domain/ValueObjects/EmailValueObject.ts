import {StringValueObject} from "./StringValueObject";
import {InvalidArgumentError} from "./InvalidArgumentError";

export class EmailValueObject extends StringValueObject {
    constructor(value: string) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = regex.test(value.toLowerCase())
        if (!isValid) {
            throw new InvalidEmail();
        }
        super(value);
    }
}

export class InvalidEmail extends InvalidArgumentError {
    constructor(message: string = "Invalid email") {
        super(message);
    }
}
