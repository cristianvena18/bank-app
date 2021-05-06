import { injectable, inject } from "inversify";
import StoreCommand from "../../../../Application/Commands/Command/Account/StoreCommand";
import { ValidationService } from "../../Validations/Utils/ValidationService";
import { INTERFACES } from "../../../../Infrastructure/DI/interfaces.types";
import ValidationException from "../../../../Application/Exceptions/ValidationException";
import Joi from "joi";

@injectable()
class StoreAdapter {
  private validatorService: ValidationService;

  public constructor(
    @inject(INTERFACES.IValidation) validatorService: ValidationService
  ) {
    this.validatorService = validatorService;
  }

  /**
   * Adapt a http request to an application's layer input
   * @return StoreCommand
   * @throws InvalidBodyException
   */
  public adapt(body: any): StoreCommand {
    const error = this.validatorService.validate(body, Joi.object({}));

    if (error) {
      throw new ValidationException(
        JSON.stringify(this.validatorService.validateResult(error.details))
      );
    }

    return new StoreCommand(
      body.type,
      body.currency,
      body.customerId,
      body.employeeId,
      body.branchId
    );
  }
}

export default StoreAdapter;
