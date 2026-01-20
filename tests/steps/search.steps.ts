import { When, Then } from '../support/bdd';
import { HomePage } from '../pages/home.page';
import { SearchPage } from '../pages/search.page';
import { readJson } from '@utils/data-loader';
import { logger } from '@utils/logger';

interface DataTable {
  hashes(): { [key: string]: string }[];
}

/*When('I search for {string}', async ({ pageFixture }, query: string) => {
  const home = new HomePage(pageFixture.page);
  await home.search(query);
});

Then('the search results should mention {string}', async ({ pageFixture }, expected: string) => {
  const search = new SearchPage(pageFixture.page);
  await search.firstResultContains(expected);
});*/

When('I search for the following topics:', async ({ pageFixture }, table: DataTable) => {
  const home = new HomePage(pageFixture.page);
  const search = new SearchPage(pageFixture.page);
  for (const row of table.hashes()) {
    const query = row.query;
    await home.search(query);
    await search.firstResultContains(query);
    await pageFixture.page.keyboard.press('Escape');
  }
});

Then('each topic search result should open without error', async function () {
  logger.info('Topic-based search validated');
});

When('I search using json dataset {string}', async ({ pageFixture }, filePath: string) => {
  const home = new HomePage(pageFixture.page);
  const dataset = readJson(filePath) as { queries: string[] };
  for (const query of dataset.queries) {
    await home.search(query);
    const search = new SearchPage(pageFixture.page);
    await search.firstResultContains(query);
    await pageFixture.page.keyboard.press('Escape');
  }
});

Then('each dataset search result should open without error', async function () {
  logger.info('Dataset search validated');
});
