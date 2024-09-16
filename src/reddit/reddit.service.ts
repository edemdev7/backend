import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import axios from 'axios';

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

interface RedditPost {
  data: RedditPostData;
}

interface RedditApiResponse {
  data: {
    children: RedditPost[];
  };
}

@Injectable()
export class RedditService {
  private baseUrl: string;
  private authUrl: string;
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = 'https://www.reddit.com';
    this.authUrl = 'https://oauth.reddit.com';
    this.clientId = this.configService.get<string>('REDDIT_CLIENT_ID');
    this.clientSecret = this.configService.get<string>('REDDIT_CLIENT_SECRET');
    this.redirectUri = this.configService.get<string>('REDDIT_REDIRECT_URI');
  }

  getAuthUrl(): string {
    const authUrl = `${this.baseUrl}/api/v1/authorize?client_id=${this.clientId}&response_type=code&state=randomstring&redirect_uri=${this.redirectUri}&duration=temporary&scope=identity,read,submit,history`;
    return authUrl;
  }

  async getAccessToken(code: string): Promise<string> {
    const tokenUrl = `${this.baseUrl}/api/v1/access_token`;
    const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

    const response = await fetch(tokenUrl, {
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


async getUserInfo(accessToken: string): Promise<any> {
  const url = 'https://oauth.reddit.com/api/v1/me';

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'web:MyApp:v1.0.0 (by /u/Annual_Garlic_5661)',
      },
    });
    const userData = response.data;

    const userProfile = {
      username: userData.name,  // Nom d'utilisateur
      icon_img: userData.icon_img,  // Image de profil
      display_name_prefixed: userData.subreddit.display_name_prefixed,  // Nom affiché avec 'u/'
      total_karma: userData.total_karma,  // Karma total
      link_karma: userData.link_karma,  // Karma lié aux liens
      comment_karma: userData.comment_karma,  // Karma lié aux commentaires
      is_gold: userData.is_gold,  // Statut d'abonnement premium
      created_utc: new Date(userData.created_utc * 1000).toLocaleDateString(),  // Date de création du compte
      accept_followers: userData.accept_followers,  // Autorise les abonnés
      has_verified_email: userData.has_verified_email,  // Email vérifié
      subreddit: {
        banner_img: userData.subreddit.banner_img,  // Bannière de profil
        description: userData.subreddit.public_description,  // Description publique du profil
        subscribers: userData.subreddit.subscribers,  // Nombre d'abonnés au profil
        profil_url: userData.subreddit.url,
      },
    };
    console.log('Profil',userProfile);
    return userProfile;    
  } catch (error) {
    console.error('Error fetching user info:', error.response?.data || error.message);
    throw new Error(`Error fetching user info: ${error.response?.data || error.message}`);
  }
}


async getUserPosts(accessToken: string, username: string, limit = 10): Promise<RedditPostData[]> {
  const url = `https://oauth.reddit.com/user/${username}/submitted?limit=${limit}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'web:MyApp:v1.0.0 (by /u/Annual_Garlic_5661)',
      },
    });

    const data = response.data;

    return data.data.children.map((post: any) => ({
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
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
    throw new Error(`Error fetching user posts: ${errorMessage}`);
  }
}

async getUserPostsStats(accessToken: string, username: string): Promise<any> {
  const url = `https://oauth.reddit.com/user/${username}/submitted`;

  try {
    const response = await axios.get(url, {
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
      totalPosts: posts.length, // Nombre total de posts
      totalScore: 0, // Score total de tous les posts
      totalComments: 0, // Nombre total de commentaires
      subreddits: {} // Subreddits les plus actifs
    };

    posts.forEach(post => {
      const data = post.data;
      stats.totalScore += data.score; // Ajouter le score du post
      stats.totalComments += data.num_comments; // Ajouter le nombre de commentaires

      // Comptabiliser les posts par subreddit
      if (stats.subreddits[data.subreddit]) {
        stats.subreddits[data.subreddit]++;
      } else {
        stats.subreddits[data.subreddit] = 1;
      }
    });

    // Calculer le score moyen
    const averageScore = stats.totalPosts > 0 ? stats.totalScore / stats.totalPosts : 0;

    // Retourner les statistiques générales
    return {
      totalPosts: stats.totalPosts,
      averageScore: averageScore,
      totalComments: stats.totalComments,
      subreddits: stats.subreddits
    };

  } catch (error) {
    console.error('Error fetching user posts stats:', error.response?.data || error.message);
    throw new Error(`Error fetching user posts stats: ${error.response?.data || error.message}`);
  }
}



async getLastPosts(
  subreddit: string,
  limit: number,
): Promise<RedditPostData[]> {
  const fetch = await import('node-fetch').then((mod) => mod.default);
  const url = `${this.baseUrl}/r/${subreddit}/new.json?limit=${limit}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching Reddit posts: ${response.statusText}`);
  }

  const data = (await response.json()) as RedditApiResponse;

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
}
