// Enhanced Debug Logging System for GoLivo
// Türkçe ve İngilizce error mesajları ile

interface LogLevel {
  DEBUG: 0;
  INFO: 1;
  WARN: 2;
  ERROR: 3;
}

class DebugLogger {
  private static instance: DebugLogger;
  private logLevel: number = 1; // INFO level default
  private logs: Array<{ level: string; message: string; timestamp: Date; stack?: string }> = [];

  private constructor() {
    // Singleton pattern
    this.setupGlobalErrorHandlers();
  }

  public static getInstance(): DebugLogger {
    if (!DebugLogger.instance) {
      DebugLogger.instance = new DebugLogger();
    }
    return DebugLogger.instance;
  }

  private setupGlobalErrorHandlers() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.error('Global Error Detected', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.error('Unhandled Promise Rejection', {
        reason: event.reason,
        promise: event.promise
      });
    });

    // Chunk load error handler
    window.addEventListener('error', (event) => {
      if (event.message.includes('Loading chunk') || event.message.includes('ChunkLoadError')) {
        this.warn('Chunk Load Error - Attempting Reload', {
          message: event.message,
          action: 'auto_reload'
        });
        
        // Auto reload after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  }

  public debug(message: string, data?: any) {
    if (this.logLevel <= 0) {
      this.log('DEBUG', message, data);
    }
  }

  public info(message: string, data?: any) {
    if (this.logLevel <= 1) {
      this.log('INFO', message, data);
    }
  }

  public warn(message: string, data?: any) {
    if (this.logLevel <= 2) {
      this.log('WARN', message, data);
    }
  }

  public error(message: string, data?: any) {
    this.log('ERROR', message, data);
  }

  private log(level: string, message: string, data?: any) {
    const timestamp = new Date();
    const logEntry = {
      level,
      message,
      timestamp,
      stack: level === 'ERROR' ? new Error().stack : undefined
    };

    // Store log entry
    this.logs.push(logEntry);

    // Keep only last 100 logs
    if (this.logs.length > 100) {
      this.logs.shift();
    }

    // Console output with styling
    const style = this.getConsoleStyle(level);
    const prefix = this.getLogPrefix(level);
    
    console.log(
      `%c${prefix} ${message}`,
      style,
      data ? data : ''
    );

    // Special handling for errors
    if (level === 'ERROR') {
      console.error('⚽ GoLivo Error Details:', data);
      
      // Send to analytics if in production
      if (import.meta.env.PROD) {
        this.sendErrorToAnalytics(message, data);
      }
    }
  }

  private getConsoleStyle(level: string): string {
    const styles = {
      DEBUG: 'color: #6B7280; background: #F3F4F6; padding: 2px 6px; border-radius: 3px;',
      INFO: 'color: #059669; background: #ECFDF5; padding: 2px 6px; border-radius: 3px;',
      WARN: 'color: #D97706; background: #FFFBEB; padding: 2px 6px; border-radius: 3px;',
      ERROR: 'color: #DC2626; background: #FEF2F2; padding: 2px 6px; border-radius: 3px; font-weight: bold;'
    };
    return styles[level as keyof typeof styles] || styles.INFO;
  }

  private getLogPrefix(level: string): string {
    const prefixes = {
      DEBUG: '🔍 DEBUG',
      INFO: '📝 INFO',
      WARN: '⚠️ UYARI',
      ERROR: '🚨 HATA'
    };
    return prefixes[level as keyof typeof prefixes] || '📝 LOG';
  }

  private sendErrorToAnalytics(message: string, data: any) {
    // Implementation for sending errors to analytics service
    // This could be Google Analytics, Sentry, or custom analytics
    try {
      // Example: Send to external service
      fetch('/api/analytics/error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          data,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      }).catch(() => {
        // Silently fail analytics
      });
    } catch (e) {
      // Don't let analytics errors crash the app
    }
  }

  public setLogLevel(level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR') {
    const levels = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
    this.logLevel = levels[level];
    this.info(`Log level set to: ${level}`);
  }

  public exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  public clearLogs() {
    this.logs = [];
    this.info('Debug logs cleared');
  }

  // Turkish/English error messages helper
  public logBilingualError(trMessage: string, enMessage: string, data?: any) {
    this.error(`🇹🇷 ${trMessage} | 🇺🇸 ${enMessage}`, data);
  }

  public logBilingualWarn(trMessage: string, enMessage: string, data?: any) {
    this.warn(`🇹🇷 ${trMessage} | 🇺🇸 ${enMessage}`, data);
  }
}

// Export singleton instance
export const logger = DebugLogger.getInstance();

// Export utility functions
export const logError = (message: string, data?: any) => logger.error(message, data);
export const logWarn = (message: string, data?: any) => logger.warn(message, data);
export const logInfo = (message: string, data?: any) => logger.info(message, data);
export const logDebug = (message: string, data?: any) => logger.debug(message, data);

// Bilingual logging
export const logBilingualError = (tr: string, en: string, data?: any) => logger.logBilingualError(tr, en, data);
export const logBilingualWarn = (tr: string, en: string, data?: any) => logger.logBilingualWarn(tr, en, data);