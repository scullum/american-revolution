import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const timelinePath = join(__dirname, '..', 'timeline.json');

describe('timeline.json', () => {
  it('should contain exactly 6 events', async () => {
    const data = await readFile(timelinePath, 'utf-8');
    const events = JSON.parse(data);
    
    assert.equal(events.length, 6, 'Timeline should have exactly 6 events');
  });

  it('should have events in chronological order', async () => {
    const data = await readFile(timelinePath, 'utf-8');
    const events = JSON.parse(data);
    
    for (let i = 1; i < events.length; i++) {
      const prevYear = events[i - 1].year;
      const currYear = events[i].year;
      
      assert.ok(
        prevYear <= currYear,
        `Events should be in chronological order: ${prevYear} should come before or equal to ${currYear}`
      );
    }
  });
});
