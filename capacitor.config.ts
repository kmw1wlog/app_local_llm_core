import type { CapacitorConfig } from "@capacitor/cli";

const defaultRemoteUrl = "https://app-local-llm-core.vercel.app/";
const remoteUrl = process.env.WORKOS_APP_WEB_URL?.trim() || defaultRemoteUrl;

if (!remoteUrl.startsWith("https://")) {
  throw new Error("WORKOS_APP_WEB_URL must start with https://");
}

const config: CapacitorConfig = {
  appId: "com.kmw1wlog.aiworkosconsole",
  appName: "AI WorkOS",
  webDir: "capacitor-web",
  server: {
    url: remoteUrl,
    cleartext: false,
    androidScheme: "https",
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: true,
  },
};

export default config;
