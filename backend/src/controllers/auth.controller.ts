import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import JwtService from "../db/jwt.service";
import AccountsService from "../db/accounts.service";
import imports from "../imports";

import { privateDecrypt } from "crypto";
import { readdirSync } from 'fs';
import { join } from 'path';


@Controller("/api/auth")
export class AuthController {
  constructor(
              private readonly jwt: JwtService,
              private readonly accounts: AccountsService
  ) {}

  private check2FA(twofa: string) {
    return true;
  };

  @Get()
  get() {
    return {
      status: "ok",
      code: "200",
      message: "Auth API is running"
    };
  }

  @Post("/updatesession")
  async getUpdateSession() {
    return {
      status: "ok",
      code: "200",
      message: ""
    }
  }

  @Post("/register")
  async getRegister(@Body() body: any) {

  }

  @Post("/login")
  async getLogin(@Body() body: any) {
    try {
      const private_key = imports.IAppService.getPrivateKey();
      const decrption_settings = {
        key: private_key,
        oaepHash: "sha256"
      };

      const user_hash = privateDecrypt(decrption_settings, Buffer.from(body["user"], 'base64')).toString();
      const pass_hash = privateDecrypt(decrption_settings, Buffer.from(body["pass"], 'base64')).toString();
      const twofa = privateDecrypt(decrption_settings, Buffer.from(body["twofa"], 'base64')).toString();

      if (!user_hash || !pass_hash || !twofa) return;
      if (!(this.check2FA(twofa))) return;

      console.log(user_hash, pass_hash, twofa);

      const result = await this.jwt.create(
        user_hash,
        pass_hash
      );
      if (!result) return {
        status: "error",
        code: "401"
      };

      return {
        status: "ok",
        code: "200",
        message: result
      };
    } catch(err) {
      return {
        status: "error",
        code: "400",
        err
      };
    }
  }
}
export default AuthController