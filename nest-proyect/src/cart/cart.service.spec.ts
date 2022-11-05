import { Test, TestingModule } from '@nestjs/testing';
import { cartService } from './cart.service';

describe('cartService', () => {
  let service: cartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [cartService],
    }).compile();

    service = module.get<cartService>(cartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
