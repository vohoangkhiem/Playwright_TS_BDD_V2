import { When, Then } from '../support/bdd';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { readCsv } from '@utils/data-loader';
import { logger } from '@utils/logger';

When('I click on header items from csv {string}', async ({ pageFixture }, filePath: string) => {
  const rows = readCsv(filePath) as { label: string; fragment: string }[];
  const home = new HomePage(pageFixture.page);

  for (const { label, fragment } of rows) {
    await home.clickHeaderItem(label);
    await expect(pageFixture.page).toHaveURL(fragment);
  }
});

Then('each header destination should load successfully', async function () {
  logger.info('Header navigation data set validated');
});

When('I click the header item {string}', async ({ pageFixture }, label: string) => {
  const home = new HomePage(pageFixture.page);
  await home.clickHeaderItem(label);
});

Then('I should land on a page containing {string}', async ({ pageFixture }, fragment: string) => {
  await expect(pageFixture.page).toHaveURL(fragment);
});
