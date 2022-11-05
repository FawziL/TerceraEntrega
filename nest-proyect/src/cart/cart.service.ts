import { Injectable } from '@nestjs/common';
import { cart } from '../interfaces/cart.interface';

@Injectable()
export class cartService {
  private readonly carts: cart[] = [];

  create(cart: cart): cart {
    this.carts.push(cart);

    return cart;
  }

  findAll(): cart[] {
    return this.carts;
  }
}
