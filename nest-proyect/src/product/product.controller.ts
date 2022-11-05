import { Body, Controller, Get, Post } from '@nestjs/common';
import { productService } from './product.service';
import { product } from '../interfaces/product.interface';
import { CreateProductDTO } from 'src/dto/create-product.dto';

@Controller('product')
export class productController {
  constructor(private readonly productService: productService) {}

  @Post()
  create(@Body() productToCreate: CreateProductDTO): product {
    const response: product = this.productService.create(productToCreate);

    return response;
  }

  @Get()
  findAll(): product[] {
    const response: product[] = this.productService.findAll();

    return response;
  }
}
