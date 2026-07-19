import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

const sourceDir = path.resolve("src/public");
const outputDir = path.resolve("dist/public");

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

async function copyPublicFiles(fromDir, toDir) {
  const entries = await readdir(fromDir, { withFileTypes: true });
  const fileNames = new Set(entries.filter((entry) => entry.isFile()).map((entry) => entry.name));

  await mkdir(toDir, { recursive: true });

  for (const entry of entries) {
    const sourcePath = path.join(fromDir, entry.name);
    const outputPath = path.join(toDir, entry.name);

    if (entry.isDirectory()) {
      await copyPublicFiles(sourcePath, outputPath);
      continue;
    }

    const extension = path.extname(entry.name);
    const baseName = path.basename(entry.name, extension);

    if (extension === ".ts") {
      continue;
    }

    if (extension === ".js" && fileNames.has(`${baseName}.ts`)) {
      continue;
    }

    await cp(sourcePath, outputPath);
  }
}

await copyPublicFiles(sourceDir, outputDir);
