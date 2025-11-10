import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Track } from "./track.entity";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";

@Injectable()
export class TracksService {
  constructor(@InjectModel(Track.name) private trackModel: Model<Track>) {}

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
}
