import MakeCommand from "../../../../Application/Commands/Command/Transfer/MakeCommand";
import { ValidationService } from "../../Validations/Utils/ValidationService";
import { INTERFACES } from "../../../../Infrastructure/DI/interfaces.types";
import ValidationException from "../../../../Application/Exceptions/ValidationException";
import { Money } from "../../../../Domain/ValueObjects/Money";
import { Currency } from "../../../../Domain/ValueObjects/Currency";
import Joi from "joi";

class MakeAdapter {
    private validatorService: ValidationService;

    public constructor(validatorService: ValidationService) {
        this.validatorService = validatorService;
    }

    /**
     * Adapt a http request to an application's layer input
     * @return MakeCommand
     * @throws InvalidBodyException
     */
    public adapt(body: any): MakeCommand {
        const error = this.validatorService.validate(body, Joi.object({}));

        if (error) {
            throw new ValidationException(JSON.stringify(this.validatorService.validateResult(error.details)));
        }

        return new MakeCommand(
            body.sourceAccount,
            body.destinationAccount,
            Money[body.currency](Number(body.amount) * 100)
        );
    }
}

export default MakeAdapter;