import type { Preview } from "@storybook/react";

import "../src/index.css";
import "../src/styles/tokens.css";
import "../src/styles/global.css";
import "../src/styles/dashboard.css";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Design System"]
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      toc: true
    },
    layout: "centered"
  }
};

export default preview;
