import { Transfer } from "../../Entities/Transfer";

export interface TransferRepository {
    persist(transfer: Transfer): Promise<void>;
}