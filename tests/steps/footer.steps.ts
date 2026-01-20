import { Then } from '../support/bdd';
import { HomePage } from '../pages/home.page';
import { readJson } from '@utils/data-loader';

Then(
  'the footer should contain links from json {string}',
  async ({ pageFixture }, filePath: string) => {
    const home = new HomePage(pageFixture.page);
    const dataset = readJson(filePath) as { links: string[] };
    for (const link of dataset.links) {
      await home.footerLinkVisible(link);
    }
  }
);
