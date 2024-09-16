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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedditController = void 0;
const common_1 = require("@nestjs/common");
const reddit_service_1 = require("./reddit.service");
let RedditController = class RedditController {
    constructor(redditService) {
        this.redditService = redditService;
    }
    login() {
        const authUrl = this.redditService.getAuthUrl();
        return { url: authUrl };
    }
    async handleCallback(code, res) {
        try {
            const accessToken = await this.redditService.getAccessToken(code);
            return res.json({ accessToken });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to retrieve access token' });
        }
    }
    async getUserInfo(request) {
        const accessToken = request.headers['authorization'];
        if (!accessToken) {
            throw new Error('Access token is missing');
        }
        const userInfo = await this.redditService.getUserInfo(accessToken);
        return userInfo;
    }
    async getUserPosts(request) {
        const accessToken = request.headers['authorization'];
        if (!accessToken) {
            throw new Error('Access token is missing');
        }
        console.log('accestoken', accessToken);
        const userInfo = await this.redditService.getUserInfo(accessToken);
        const username = userInfo.username;
        console.log('username:', username);
        return this.redditService.getUserPosts(accessToken, username);
    }
    async getUserAllPosts(request) {
        const accessToken = request.headers['authorization'];
        if (!accessToken) {
            throw new Error('Access token is missing');
        }
        console.log('accestoken', accessToken);
        const userInfo = await this.redditService.getUserInfo(accessToken);
        const username = userInfo.username;
        console.log('username:', username);
        return this.redditService.getUserPostsStats(accessToken, username);
    }
    async getSubredditPosts(subreddit, limit = 10) {
        const posts = await this.redditService.getLastPosts(subreddit, Number(limit));
        return posts;
    }
};
exports.RedditController = RedditController;
__decorate([
    (0, common_1.Get)('login'),
    (0, common_1.Redirect)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RedditController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('callback'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RedditController.prototype, "handleCallback", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RedditController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Get)('me/posts'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RedditController.prototype, "getUserPosts", null);
__decorate([
    (0, common_1.Get)('me/postStat'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RedditController.prototype, "getUserAllPosts", null);
__decorate([
    (0, common_1.Get)(':subreddit'),
    __param(0, (0, common_1.Param)('subreddit')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RedditController.prototype, "getSubredditPosts", null);
exports.RedditController = RedditController = __decorate([
    (0, common_1.Controller)('reddit'),
    __metadata("design:paramtypes", [reddit_service_1.RedditService])
], RedditController);
//# sourceMappingURL=reddit.controller.js.map