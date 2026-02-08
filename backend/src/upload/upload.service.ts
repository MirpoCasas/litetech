import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
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
    const endpoint = this.configService.get<string>('AWS_ENDPOINT');

    this.logger.log('=== Upload Service Configuration ===');
    this.logger.log(`AWS_REGION: ${this.region}`);
    this.logger.log(`AWS_S3_BUCKET: ${this.bucketName || '(not set)'}`);
    this.logger.log(`AWS_ACCESS_KEY_ID: ${accessKeyId ? '***set***' : '(not set)'}`);
    this.logger.log(`AWS_SECRET_ACCESS_KEY: ${secretAccessKey ? '***set***' : '(not set)'}`);
    this.logger.log(`AWS_ENDPOINT: ${endpoint || '(not set)'}`);
    this.logger.log(`R2_PUBLIC_URL: ${this.configService.get<string>('R2_PUBLIC_URL') || '(not set)'}`);

    // Check if S3 is properly configured
    this.useLocalStorage =
      !accessKeyId ||
      !secretAccessKey ||
      !this.bucketName;

    this.logger.log(`Storage mode: ${this.useLocalStorage ? 'LOCAL' : 'R2/S3'}`);

    if (!this.useLocalStorage) {
      const s3Config: any = {
        region: this.region,
        credentials: {
          accessKeyId: accessKeyId || '',
          secretAccessKey: secretAccessKey || '',
        },
      };

      // Add custom endpoint for R2 or other S3-compatible services
      if (endpoint) {
        s3Config.endpoint = endpoint;
        this.logger.log(`Using custom endpoint: ${endpoint}`);
      }

      this.s3Client = new S3Client(s3Config);
      this.logger.log('S3 Client initialized successfully');
    }

    // Set up local uploads directory
    this.uploadsDir = path.resolve(__dirname, '..', '..', 'uploads');
    if (this.useLocalStorage && !fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    this.logger.log(`=== Starting file upload ===`);
    this.logger.log(`File: ${file.originalname}, Size: ${file.size} bytes, Type: ${file.mimetype}`);
    
    const parts = file.originalname.split('.');
    const fileExtension = parts.length > 1 ? parts.pop() : '';
    const fileName = fileExtension ? `${uuid()}.${fileExtension}` : uuid();
    
    this.logger.log(`Generated filename: ${fileName}`);

    if (this.useLocalStorage) {
      this.logger.warn('⚠️  Using LOCAL storage (R2 not configured)');
      // Save to local filesystem
      const filePath = path.join(this.uploadsDir, fileName);
      await fs.promises.writeFile(filePath, file.buffer);

      // Return local URL (backend serves static files)
      const backendUrl =
        this.configService.get<string>('BACKEND_URL') || 'http://localhost:3000';
      const url = `${backendUrl}/uploads/${fileName}`;
      this.logger.log(`✓ Saved locally, URL: ${url}`);
      return url;
    }

    // Upload to S3/R2
    this.logger.log('📤 Uploading to R2/S3...');
    const key = `uploads/${fileName}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await this.s3Client!.send(command);
      this.logger.log(`✓ Upload successful to bucket: ${this.bucketName}`);

      // Check if using custom endpoint (R2)
      const endpoint = this.configService.get<string>('AWS_ENDPOINT');
      const publicUrl = this.configService.get<string>('R2_PUBLIC_URL');

      let finalUrl: string;
      if (publicUrl) {
        // Use R2 public URL
        finalUrl = `${publicUrl}/${key}`;
        this.logger.log(`Using R2_PUBLIC_URL: ${finalUrl}`);
      } else if (endpoint) {
        // Construct R2 dev URL
        finalUrl = `${endpoint}/${this.bucketName}/${key}`;
        this.logger.log(`Using endpoint URL: ${finalUrl}`);
      } else {
        // Default S3 URL
        finalUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
        this.logger.log(`Using S3 URL: ${finalUrl}`);
      }

      this.logger.log(`✓ Final URL: ${finalUrl}`);
      return finalUrl;
    } catch (error) {
      this.logger.error('❌ Upload to R2/S3 failed:', error);
      throw error;
    }
  }
}
