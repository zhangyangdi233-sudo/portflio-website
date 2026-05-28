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
    archive: "档案"
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
    archive: "Archive"
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
    archive: "アーカイブ"
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
