import StyleDictionary from "style-dictionary";
import fs from "fs";
import path from "path";

// Deep merge utility for merging token sets
function deepMerge(a, b) {
  const out = { ...a };
  for (const k in b) {
    if (a[k] && typeof a[k] === "object" && typeof b[k] === "object") {
      out[k] = deepMerge(a[k], b[k]);
    } else {
      out[k] = b[k];
    }
  }
  return out;
}

// Flatten nested tokens to SD v4 format
function flattenTokens(obj, prefix = []) {
  let out = {};
  for (const k in obj) {
    if (obj[k] && typeof obj[k] === "object" && "value" in obj[k]) {
      out[[...prefix, k].join(".")] = obj[k];
    } else if (typeof obj[k] === "object") {
      Object.assign(out, flattenTokens(obj[k], [...prefix, k]));
    }
  }
  return out;
}

function writeMergedTokens(sets, outFile) {
  const tokens = JSON.parse(fs.readFileSync("tokens/tokens.json", "utf8"));
  let merged = {};
  for (const set of sets) {
    if (tokens[set]) merged = deepMerge(merged, tokens[set]);
  }
  const flat = flattenTokens(merged);
  fs.writeFileSync(outFile, JSON.stringify(flat, null, 2));
}

// Write merged/flattened token files
writeMergedTokens(["core", "light"], "tokens/merged.light.json");
writeMergedTokens(["core", "dark"], "tokens/merged.dark.json");

StyleDictionary.registerTransform({
  name: "name/flat-kebab",
  type: "name",
  transform: (token) => token.path.slice(0).join("-"),
});

StyleDictionary.registerFormat({
  name: "css/themed",
  format: ({ dictionary, options }) => {
    const selector = options.selector || ":root";
    const lines = dictionary.allTokens.map((t) => {
      const v = typeof t.value === "string" || typeof t.value === "number"
        ? t.value
        : JSON.stringify(t.value);
      return `  --${t.name}: ${v};`;
    });
    return `/* AUTO-GENERATED from tokens/tokens.json — do not edit */\n${selector} {\n${lines.join("\n")}\n}\n`;
  },
});

async function build(selector, destination, sourceFile) {
  const sd = new StyleDictionary({
    source: [sourceFile],
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: "src/",
        files: [
          {
            destination,
            format: "css/themed",
            options: { selector },
          },
        ],
      },
    },
  });
  await sd.hasInitialized;
  await sd.buildAllPlatforms();
}

await build(":root", "styles.generated.css", "tokens/merged.light.json");
await build(".dark", "styles.generated.dark.css", "tokens/merged.dark.json");
console.log("✓ Generated src/styles.generated.css + src/styles.generated.dark.css");