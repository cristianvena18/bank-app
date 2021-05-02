type RabbitMqConfig = {
  user: string;
  password: string;
  host: string;
  queue: string;
  exchange: string;
};

export class RabbitMqConfigFactory {
  static createConfig(): RabbitMqConfig {
    return {
      exchange: "",
      host: "",
      password: "",
      queue: "",
      user: "",
    };
  }
}

export const RabbitMqConnectionConfig: RabbitMqConfig = {
  exchange: "",
  host: "",
  password: "",
  queue: "",
  user: "",
};

export default RabbitMqConfig;
