import { Injectable } from '@nestjs/common';
import { product } from '../interfaces/product.interface';

@Injectable()
export class productService {
  private readonly products: product[] = [];

  create(product: product): product {
    this.products.push(product);

    return product;
  }

  findAll(): product[] {
    return this.products;
  }
}
