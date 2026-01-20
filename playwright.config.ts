import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { loadEnvConfig, resolveBrowser } from '@config/env.config';

const envConfig = loadEnvConfig();
const browserName = resolveBrowser(envConfig);
const retries = Number(process.env.RETRIES || '0');
// Global per-test timeout (ms). BDD steps + networked search
// can easily exceed 5s, so use a higher default.
const timeout = Number(process.env.CUCUMBER_TIMEOUT || '30000');
const workerCount = process.env.PLAYWRIGHT_WORKERS
  ? Number(process.env.PLAYWRIGHT_WORKERS)
  : undefined;

const normalizeGlob = (value: string) => value.replace(/\\/g, '/');
const featurePaths = (process.env.FEATURE || 'tests/features/**/*.feature')
  .split(',')
  .map((segment) => segment.trim())
  .filter(Boolean)
  .map(normalizeGlob);

const testDir = defineBddConfig({
  features: featurePaths,
  steps: ['tests/support/bdd.ts', 'tests/support/hooks.ts', 'tests/steps/**/*.ts'],
  tags: process.env.TAGS,
  outputDir: 'tests/.features-gen',
  featuresRoot: '.',
  enrichReporterData: true
});

// Use a unique output directory per run to avoid Windows EPERM
// errors when Playwright cleans up old artifact folders.
const runId = process.env.PW_RUN_ID || `${Date.now()}`;
const defaultOutputDir = `test-results/artifacts/run-${runId}`;

export default defineConfig({
  // Store Playwright artifacts (traces, screenshots, videos, etc.)
  // under a dedicated, per-run subfolder so custom logs/screenshots in
  // test-results/** are not affected by Playwright's cleanup, and so
  // previous runs' artifacts are never deleted again.
  outputDir: process.env.PW_OUTPUT_DIR || defaultOutputDir,
  testDir,
  timeout,
  expect: {
    timeout: envConfig.defaultTimeout
  },
  fullyParallel: true,
  retries,
  workers: workerCount,
  reporter: [
    ['list'],
    // Use Playwright's default HTML report folder (playwright-report)
    // so `npx playwright show-report` works without extra arguments.
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: envConfig.baseUrl,
    headless: envConfig.headless,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    actionTimeout: envConfig.defaultTimeout,
    navigationTimeout: envConfig.defaultTimeout,
    screenshot: envConfig.screenshotOnFailure ? 'only-on-failure' : 'off',
    // Keep traces and videos for failed tests when enabled in env config.
    // Using 'retain-on-failure' ensures artifacts are produced even when
    // there are no retries configured.
    trace: envConfig.trace ? 'retain-on-failure' : 'off',
    video: envConfig.video ? 'retain-on-failure' : 'off'
  },
  projects: [
    {
      name: browserName,
      use: { browserName }
    }
  ]
});
