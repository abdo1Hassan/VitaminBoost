/**
 * tokens.json → CSS variables. Style Dictionary v4 API.
 *
 * Usage: npm run tokens:build
 *
 * Outputs:
 *   src/styles.generated.css       (:root  — core + light)
 *   src/styles.generated.dark.css  (.dark  — dark overrides)
 *
 * These are imported at the top of src/styles.css. Hand-written CSS
 * (gradients, @font-face, @layer utilities) stays in src/styles.css.
 */

/** @type {import('style-dictionary').Config} */
module.exports = {
  source: ["tokens/tokens.json"],
  hooks: {
    transforms: {
      // Drop the set prefix so `light.color.background` → `--background`
      // (matches the Tailwind v4 convention already used in src/styles.css)
      "name/flat-kebab": {
        type: "name",
        transform: (token) => token.path.slice(1).join("-"),
      },
    },
    formats: {
      "css/themed": {
        format: ({ dictionary, options }) => {
          const selector = options.selector || ":root";
          const lines = dictionary.allTokens.map((t) => `  --${t.name}: ${t.value};`);
          return `/* AUTO-GENERATED from tokens/tokens.json — do not edit by hand */\n${selector} {\n${lines.join("\n")}\n}\n`;
        },
      },
    },
  },
  platforms: {
    css_light: {
      transformGroup: "css",
      transforms: ["attribute/cti", "name/flat-kebab", "color/css", "size/px"],
      buildPath: "src/",
      files: [
        {
          destination: "styles.generated.css",
          format: "css/themed",
          options: { selector: ":root" },
          filter: (t) => t.path[0] === "light" || t.path[0] === "core",
        },
      ],
    },
    css_dark: {
      transformGroup: "css",
      transforms: ["attribute/cti", "name/flat-kebab", "color/css", "size/px"],
      buildPath: "src/",
      files: [
        {
          destination: "styles.generated.dark.css",
          format: "css/themed",
          options: { selector: ".dark" },
          filter: (t) => t.path[0] === "dark",
        },
      ],
    },
  },
};
