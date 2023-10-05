import "reflect-metadata";
import { Container } from "inversify";
import { RestApplication } from "./rest/index.js";
import { Component } from "./shared/types/index.js";
import { Logger, PinoLogger } from "./shared/libs/logger/index.js";
import { Config, RestConfig, RestSchema } from "./shared/libs/config/index.js";

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplicaton).to(RestApplication);
  container.bind<Logger>(Component.Logger).to(PinoLogger);
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig);

  const application = container.get<RestApplication>(Component.RestApplicaton);
  await application.init();
}

bootstrap();
