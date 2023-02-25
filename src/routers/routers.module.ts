import { CommonModule } from "@/common/common.module";
import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { AuthModule } from "./auth/auth.module";
import { FileModule } from './file/file.module';
import { SmspagoModule } from './smspago/smspago.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    UserModule,
    SmspagoModule,
    FileModule,
    ProductsModule,
  ]
})
export class RoutersModule { }
