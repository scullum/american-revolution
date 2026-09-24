import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawn } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const timelinePath = join(__dirname, '..', 'timeline.json');
const scriptPath = join(__dirname, '..', 'scripts', 'print-timeline.mjs');

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

describe('print-timeline CLI', () => {
  function runScript(args = []) {
    return new Promise((resolve, reject) => {
      const proc = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let stdout = '';
      let stderr = '';

      proc.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      proc.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      proc.on('close', (code) => {
        resolve({ code, stdout, stderr });
      });

      proc.on('error', reject);
    });
  }

  it('should print all events in text format with no options', async () => {
    const { code, stdout } = await runScript();
    
    assert.equal(code, 0, 'Script should exit with code 0');
    const lines = stdout.trim().split('\n');
    assert.equal(lines.length, 6, 'Should output 6 events');
    
    // Verify format: YEAR: TITLE - SUMMARY
    for (const line of lines) {
      assert.match(line, /^\d+:.*-.*$/, `Line should match format "YEAR: TITLE - SUMMARY": ${line}`);
    }
  });

  it('should filter events with --from YEAR (inclusive)', async () => {
    const { code, stdout } = await runScript(['--from', '1773']);
    
    assert.equal(code, 0, 'Script should exit with code 0');
    const lines = stdout.trim().split('\n');
    
    // Should include 1773, 1775, 1776, 1781 (4 events)
    assert.equal(lines.length, 4, 'Should output 4 events from 1773 onwards');
    
    // First line should be 1773
    assert.match(lines[0], /^1773:/, 'First event should be from 1773');
  });

  it('should filter events with --to YEAR (inclusive)', async () => {
    const { code, stdout } = await runScript(['--to', '1775']);
    
    assert.equal(code, 0, 'Script should exit with code 0');
    const lines = stdout.trim().split('\n');
    
    // Should include 1765, 1770, 1773, 1775 (4 events)
    assert.equal(lines.length, 4, 'Should output 4 events up to 1775');
    
    // Last line should be 1775
    assert.match(lines[lines.length - 1], /^1775:/, 'Last event should be from 1775');
  });

  it('should filter events with both --from and --to', async () => {
    const { code, stdout } = await runScript(['--from', '1770', '--to', '1776']);
    
    assert.equal(code, 0, 'Script should exit with code 0');
    const lines = stdout.trim().split('\n');
    
    // Should include 1770, 1773, 1775, 1776 (4 events)
    assert.equal(lines.length, 4, 'Should output 4 events in range');
    
    assert.match(lines[0], /^1770:/, 'First event should be from 1770');
    assert.match(lines[lines.length - 1], /^1776:/, 'Last event should be from 1776');
  });

  it('should output JSON with --json flag', async () => {
    const { code, stdout } = await runScript(['--json']);
    
    assert.equal(code, 0, 'Script should exit with code 0');
    
    let events;
    try {
      events = JSON.parse(stdout);
    } catch (e) {
      assert.fail(`Output should be valid JSON: ${e.message}`);
    }
    
    assert.ok(Array.isArray(events), 'JSON output should be an array');
    assert.equal(events.length, 6, 'Should output 6 events');
    
    // Verify structure
    for (const event of events) {
      assert.ok(event.year, 'Event should have year');
      assert.ok(event.title, 'Event should have title');
      assert.ok(event.summary, 'Event should have summary');
    }
  });

  it('should output filtered JSON with --json and --from', async () => {
    const { code, stdout } = await runScript(['--json', '--from', '1775']);
    
    assert.equal(code, 0, 'Script should exit with code 0');
    
    let events;
    try {
      events = JSON.parse(stdout);
    } catch (e) {
      assert.fail(`Output should be valid JSON: ${e.message}`);
    }
    
    assert.ok(Array.isArray(events), 'JSON output should be an array');
    assert.equal(events.length, 3, 'Should output 3 events from 1775 onwards');
    
    // All events should be >= 1775
    for (const event of events) {
      assert.ok(event.year >= 1775, `Event year ${event.year} should be >= 1775`);
    }
  });

  it('should output filtered JSON with --json and --to', async () => {
    const { code, stdout } = await runScript(['--json', '--to', '1773']);
    
    assert.equal(code, 0, 'Script should exit with code 0');
    
    let events;
    try {
      events = JSON.parse(stdout);
    } catch (e) {
      assert.fail(`Output should be valid JSON: ${e.message}`);
    }
    
    assert.ok(Array.isArray(events), 'JSON output should be an array');
    assert.equal(events.length, 3, 'Should output 3 events up to 1773');
    
    // All events should be <= 1773
    for (const event of events) {
      assert.ok(event.year <= 1773, `Event year ${event.year} should be <= 1773`);
    }
  });

  it('should output filtered JSON with --json, --from and --to', async () => {
    const { code, stdout } = await runScript(['--json', '--from', '1770', '--to', '1776']);
    
    assert.equal(code, 0, 'Script should exit with code 0');
    
    let events;
    try {
      events = JSON.parse(stdout);
    } catch (e) {
      assert.fail(`Output should be valid JSON: ${e.message}`);
    }
    
    assert.ok(Array.isArray(events), 'JSON output should be an array');
    assert.equal(events.length, 4, 'Should output 4 events in range');
    
    for (const event of events) {
      assert.ok(event.year >= 1770 && event.year <= 1776, `Event year ${event.year} should be in range [1770, 1776]`);
    }
  });

  it('should exit nonzero with invalid --from year', async () => {
    const { code, stderr } = await runScript(['--from', 'invalid']);
    
    assert.notEqual(code, 0, 'Script should exit with nonzero code');
    assert.match(stderr, /invalid|year|number/i, 'Error message should mention invalid year');
  });

  it('should exit nonzero with invalid --to year', async () => {
    const { code, stderr } = await runScript(['--to', 'abc']);
    
    assert.notEqual(code, 0, 'Script should exit with nonzero code');
    assert.match(stderr, /invalid|year|number/i, 'Error message should mention invalid year');
  });

  it('should exit nonzero when --from is missing a value', async () => {
    const { code, stderr } = await runScript(['--from']);
    
    assert.notEqual(code, 0, 'Script should exit with nonzero code');
    assert.match(stderr, /missing|value|requires|argument/i, 'Error message should mention missing value');
  });

  it('should exit nonzero when --to is missing a value', async () => {
    const { code, stderr } = await runScript(['--to']);
    
    assert.notEqual(code, 0, 'Script should exit with nonzero code');
    assert.match(stderr, /missing|value|requires|argument/i, 'Error message should mention missing value');
  });

  it('should exit nonzero when --from is greater than --to', async () => {
    const { code, stderr } = await runScript(['--from', '1776', '--to', '1770']);
    
    assert.notEqual(code, 0, 'Script should exit with nonzero code');
    assert.match(stderr, /from|to|greater|less|range|invalid/i, 'Error message should mention range issue');
  });

  it('should exit nonzero with unknown option', async () => {
    const { code, stderr } = await runScript(['--unknown']);
    
    assert.notEqual(code, 0, 'Script should exit with nonzero code');
    assert.match(stderr, /unknown|unrecognized|invalid|option/i, 'Error message should mention unknown option');
  });

  it('should preserve chronological order in JSON output', async () => {
    const { code, stdout } = await runScript(['--json']);
    
    assert.equal(code, 0, 'Script should exit with code 0');
    const events = JSON.parse(stdout);
    
    for (let i = 1; i < events.length; i++) {
      assert.ok(events[i - 1].year <= events[i].year, 'Events should be in chronological order');
    }
  });
});
