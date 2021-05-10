import { Request, Response } from 'express';
import MakeAdapter from '../../Adapters/Transfer/MakeAdapter';
import MakeHandler from '../../../../Application/Commands/Handler/Transfer/MakeHandler';
import { injectable, inject } from 'inversify';

class MakeAction {
    private adapter: MakeAdapter;
    private handler: MakeHandler;

    public constructor(
        adapter: MakeAdapter,
        handler: MakeHandler
    ) {
        this.handler = handler;
        this.adapter = adapter;
    }

    public async execute(req: Request, res: Response) {
        const command = this.adapter.adapt(req.body);

        await this.handler.execute(command);

        return res.status(200).json({ message: 'ok' });
    }
}

export default MakeAction;