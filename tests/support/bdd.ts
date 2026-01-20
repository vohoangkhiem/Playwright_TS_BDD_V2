import { test as base, createBdd } from 'playwright-bdd';
import { expect, type Page } from '@playwright/test';
import { loadEnvConfig, type EnvConfig } from '@config/env.config';
import { PageFixture } from './pageFixture';

export interface ScenarioContext {
  extraPages: Set<Page>;
  setPage: (page: Page) => void;
}

type Fixtures = {
  envConfig: EnvConfig;
  scenarioContext: ScenarioContext;
  pageFixture: PageFixture;
};

export const test = base.extend<Fixtures>({
  envConfig: async ({}, use) => {
    await use(loadEnvConfig());
  },
  pageFixture: async ({ page }, use) => {
    await use(new PageFixture(page));
  },
  scenarioContext: async ({ page, pageFixture }, use) => {
    const initialPage = page;
    const extraPages = new Set<Page>();
    const context: ScenarioContext = {
      extraPages,
      setPage: (newPage: Page) => {
        pageFixture.setPage(newPage);
        if (newPage !== initialPage) {
          extraPages.add(newPage);
        }
      }
    };

    await use(context);
  }
});

export const { Given, When, Then, Step, Before, After, BeforeAll, AfterAll } = createBdd(test);
export { expect };
