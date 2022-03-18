import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { App } from './app';
import { ILogger } from './services/logger.interface';
import { LoggerService } from './services/logger.service';
import { IUsersController } from './users/users.controller.interface';
import { UsersController } from './users/users.controller';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { IUsersService } from './users/users.service.interface';
import { UsersService } from './users/users.service';
import { IExceptionFilter } from './exceptions/exception.filter.interface';
import { ExceptionFilter } from './exceptions/exception.filter';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IUsersController>(TYPES.IUsersController).to(UsersController);
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<IUsersService>(TYPES.IUsersService).to(UsersService);
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
});

const bootstrap = (): void => {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
};

bootstrap();
