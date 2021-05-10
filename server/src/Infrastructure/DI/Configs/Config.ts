import {
  ContainerBuilder,
  Definition,
  Reference,
} from "node-dependency-injection";
import { WinstonLoggerService } from "../../Logger/Providers/WinstonLoggerService";
import RabbitMqEventbus from "../../EventBus/Providers/RabbitMqServiceProvider";
import { RabbitMqConfigFactory } from "../../EventBus/Providers/RabbitMqConfig";
import JoiValidationService from "../../../Presentation/Http/Validations/Utils/JoiValidationService";
import { RedisConnectionFactory } from "../../Cache/ConnectionFactory";
import { RedisCacheServiceProvider } from "../../Cache/Providers/RedisCacheServiceProvider";
import { TransferService } from "../../../Domain/Services/TransferService";
import { MysqlTransactionHandler } from "../../Persistence/Config/MysqlTransactionHandler";

export const registerConfig = (container: ContainerBuilder) => {
  container.register("logger", WinstonLoggerService);
  container.register("validationService", JoiValidationService);

  const transactionDefinition = new Definition();
  transactionDefinition.setFactory(MysqlTransactionHandler, 'create')
  container.setDefinition('transactionHandler', transactionDefinition)

  const definition = new Definition();
  definition.setFactory(RabbitMqConfigFactory, "createConfig");
  container.setDefinition("rabbitMqConfig", definition);

  const cacheDefinition = new Definition();
  cacheDefinition.setFactory(RedisConnectionFactory, "createConnection");
  container.setDefinition("cacheConnection", cacheDefinition);

  container.register("eventBus", RabbitMqEventbus, [
    new Reference("rabbitMqConfig"),
    new Reference("logger"),
  ]);

  container.register("cacheService", RedisCacheServiceProvider, [
    new Reference("cacheConnection"),
  ]);

  return container;
};
