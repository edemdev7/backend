import { RedditPostData, RedditService } from './reddit.service';
import { Request, Response } from 'express';
export declare class RedditController {
    private readonly redditService;
    constructor(redditService: RedditService);
    login(): {
        url: string;
    };
    handleCallback(code: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserInfo(request: Request): Promise<any>;
    getUserPosts(request: Request): Promise<RedditPostData[]>;
    getUserAllPosts(request: Request): Promise<any>;
    getSubredditPosts(subreddit: string, limit?: number): Promise<RedditPostData[]>;
}
