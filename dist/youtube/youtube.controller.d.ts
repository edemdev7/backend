import { YoutubeService } from './youtube.service';
export declare class YoutubeController {
    private readonly youtubeService;
    constructor(youtubeService: YoutubeService);
    getVideoStats(videoId: string): Promise<any>;
    getChannels(channelId: string): Promise<any>;
    updateChannel(channelId: string, updateData: any): Promise<any>;
}
