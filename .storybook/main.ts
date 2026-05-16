import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: ["@storybook/addon-a11y"], // Storybook 9 bundles essentials in core
  framework: { name: "@storybook/react-vite", options: {} },
  staticDirs: ["../public"], // serves /fonts/* so Decathlon fonts load in stories
};
export default config;
