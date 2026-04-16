import type { Preview } from "@storybook/react-vite";

import "../src/index.css";
import "../src/styles/tokens.css";
import "../src/styles/global.css";
import "../src/styles/dashboard.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Tema",
      description: "Tema visual da documentação",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      if (typeof document !== "undefined") {
        document.documentElement.dataset.theme = context.globals.theme;
      }

      return Story();
    },
  ],
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "surface",
      values: [
        { name: "surface", value: "var(--color-surface-page)" },
        { name: "card", value: "var(--color-surface-card)" },
        { name: "brand", value: "var(--color-brand-primary-main)" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    docs: {
      story: {
        inline: false,
      },
    },
  },
};

export default preview;
