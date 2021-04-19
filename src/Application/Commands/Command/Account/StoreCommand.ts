class StoreCommand {
  private type: string;
  private currency: string;
  private customerId: string;
  private employeeId: string;
  private branchId: string;

  public constructor(
    type: string,
    currency: string,
    customerId: string,
    employeeId: string,
    branchId: string
  ) {
    this.type = type;
    this.currency = currency;
    this.customerId = customerId;
    this.employeeId = employeeId;
    this.branchId = branchId;
  }

  public getType(): string {
    return this.type;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public getCustomerId(): string {
    return this.customerId;
  }

  public getEmployeeId(): string {
    return this.employeeId;
  }

  public getBranchId(): string {
    return this.branchId;
  }
}

export default StoreCommand;
