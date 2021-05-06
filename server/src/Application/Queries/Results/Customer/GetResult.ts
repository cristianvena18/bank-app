import { Customer } from "../../../../Domain/Entities/Customer";

class GetResult {
  private value: Customer;

  public constructor(value: Customer) {
    this.value = value;
  }

  public getData(): Customer {
    return this.value;
  }
}

export default GetResult;
