import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

// In video call, set mode to "rtc"
const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

root.render(
  <StrictMode>
    <AgoraRTCProvider client={client}>
      <App />
    </AgoraRTCProvider>
  </StrictMode>
);
