import profile from "../content/site/profile.json";
import type { Language, SiteProfile } from "./types";

export const siteProfile: SiteProfile = profile;

export function getLocalizedProfile(lang: Language) {
  return siteProfile.i18n[lang] ?? siteProfile.i18n.en;
}
