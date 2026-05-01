import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, jump, narrate } from "@/scenes/scriptTypes";
import apartment from "@/background/apartment.png";

export const openingScene: VisualNovelCommand[] = [
  bg(
    apartment,
    tx({
      id: "Lentera Apartments",
      en: "Lentera Apartments",
      ja: "レンテラ・アパートメント",
      ko: "렌테라 아파트",
    }),
    {
      backgroundAnimation: {
        panX: -8,
        panY: 0,
        duration: 10,
      },
    },
  ),
  narrate(
    tx({
      id: "Lentera Apartments. Namanya memang terdengar megah, tapi aslinya nggak semewah itu. Tetap saja, uang muka tempat ini cukup murah buat bikin aku bertahan beberapa bulan. Aku cuma butuh tempat yang tenang, jauh dari bising kota, dan yang paling penting... tempat di mana nggak ada yang peduli siapa aku sebenarnya.",
      en: "Lentera Apartments. It's definitely not as grand as the name suggests, but the deposit here was cheap enough to keep me afloat for a few months. I just need a quiet place, somewhere far from the city's constant noise, and more importantly... a place where nobody cares who I really am.",
      ja: "レンテラ・アパートメント。名前ほど立派な場所じゃないけど、ここは敷金が安くて、しばらく食いつなぐには十分だった。欲しかったのはただ静かな場所。街の騒音から離れて、そして何より…本当の自分を誰にも気にされない場所だ。",
      ko: "렌테라 아파트. 이름만 들으면 꽤 그럴싸하지만, 실제로는 그렇게 대단한 곳은 아니다. 그래도 보증금이 싸서 몇 달은 버틸 수 있었다. 내가 원한 건 그저 조용한 곳, 도시의 소음에서 멀리 떨어진 곳, 그리고 무엇보다... 내가 어떤 사람인지 아무도 신경 쓰지 않는 곳이었다.",
    }),
  ),
  narrate(
    tx({
      id: "Pekerjaan freelance IT dan kebiasaanku membetulkan barang rusak biasanya bikin aku lebih nyaman sendirian. Tapi sepertinya bangunan tua ini punya rencana lain buatku.",
      en: "Arka (thinking): My freelance IT work and my habit of fixing broken gadgets usually mean I prefer being alone. But, it looks like this old building has other plans for me.",
      ja: "アルカ（心の声）: フリーのIT仕事と壊れた機械を直す癖のせいで、普段の俺は一人でいるほうが気楽だ。でも、この古びた建物はどうやら別の展開を用意してるらしい。",
      ko: "아르카(속마음): 프리랜서 IT 일에 고장 난 기계를 고치는 취미까지 있으니, 원래 난 혼자 있는 쪽이 편하다. 그런데 이 낡은 건물은 아무래도 다른 계획이 있는 모양이다.",
    }),
  ),
  jump("elevator-meeting"),
];
