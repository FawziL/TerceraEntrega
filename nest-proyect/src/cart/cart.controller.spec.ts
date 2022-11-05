import { Test, TestingModule } from '@nestjs/testing';
import { cartController } from './cart.controller';

describe('cartController', () => {
  let controller: cartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [cartController],
    }).compile();

    controller = module.get<cartController>(cartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
