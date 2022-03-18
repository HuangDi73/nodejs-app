import { ExpressReturnType, IControllerRoutes } from './route.interface';
import { ILogger } from './../services/logger.interface';
import { Response, Router } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	public get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	public created<T>(res: Response, message: T): ExpressReturnType {
		return res.status(201).json(message);
	}

	protected bindRoutes(routes: IControllerRoutes[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
