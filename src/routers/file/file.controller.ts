import { multerOptions } from '@/common/adapter/multer.config';
import { initialData } from '@/config/product';
import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { FileDataDto } from './dto/fileData.dto';
import { FileService } from './file.service';
import dataImage = require('../../../uploads/images.json')

const allSize = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const allTags = ['sweatshirt', 'jacket', 'shirt', 'hoodie', 'hats']

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadFile(@Body() data: FileDataDto, @UploadedFile() file: Express.Multer.File): any {
    console.log({ data: data.comment, })
    const response = [];
    console.log(file)
    return {
      file: file.path
    };
  }
  @Get('img/:imgpath')
  getUserProfilePhoto(
    @Param('imgpath') image: String,
    @Res() res

  ): any {

    console.log("TCL: FileController -> constructor -> image", image)

    // const imageLocation = join(process.cwd(), 'files', '294eedb1-780c-498a-a8a6-e5d6f39db1d0.jpg')
    // join(process.cwd(), 'uploads', '15c924f42ffaa67b3f14a5be05f0a312');
    // const file = createReadStream(imageLocation);
    // return new StreamableFile(file);
    return res.sendFile(image, { root: './files' });
  }
  @Get("/generateImg")
  async generateImg(): Promise<{ ok: boolean; length: number; data: any; }> {
    for (let i = 0; i < initialData.products.length; i++) {

      let product = initialData.products[i]
      let imgA = []
      let SizeA = []
      let TagA = []
      //  Get ID Imagenes
      for (let a = 0; a < product.images.length; a++) {
        let img = product.images[a]
        let dbImg = await this.fileService.Image({ where: { path: img } })
        console.log("TCL: FileController -> constructor -> dbImg", dbImg)
        let idImg = dbImg[0].id
        imgA.push({ where: { id: idImg }, create: { id: idImg, path: "" } })
      }
      //  Get sizes insert my array
      for (let a = 0; a < product.sizes.length; a++) {
        let x = product.sizes[a]
        let size = await this.fileService.getSizeName({
          where: {
            name: x
          }
        })
        let id = size[0].id
        SizeA.push({ sizesId: id })
        // let dbImg = await this.fileService.Image({ where: { path: img } })
        // imgA.push(dbImg[0].id)
      }
      //  Get tags insert my array
      for (let a = 0; a < product.tags.length; a++) {
        let x = product.tags[a]
        let tag = await this.fileService.getTagsName({ where: { name: x } })
        let id = tag[0].id
        TagA.push({ tagId: id })
        // let dbImg = await this.fileService.Image({ where: { path: img } })
        // imgA.push(dbImg[0].id)
      }

      const result = await this.fileService.intertProductos({
        description: product.description,
        gender: product.gender,
        inStock: product.inStock,
        price: product.price,
        slug: product.slug,
        title: product.title,
        type: product.type,
        images: {
          connectOrCreate: [...imgA]
        },
        sizes: {
          create: SizeA
        },
        tags: { create: TagA }
      })
      console.log("TCL: FileController -> constructor -> imgA", result)

      // get Size 
      // console.log("TCL: FileController -> constructor -> product", imgA)

    }

    return {
      ok: true,
      length: initialData.products.length,
      data: initialData.products[0]
    }
  }

  @Get('insertOneMigration')
  async InsertSize() {
    for (let i = 0; i < allSize.length; i++) {
      let size = allSize[i]
      this.fileService.InsertSize({
        name: size
      })

    }
    for (let i = 0; i < allTags.length; i++) {
      let tag = allTags[i]
      await this.fileService.InsertTags({
        name: tag
      })
    }
    for (let i = 0; i < dataImage.length; i++) {
      let img = dataImage[i]
      await this.fileService.insertImg({
        path: img
      })
    }
  }

}
