import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Track } from "./track.entity";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { ConfigService } from "@nestjs/config";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class TracksService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel('Purchase') private purchaseModel: Model<any>,
    @InjectModel('Download') private downloadModel: Model<any>,
    @InjectModel('View') private viewModel: Model<any>,
    private configService: ConfigService
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
      }
    });
    this.bucketName = this.configService.get('S3_BUCKET_NAME');
  }

  async findAll(genre?: string): Promise<Track[]> {
    const filter = genre ? { genre: new RegExp(genre, "i") } : {};
    return this.trackModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Track | null> {
    return this.trackModel.findById(id).exec();
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = new this.trackModel(createTrackDto);
    return newTrack.save();
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track | null> {
    return this.trackModel.findByIdAndUpdate(id, updateTrackDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Track | null> {
    return this.trackModel.findByIdAndDelete(id).exec();
  }

  async checkPurchase(userId: string, trackId: string): Promise<boolean> {
    const purchase = await this.purchaseModel.findOne({ userId, trackId }).exec();
    return !!purchase;
  }

  async generateDownloadUrl(trackId: string): Promise<string> {
    const track = await this.trackModel.findById(trackId).exec();
    if (!track) {
      throw new Error('Track not found');
    }

    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: track.audioUrl
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn: 900 }); // 15 minutes
  }

  async logDownload(userId: string, trackId: string): Promise<void> {
    const download = new this.downloadModel({
      userId,
      trackId,
      timestamp: new Date()
    });
    await download.save();
  }

  async logView(trackId: string, userId?: string, ipAddress?: string): Promise<void> {
    const view = new this.viewModel({
      trackId,
      userId,
      ipAddress,
      timestamp: new Date()
    });
    await view.save();
  }

  async getPopularTracks(limit: number = 10): Promise<any[]> {
    const views = await this.viewModel.aggregate([
      { $group: { _id: '$trackId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit }
    ]);

    const trackIds = views.map(v => v._id);
    const tracks = await this.trackModel.find({ _id: { $in: trackIds } }).exec();
    
    return tracks.map(track => ({
      ...track.toObject(),
      viewCount: views.find(v => v._id.toString() === track._id.toString())?.count || 0
    }));
  }
}
