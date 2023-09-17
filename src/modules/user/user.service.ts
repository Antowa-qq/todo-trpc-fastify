import { Prisma, User } from '@prisma/client';
import { db } from '@utils/prisma';

export class UserService {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await db.user.create({ data });
    return user;
  }

  async getMe(id: number): Promise<User | null> {
    const user = await this.findById(id);
    return user;
  }

  async updateRefresherToken(id: number, refreshToken: string): Promise<User> {
    return db.user.update({ where: { id }, data: { refreshToken } });
  }

  async findById(id: number): Promise<User | null> {
    return db.user.findUnique({ where: { id } });
  }

  async findByLogin(login: string): Promise<User | null> {
    return db.user.findUnique({ where: { login } });
  }
}
