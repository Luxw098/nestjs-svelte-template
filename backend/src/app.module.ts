import { Module } from '@nestjs/common';
import * as imports from "./imports";
import allimports from "./imports";

// Comment out items below if you do not require them
// Please do not edit my options, You may comment them out
// You may add your own options
@Module({
  controllers: [].concat(...[
    imports.appControllers, // Main app controller
    imports.authControllers, // Account + JWTCookie authentication (Prisma Required)
    imports.apiControllers, // Backend API
  ]),
  providers: [].concat(...[
    imports.appProviders, // Main app controller
    imports.dbProviders, // Prisma connection (sqlite)
    imports.authProviders, // Account + JWTCookie authentication (Prisma Required)
    imports.socketsProviders // Socket.io WS serve
  ]),
  exports: [allimports.IJwt, allimports.IAccounts, allimports.IPrisma],
})
export class AppModule { }
