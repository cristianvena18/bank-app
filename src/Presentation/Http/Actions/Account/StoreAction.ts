import { Request, Response } from "express";
import StoreAdapter from "../../Adapters/Account/StoreAdapter";
import StoreHandler from "../../../../Application/Commands/Handler/Account/StoreHandler";
import { injectable, inject } from "inversify";

@injectable()
class StoreAction {
  private adapter: StoreAdapter;
  private handler: StoreHandler;

  public constructor(
    @inject(StoreAdapter) adapter: StoreAdapter,
    @inject(StoreHandler) handler: StoreHandler
  ) {
    this.handler = handler;
    this.adapter = adapter;
  }

  public async execute(req: Request, res: Response) {
    const command = this.adapter.adapt(req.body);

    await this.handler.execute(command);

    return res.status(200).json({ message: "ok" });
  }
}

export default StoreAction;
