import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from './services/logger.interface';
import { TYPES } from './types';
import 'reflect-metadata';
import { json } from 'body-parser';
import { UsersController } from './users/users.controller';

@injectable()
export class App {
	private app: Express;
	private port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUsersController) private usersController: UsersController,
	) {
		this.app = express();
		this.port = 8000;
	}

	private useMiddlewares(): void {
		this.app.use(json());
	}

	private useRoutes(): void {
		this.app.use('/users', this.usersController.router);
	}

	public init(): void {
		this.useMiddlewares();
		this.useRoutes();
		this.app.listen(this.port);
		this.logger.log(`Сервер запущен на localhost:${this.port}`);
	}
}
