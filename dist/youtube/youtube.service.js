"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeService = void 0;
const common_1 = require("@nestjs/common");
const fetch = require('node-fetch');
let YoutubeService = class YoutubeService {
    constructor() {
        this.API_KEY = 'AIzaSyDOuoGCXdkU9sHR-1fA5fP91tFEJU5wRjg';
        this.API_URL = 'https://www.googleapis.com/youtube/v3/videos';
        this.API1_URL = 'https://www.googleapis.com/youtube/v3/channels';
        this.channels = [];
    }
    async getVideoStatistics(videoId) {
        const url = `${this.API_URL}?id=${videoId}&key=${this.API_KEY}&part=snippet,statistics`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch video statistics');
        }
        const data = await response.json();
        return data;
    }
    async getChannels(channelId) {
        const url = `${this.API1_URL}?id=${channelId}&key=${this.API_KEY}&part=snippet,statistics`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch video channel');
        }
        const data = await response.json();
        return data;
    }
    async updateChannel(channelId, updateData) {
        const channelIndex = this.channels.findIndex((channel) => channel.id === channelId);
        if (channelIndex === -1) {
            throw new Error('Channel not found');
        }
        this.channels[channelIndex] = {
            ...this.channels[channelIndex],
            ...updateData,
        };
        return this.channels[channelIndex];
    }
};
exports.YoutubeService = YoutubeService;
exports.YoutubeService = YoutubeService = __decorate([
    (0, common_1.Injectable)()
], YoutubeService);
//# sourceMappingURL=youtube.service.js.map