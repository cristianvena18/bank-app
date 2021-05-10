import MakeCommand from '../../../Commands/Command/Transfer/MakeCommand';
import { injectable, inject } from 'inversify';
import { AccountRepository } from '../../../../Domain/Interfaces/Repositories/AccountRepository';
import { TransactionHandler } from '../../../../Domain/Interfaces/Services/TransactionHandler';
import { TransferService } from '../../../../Domain/Services/TransferService';
import EntityNotFoundException from '../../../Exceptions/EntityNotFoundException';
import { InvalidTransfer } from '../../../../Domain/Exceptions/InvalidTransfer';
import { Money } from '../../../../Domain/ValueObjects/Money';

class MakeHandler {
  private accountRepository: AccountRepository;
  private transferService: TransferService;
  public constructor(
    accountRepository: AccountRepository,
    transferService: TransferService
  ) {
    this.accountRepository = accountRepository;
    this.transferService = transferService;
  }

  /**
   * Execute the given command
   *
   * @return void
   */
  public async execute(command: MakeCommand): Promise<void> {
    const sourceAccount = await this.accountRepository.findOneById(command.getSourceAccountId());

    if (!sourceAccount) {
      throw new EntityNotFoundException('default', 'Source account not found');
    }

    const destinationAccount = await this.accountRepository.findOneById(command.getDestinationAccountId());

    if (!destinationAccount) {
      throw new EntityNotFoundException('default', 'Destination account not found');
    }

    if (!sourceAccount.isAvailable()) {
      throw new InvalidTransfer('The source account is unavailable');
    }

    if (!destinationAccount.isAvailable()) {
      throw new InvalidTransfer('The destination account is unavailable');
    }

    await this.transferService.transfer(sourceAccount, destinationAccount, command.getAmount());
  }
}

export default MakeHandler;