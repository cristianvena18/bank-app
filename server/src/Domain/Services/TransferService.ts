import { Account } from "../Entities/Account";
import { Transfer } from "../Entities/Transfer";
import { InvalidTransfer } from "../Exceptions/InvalidTransfer";
import { EventBus } from "../Interfaces/EventBus";
import { AccountRepository } from "../Interfaces/Repositories/AccountRepository";
import { TransferRepository } from "../Interfaces/Repositories/TransferRepository";
import { TransactionHandler } from "../Interfaces/Services/TransactionHandler";
import { Money } from "../ValueObjects/Money";

export class TransferService {
    private transactionHandler: TransactionHandler;
    private eventBus: EventBus;
    private accountRepository: AccountRepository;
    private transferRepository: TransferRepository;
    public constructor(
        accountRepository: AccountRepository,
        transferRepository: TransferRepository,
        transactionHandler: TransactionHandler,
        eventBus: EventBus,
    ) {
        this.accountRepository = accountRepository;
        this.transferRepository = transferRepository;
        this.transactionHandler = transactionHandler;
        this.eventBus = eventBus
    }

    public async transfer(sourceAccount: Account, destinationAccount: Account, amount: Money): Promise<void> {


        if (!sourceAccount.getCurrency().isSameCurrency(destinationAccount.getCurrency())) {
            throw new InvalidTransfer('The source currency must be equals to destination currency');
        }

        if (!sourceAccount.getCurrency().isSameCurrency(amount.getCurrency())) {
            throw new InvalidTransfer('The accounts currency is invalid for this transfer');
        }

        if (!sourceAccount.haveBalance(amount)) {
            throw new InvalidTransfer('The source account does not have enough funds');
        }

        await this.transactionHandler.begin();

        try {
            sourceAccount.substract(amount);

            destinationAccount.add(amount);

            const tranfer = Transfer.create(sourceAccount, destinationAccount, amount);

            await this.accountRepository.persist(sourceAccount);
            await this.accountRepository.persist(destinationAccount);

            await this.transferRepository.persist(tranfer);

            await this.transactionHandler.commit();

            await this.eventBus.publish(
            [
                ...sourceAccount.pullDomainEvents(),
                ...destinationAccount.pullDomainEvents(),
                ...tranfer.pullDomainEvents()
            ]);
        } catch (e) {
            await this.transactionHandler.rollback();
            throw e;
        }
    }
}