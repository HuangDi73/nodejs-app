import express, { Express } from 'express';

export class App {
	private app: Express;
	private port: number;

	constructor() {
		this.app = express();
		this.port = 8000;
	}

	public init(): void {
		this.app.listen(this.port);
		console.log(`Сервер запущен на localhost:${this.port}`);
	}
}
