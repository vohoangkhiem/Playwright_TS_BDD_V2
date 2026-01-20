import fs from 'fs';
import path from 'path';
import pino from 'pino';

// Log level controls verbosity (trace, debug, info, warn, error, fatal).
// Pino encodes these as numbers in the JSON output, e.g. 30 = info.
const level = process.env.LOG_LEVEL || 'warn';

// Simple local-time timestamp using the machine's locale/timezone.
// Pino expects this function to return a JSON fragment starting with a comma.
const timestamp = () => `,"time":"${new Date().toLocaleString()}"`;

// Ensure a persistent log file under test-results/logs so that
// scenario start/pass/fail events are always recorded on disk.
const logDir = path.join('test-results', 'logs');
const logFile = path.join(logDir, 'test-run.log');

// Create the directory tree if it does not exist.
fs.mkdirSync(logDir, { recursive: true });

// Multi-stream logger: write JSON logs both to stdout and to the file.
const streams = [
  { stream: process.stdout },
  { stream: fs.createWriteStream(logFile, { flags: 'a' }) }
];

export const logger = pino(
  {
    level,
    base: undefined,
    timestamp
  },
  pino.multistream(streams)
);
