export declare class YoutubeService {
    private readonly API_KEY;
    private readonly API_URL;
    private readonly API1_URL;
    private channels;
    getVideoStatistics(videoId: string): Promise<any>;
    getChannels(channelId: string): Promise<any>;
    updateChannel(channelId: string, updateData: any): Promise<any>;
}
