import { promises as fs } from 'fs';
import path from 'path';
import { Before, After, BeforeAll, AfterAll } from './bdd';
import { logger } from '@utils/logger';

const screenshotDir = path.join('test-results', 'screenshots');

const ensureScreenshotDir = async () => {
  await fs.mkdir(screenshotDir, { recursive: true }).catch(() => undefined);
};

const sanitize = (value: string) => value.replace(/[^a-z0-9-_]+/gi, '_');

BeforeAll(async () => {
  // Runs once per worker process, before any scenario in that worker starts
  await ensureScreenshotDir();
  logger.info('Playwright BDD run starting');
});

Before(async ({ $testInfo, envConfig }) => {
  logger.info(
    { project: $testInfo.project.name, env: envConfig.name },
    `Starting scenario: ${$testInfo.title}`
  );
});

After(async ({ $testInfo, envConfig, scenarioContext, pageFixture }) => {
  if ($testInfo.error) {
    logger.error({ err: $testInfo.error }, `Scenario failed: ${$testInfo.title}`);
    if (envConfig.screenshotOnFailure) {
      await ensureScreenshotDir();
      const fileName = `${sanitize($testInfo.title)}-${Date.now()}.png`;
      const screenshotPath = path.join(screenshotDir, fileName);
      await pageFixture.page.screenshot({ path: screenshotPath, fullPage: true }).catch((error) => {
        logger.error({ err: error }, 'Failed to capture failure screenshot');
      });
    }
  } else {
    logger.info(`Scenario passed: ${$testInfo.title}`);
  }

  for (const extraPage of scenarioContext.extraPages) {
    if (!extraPage.isClosed()) {
      await extraPage.close().catch(() => undefined);
    }
  }
  scenarioContext.extraPages.clear();
});

AfterAll(async () => {
  // runs once per worker process, but only after that worker finishes all of the scenarios assigned to it
  logger.info('Playwright BDD run completed');
});
