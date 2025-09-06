import { CacheEntry, CacheStrategy } from '../types';

/**
 * Advanced Cache Management System for LiveScore API
 * Supports multiple caching strategies and intelligent cache invalidation
 */
export class CacheManager {
  private memoryCache: Map<string, CacheEntry<any>> = new Map();
  private strategies: Map<string, CacheStrategy> = new Map();
  private maxMemorySize: number = 1000; // Maximum number of cached items
  private performanceMetrics: Map<string, number[]> = new Map();

  constructor() {
    this.initializeDefaultStrategies();
    this.startCleanupTimer();
  }

  private initializeDefaultStrategies() {
    // Live data - short cache
    this.strategies.set('live', {
      duration: 30000, // 30 seconds
      maxSize: 200
    });

    // Match events - medium cache
    this.strategies.set('events', {
      duration: 60000, // 1 minute
      maxSize: 500
    });

    // Statistics - medium cache
    this.strategies.set('statistics', {
      duration: 120000, // 2 minutes
      maxSize: 300
    });

    // Lineups - longer cache (changes less frequently)
    this.strategies.set('lineups', {
      duration: 600000, // 10 minutes
      maxSize: 200
    });

    // Historical data - very long cache
    this.strategies.set('history', {
      duration: 3600000, // 1 hour
      maxSize: 1000
    });

    // Teams/Competitions - very long cache
    this.strategies.set('teams', {
      duration: 86400000, // 24 hours
      maxSize: 2000
    });

    // Standings - medium-long cache
    this.strategies.set('standings', {
      duration: 1800000, // 30 minutes
      maxSize: 100
    });

    // Commentary - short cache
    this.strategies.set('commentary', {
      duration: 45000, // 45 seconds
      maxSize: 200
    });

    // Countries/Federations - very long cache
    this.strategies.set('geography', {
      duration: 604800000, // 1 week
      maxSize: 500
    });

    // Comprehensive data - medium cache
    this.strategies.set('comprehensive', {
      duration: 180000, // 3 minutes
      maxSize: 50
    });
  }

  /**
   * Get data from cache
   */
  get<T>(key: string, category: string = 'default'): T | null {
    const startTime = performance.now();
    
    const entry = this.memoryCache.get(key);
    if (!entry) {
      this.recordMetric('cache_miss', performance.now() - startTime);
      return null;
    }

    // Check if entry has expired
    if (Date.now() > entry.expiresAt) {
      this.memoryCache.delete(key);
      this.recordMetric('cache_expired', performance.now() - startTime);
      return null;
    }

    this.recordMetric('cache_hit', performance.now() - startTime);
    return entry.data as T;
  }

  /**
   * Set data in cache with appropriate strategy
   */
  set<T>(key: string, data: T, category: string = 'default'): void {
    const strategy = this.strategies.get(category) || { duration: 300000, maxSize: 100 };
    
    const entry: CacheEntry<T> = {
      key,
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + strategy.duration
    };

    // Check memory limits
    if (this.memoryCache.size >= this.maxMemorySize) {
      this.evictOldestEntries(Math.floor(this.maxMemorySize * 0.1)); // Remove 10%
    }

    this.memoryCache.set(key, entry);
  }

  /**
   * Check if data exists and is valid
   */
  has(key: string): boolean {
    const entry = this.memoryCache.get(key);
    if (!entry) return false;

    if (Date.now() > entry.expiresAt) {
      this.memoryCache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Invalidate cache entries by pattern
   */
  invalidatePattern(pattern: string): number {
    let invalidated = 0;
    const regex = new RegExp(pattern);

    for (const [key] of this.memoryCache) {
      if (regex.test(key)) {
        this.memoryCache.delete(key);
        invalidated++;
      }
    }

    return invalidated;
  }

  /**
   * Invalidate cache entries by category
   */
  invalidateCategory(category: string): number {
    let invalidated = 0;
    const prefix = `${category}_`;

    for (const [key] of this.memoryCache) {
      if (key.startsWith(prefix)) {
        this.memoryCache.delete(key);
        invalidated++;
      }
    }

    return invalidated;
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.memoryCache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const now = Date.now();
    let validEntries = 0;
    let expiredEntries = 0;
    let totalSize = 0;

    for (const [, entry] of this.memoryCache) {
      if (now > entry.expiresAt) {
        expiredEntries++;
      } else {
        validEntries++;
      }
      totalSize += JSON.stringify(entry.data).length;
    }

    return {
      totalEntries: this.memoryCache.size,
      validEntries,
      expiredEntries,
      memoryUsageBytes: totalSize,
      hitRate: this.calculateHitRate(),
      avgResponseTime: this.calculateAvgResponseTime()
    };
  }

  /**
   * Generate cache key for API requests
   */
  generateKey(endpoint: string, params: Record<string, any> = {}): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    return `${endpoint}${sortedParams ? '?' + sortedParams : ''}`;
  }

  /**
   * Evict oldest entries to free memory
   */
  private evictOldestEntries(count: number): void {
    const entries = Array.from(this.memoryCache.entries())
      .sort(([,a], [,b]) => a.timestamp - b.timestamp)
      .slice(0, count);

    for (const [key] of entries) {
      this.memoryCache.delete(key);
    }
  }

  /**
   * Start automatic cleanup timer
   */
  private startCleanupTimer(): void {
    setInterval(() => {
      this.cleanupExpiredEntries();
    }, 60000); // Clean up every minute
  }

  /**
   * Remove expired entries
   */
  private cleanupExpiredEntries(): void {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of this.memoryCache) {
      if (now > entry.expiresAt) {
        this.memoryCache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 Cache cleanup: removed ${cleaned} expired entries`);
    }
  }

  /**
   * Record performance metrics
   */
  private recordMetric(type: string, duration: number): void {
    if (!this.performanceMetrics.has(type)) {
      this.performanceMetrics.set(type, []);
    }

    const metrics = this.performanceMetrics.get(type)!;
    metrics.push(duration);

    // Keep only last 100 measurements
    if (metrics.length > 100) {
      metrics.shift();
    }
  }

  /**
   * Calculate cache hit rate
   */
  private calculateHitRate(): number {
    const hits = this.performanceMetrics.get('cache_hit')?.length || 0;
    const misses = this.performanceMetrics.get('cache_miss')?.length || 0;
    const expired = this.performanceMetrics.get('cache_expired')?.length || 0;

    const total = hits + misses + expired;
    return total > 0 ? hits / total : 0;
  }

  /**
   * Calculate average response time
   */
  private calculateAvgResponseTime(): number {
    const allMetrics = [
      ...(this.performanceMetrics.get('cache_hit') || []),
      ...(this.performanceMetrics.get('cache_miss') || []),
      ...(this.performanceMetrics.get('cache_expired') || [])
    ];

    return allMetrics.length > 0 
      ? allMetrics.reduce((sum, time) => sum + time, 0) / allMetrics.length
      : 0;
  }
}

/**
 * Cache strategies for different data types
 */
export const CacheStrategies = {
  LIVE_DATA: 'live',
  EVENTS: 'events',
  STATISTICS: 'statistics',
  LINEUPS: 'lineups',
  HISTORY: 'history',
  TEAMS: 'teams',
  STANDINGS: 'standings',
  COMMENTARY: 'commentary',
  GEOGRAPHY: 'geography',
  COMPREHENSIVE: 'comprehensive'
} as const;

// Global cache manager instance
export const cacheManager = new CacheManager();