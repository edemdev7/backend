import { ConfigService } from '@nestjs/config';
export interface RedditPostData {
    title: string;
    url: string;
    author: string;
    created_utc: number;
    score: number;
    num_comments: number;
    post_hint?: string;
    thumbnail: string;
    selftext: string;
}
export declare class RedditService {
    private readonly configService;
    private baseUrl;
    private authUrl;
    private clientId;
    private clientSecret;
    private redirectUri;
    constructor(configService: ConfigService);
    getAuthUrl(): string;
    getAccessToken(code: string): Promise<string>;
    getUserInfo(accessToken: string): Promise<any>;
    getUserPosts(accessToken: string, username: string, limit?: number): Promise<RedditPostData[]>;
    getUserPostsStats(accessToken: string, username: string): Promise<any>;
    getLastPosts(subreddit: string, limit: number): Promise<RedditPostData[]>;
}
