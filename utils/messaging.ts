import { defineExtensionMessaging } from "@webext-core/messaging";

interface ProtocolMap {
  toggleProcessingUI(isProcessing: boolean): void;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
