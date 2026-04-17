import type { CSSProperties, PropsWithChildren } from "react";

type StoryShellProps = PropsWithChildren<{
  maxWidth?: CSSProperties["maxWidth"];
  minHeight?: CSSProperties["minHeight"];
  padding?: CSSProperties["padding"];
  style?: CSSProperties;
}>;

export function storyAction(label: string) {
  return (...args: unknown[]) => {
    console.info(`[storybook] ${label}`, ...args);
  };
}

export function StorySurface({
  children,
  maxWidth = "none",
  minHeight = "auto",
  padding = "24px",
  style,
}: StoryShellProps) {
  return (
    <div
      style={{
        minHeight,
        padding,
        background: "var(--color-surface-page)",
        color: "var(--color-content-primary)",
        ...style,
      }}
    >
      <div style={{ maxWidth, margin: "0 auto" }}>{children}</div>
    </div>
  );
}

export function SidebarSurface({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "auto minmax(0, 1fr)",
        background: "var(--color-surface-page)",
      }}
    >
      {children}
      <div />
    </div>
  );
}

export const fullscreenParameters = {
  layout: "fullscreen" as const,
};
