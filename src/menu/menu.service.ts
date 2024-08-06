import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuService {
  getListMenu() {
    return [
      { "name": "Home", "path": "/" },
      { "name": "Products", "path": "/products" },
      { "name": "Orders", "path": "/orders" },
      { "name": "Customers", "path": "/customers" },
      { "name": "Feedback", "path": "/feedback" },
      { "name": "Settings", "path": "/settings" }
    ];
  }
}
