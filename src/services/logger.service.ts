import { ILogger } from './logger.interface';
import { Logger } from 'tslog';

export class LoggerService implements ILogger {
	private logger: Logger;

	constructor() {
		this.logger = new Logger({
			displayFilePath: 'hidden',
			displayFunctionName: false,
			displayInstanceName: false,
			displayLoggerName: false,
			dateTimeTimezone: 'Europe/Moscow',
		});
	}

	public log(...args: unknown[]): void {
		this.logger.info(...args);
	}
	public error(...args: unknown[]): void {
		this.logger.error(...args);
	}
	public warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
