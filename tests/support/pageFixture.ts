import type { Page } from '@playwright/test';
import { logger } from '@utils/logger';

/**
 * Per-scenario helper that wraps Playwright Page and shared logger.
 * Exposed as a fixture from bdd.ts so steps can use pageFixture.page / pageFixture.logger.
 */
export class PageFixture {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get logger() {
    return logger;
  }

  setPage(page: Page) {
    this.page = page;
  }
}
