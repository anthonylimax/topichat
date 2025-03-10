import NodeCache from 'node-cache'
import { ICache } from './interfaces/ICache';
import { User } from '../../core/models/user';

export class CacheInMemory implements ICache{

    cache : NodeCache = new NodeCache({stdTTL: 86400});
    constructor(){}
    get(token: string): User {
        const result = this.cache.get<User>(token)
        if(result) return result;
        throw new Error("Token expirado ou incorreto!")
    }
    tokenize(user: User): { token: string; expireAt: Date; } {
        const newKey = crypto.randomUUID();
        this.cache.set(newKey, user);
        const now = new Date();
        const tomorrow = new Date(now.getTime() + 86400);
        return {
            token: newKey,
            expireAt: tomorrow
        }
    }

}