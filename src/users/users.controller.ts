import { UserRegisterDTO } from './dto/user-register.dto';
import { ILogger } from './../services/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { IUsersController } from './users.controller.interface';
import { UserLoginDTO } from './dto/user-login.dto';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ method: 'post', path: '/login', func: this.login },
			{ method: 'post', path: '/register', func: this.register },
		]);
	}

	public login({ body }: Request<{}, {}, UserLoginDTO>, res: Response, next: NextFunction): void {
		this.ok(res, { body });
	}

	public register(
		{ body }: Request<{}, {}, UserRegisterDTO>,
		res: Response,
		next: NextFunction,
	): void {
		this.created(res);
	}
}
