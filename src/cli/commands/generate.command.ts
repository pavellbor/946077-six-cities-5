import got from "got";
import { MockServerData } from "../../shared/types/mock-server-data.type.js";
import { Command } from "./command.interface.js";

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  public getName(): string {
    return "--generate";
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
    } catch (error: unknown) {
      console.log("Can't generate data");

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
