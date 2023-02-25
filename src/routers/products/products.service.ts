import { PrismaService } from '@/common/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductsWhereUniqueInput;
    where?: Prisma.ProductsWhereInput;
    orderBy?: Prisma.ProductsOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const resp = await this.prisma.products.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        sizes: {
          select: {
            sizes: {
              select: {
                name: true
              }
            }
          }
        },
        images: {
          select: {
            path: true
          }
        },
        tags: {
          include: {
            tags: {
              select: {
                name: true
              }
            }
          },
        }
      }
    });
    let product = []
    for (let i = 0; i < resp.length; i++) {
      let p = resp[i]
      let images = []
      let tags = []
      let sizes = []
      for (let x = 0; x < p.images.length; x++) {
        let img = p.images[x]
        images.push(img.path)
      }
      for (let x = 0; x < p.tags.length; x++) {
        let tag = p.tags[x]
        tags.push(tag.tags.name)
      }
      for (let x = 0; x < p.sizes.length; x++) {
        let size = p.sizes[x]
        sizes.push(size.sizes.name)
      }
      product.push({
        ...p, images,
        tags,
        sizes
      })

    }

    return product
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
