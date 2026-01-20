import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export type DataFile = Record<string, unknown>;

export const readJson = (relativePath: string): unknown => {
  const fullPath = path.resolve(process.cwd(), relativePath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(content);
};

export const readCsv = (relativePath: string): DataFile[] => {
  const fullPath = path.resolve(process.cwd(), relativePath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return parse(content, {
    columns: true,
    skip_empty_lines: true
  }) as DataFile[];
};
