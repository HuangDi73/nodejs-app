import 'reflect-metadata';
import { IConfigService } from './../config/config.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IUsersService } from './users.service.interface';
import { User } from './user.entity';
import { UserRegisterDTO } from './dto/user-register.dto';

@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(TYPES.IConfigService) private config: IConfigService) {}

	public async createUser({ email, name, password }: UserRegisterDTO): Promise<User | null> {
		const user = new User(email, name);
		const salt = this.config.get('SALT');
		await user.setPassword(password, Number(salt));
		return user;
	}
}
