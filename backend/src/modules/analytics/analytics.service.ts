import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Analytics, AnalyticsEventType } from "./analytics.entity";

@Injectable()
export class AnalyticsService {
  constructor(@InjectModel(Analytics.name) private analyticsModel: Model<Analytics>) {}

  async trackEvent(
    trackId: string,
    eventType: AnalyticsEventType,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const event = new this.analyticsModel({
      trackId: new Types.ObjectId(trackId),
      userId: userId ? new Types.ObjectId(userId) : undefined,
      eventType,
      ipAddress,
      userAgent
    });
    return event.save();
  }

  async getTrackViews(trackId: string): Promise<number> {
    return this.analyticsModel.countDocuments({
      trackId: new Types.ObjectId(trackId),
      eventType: AnalyticsEventType.TRACK_VIEW
    });
  }

  async getPopularTracks(limit: number = 10) {
    return this.analyticsModel.aggregate([
      { $match: { eventType: AnalyticsEventType.TRACK_VIEW } },
      { $group: { _id: "$trackId", views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "tracks",
          localField: "_id",
          foreignField: "_id",
          as: "track"
        }
      },
      { $unwind: "$track" },
      {
        $project: {
          trackId: "$_id",
          views: 1,
          track: 1
        }
      }
    ]);
  }

  async getTrackStats(trackId: string) {
    const views = await this.analyticsModel.countDocuments({
      trackId: new Types.ObjectId(trackId),
      eventType: AnalyticsEventType.TRACK_VIEW
    });

    const plays = await this.analyticsModel.countDocuments({
      trackId: new Types.ObjectId(trackId),
      eventType: AnalyticsEventType.TRACK_PLAY
    });

    return { views, plays };
  }
}
