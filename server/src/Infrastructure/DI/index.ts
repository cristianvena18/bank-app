import { ContainerBuilder } from "node-dependency-injection";
import { registerConfig } from "./Configs/Config";
import { registerRepositories } from "./Configs/Repositories";
import { registerHandler } from "./Configs/Handler";
import { registerActions } from "./Configs/Actions";
import { registerAdapters } from "./Configs/Adapter";
import { registerRoutes } from "./Configs/Routes";
import { registerMiddlewares } from "./Configs/Middlewares";
import { registerServices } from "./Configs/Services";

let container = new ContainerBuilder();
container = registerConfig(container);
container = registerServices(container);
container = registerRepositories(container);
container = registerHandler(container);
container = registerActions(container);
container = registerAdapters(container);
container = registerRoutes(container);
container = registerMiddlewares(container);


export default container;
