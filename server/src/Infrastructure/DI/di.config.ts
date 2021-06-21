import MakeTransferHandler from '../../Application/Commands/Handler/Transfer/MakeHandler';
import MakeTransferAdapter from '../../Presentation/Http/Adapters/Transfer/MakeAdapter';
import MakeTransferAction from '../../Presentation/Http/Actions/Transfer/MakeAction';
import GetCustomerHandler from "../../Application/Queries/Handler/Customer/GetHandler";
import GetCustomerAdapter from "../../Presentation/Http/Adapters/Customer/GetAdapter";
import GetCustomerAction from "../../Presentation/Http/Actions/Customer/GetAction";
import MySqlEmployeeRepository from "../../Infrastructure/Persistence/Repositories/MySqlEmployeeRepository";
import { EmployeeRepository } from "../../Domain/Interfaces/Repositories/EmployeeRepository";
import MySqlBranchRepository from "../../Infrastructure/Persistence/Repositories/MySqlBranchRepository";
import { BranchRepository } from "../../Domain/Interfaces/Repositories/BranchRepository";
import MySqlCustomerRepository from "../../Infrastructure/Persistence/Repositories/MySqlCustomerRepository";
import { CustomerRepository } from "../../Domain/Interfaces/Repositories/CustomerRepository";
import StoreAccountHandler from "../../Application/Commands/Handler/Account/StoreHandler";
import StoreAccountAdapter from "../../Presentation/Http/Adapters/Account/StoreAdapter";
import StoreAccountAction from "../../Presentation/Http/Actions/Account/StoreAction";
import { INTERFACES } from "./interfaces.types";
import { Container } from "inversify";
import Router from "./../../Presentation/Http/Routes";
import { ValidationService } from "../../Presentation/Http/Validations/Utils/ValidationService";
import JoiValidationService from "./../../Presentation/Http/Validations/Utils/JoiValidationService";
import { LoggerService } from "../../Domain/Interfaces/Services/LoggerService";
import { WinstonLoggerService } from "../Logger/Providers/WinstonLoggerService";
import { AccountRoutes } from "../../Presentation/Http/Routes/accounts";
import { AccountRepository } from "../../Domain/Interfaces/Repositories/AccountRepository";
import MysqlAccountRepository from "../Persistence/Repositories/MysqlAccountRepository";
import { EventBus } from "../../Domain/Interfaces/EventBus";
import RabbitMqEventbus from "../EventBus/Providers/RabbitMqServiceProvider";
import RabbitMqConfig, {
  RabbitMqConnectionConfig,
} from "../EventBus/Providers/RabbitMqConfig";
import { CustomerRoutes } from "../../Presentation/Http/Routes/customer";
import { ReporterService } from '../../Domain/Interfaces/Services/ReporterService';
import SlackReporter from '../Logger/Reporters/SlackReporter';


const DIContainer = new Container();

DIContainer.bind(Router).toSelf();
DIContainer.bind(AccountRoutes).toSelf();
DIContainer.bind(CustomerRoutes).toSelf();

//Actions
DIContainer.bind(MakeTransferAction).toSelf();
DIContainer.bind(GetCustomerAction).toSelf();
DIContainer.bind(StoreAccountAction).toSelf();

//Adapters
DIContainer.bind(MakeTransferAdapter).toSelf();
DIContainer.bind(GetCustomerAdapter).toSelf();
DIContainer.bind(StoreAccountAdapter).toSelf();

//Handlers
DIContainer.bind(MakeTransferHandler).toSelf();
DIContainer.bind(GetCustomerHandler).toSelf();
DIContainer.bind(StoreAccountHandler).toSelf();

//Services
DIContainer.bind<ValidationService>(INTERFACES.IValidation).to(
  JoiValidationService
);
DIContainer.bind<LoggerService>(INTERFACES.LoggerService).to(
  WinstonLoggerService
);
DIContainer.bind<ReporterService>(INTERFACES.ReporterService).to(SlackReporter);

//Events
DIContainer.bind<EventBus>(INTERFACES.EventBus).to(RabbitMqEventbus);

//Repositories
DIContainer.bind<EmployeeRepository>(INTERFACES.EmployeeRepository).to(
  MySqlEmployeeRepository
);
DIContainer.bind<BranchRepository>(INTERFACES.BranchRepository).to(
  MySqlBranchRepository
);
DIContainer.bind<CustomerRepository>(INTERFACES.CustomerRepository).to(
  MySqlCustomerRepository
);
DIContainer.bind<AccountRepository>(INTERFACES.AccountRepository).to(
  MysqlAccountRepository
);

DIContainer.bind<RabbitMqConfig>(INTERFACES.RabbitMqConfig).toConstantValue(
  RabbitMqConnectionConfig
);

export default DIContainer;



