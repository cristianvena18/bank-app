import { ContainerBuilder, Reference } from "node-dependency-injection";
import { TransferService } from "../../../Domain/Services/TransferService";

export const registerServices = (container: ContainerBuilder) => {
    container.register('services.transfer', TransferService, [
        new Reference('Repositories.account'),
        new Reference('Repositories.transfer'),
        new Reference('transactionHandler'),
        new Reference('eventBus')
    ])

    return container;
}