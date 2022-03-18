import 'reflect-metadata';
import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../services/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error(`[ConfigService] Неудалось загрузить конфигурацию .env`);
		} else {
			this.logger.log(`[ConfigService] Конфигурация .env загружена`);
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	public get(key: string): string {
		return this.config[key];
	}
}
