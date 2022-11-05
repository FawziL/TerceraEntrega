import { Test, TestingModule } from '@nestjs/testing';
import { productService } from './product.service';

describe('productService', () => {
  let service: productService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [productService],
    }).compile();

    service = module.get<productService>(productService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
