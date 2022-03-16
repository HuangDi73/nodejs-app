import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { App } from './app';
import { ILogger } from './services/logger.interface';
import { LoggerService } from './services/logger.service';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
});

const bootstrap = (): void => {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
};

bootstrap();
