import TranscriptAPI from "youtube-transcript-api";
import { ExtractedContent } from ".";

export async function extractYoutubeTranscript(): Promise<ExtractedContent> {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  if (!tab?.id || !tab.url) {
    throw new Error("No active tab or URL found");
  }

  try {
    // Extract video ID from URL
    const videoId = extractVideoId(tab.url);
    if (!videoId) {
      throw new Error("Could not extract YouTube video ID");
    }

    // Fetch transcript with timestamps
    const captions = await TranscriptAPI.getTranscript(videoId);

    // Format content with timestamps
    const content = captions
      .map((entry: { start: string; duration: string; text: string }) => {
        const startTime = parseFloat(entry.start);
        const duration = parseFloat(entry.duration);
        const endTime = startTime + duration;

        // Format: [MM:SS-MM:SS] Text
        return `[${formatTime(startTime)}-${formatTime(endTime)}] ${entry.text}`;
      })
      .join("\n")
      .replace(/&amp;#39;/g, "")
      .trim();

    // Get the page title using scripting API
    const titleResult = await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.title,
    });

    const title = String(titleResult[0]?.result);

    return {
      title,
      content: content || "",
      timestamp: new Date().toISOString(),
      url: tab.url,
    };
  } catch (error) {
    console.error("Failed to extract YouTube transcript:", error);
    return {
      title: "",
      content: "",
      timestamp: new Date().toISOString(),
      url: tab.url,
    };
  }
}

// Helper to extract video ID from YouTube URL
function extractVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

// Format seconds to MM:SS
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
