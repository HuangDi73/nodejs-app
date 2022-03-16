import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from './services/logger.interface';
import { TYPES } from './types';
import 'reflect-metadata';

@injectable()
export class App {
	private app: Express;
	private port: number;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.app = express();
		this.port = 8000;
	}

	public init(): void {
		this.app.listen(this.port);
		this.logger.log(`Сервер запущен на localhost:${this.port}`);
	}
}
