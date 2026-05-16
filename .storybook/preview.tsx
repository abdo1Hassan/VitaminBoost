import type { Preview } from "@storybook/react";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "app",
      values: [
        { name: "app",     value: "#FAFBFD" },
        { name: "surface", value: "#FFFFFF" },
        { name: "dark",    value: "#13162B" },
      ],
    },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: true }] } },
  },
  globalTypes: {
    theme: {
      description: "Color mode",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark",  title: "Dark"  },
        ],
      },
    },
  },
  decorators: [
    (Story, ctx) => {
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", ctx.globals.theme === "dark");
      }
      return <Story />;
    },
  ],
};
export default preview;
