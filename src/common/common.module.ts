import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express/multer";
import { diskStorage } from "multer";
import { AxiosAdapter } from "./adapter/axios.adapter";
import { PrismaService } from "./prisma.service";
const connectionProvider = {
  provide: 'CONNECTION',
  useFactory: async (configService: ConfigService) => {
    return {
      storage: diskStorage({
        destination: async (req, file, cb) => {
          const path: string = configService.get<string>('MULTER_DEST');
          console.log(path);
          return cb(null, path);
        },
        filename: (req, file, cb) => {

          return cb(null, `${Date.now()}_${file.originalname}`);
        }
      })
    }
  }

};

@Global()
@Module({
  exports: [PrismaService, AxiosAdapter, ConfigService, 'CONNECTION'],
  providers: [PrismaService, AxiosAdapter, ConfigService, connectionProvider],



})
export class CommonModule { }
