import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.visualnovel.app",
  appName: "Visual Novel",
  webDir: "dist",
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
    },
  },
  server: {
    androidScheme: "https",
  },
};

export default config;
