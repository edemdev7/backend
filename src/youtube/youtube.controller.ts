import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('video-stats')
  async getVideoStats(@Query('id') videoId: string): Promise<any> {
    return this.youtubeService.getVideoStatistics(videoId);
  }
  @Get('channels')
  async getChannels(@Query('id') channelId: string): Promise<any> {
    return this.youtubeService.getChannels(channelId);
  }
  @Put('update-channel/:id')
  async updateChannel(
    @Param('id') channelId: string,
    @Body() updateData: any,
  ): Promise<any> {
    return this.youtubeService.updateChannel(channelId, updateData);
  }
}
