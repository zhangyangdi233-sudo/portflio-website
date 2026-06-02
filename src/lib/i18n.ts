import type { Language } from "./types";

export const languages = ["zh", "en", "ja"] as const;
export const DEFAULT_LANG: Language = "en";

export const languageLabels: Record<Language, string> = {
  zh: "中文",
  en: "EN",
  ja: "日本語"
};

export const ui = {
  zh: {
    works: "作品",
    about: "关于",
    contact: "联系",
    play: "试玩 X.WHEEL",
    viewProject: "查看作品",
    featured: "重点作品",
    index: "作品索引",
    statement: "艺术家陈述",
    cv: "履历",
    downloadCv: "下载 CV",
    external: "外部链接",
    all: "全部",
    archive: "档案",
    skipToContent: "跳到主要内容",
    homepageNavigation: "主页导航",
    languageSwitcher: "语言切换",
    scroll: "滚动"
  },
  en: {
    works: "Works",
    about: "About",
    contact: "Contact",
    play: "Play X.WHEEL",
    viewProject: "View work",
    featured: "Featured works",
    index: "Works index",
    statement: "Statement",
    cv: "CV",
    downloadCv: "Download CV",
    external: "External link",
    all: "All",
    archive: "Archive",
    skipToContent: "Skip to content",
    homepageNavigation: "Homepage navigation",
    languageSwitcher: "Language switcher",
    scroll: "Scroll"
  },
  ja: {
    works: "作品",
    about: "プロフィール",
    contact: "連絡",
    play: "X.WHEEL を試遊",
    viewProject: "作品を見る",
    featured: "主要作品",
    index: "作品索引",
    statement: "ステートメント",
    cv: "経歴",
    downloadCv: "CV をダウンロード",
    external: "外部リンク",
    all: "すべて",
    archive: "アーカイブ",
    skipToContent: "本文へ移動",
    homepageNavigation: "ホームページのナビゲーション",
    languageSwitcher: "言語切り替え",
    scroll: "スクロール"
  }
} satisfies Record<Language, Record<string, string>>;

export function isLanguage(value: string | undefined): value is Language {
  return Boolean(value && languages.includes(value as Language));
}

export function assertLanguage(value: string | undefined): Language {
  return isLanguage(value) ? value : DEFAULT_LANG;
}

export function detectPreferredLanguage(acceptLanguage = ""): Language {
  const requested = acceptLanguage
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase())
    .filter(Boolean);

  for (const code of requested) {
    const base = code.split("-")[0];
    if (isLanguage(base)) return base;
  }

  return DEFAULT_LANG;
}

export function localizePath(lang: Language, path = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${cleanPath === "/" ? "/" : cleanPath}`;
}

export function switchLocalePath(currentPath: string, targetLang: Language): string {
  const normalized = currentPath.startsWith("/") ? currentPath : `/${currentPath}`;
  const parts = normalized.split("/").filter(Boolean);

  if (isLanguage(parts[0])) {
    parts[0] = targetLang;
    return `/${parts.join("/")}${normalized.endsWith("/") ? "/" : ""}`;
  }

  return `/${targetLang}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}

export const homeCopy = {
  zh: {
    heroIntro: "糍粑以游戏、界面、影像与装置作为持续实践的场域。这里收录近期作品与仍在变化中的图像系统。",
    mediaHeading: "返回表面的图像",
    mediaBody: "作品并不按时间线沉睡。它们以片段、界面和残留物的形式重新出现，在滚动中建立彼此之间的距离。",
    mediaAside: "被抽取、错置，并重新看见。",
    experimentHeading: "作品场景",
    experimentBody: "一次短暂越界：作品离开档案秩序，以更直接的尺寸、速度和位置穿过屏幕。"
  },
  en: {
    heroIntro:
      "CIBA works across games, interfaces, moving images, and installation. This archive gathers recent works and image systems that remain in motion.",
    mediaHeading: "Images Returning",
    mediaBody:
      "Works do not sleep in chronological order. They return as fragments, interfaces, and residues, forming new distances through scroll.",
    mediaAside: "Extracted, displaced, and made visible again.",
    experimentHeading: "Work Scene",
    experimentBody:
      "A brief departure from archival order: works cross the screen through direct changes in scale, speed, and position."
  },
  ja: {
    heroIntro:
      "糍粑はゲーム、インターフェース、映像、インスタレーションを横断して制作しています。ここでは、変化し続ける近作とイメージシステムを収録します。",
    mediaHeading: "表面へ戻るイメージ",
    mediaBody:
      "作品は時系列の中で眠りません。断片、インターフェース、残留物として再び現れ、スクロールの中で新しい距離をつくります。",
    mediaAside: "抽出され、置き換えられ、もう一度見えるもの。",
    experimentHeading: "作品の場面",
    experimentBody:
      "アーカイブの秩序から一時的に外れ、作品がサイズ、速度、位置を変えながら画面を横切ります。"
  }
} satisfies Record<
  Language,
  {
    heroIntro: string;
    mediaHeading: string;
    mediaBody: string;
    mediaAside: string;
    experimentHeading: string;
    experimentBody: string;
  }
>;
