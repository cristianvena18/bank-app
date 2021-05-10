import { Transfer } from "../../../Domain/Entities/Transfer";
import { TransferRepository } from "../../../Domain/Interfaces/Repositories/TransferRepository";
import { TransferModel } from "../Mappings/Transfer";
import MySqlBaseRepository from "./MysqlBaseRepository";

export class MysqlTransferRepository extends MySqlBaseRepository<Transfer> implements TransferRepository {
    async persist(transfer: Transfer): Promise<void> {
        this.initialize(TransferModel);
        await this.save(transfer);
    }
    
}