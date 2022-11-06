import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { productModule } from './product/product.module';
import { cartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [productModule, cartModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
