export declare class TokenBlacklistService {
    private readonly blacklistedTokens;
    blacklistToken(token: string): void;
    isTokenBlacklisted(token: string): boolean;
}
