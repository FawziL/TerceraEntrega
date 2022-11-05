import { Test, TestingModule } from '@nestjs/testing';
import { productController } from './product.controller';

describe('productController', () => {
  let controller: productController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [productController],
    }).compile();

    controller = module.get<productController>(productController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
