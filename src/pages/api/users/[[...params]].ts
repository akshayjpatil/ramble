import {
	Body,
	Catch,
	createHandler,
	Get,
	Param,
	Post,
	Put,
} from 'next-api-decorators';

import { UserErrorHandler, userService } from '../../../lib/user/user.service';
import type { User } from '../../../types/user.type';

@Catch(UserErrorHandler)
class UserHandler {
	@Get('/:email')
	public async getUser(@Param('email') email: string) {
		return await userService.getUser(email);
	}

	@Post('/')
	public async addUser(@Body() data: User) {
		return await userService.addUser(data);
	}

	@Put('/:email')
	public async updateUser(@Param('email') email: string, @Body() data: User) {
		await userService.updateUser(email, data);
	}
}

export default createHandler(UserHandler);
