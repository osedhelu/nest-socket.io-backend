import { PrismaService } from '@/common/prisma.service';
import { Injectable } from '@nestjs/common';
import { Images, Prisma } from '@prisma/client';
import { StorageEngine } from 'multer';

@Injectable()
export class FileService {


    constructor(private prisma: PrismaService) { }

    async Image(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ImagesWhereUniqueInput;
        where?: Prisma.ImagesWhereInput;
        orderBy?: Prisma.ImagesOrderByWithRelationInput;
    }): Promise<Images[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.images.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async insertImg(data: Prisma.ImagesCreateInput) {
        return this.prisma.images.create({
            data,
        });
    }
    async intertProductos(data: Prisma.ProductsCreateInput) {
        return await this.prisma.products.create({ data })

    }
    async InsertSize(data: Prisma.sizesCreateInput) {
        return await this.prisma.sizes.create({ data })
    }
    async getSizeName(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.sizesWhereUniqueInput;
        where?: Prisma.sizesWhereInput;
        orderBy?: Prisma.sizesOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        return await this.prisma.sizes.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });

    }
    async InsertTags(data: Prisma.tagsCreateInput) {
        return await this.prisma.tags.create({ data })
    }
    async getTagsName(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.tagsWhereUniqueInput;
        where?: Prisma.tagsWhereInput;
        orderBy?: Prisma.tagsOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        return await this.prisma.tags.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

} 
