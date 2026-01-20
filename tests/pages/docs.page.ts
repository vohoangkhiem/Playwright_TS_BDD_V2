import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class DocsPage extends BasePage {

  async open() {
    await this.page.goto('/docs/intro', { waitUntil: 'domcontentloaded' });
  }

  async openSidebarItem(text: string) {
    await expect(async () => {
      await this.page.getByRole('link', { name: text, exact: true }).click();
    }).toPass();
  }

  async expectContentHeader(text: string) {
    await expect(this.page.getByRole('heading', { name: text, level: 1 })).toBeVisible();
  }
}
