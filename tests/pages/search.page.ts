import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class SearchPage extends BasePage {

  async open() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
  }

  async firstResultContains(expected: string) {
    await this.page.getByRole('option', { name: `${expected}` }).first().waitFor({ state: 'visible' });
  }
}
