import { describe, it, expect } from "vitest";
import TranscriptAPI from "youtube-transcript-api";

it("should extract captions for a given video ID", async () => {
  // Replace with a valid YouTube video ID for testing
  const videoId = "5nS6c6kZhjQ";
  const captions = await TranscriptAPI.getTranscript(videoId);

  // Expect the result to be an array
  expect(Array.isArray(captions)).toBe(true);

  // Expect the array to contain caption objects with text and start properties
  if (captions.length > 0) {
    expect(captions[0]).toHaveProperty("text");
    expect(captions[0]).toHaveProperty("start");
    expect(captions[0]).toHaveProperty("duration");
  }
});

it("should throw an error for a video ID without captions", async () => {
  const videoId = "YvGcJ81lB7Y";
  await expect(TranscriptAPI.getTranscript(videoId)).rejects.toThrow();
});
