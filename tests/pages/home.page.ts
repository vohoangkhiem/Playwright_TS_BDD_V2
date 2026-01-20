import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {

  async open() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async search(query: string) {
    await this.page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
    await this.page.getByRole('searchbox', { name: 'Search' }).fill(query);
  }

  async changeTheme() {
    await this.page.getByRole('button', { name: 'Switch between dark and light mode', exact: false }).click();
  }

  async verifyTheme(theme: string) {
    await expect(this.page.locator('html')).toHaveAttribute('data-theme', theme); 
  }

  async clickHeaderItem(label: string) {
    await this.page.getByRole('link', { name: label, exact: false }).first().click();
  }

  async footerLinkVisible(label: string) {
    await this.page.getByRole('link', { name: label, exact: true, }).waitFor({ state: 'visible' });
  }
}
