import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import pino from 'pino';

dotenv.config();

export interface EnvConfig {
  name: string;
  baseUrl: string;
  headless: boolean;
  defaultTimeout: number;
  trace: boolean;
  screenshotOnFailure: boolean;
  video?: boolean;
  browser?: 'chromium' | 'firefox' | 'webkit';
  storageState?: string;
}

const logger = pino({ level: process.env.LOG_LEVEL || 'warn' });

export function getEnvName(): string {
  return process.env.TEST_ENV?.trim() || 'local';
}

export function loadEnvConfig(): EnvConfig {
  const name = getEnvName();
  const configPath = path.join(__dirname, 'environments', `${name}.json`);
  if (!fs.existsSync(configPath)) {
    throw new Error(`Environment file not found for: ${name}`);
  }
  const content = fs.readFileSync(configPath, 'utf-8');
  const parsedContent = JSON.parse(content) as EnvConfig;
  return {
    ...parsedContent,
    headless: parsedContent.headless ?? true,
    trace: parsedContent.trace ?? false,
    screenshotOnFailure: parsedContent.screenshotOnFailure ?? true,
    video: parsedContent.video ?? false
  };
}

export function resolveBrowser(envConfig: EnvConfig): 'chromium' | 'firefox' | 'webkit' {
  const defaultBrowser = 'chromium' as const;
  const requestedBrowser = (
    process.env.BROWSER ??
    envConfig.browser ??
    defaultBrowser
  ).toLowerCase();
  if (
    requestedBrowser === 'chromium' ||
    requestedBrowser === 'firefox' ||
    requestedBrowser === 'webkit'
  ) {
    return requestedBrowser as 'chromium' | 'firefox' | 'webkit';
  }
  logger.warn(`Unsupported browser '${requestedBrowser}', defaulting to ${defaultBrowser}`);
  return defaultBrowser;
}
