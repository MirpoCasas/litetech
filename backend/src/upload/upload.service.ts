import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private s3Client: S3Client | null = null;
  private bucketName: string;
  private region: string;
  private useLocalStorage: boolean;
  private uploadsDir: string;

  constructor(private configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_REGION') || 'us-east-1';
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET') || '';
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');

    // Check if S3 is properly configured
    this.useLocalStorage =
      !accessKeyId ||
      !secretAccessKey ||
      !this.bucketName;

    if (!this.useLocalStorage) {
      this.s3Client = new S3Client({
        region: this.region,
        credentials: {
          accessKeyId: accessKeyId || '',
          secretAccessKey: secretAccessKey || '',
        },
      });
    }

    // Set up local uploads directory
    this.uploadsDir = path.resolve(__dirname, '..', '..', 'uploads');
    if (this.useLocalStorage && !fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const parts = file.originalname.split('.');
    const fileExtension = parts.length > 1 ? parts.pop() : '';
    const fileName = fileExtension ? `${uuid()}.${fileExtension}` : uuid();

    if (this.useLocalStorage) {
      // Save to local filesystem
      const filePath = path.join(this.uploadsDir, fileName);
      await fs.promises.writeFile(filePath, file.buffer);

      // Return local URL (backend serves static files)
      const backendUrl =
        this.configService.get<string>('BACKEND_URL') || 'http://localhost:3000';
      return `${backendUrl}/uploads/${fileName}`;
    }

    // Upload to S3
    const key = `uploads/${fileName}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client!.send(command);

    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
  }
}
