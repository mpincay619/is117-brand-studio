import { createServer } from "node:http";
import { mkdirSync } from "node:fs";
import { readFile, realpath } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { createDevelopmentReload } from "./dev-reload.mjs";

const publicDirectory = path.resolve(
  fileURLToPath(new URL("./public/", import.meta.url)),
);
const defaultDbPath = path.resolve(
  fileURLToPath(new URL("./data/orders.sqlite", import.meta.url)),
);
const validSizes = new Set(["S", "M", "L", "XL"]);
const unitPriceUsd = 42;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".json": "application/json; charset=utf-8",
};

function openOrdersDatabase(dbPath) {
  if (dbPath !== ":memory:") {
    mkdirSync(path.dirname(dbPath), { recursive: true });
  }
  const db = new DatabaseSync(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS simulated_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      size TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price_usd INTEGER NOT NULL,
      total_usd INTEGER NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
  return db;
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let raw = "";
    request.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 16_384) {
        reject(new Error("Payload too large"));
      }
    });
    request.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    request.on("error", reject);
  });
}

// Local server with SQLite order persistence. GitHub Pages serves static public/ files.
export function createApp({
  development = false,
  publicRoot = publicDirectory,
  dbPath = defaultDbPath,
} = {}) {
  const reload = development ? createDevelopmentReload(publicRoot) : undefined;
  const db = openOrdersDatabase(dbPath);
  const selectRecent = db.prepare(
    "SELECT id, customer_name, size, quantity, unit_price_usd, total_usd, created_at FROM simulated_orders ORDER BY id DESC LIMIT 20",
  );
  const insertOrder = db.prepare(
    "INSERT INTO simulated_orders (customer_name, size, quantity, unit_price_usd, total_usd, created_at) VALUES (?, ?, ?, ?, ?, ?) RETURNING id, customer_name, size, quantity, unit_price_usd, total_usd, created_at",
  );

  const app = createServer(async (request, response) => {
    const pathname = (() => {
      try {
        return decodeURIComponent(
          new URL(request.url, "http://localhost").pathname,
        );
      } catch {
        return null;
      }
    })();

    if (pathname === null) {
      response.writeHead(400);
      response.end("Invalid file path");
      return;
    }

    if (pathname === "/api/orders") {
      if (request.method === "GET") {
        const orders = selectRecent.all();
        response.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        });
        response.end(JSON.stringify({ orders }));
        return;
      }

      if (request.method === "POST") {
        try {
          const body = await readJsonBody(request);
          const customerName = String(body.customerName ?? "").trim();
          const size = String(body.size ?? "")
            .trim()
            .toUpperCase();
          const quantity = Number.parseInt(String(body.quantity ?? "1"), 10);

          if (!customerName || customerName.length > 80) {
            response.writeHead(400, {
              "Content-Type": "application/json; charset=utf-8",
            });
            response.end(
              JSON.stringify({ error: "Enter a customer name (1–80 chars)." }),
            );
            return;
          }
          if (!validSizes.has(size)) {
            response.writeHead(400, {
              "Content-Type": "application/json; charset=utf-8",
            });
            response.end(
              JSON.stringify({ error: "Choose a valid size: S, M, L, or XL." }),
            );
            return;
          }
          if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
            response.writeHead(400, {
              "Content-Type": "application/json; charset=utf-8",
            });
            response.end(
              JSON.stringify({ error: "Quantity must be between 1 and 10." }),
            );
            return;
          }

          const totalUsd = quantity * unitPriceUsd;
          const createdAt = new Date().toISOString();
          const order = insertOrder.get(
            customerName,
            size,
            quantity,
            unitPriceUsd,
            totalUsd,
            createdAt,
          );

          response.writeHead(201, {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
          });
          response.end(JSON.stringify({ order }));
        } catch (error) {
          response.writeHead(400, {
            "Content-Type": "application/json; charset=utf-8",
          });
          response.end(JSON.stringify({ error: error.message }));
        }
        return;
      }

      response.writeHead(405, { Allow: "GET, POST" });
      response.end("Method not allowed");
      return;
    }

    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405, { Allow: "GET, HEAD" });
      response.end("This demo serves files; it does not accept orders.");
      return;
    }

    try {
      if (reload?.handle(pathname, request, response)) return;
      const segments = pathname.split("/");
      if (
        segments.some((segment) => segment.startsWith(".")) ||
        pathname.includes("\\") ||
        pathname.includes("\0")
      ) {
        response.writeHead(404);
        response.end("File not found");
        return;
      }
      const filename = path.resolve(
        publicRoot,
        `.${pathname.endsWith("/") ? `${pathname}index.html` : pathname}`,
      );
      const resolvedRoot = await realpath(publicRoot);
      const resolvedFile = await realpath(filename);
      if (!resolvedFile.startsWith(`${resolvedRoot}${path.sep}`)) {
        response.writeHead(404);
        response.end("File not found");
        return;
      }
      const content = await readFile(resolvedFile);
      const servedContent =
        reload && path.extname(filename) === ".html"
          ? reload.inject(content)
          : content;
      response.writeHead(200, {
        "Content-Type":
          types[path.extname(filename)] ?? "application/octet-stream",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      });
      response.end(request.method === "HEAD" ? undefined : servedContent);
    } catch {
      response.writeHead(404);
      response.end("File not found");
    }
  });

  app.on("close", () => {
    reload?.close();
    db.close();
  });
  return app;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const port = Number(process.env.PORT ?? 5173);
  const host = process.env.HOST ?? "127.0.0.1";
  const development = process.argv.includes("--dev");
  const app = createApp({ development });
  app.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `Port ${port} is already in use. Stop the other preview or choose another PORT.`,
      );
    } else {
      console.error(error.message);
    }
    process.exitCode = 1;
  });
  app.listen(port, host, () => {
    console.log(`Brand studio: http://${host}:${port}`);
    console.log(`SQLite database: ${defaultDbPath}`);
    console.log(
      development
        ? "Development mode: save public/ files to refresh the browser automatically."
        : "Plain preview mode: refresh the browser yourself after saving files.",
    );
    console.log(
      "Press Ctrl+C to stop. Local changes do not publish to GitHub Pages.",
    );
  });
}
