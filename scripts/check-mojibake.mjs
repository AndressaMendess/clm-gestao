import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const rootDir = process.cwd();
const scanDir = join(rootDir, "src");

const textExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".scss", ".json", ".md", ".html", ".svg"]);
const ignorePathFragments = ["node_modules", "dist", "storybook-static"];

const mojibakeMarkers = [
  "Ã¡",
  "Ã ",
  "Ã¢",
  "Ã£",
  "Ã¤",
  "Ã§",
  "Ã©",
  "Ãª",
  "Ã­",
  "Ã³",
  "Ã´",
  "Ãµ",
  "Ãº",
  "Ã�",
  "Ã€",
  "Ã‚",
  "Ãƒ",
  "Ã„",
  "Ã‡",
  "Ã‰",
  "ÃŠ",
  "Ã“",
  "Ã”",
  "Ã•",
  "Ãš",
  "Â ",
  "Â:",
  "Â;",
  "Â,",
  "Â.",
  "Â)",
  "Â]",
  "Â}",
  "Â-",
  "�"
];

function shouldIgnore(path) {
  return ignorePathFragments.some((fragment) => path.includes(fragment));
}

function shouldScanFile(path) {
  const extension = extname(path).toLowerCase();
  if (!textExtensions.has(extension)) {
    return false;
  }

  if (path.endsWith(".stories.ts") || path.endsWith(".stories.tsx")) {
    return false;
  }

  return true;
}

function walk(path, files = []) {
  if (shouldIgnore(path)) {
    return files;
  }

  const stats = statSync(path);
  if (stats.isFile()) {
    if (shouldScanFile(path)) {
      files.push(path);
    }
    return files;
  }

  for (const entry of readdirSync(path)) {
    walk(join(path, entry), files);
  }

  return files;
}

function findMarkers(content) {
  return mojibakeMarkers.filter((marker) => content.includes(marker));
}

const files = walk(scanDir);
const issues = [];

for (const filePath of files) {
  const content = readFileSync(filePath, "utf8");
  const markers = findMarkers(content);

  if (markers.length > 0) {
    issues.push({ filePath, markers });
  }
}

if (issues.length > 0) {
  console.error("\n[encoding] Possíveis problemas de acentuação detectados:\n");
  for (const issue of issues) {
    const relativePath = issue.filePath.replace(`${rootDir}\\`, "");
    const markers = [...new Set(issue.markers)].join(", ");
    console.error(`- ${relativePath} -> marcadores: ${markers}`);
  }
  console.error("\nCorrija os arquivos acima antes de mergear.\n");
  process.exit(1);
}

console.log("[encoding] OK: nenhum marcador suspeito encontrado.");
