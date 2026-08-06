import { describe, expect, test } from 'bun:test';
import {
  AI_NATIVE_SOFTWARE_ENGINEERING_SERIES,
  findSeriesMembership,
  seriesPostPath,
} from './series';

const series = AI_NATIVE_SOFTWARE_ENGINEERING_SERIES;

describe('AI-native software engineering series', () => {
  test('uses a unique slug for every part', () => {
    const slugs = series.parts.map((part) => part.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test('orders all five parts contiguously', () => {
    expect(series.parts.map((part) => part.order)).toEqual([1, 2, 3, 4, 5]);
  });

  test('points every role entry to an existing part', () => {
    const partNumbers = new Set(series.parts.map((part) => part.order));
    expect(series.entryPoints.every((entry) => partNumbers.has(entry.part))).toBe(true);
  });

  test('resolves previous and next parts', () => {
    const membership = findSeriesMembership('en', 'model-is-only-one-part-of-system');

    expect(membership?.part.order).toBe(3);
    expect(membership?.previous?.order).toBe(2);
    expect(membership?.next?.order).toBe(4);
  });

  test('keeps the endpoints bounded', () => {
    const first = findSeriesMembership('en', series.parts[0]!.slug);
    const last = findSeriesMembership('en', series.parts[4]!.slug);

    expect(first?.previous).toBeUndefined();
    expect(first?.next?.order).toBe(2);
    expect(last?.previous?.order).toBe(4);
    expect(last?.next).toBeUndefined();
  });

  test('does not match unrelated posts or locales', () => {
    expect(findSeriesMembership('en', 'unrelated-post')).toBeUndefined();
    expect(
      findSeriesMembership('en', 'ai-native-software-engineering-isnt-about-ai')?.series.id,
    ).toBe(series.id);
  });

  test('builds logical post paths from canonical slugs', () => {
    expect(seriesPostPath(series.parts[2]!)).toBe('/posts/model-is-only-one-part-of-system/');
  });
});
