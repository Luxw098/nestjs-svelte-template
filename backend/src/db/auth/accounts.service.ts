import { Injectable } from '@nestjs/common';
import IPrisma from "./prisma.service";
import { createHash } from 'crypto';

@Injectable()
class AccountsService {
  constructor(private readonly prisma: IPrisma) {}
  async getByHash(user_hash: string) {
    return await this.prisma.userData.findUnique({
      where: { user_hash },
    });
  }

  async validate(user_hash: string, pass_hash: string) {
    const account = await this.prisma.userData.findUnique({
      where: { user_hash },
    });
    if (!account) return false;
    return account.pass_hash == createHash('sha256').update(account.salt + pass_hash).digest('hex');
  }

  async upsert(user_hash: string, input_data: { user_hash: string, pass_hash: string, twofa: string }) {
    const salt = Math.random().toString(36).substring(2, 15);
    const data = {
      salt,
      user_hash: input_data.user_hash,
      pass_hash: createHash('sha256').update(salt + input_data.pass_hash).digest('hex'),
      twofa: input_data.twofa,
    };

    return await this.prisma.userData.upsert({
      where: { user_hash },
      update: {
        pass_hash: data.pass_hash,
        twofa: data.twofa
      },
      create: {
        user_hash: data.user_hash,
        pass_hash: data.pass_hash,
        twofa: data.twofa,
        salt: data.salt
      }
    });
  }

  async delete(user_hash: string) {
    return await this.prisma.userData.delete({
      where: { user_hash }
    });
  }
}
export default AccountsService;