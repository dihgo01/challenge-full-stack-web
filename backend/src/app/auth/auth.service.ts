import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        ) { }

    async login( email: string, password: string) {
        let user: User;
        const searchParam = {
            where: {
                email
            }
        };
        try {
            user = await this.userService.searchUser(searchParam);
        } catch (error) {
            return null;
        }

        const isPasswordValid = compareSync(password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        const payload = { 
            name: user.name, 
            email: user.email,
            sub: user.id,
            authorization: user.type
        };
        const token = this.jwtService.sign(payload);

        return {token: token};
    }
}
