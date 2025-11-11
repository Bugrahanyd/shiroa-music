import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus, NotFoundException, UseGuards, Req, ForbiddenException } from "@nestjs/common";
import { TracksService } from "./tracks.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRole } from "../users/user.entity";

@Controller("tracks")
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async findAll(@Query("genre") genre?: string) {
    return this.tracksService.findAll(genre);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Req() req: any) {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    
    const userId = req.user?.userId;
    const ipAddress = req.ip;
    await this.tracksService.logView(id, userId, ipAddress);
    
    return track;
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param("id") id: string, @Body() updateTrackDto: UpdateTrackDto) {
    const track = await this.tracksService.update(id, updateTrackDto);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: string) {
    const track = await this.tracksService.remove(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
  }

  @Get('popular')
  async getPopular() {
    return this.tracksService.getPopularTracks(10);
  }

  @Get(":id/download")
  @UseGuards(JwtAuthGuard)
  async getDownloadUrl(@Param("id") id: string, @Req() req: any) {
    const userId = req.user.userId;
    const hasPurchased = await this.tracksService.checkPurchase(userId, id);
    
    if (!hasPurchased) {
      throw new ForbiddenException("You must purchase this track before downloading");
    }

    const downloadUrl = await this.tracksService.generateDownloadUrl(id);
    await this.tracksService.logDownload(userId, id);
    
    return { url: downloadUrl };
  }
}
