import { injectable, inject } from "inversify";
import GetQuery from "../../../../Application/Queries/Query/Customer/GetQuery";
import { ValidationService } from "../../Validations/Utils/ValidationService";
import { INTERFACES } from "../../../../Infrastructure/DI/interfaces.types";
import ValidationException from "../../../../Application/Exceptions/ValidationException";

@injectable()
class GetAdapter {
  private validatorService: ValidationService;

  public constructor(
    @inject(INTERFACES.IValidation) validatorService: ValidationService
  ) {
    this.validatorService = validatorService;
  }

  /**
   * Adapt a http request to an application's layer input
   * @return GetQuery
   * @throws InvalidBodyException
   */
  public adapt(body: any): GetQuery {
    // const error = this.validatorService.validate(body, {});
    //
    // if (error) {
    //   throw new ValidationException(
    //     JSON.stringify(this.validatorService.validateResult(error.details))
    //   );
    // }

    return new GetQuery(body.id, "");
  }
}

export default GetAdapter;
