import { Controller, Get, Query, Req, Redirect, Res, Param } from '@nestjs/common';
import { RedditPostData, RedditService } from './reddit.service';
import { Request, Response } from 'express';

@Controller('reddit')
export class RedditController {
  constructor(private readonly redditService: RedditService) {}

  @Get('login')
  @Redirect()
  login() {
    const authUrl = this.redditService.getAuthUrl();
    return { url: authUrl };
  }
  @Get('callback')
  async handleCallback(@Query('code') code: string, @Res() res: Response) {
    try {
      const accessToken = await this.redditService.getAccessToken(code);
      return res.json({ accessToken });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve access token' });
    }
  }
  

  @Get('me')
  async getUserInfo(@Req() request: Request) {
    const accessToken = request.headers['authorization'];
    
    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    const userInfo = await this.redditService.getUserInfo(accessToken);
    return userInfo;
  }

  @Get('me/posts')
  async getUserPosts(@Req() request: Request) {
    const accessToken = request.headers['authorization'];
    if (!accessToken) {
      throw new Error('Access token is missing');
    }
    console.log('accestoken',accessToken)

    const userInfo = await this.redditService.getUserInfo(accessToken);
    const username = userInfo.username; 
    console.log('username:',username)

    return this.redditService.getUserPosts(accessToken, username);
  }

  @Get('me/postStat')
  async getUserAllPosts(@Req() request: Request) {
    const accessToken = request.headers['authorization'];
    if (!accessToken) {
      throw new Error('Access token is missing');
    }
    console.log('accestoken',accessToken)

    const userInfo = await this.redditService.getUserInfo(accessToken);
    const username = userInfo.username; 
    console.log('username:',username)

    return this.redditService.getUserPostsStats(accessToken, username);
  }
  
  @Get(':subreddit')
  async getSubredditPosts(
    @Param('subreddit') subreddit: string,
    @Query('limit') limit = 10,
  ): Promise<RedditPostData[]> {
    const posts = await this.redditService.getLastPosts(subreddit, Number(limit));
    return posts;
  }
}
