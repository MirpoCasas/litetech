import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async getRelatedPosts() {
    return this.prisma.relatedPost.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
  }

  async createRelatedPost(dto: CreatePostDto, file: Express.Multer.File) {
    const imageUrl = await this.uploadService.uploadFile(file);

    return this.prisma.relatedPost.create({
      data: {
        title: dto.title,
        imageUrl,
      },
    });
  }
}
