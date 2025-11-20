import { Controller, Post, Delete, Get, Param, UseGuards, Request } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':trackId')
  async addFavorite(@Request() req, @Param('trackId') trackId: string) {
    return this.favoritesService.addFavorite(req.user.userId, trackId);
  }

  @Delete(':trackId')
  async removeFavorite(@Request() req, @Param('trackId') trackId: string) {
    await this.favoritesService.removeFavorite(req.user.userId, trackId);
    return { message: 'Favorite removed' };
  }

  @Get()
  async getUserFavorites(@Request() req) {
    return this.favoritesService.getUserFavorites(req.user.userId);
  }

  @Get('check/:trackId')
  async checkFavorite(@Request() req, @Param('trackId') trackId: string) {
    const isFavorite = await this.favoritesService.isFavorite(req.user.userId, trackId);
    return { isFavorite };
  }

  @Get('count/:trackId')
  async getFavoriteCount(@Param('trackId') trackId: string) {
    const count = await this.favoritesService.getFavoriteCount(trackId);
    return { count };
  }
}
