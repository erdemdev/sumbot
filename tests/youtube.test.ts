import { describe, it, expect } from 'vitest';
import { getSubtitles, getVideoDetails } from 'youtube-caption-extractor';

describe('Youtube Captions Parser', () => {
  it('should extract captions for a given video ID', async () => {
    // Replace with a valid YouTube video ID for testing
    const videoId = '5nS6c6kZhjQ';
    const captions = await getSubtitles({ videoID: videoId });
    const details = await getVideoDetails({ videoID: videoId });

    console.info('Captions:', captions);
    console.info('Details:', details);

    // Expect the result to be an array
    expect(Array.isArray(captions)).toBe(true);

    // Expect the array to contain caption objects with text and start properties
    if (captions.length > 0) {
      expect(captions[0]).toHaveProperty('text');
      expect(captions[0]).toHaveProperty('start');
    }
  });
});
