import { Injectable } from '@nestjs/common';
import imports from "../../imports";
import IPrisma from "../prisma.service";
import IAccounts from "./accounts.service";
import { sign } from 'jsonwebtoken';

@Injectable()
class JwtService {
  constructor(private readonly prisma: IPrisma,
    private readonly accounts: IAccounts) {}

  async create(user_hash: string, pass_hash: string) {
    if (!(await this.accounts.getByHash(user_hash))) return null;

    const token = sign({ user_hash, pass_hash }, imports.IAppService.getPrivateKey(), {
      algorithm: 'RS256',
      expiresIn: '12h'
    });
    await this.prisma.jwtData.upsert({
      where: {
        user_hash,
      },
      update: {
        jwt: token,
        expires: new Date(Date.now() + 43_200_000) // 12 hours
      },
      create: {
        jwt: token,
        user_hash,
        expires: new Date(Date.now() + 43_200_000) // 12 hours
      },
    });
    return token;
  }

  async find(jwt: string) {
    return await this.prisma.jwtData.findUnique({
      where: {
        jwt: jwt
      },
    });
  }

  async delete(jwt: string) {
    return await this.prisma.jwtData.delete({
      where: {
        jwt: jwt
      },
    });
  }
}
export default JwtService;
