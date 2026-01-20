import { When, Then } from '../support/bdd';
import { DocsPage } from '../pages/docs.page';

When('I open the doc sidebar item {string}', async ({ pageFixture }, section: string) => {
  const docs = new DocsPage(pageFixture.page);
  await docs.openSidebarItem(section);
});

Then('the page should show header {string}', async ({ pageFixture }, section: string) => {
  const docs = new DocsPage(pageFixture.page);
  await docs.expectContentHeader(section);
});
