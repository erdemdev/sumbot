declare module 'youtube-transcript-api' {
  interface Caption {
    text: string;
    start: string;
    duration: string;
  }

  class TranscriptAPI {
    static getTranscript(id: string, langCode?: string, config?: object): Promise<Caption[]>;
    /**
     * @deprecated
     */
    static validateID(id: string, config?: object): Promise<boolean>;
  }

  export default TranscriptAPI;
}