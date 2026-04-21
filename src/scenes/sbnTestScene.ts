import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, jump, narrate, say, show } from "@/scenes/scriptTypes";
import mayaBedroom from "@/background/maya-bedroom.png";

export const sbnTestScene: VisualNovelCommand[] = [
  bg(mayaBedroom, tx({
    id: "Kamar Maya - Tes SBN",
    en: "Maya's Room - SBN Test",
    ja: "マヤの部屋 - SBNテスト",
    ko: "마야의 방 - SBN 테스트",
  })),
  narrate(
    tx({
      id: "Scene debug ini dibuat untuk memastikan karakter bisa dirender dari bundle .sbn, bukan cuma spritesheet.",
      en: "This debug scene checks whether a character can be rendered from an .sbn bundle instead of only spritesheets.",
      ja: "このデバッグシーンは、キャラクターがスプライトシートだけでなく .sbn バンドルからも描画できるかを確認するためのものです。",
      ko: "이 디버그 씬은 캐릭터가 스프라이트시트뿐 아니라 .sbn 번들에서도 렌더링되는지 확인하기 위한 장면입니다.",
    }),
  ),
  show("maya-sbn-test", "maya", "angry", {
    position: "center",
    enterFrom: "fade",
    y: -120,
  }),
  say("maya", "angry", tx({
    id: "Kalau kamu bisa lihat aku bergerak di scene ini, berarti pipeline SBN kita sudah kebaca.",
    en: "If you can see me moving in this scene, it means our SBN pipeline is working.",
    ja: "このシーンで私が動いて見えるなら、SBN パイプラインはちゃんと動いてるってことだよ。",
    ko: "이 장면에서 내가 움직이는 게 보인다면, 우리 SBN 파이프라인이 제대로 동작하는 거야.",
  })),
  narrate(
    tx({
      id: "Setelah ini alur cerita akan lanjut ke opening biasa.",
      en: "After this, the story will continue to the normal opening.",
      ja: "この後は通常のオープニングに進みます。",
      ko: "이후에는 일반 오프닝으로 이어집니다.",
    }),
  ),
  jump("opening"),
];
