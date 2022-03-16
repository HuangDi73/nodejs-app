import { App } from './app';

const bootstrap = (): void => {
	const app = new App();
	app.init();
};

bootstrap();
