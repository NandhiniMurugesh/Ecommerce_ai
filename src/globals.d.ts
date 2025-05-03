// /types/global.d.ts

export {};

declare global {
  interface Window {
    botpressWebChat?: {
      init: (config: object) => void;
      onEvent: (callback: () => void, events: string[]) => void;
      sendEvent: (event: { type: string }) => void;
    };
  }
}
