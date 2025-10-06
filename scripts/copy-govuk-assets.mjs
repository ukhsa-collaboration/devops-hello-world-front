#!/usr/bin/env node

import { existsSync } from "node:fs";
import { cp, copyFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const srcRoot = path.join(
  projectRoot,
  "node_modules",
  "govuk-frontend",
  "dist",
  "govuk"
);
const destRoot = path.join(projectRoot, "public", "assets");

if (!existsSync(srcRoot)) {
  console.warn(
    "[copy-govuk-assets] govuk-frontend not installed, skipping asset copy"
  );
  process.exit(0);
}

async function ensureDir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}

async function copyFileSafe(src, dest) {
  await ensureDir(path.dirname(dest));
  await copyFile(src, dest);
}

async function copyDirectory(src, dest) {
  await ensureDir(path.dirname(dest));
  await rm(dest, { recursive: true, force: true });
  await cp(src, dest, { recursive: true });
}

async function main() {
  const tasks = [
    copyFileSafe(
      path.join(srcRoot, "govuk-frontend.min.css"),
      path.join(destRoot, "styles", "govuk-frontend.min.css")
    ),
    copyFileSafe(
      path.join(srcRoot, "assets", "manifest.json"),
      path.join(destRoot, "manifest.json")
    ),
    copyDirectory(
      path.join(srcRoot, "assets", "images"),
      path.join(destRoot, "images")
    ),
    copyDirectory(
      path.join(srcRoot, "assets", "fonts"),
      path.join(destRoot, "fonts")
    ),
  ];

  await Promise.all(tasks);
  console.log("[copy-govuk-assets] Copied GOV.UK Frontend assets to public/assets");
}

main().catch((error) => {
  console.error("[copy-govuk-assets] Failed to copy assets", error);
  process.exit(1);
});
