import { getConnection, QueryRunner } from "typeorm";
import { TransactionHandler } from "../../../Domain/Interfaces/Services/TransactionHandler";

export class MysqlTransactionHandler implements TransactionHandler {
    private queryRunner: QueryRunner;
    static create() {
        const transaction = new MysqlTransactionHandler();
        transaction.queryRunner = getConnection().createQueryRunner();
        return transaction;
    }
    async begin(): Promise<void> {
        await this.queryRunner.startTransaction();
    }
    async commit(): Promise<void> {
        await this.queryRunner.commitTransaction();
    }
    async rollback(): Promise<void> {
        await this.queryRunner.rollbackTransaction();
    }

}