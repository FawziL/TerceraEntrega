import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { productModule } from './product/product.module';
import { cartModule } from './cart/cart.module';

@Module({
  imports: [productModule, cartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
