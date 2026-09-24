#!/usr/bin/env node

import {
  parseArgs,
  loadTimeline,
  filterEvents,
  sortEvents,
  formatText,
  formatJson
} from './timeline-parser.mjs';

async function main() {
  try {
    // Parse command-line arguments
    const options = parseArgs(process.argv.slice(2));

    // Load timeline data
    const events = await loadTimeline();

    // Sort by year
    const sorted = sortEvents(events);

    // Filter by year range
    const filtered = filterEvents(sorted, options.from, options.to);

    // Format and output
    if (options.json) {
      console.log(formatJson(filtered));
    } else {
      console.log(formatText(filtered));
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();
