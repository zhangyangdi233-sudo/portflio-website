import artDirectionConfig from "../content/art-direction.json";

export type WorkspacePosition = {
  x: number;
  y: number;
  width: number;
  rotation: number;
  z: number;
};

export const artDirection = artDirectionConfig;

export function getArtDirectionVars(): Record<string, string> {
  const { colors, typography, motion } = artDirection;

  return {
    "--art-night": colors.night,
    "--art-surface": colors.surface,
    "--art-ink": colors.ink,
    "--art-muted": colors.muted,
    "--art-plum": colors.plum,
    "--art-oxide": colors.oxide,
    "--art-cyan": colors.cyan,
    "--art-sodium": colors.sodium,
    "--art-rule": colors.rule,
    "--art-font-display": typography.display,
    "--art-font-editorial": typography.editorial,
    "--art-font-ui": typography.ui,
    "--art-font-mono": typography.mono,
    "--art-motion-micro": `${motion.microMs}ms`,
    "--art-motion-state": `${motion.stateMs}ms`,
    "--art-motion-enter": `${motion.enterMs}ms`,
    "--art-motion-title": `${motion.titleMs}ms`
  };
}

export function getWorkspacePosition(slug: string, index: number): WorkspacePosition {
  const positions = artDirection.workspace.positions as Record<string, WorkspacePosition>;
  const configured = positions[slug];

  if (configured) return configured;

  return {
    x: 4 + (index % 3) * 31,
    y: 80 + Math.floor(index / 3) * 470,
    width: 320,
    rotation: index % 2 === 0 ? -0.5 : 0.5,
    z: Math.max(1, 10 - index)
  };
}
