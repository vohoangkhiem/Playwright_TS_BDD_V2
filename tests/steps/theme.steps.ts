import { When, Then } from '../support/bdd';
import { HomePage } from '../pages/home.page';

When('I click the theme toggle button to switch to {string}', async ({ pageFixture }, _mode: string) => {
  const homePage = new HomePage(pageFixture.page);
  await homePage.changeTheme();
});

Then('the website should display in {string} theme', async ({ pageFixture }, expectedTheme: string) => {
  const page = pageFixture.page;
  const homePage = new HomePage(page);

  if (expectedTheme === 'system') {
    const systemTheme = await page.evaluate(() =>
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    );
    await homePage.verifyTheme(systemTheme);
  } else {
    await homePage.verifyTheme(expectedTheme);
  }
});
