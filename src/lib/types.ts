export type Language = "zh" | "en" | "ja";

export type LocalizedString = string | Record<Language, string>;
export type LocalizedStringList = string[] | Record<Language, string[]>;

export type LocalizedText = {
  title: string;
  summary: string;
  medium?: string;
  status?: string;
  body: string[];
};

export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt: LocalizedString;
  caption?: LocalizedString;
};

export type Project = {
  slug: string;
  year: string;
  medium: string;
  status: string;
  priority: number;
  published: boolean;
  featured: boolean;
  pageMode?: "standard" | "wake-up-replica";
  tags: LocalizedStringList;
  palette: {
    primary: string;
    secondary: string;
    ink: string;
    paper: string;
  };
  media: ProjectMedia[];
  details?: {
    role?: LocalizedString;
    scale?: LocalizedString;
    duration?: LocalizedString;
    platform?: LocalizedString;
    credits?: LocalizedStringList;
  };
  links: {
    play?: string;
    archive?: string;
  };
  i18n: Record<Language, LocalizedText>;
};

export type SiteProfile = {
  artistName: string;
  email?: string;
  location: string;
  cvUrl?: string;
  socials: Array<{
    label: string;
    href: string;
  }>;
  i18n: Record<
    Language,
    {
      role: string;
      statement: string[];
      cv: string[];
    }
  >;
};
