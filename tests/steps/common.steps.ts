import { Given } from '../support/bdd';
import { HomePage } from '../pages/home.page';
import { DocsPage } from '../pages/docs.page';
import { logger } from '@utils/logger';
import { SearchPage } from '@pages/search.page';

Given('I am on the Playwright home page', async ({ pageFixture }) => {
  const home = new HomePage(pageFixture.page);
  await home.open();
});

Given('I am on the Getting Started page', async ({ pageFixture }) => {
  const docs = new DocsPage(pageFixture.page);
  await docs.open();
});

Given('I am on the search page', async ({ pageFixture }) => {
  const search = new SearchPage(pageFixture.page);
  await search.open();
});
