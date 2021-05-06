import GetResult from "../../../../Application/Queries/Results/Customer/GetResult";

export class GetCustomerPresenter {
  public static fromResult(result: GetResult) {
    return {
      ...result.getData().toPrimitives(),
      accounts: result
        .getData()
        .getAccounts()
        .map((account) => ({
          id: account.getId().toString(),
          number: account.getNumber().toString(),
          type: account.getType().toString(),
          status: account.getStatus().toString(),
          balance: account.getBalance().getAmount().toString(),
          currency: account.getCurrency().toString(),
          employee: {
            id: account.getEmployee().getId().toString(),
          },
          branch: {
            id: account.getBranch().getId().toString(),
          },
        })),
    };
  }
}
