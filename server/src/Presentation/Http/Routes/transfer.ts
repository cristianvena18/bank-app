import { Request, Response, Router } from "express";
import MakeAction from "../Actions/Transfer/MakeAction";
import { asyncMiddleware } from "../Middlewares/AsyncMiddleware";

export class TransferRoutes {
    router: any;
    makeAction: MakeAction;
    public constructor(makeAction: MakeAction) {
        this.makeAction = makeAction;
        this.router = Router();
        this.setRoutes();
    }
    
    private setRoutes() {
        this.router.post('/',
            asyncMiddleware(async (req: Request, res: Response) => {
                await this.makeAction.execute(req, res);
            }))
    }

    public getRoutes() {
        return this.router;
    }
}