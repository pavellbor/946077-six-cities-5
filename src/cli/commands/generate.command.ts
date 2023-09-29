import { Command } from "./command.interface.js";

export class GenerateCommand implements Command {
  getName(): string {
    return "--generate";
  }

  execute(...parameters: string[]): void {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    // Код для получения данных с сервера.
    // Формирование объявлений.
  }
}
