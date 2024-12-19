import { LogLevel } from '../types';

class Logger {
  private static instance: Logger;
  private isDevelopment = import.meta.env.DEV;
  private logLevel: LogLevel = (import.meta.env.LOG_LEVEL as LogLevel) || 'info'; // Default log level

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaString = meta ? `\nMeta: ${JSON.stringify(meta, null, 2)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}`;
  }

  private log(level: LogLevel, message: string, meta?: any) {
    if (!this.shouldLog(level)) return; // Check if the log level allows logging

    const formattedMessage = this.formatMessage(level, message, meta);
    
    switch (level) {
      case 'error':
        console.error(formattedMessage);
        if (!this.isDevelopment) {
          this.sendToErrorTrackingService({ message, meta });
        }
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      case 'info':
        console.info(formattedMessage);
        break;
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formattedMessage);
        }
        break;
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = ['error', 'warn', 'info', 'debug'];
    return levels.indexOf(level) <= levels.indexOf(this.logLevel);
  }

  private sendToErrorTrackingService(errorData: any) {
    // Implement your error tracking logic here
  }

  error(message: string, meta?: any) {
    this.log('error', message, meta);
  }

  warn(message: string, meta?: any) {
    this.log('warn', message, meta);
  }

  info(message: string, meta?: any) {
    this.log('info', message, meta);
  }

  debug(message: string, meta?: any) {
    this.log('debug', message, meta);
  }
}

export const logger = Logger.getInstance();