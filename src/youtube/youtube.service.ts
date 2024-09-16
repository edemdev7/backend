import { Injectable } from '@nestjs/common';
const fetch = require('node-fetch');

@Injectable()
export class YoutubeService {
  private readonly API_KEY = 'AIzaSyDOuoGCXdkU9sHR-1fA5fP91tFEJU5wRjg';
  private readonly API_URL = 'https://www.googleapis.com/youtube/v3/videos';
  private readonly API1_URL = 'https://www.googleapis.com/youtube/v3/channels';
  private channels = [];

  async getVideoStatistics(videoId: string): Promise<any> {
    const url = `${this.API_URL}?id=${videoId}&key=${this.API_KEY}&part=snippet,statistics`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch video statistics');
    }

    const data = await response.json();
    return data;
  }
  async getChannels(channelId: string): Promise<any> {
    const url = `${this.API1_URL}?id=${channelId}&key=${this.API_KEY}&part=snippet,statistics`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch video channel');
    }
    const data = await response.json();
    return data;
  }
  async updateChannel(channelId: string, updateData: any): Promise<any> {
    const channelIndex = this.channels.findIndex(
      (channel) => channel.id === channelId,
    );

    if (channelIndex === -1) {
      throw new Error('Channel not found');
    }
    this.channels[channelIndex] = {
      ...this.channels[channelIndex],
      ...updateData,
    };

    return this.channels[channelIndex];
  }
}
