import { Body, Controller, Get, Post } from '@nestjs/common';
import { cartService } from './cart.service';
import { cart } from '../interfaces/cart.interface';
import { CreateCartDTO } from 'src/dto/create-cart.dto';

@Controller('cart')
export class cartController {
  constructor(private readonly cartService: cartService) {}

  @Post()
  create(@Body() cartToCreate: CreateCartDTO): cart {
    const response: cart = this.cartService.create(cartToCreate);

    return response;
  }

  @Get()
  findAll(): cart[] {
    const response: cart[] = this.cartService.findAll();

    return response;
  }
}
