import { ILogger } from './services/logger.interface';
import express, { Express } from 'express';

export class App {
	private app: Express;
	private port: number;

	constructor(private logger: ILogger) {
		this.app = express();
		this.port = 8000;
	}

	public init(): void {
		this.app.listen(this.port);
		this.logger.log(`Сервер запущен на localhost:${this.port}`);
	}
}
