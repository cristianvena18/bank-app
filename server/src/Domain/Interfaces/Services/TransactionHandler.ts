export interface TransactionHandler {
    begin(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}