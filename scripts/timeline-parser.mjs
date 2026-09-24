import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const timelinePath = join(__dirname, '..', 'timeline.json');

/**
 * Validate that a string is a valid integer (no decimals, suffixes, or other characters)
 * 
 * @param {string} value - The string to validate
 * @returns {boolean} True if the entire string is a valid integer
 */
function isValidInteger(value) {
  // Check if the entire string matches the pattern of an optional sign followed by digits
  return /^-?\d+$/.test(value);
}

/**
 * Parse command-line arguments into an options object.
 * Supports: --from YEAR, --to YEAR, --json
 * 
 * @param {string[]} args - Command-line arguments (process.argv.slice(2))
 * @returns {Object} Options object with from, to, json properties
 * @throws {Error} If arguments are invalid
 */
export function parseArgs(args) {
  const options = {
    from: null,
    to: null,
    json: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--from') {
      if (i + 1 >= args.length) {
        throw new Error('--from requires a value');
      }
      const value = args[++i];
      if (!isValidInteger(value)) {
        throw new Error(`Invalid year for --from: "${value}" is not a valid integer`);
      }
      options.from = parseInt(value, 10);
    } else if (arg === '--to') {
      if (i + 1 >= args.length) {
        throw new Error('--to requires a value');
      }
      const value = args[++i];
      if (!isValidInteger(value)) {
        throw new Error(`Invalid year for --to: "${value}" is not a valid integer`);
      }
      options.to = parseInt(value, 10);
    } else if (arg === '--json') {
      options.json = true;
    } else {
      throw new Error(`Unknown option: "${arg}"`);
    }
  }

  // Validate range
  if (options.from !== null && options.to !== null && options.from > options.to) {
    throw new Error(`Invalid range: --from (${options.from}) cannot be greater than --to (${options.to})`);
  }

  return options;
}

/**
 * Load and parse the timeline data from timeline.json
 * 
 * @returns {Promise<Array>} Array of event objects
 */
export async function loadTimeline() {
  const data = await readFile(timelinePath, 'utf-8');
  return JSON.parse(data);
}

/**
 * Filter events based on year range
 * 
 * @param {Array} events - Array of event objects
 * @param {number|null} from - Minimum year (inclusive), or null for no minimum
 * @param {number|null} to - Maximum year (inclusive), or null for no maximum
 * @returns {Array} Filtered events
 */
export function filterEvents(events, from = null, to = null) {
  return events.filter(event => {
    if (from !== null && event.year < from) return false;
    if (to !== null && event.year > to) return false;
    return true;
  });
}

/**
 * Sort events by year in ascending order
 * 
 * @param {Array} events - Array of event objects
 * @returns {Array} Sorted events
 */
export function sortEvents(events) {
  return events.sort((a, b) => a.year - b.year);
}

/**
 * Format events as text output (one line per event)
 * 
 * @param {Array} events - Array of event objects
 * @returns {string} Formatted text output
 */
export function formatText(events) {
  return events.map(event => `${event.year}: ${event.title} - ${event.summary}`).join('\n');
}

/**
 * Format events as JSON output
 * 
 * @param {Array} events - Array of event objects
 * @returns {string} JSON string
 */
export function formatJson(events) {
  return JSON.stringify(events, null, 2);
}
