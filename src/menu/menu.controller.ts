import { Controller, Get, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @UseGuards(AuthGuard)
  @Get()
  getList() {
    return this.menuService.getListMenu();
  }
}
