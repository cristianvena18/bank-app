import GetQuery from "../../../Queries/Query/Customer/GetQuery";
import GetResult from "../../Results/Customer/GetResult";
import { injectable, inject } from "inversify";
import { INTERFACES } from "../../../../Infrastructure/DI/interfaces.types";
import { CustomerRepository } from "../../../../Domain/Interfaces/Repositories/CustomerRepository";
//import { TokenService } from "../../../../Domain/Interfaces/Services/TokenService";
import EntityNotFoundException from "../../../Exceptions/EntityNotFoundException";

@injectable()
class GetHandler {
  public constructor(
    @inject(INTERFACES.CustomerRepository)
    private customerRepository: CustomerRepository
  ) {}

  /**
   * Execute the given query and return a result
   *
   * @param  query
   * @return GetResult
   */
  public async execute(query: GetQuery): Promise<GetResult> {
    const customer = await this.customerRepository.findOneById(query.getId());

    if (!customer) {
      throw new EntityNotFoundException("default", "Customer not found");
    }

    return new GetResult(customer);
  }
}

export default GetHandler;
