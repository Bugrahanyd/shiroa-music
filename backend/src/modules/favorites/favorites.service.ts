import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>,
  ) {}

  async addFavorite(userId: string, trackId: string): Promise<Favorite> {
    const favorite = new this.favoriteModel({ userId, trackId });
    return favorite.save();
  }

  async removeFavorite(userId: string, trackId: string): Promise<void> {
    await this.favoriteModel.deleteOne({ userId, trackId });
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return this.favoriteModel.find({ userId }).populate('trackId').exec();
  }

  async isFavorite(userId: string, trackId: string): Promise<boolean> {
    const favorite = await this.favoriteModel.findOne({ userId, trackId });
    return !!favorite;
  }

  async getFavoriteCount(trackId: string): Promise<number> {
    return this.favoriteModel.countDocuments({ trackId });
  }
}
