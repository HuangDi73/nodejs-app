import { LoggerService } from './services/logger.service';
import { App } from './app';

const bootstrap = (): void => {
	const logger = new LoggerService();
	const app = new App(logger);
	app.init();
};

bootstrap();
