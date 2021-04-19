type RabbitMqConfig = {
  user: string;
  password: string;
  host: string;
  queue: string;
  exchange: string;
};

export const RabbitMqConnectionConfig: RabbitMqConfig = {
  exchange: "",
  host: "",
  password: "",
  queue: "",
  user: "",
};

export default RabbitMqConfig;
