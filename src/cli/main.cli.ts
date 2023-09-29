import { CLIApplication, HelpCommand, VersionCommand, ImportCommand, GenerateCommand } from './index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new VersionCommand(),
    new HelpCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
