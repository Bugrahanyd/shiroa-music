import { Controller, Post, Get, Param, Body, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsEventType } from "./analytics.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post("track/:id/view")
  async trackView(@Param("id") trackId: string, @Req() req: Request) {
    const userId = (req as any).user?.userId;
    return this.analyticsService.trackEvent(
      trackId,
      AnalyticsEventType.TRACK_VIEW,
      userId,
      req.ip,
      req.headers["user-agent"]
    );
  }

  @Post("track/:id/play")
  async trackPlay(@Param("id") trackId: string, @Req() req: Request) {
    const userId = (req as any).user?.userId;
    return this.analyticsService.trackEvent(
      trackId,
      AnalyticsEventType.TRACK_PLAY,
      userId,
      req.ip,
      req.headers["user-agent"]
    );
  }

  @Get("popular")
  async getPopularTracks() {
    return this.analyticsService.getPopularTracks(10);
  }

  @Get("track/:id/stats")
  @UseGuards(JwtAuthGuard)
  async getTrackStats(@Param("id") trackId: string) {
    return this.analyticsService.getTrackStats(trackId);
  }
}
