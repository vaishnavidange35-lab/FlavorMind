import { redisClient } from '../config/redis.js';
import { logger } from '../config/logger.js';

class CacheService {
  /**
   * Get item from cache
   * @param {string} key 
   * @returns {any} parsed JSON or null
   */
  async get(key) {
    try {
      const data = await redisClient.get(key);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch (err) {
      logger.error(`Cache Get Error for key ${key}:`, err);
      return null;
    }
  }

  /**
   * Set item in cache
   * @param {string} key 
   * @param {any} value 
   * @param {number} ttlSeconds 
   */
  async set(key, value, ttlSeconds = 3600) {
    try {
      const data = JSON.stringify(value);
      // EX for seconds
      await redisClient.set(key, data, { EX: ttlSeconds });
    } catch (err) {
      logger.error(`Cache Set Error for key ${key}:`, err);
    }
  }

  /**
   * Delete item from cache
   * @param {string} key 
   */
  async del(key) {
    try {
      await redisClient.del(key);
    } catch (err) {
      logger.error(`Cache Delete Error for key ${key}:`, err);
    }
  }
}

export const cacheService = new CacheService();
