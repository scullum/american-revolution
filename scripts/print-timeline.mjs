#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const timelinePath = join(__dirname, '..', 'timeline.json');

const data = await readFile(timelinePath, 'utf-8');
const events = JSON.parse(data);

// Sort by year
const sorted = events.sort((a, b) => a.year - b.year);

// Print one line per event
for (const event of sorted) {
  console.log(`${event.year}: ${event.title} - ${event.summary}`);
}
