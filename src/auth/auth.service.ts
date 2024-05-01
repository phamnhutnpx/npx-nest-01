import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const validPass = this.usersService.isValidPassword(pass, user.password);
      if (validPass) {
        return user;
      }
    }
    return null;
  }
}
