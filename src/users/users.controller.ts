import 'reflect-metadata';
import { UserRegisterDTO } from './dto/user-register.dto';
import { ILogger } from './../services/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { IUsersController } from './users.controller.interface';
import { UserLoginDTO } from './dto/user-login.dto';
import { IUsersService } from './users.service.interface';
import { HTTPError } from '../exceptions/http-error.class';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUsersService) private usersService: IUsersService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ method: 'post', path: '/login', func: this.login },
			{ method: 'post', path: '/register', func: this.register },
		]);
	}

	public login({ body }: Request<{}, {}, UserLoginDTO>, res: Response, next: NextFunction): void {
		this.ok(res, { body });
	}

	public async register(
		{ body }: Request<{}, {}, UserRegisterDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const newUser = await this.usersService.createUser(body);
		if (!newUser) {
			next(new HTTPError(401, 'This user has already existed'));
		} else {
			this.created(res, { email: newUser.email, name: newUser.name });
		}
	}
}
