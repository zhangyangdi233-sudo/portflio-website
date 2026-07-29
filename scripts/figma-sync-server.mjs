import { createServer } from "node:http";
import { copyFile, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const syncRoot = process.env.CIBA_FIGMA_SYNC_ROOT
  ? resolve(process.env.CIBA_FIGMA_SYNC_ROOT)
  : join(root, "figma-export", "sync");
const historyRoot = join(syncRoot, "history");
const latestPath = join(syncRoot, "latest.json");
const previousPath = join(syncRoot, "previous.json");
const host = "127.0.0.1";
const port = Number.parseInt(process.env.CIBA_FIGMA_SYNC_PORT ?? "4767", 10);
const maxBytes = 10 * 1024 * 1024;
const syncHeader = "ciba-local-v1";

const jsonHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type,x-ciba-sync",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "cache-control": "no-store",
  "content-type": "application/json; charset=utf-8"
};

function respond(response, status, body) {
  response.writeHead(status, jsonHeaders);
  response.end(`${JSON.stringify(body, null, 2)}\n`);
}

function isSnapshot(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      value.schemaVersion === 1 &&
      typeof value.exportedAt === "string" &&
      value.page &&
      typeof value.page.name === "string" &&
      Array.isArray(value.frames)
  );
}

async function readBody(request) {
  const chunks = [];
  let total = 0;
  for await (const chunk of request) {
    total += chunk.length;
    if (total > maxBytes) {
      throw new Error(`Snapshot exceeds the ${maxBytes} byte local limit.`);
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function persistSnapshot(snapshot) {
  await mkdir(historyRoot, { recursive: true });

  try {
    await readFile(latestPath);
    await copyFile(latestPath, previousPath);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const normalized = {
    ...snapshot,
    receivedAt: new Date().toISOString()
  };
  const serialized = `${JSON.stringify(normalized, null, 2)}\n`;
  const temporaryPath = join(syncRoot, `.latest-${process.pid}.json`);
  await writeFile(temporaryPath, serialized, "utf8");
  await rename(temporaryPath, latestPath);

  const historyName = normalized.receivedAt.replaceAll(":", "-").replaceAll(".", "-");
  const historyPath = join(historyRoot, `${historyName}.json`);
  await writeFile(historyPath, serialized, { encoding: "utf8", flag: "wx" });

  return {
    relativePath: relative(root, latestPath),
    backupPath: relative(root, previousPath),
    historyPath: relative(root, historyPath),
    frameCount: normalized.frames.length
  };
}

const server = createServer(async (request, response) => {
  try {
    if (request.method === "OPTIONS") {
      response.writeHead(204, jsonHeaders);
      response.end();
      return;
    }

    if (request.method === "GET" && request.url === "/health") {
      respond(response, 200, {
        ok: true,
        service: "ciba-figma-sync",
        endpoint: `http://${host}:${port}/snapshot`
      });
      return;
    }

    if (request.method !== "POST" || request.url !== "/snapshot") {
      respond(response, 404, { ok: false, error: "Not found" });
      return;
    }

    if (request.headers["x-ciba-sync"] !== syncHeader) {
      respond(response, 403, { ok: false, error: "Missing local sync header" });
      return;
    }

    const snapshot = JSON.parse(await readBody(request));
    if (!isSnapshot(snapshot)) {
      respond(response, 422, { ok: false, error: "Invalid CIBA Figma snapshot" });
      return;
    }

    const result = await persistSnapshot(snapshot);
    respond(response, 200, { ok: true, ...result });
  } catch (error) {
    respond(response, error instanceof SyntaxError ? 400 : 500, {
      ok: false,
      error: error.message
    });
  }
});

server.listen(port, host, () => {
  console.log(`CIBA Figma sync listening on http://${host}:${port}`);
  console.log("Keep this terminal open, then run “Export changes to Codex” in the CIBA Figma plugin.");
});
