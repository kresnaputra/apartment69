import { Capacitor } from "@capacitor/core";
import {
  AdMob,
  InterstitialAdPluginEvents,
} from "@capacitor-community/admob";

const DEFAULT_ANDROID_INTERSTITIAL_ID = "ca-app-pub-3940256099942544/1033173712";
const PRODUCTION_ANDROID_INTERSTITIAL_ID = "ca-app-pub-4155071339433058/6638950171";

let initialized = false;

const isAdMobEnabled = () => import.meta.env.VITE_ENABLE_ADMOB !== "false";
const isAdMobTesting = () => import.meta.env.VITE_ADMOB_TEST_MODE === "true";

const isAndroidNative = () =>
  Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android";

const getInterstitialId = () =>
  import.meta.env.VITE_ADMOB_ANDROID_INTERSTITIAL_ID ||
  (isAdMobTesting()
    ? DEFAULT_ANDROID_INTERSTITIAL_ID
    : PRODUCTION_ANDROID_INTERSTITIAL_ID);

export const initializeAdMob = async () => {
  if (!isAdMobEnabled() || !isAndroidNative() || initialized) return;

  await AdMob.initialize({
    initializeForTesting: isAdMobTesting(),
  });

  initialized = true;
};

export const showDayTransitionInterstitial = async () => {
  if (!isAdMobEnabled() || !isAndroidNative()) return;

  await initializeAdMob();

  await new Promise<void>(async (resolve) => {
    const cleanup = async () => {
      await Promise.allSettled([
        dismissedListener?.remove(),
        failedToLoadListener?.remove(),
        failedToShowListener?.remove(),
      ]);
    };

    let dismissedListener: { remove: () => Promise<void> } | null = null;
    let failedToLoadListener: { remove: () => Promise<void> } | null = null;
    let failedToShowListener: { remove: () => Promise<void> } | null = null;

    const finish = async () => {
      await cleanup();
      resolve();
    };

    dismissedListener = await AdMob.addListener(
      InterstitialAdPluginEvents.Dismissed,
      () => {
        void finish();
      },
    );

    failedToLoadListener = await AdMob.addListener(
      InterstitialAdPluginEvents.FailedToLoad,
      () => {
        void finish();
      },
    );

    failedToShowListener = await AdMob.addListener(
      InterstitialAdPluginEvents.FailedToShow,
      () => {
        void finish();
      },
    );

    try {
      await AdMob.prepareInterstitial({
        adId: getInterstitialId(),
        isTesting: isAdMobTesting(),
      });
      await AdMob.showInterstitial();
    } catch {
      await finish();
    }
  });
};
