import { Request, Response } from "express";
import GetAdapter from "../../Adapters/Customer/GetAdapter";
import GetHandler from "../../../../Application/Queries/Handler/Customer/GetHandler";
import { injectable, inject } from "inversify";
import { success } from "../../../../Infrastructure/Debug/customResponse";
import { GetCustomerPresenter } from "../../Presenters/Customers/GetCustomerPresenter";

@injectable()
class GetAction {
  private adapter: GetAdapter;
  private handler: GetHandler;

  public constructor(
    @inject(GetAdapter) adapter: GetAdapter,
    @inject(GetHandler) handler: GetHandler
  ) {
    this.handler = handler;
    this.adapter = adapter;
  }

  public async execute(req: Request, res: Response) {
    const query = this.adapter.adapt(req.params);

    const result = await this.handler.execute(query);

    return res
      .status(200)
      .json(success(GetCustomerPresenter.fromResult(result)));
  }
}

export default GetAction;
