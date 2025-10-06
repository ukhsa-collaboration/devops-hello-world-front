#!/usr/bin/env node

const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const srcRoot = path.join(
  projectRoot,
  "node_modules",
  "govuk-frontend",
  "dist",
  "govuk"
);
const destRoot = path.join(projectRoot, "public", "assets");

if (!fs.existsSync(srcRoot)) {
  console.warn(
    "[copy-govuk-assets] govuk-frontend not installed, skipping asset copy"
  );
  process.exit(0);
}

async function ensureDir(dirPath) {
  await fsp.mkdir(dirPath, { recursive: true });
}

async function copyFile(src, dest) {
  await ensureDir(path.dirname(dest));
  await fsp.copyFile(src, dest);
}

async function copyDirectory(src, dest) {
  await ensureDir(path.dirname(dest));
  // Remove the destination directory first to avoid stale assets
  await fsp.rm(dest, { recursive: true, force: true });
  await fsp.cp(src, dest, { recursive: true });
}

async function main() {
  const tasks = [
    copyFile(
      path.join(srcRoot, "govuk-frontend.min.css"),
      path.join(destRoot, "styles", "govuk-frontend.min.css")
    ),
    copyFile(
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
