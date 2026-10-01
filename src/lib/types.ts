export type Language = "zh" | "en" | "ja";

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
  alt: string;
  caption?: string;
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
  tags: string[];
  palette: {
    primary: string;
    secondary: string;
    ink: string;
    paper: string;
  };
  media: ProjectMedia[];
  details?: {
    role?: string;
    scale?: string;
    duration?: string;
    platform?: string;
    credits?: string[];
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
