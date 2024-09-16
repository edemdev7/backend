"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedditService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_fetch_1 = require("node-fetch");
const axios_1 = require("axios");
let RedditService = class RedditService {
    constructor(configService) {
        this.configService = configService;
        this.baseUrl = 'https://www.reddit.com';
        this.authUrl = 'https://oauth.reddit.com';
        this.clientId = this.configService.get('REDDIT_CLIENT_ID');
        this.clientSecret = this.configService.get('REDDIT_CLIENT_SECRET');
        this.redirectUri = this.configService.get('REDDIT_REDIRECT_URI');
    }
    getAuthUrl() {
        const authUrl = `${this.baseUrl}/api/v1/authorize?client_id=${this.clientId}&response_type=code&state=randomstring&redirect_uri=${this.redirectUri}&duration=temporary&scope=identity,read,submit,history`;
        return authUrl;
    }
    async getAccessToken(code) {
        const tokenUrl = `${this.baseUrl}/api/v1/access_token`;
        const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
        const response = await (0, node_fetch_1.default)(tokenUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: this.redirectUri,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error fetching access token: ${response.statusText}`);
        }
        const data = await response.json();
        return data.access_token;
    }
    async getUserInfo(accessToken) {
        const url = 'https://oauth.reddit.com/api/v1/me';
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'User-Agent': 'web:MyApp:v1.0.0 (by /u/Annual_Garlic_5661)',
                },
            });
            const userData = response.data;
            const userProfile = {
                username: userData.name,
                icon_img: userData.icon_img,
                display_name_prefixed: userData.subreddit.display_name_prefixed,
                total_karma: userData.total_karma,
                link_karma: userData.link_karma,
                comment_karma: userData.comment_karma,
                is_gold: userData.is_gold,
                created_utc: new Date(userData.created_utc * 1000).toLocaleDateString(),
                accept_followers: userData.accept_followers,
                has_verified_email: userData.has_verified_email,
                subreddit: {
                    banner_img: userData.subreddit.banner_img,
                    description: userData.subreddit.public_description,
                    subscribers: userData.subreddit.subscribers,
                    profil_url: userData.subreddit.url,
                },
            };
            console.log('Profil', userProfile);
            return userProfile;
        }
        catch (error) {
            console.error('Error fetching user info:', error.response?.data || error.message);
            throw new Error(`Error fetching user info: ${error.response?.data || error.message}`);
        }
    }
    async getUserPosts(accessToken, username, limit = 10) {
        const url = `https://oauth.reddit.com/user/${username}/submitted?limit=${limit}`;
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'User-Agent': 'web:MyApp:v1.0.0 (by /u/Annual_Garlic_5661)',
                },
            });
            const data = response.data;
            return data.data.children.map((post) => ({
                title: post.data.title,
                url: post.data.url,
                author: post.data.author,
                created_utc: post.data.created_utc,
                score: post.data.score,
                num_comments: post.data.num_comments,
                post_hint: post.data.post_hint,
                thumbnail: post.data.thumbnail,
                selftext: post.data.selftext,
            }));
        }
        catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
            throw new Error(`Error fetching user posts: ${errorMessage}`);
        }
    }
    async getUserPostsStats(accessToken, username) {
        const url = `https://oauth.reddit.com/user/${username}/submitted`;
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'User-Agent': 'web:MyApp:v1.0.0 (by /u/${username})',
                },
                params: {
                    limit: 100
                }
            });
            const posts = response.data.data.children;
            const stats = {
                totalPosts: posts.length,
                totalScore: 0,
                totalComments: 0,
                subreddits: {}
            };
            posts.forEach(post => {
                const data = post.data;
                stats.totalScore += data.score;
                stats.totalComments += data.num_comments;
                if (stats.subreddits[data.subreddit]) {
                    stats.subreddits[data.subreddit]++;
                }
                else {
                    stats.subreddits[data.subreddit] = 1;
                }
            });
            const averageScore = stats.totalPosts > 0 ? stats.totalScore / stats.totalPosts : 0;
            return {
                totalPosts: stats.totalPosts,
                averageScore: averageScore,
                totalComments: stats.totalComments,
                subreddits: stats.subreddits
            };
        }
        catch (error) {
            console.error('Error fetching user posts stats:', error.response?.data || error.message);
            throw new Error(`Error fetching user posts stats: ${error.response?.data || error.message}`);
        }
    }
    async getLastPosts(subreddit, limit) {
        const fetch = await Promise.resolve().then(() => require('node-fetch')).then((mod) => mod.default);
        const url = `${this.baseUrl}/r/${subreddit}/new.json?limit=${limit}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching Reddit posts: ${response.statusText}`);
        }
        const data = (await response.json());
        return data.data.children.map((post) => ({
            title: post.data.title,
            url: post.data.url,
            author: post.data.author,
            created_utc: post.data.created_utc,
            score: post.data.score,
            num_comments: post.data.num_comments,
            post_hint: post.data.post_hint,
            thumbnail: post.data.thumbnail,
            selftext: post.data.selftext,
        }));
    }
};
exports.RedditService = RedditService;
exports.RedditService = RedditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedditService);
//# sourceMappingURL=reddit.service.js.map