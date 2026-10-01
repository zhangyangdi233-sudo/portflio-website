import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const localizedText = z.object({
  title: z.string(),
  summary: z.string(),
  medium: z.string().optional(),
  status: z.string().optional(),
  body: z.array(z.string()).min(1)
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.json" }),
  schema: z.object({
    slug: z.string(),
    year: z.string(),
    medium: z.string(),
    status: z.string(),
    priority: z.number(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    pageMode: z.enum(["standard", "wake-up-replica"]).default("standard"),
    tags: z.array(z.string()),
    palette: z.object({
      primary: z.string(),
      secondary: z.string(),
      ink: z.string(),
      paper: z.string()
    }),
    media: z.array(
      z.object({
        type: z.enum(["image", "video"]),
        src: z.string(),
        alt: z.string(),
        caption: z.string().optional()
      })
    ).min(1),
    details: z.object({
      role: z.string().optional(),
      scale: z.string().optional(),
      duration: z.string().optional(),
      platform: z.string().optional(),
      credits: z.array(z.string()).optional()
    }).optional(),
    links: z.object({
      play: z.url().optional(),
      archive: z.url().optional()
    }),
    i18n: z.object({
      zh: localizedText,
      en: localizedText,
      ja: localizedText
    })
  })
});

const site = defineCollection({
  loader: glob({ base: "./src/content/site", pattern: "**/*.json" }),
  schema: z.object({
    artistName: z.string(),
    email: z.email().optional(),
    location: z.string(),
    cvUrl: z.string().optional(),
    socials: z.array(
      z.object({
        label: z.string(),
        href: z.string()
      })
    ),
    i18n: z.object({
      zh: z.object({
        role: z.string(),
        statement: z.array(z.string()).min(2),
        cv: z.array(z.string())
      }),
      en: z.object({
        role: z.string(),
        statement: z.array(z.string()).min(2),
        cv: z.array(z.string())
      }),
      ja: z.object({
        role: z.string(),
        statement: z.array(z.string()).min(2),
        cv: z.array(z.string())
      })
    })
  })
});

export const collections = { projects, site };
