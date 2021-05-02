import { ContainerBuilder, Reference } from "node-dependency-injection";
import { VerificateDomainMiddleware } from "../../../Presentation/Http/Middlewares/VerificateDomainMiddleware";

export const registerMiddlewares = (container: ContainerBuilder) => {
  container.register(
    "middlewares.verificateDomainMiddleware",
    VerificateDomainMiddleware,
    [new Reference("cacheService"), new Reference("Repositories.bank")]
  );

  return container;
};
