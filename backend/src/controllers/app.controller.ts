import { Controller, Get, Redirect, Render } from '@nestjs/common';

@Controller()
export default class {
  @Get()
  @Redirect("/api")
  get(){}
}
