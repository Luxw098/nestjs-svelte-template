import { Controller, Get, Render } from '@nestjs/common';
import { readdirSync } from 'fs';
import { join } from 'path';

@Controller("/api")
export default class {
  @Get()
  get() {
    return {
      status: "ok",
      code: "200",
      message: "API is running",
      endpoints: {
        "/api": "Get help"
      }
    };
  }
}
