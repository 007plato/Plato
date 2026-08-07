import react from "@vitejs/plugin-react";
import fs from "node:fs/promises";
import path from "node:path";
import { defineConfig } from "vite";

const rootDir = process.cwd();
const videosDir = path.join(rootDir, "public", "assets", "videos");
const postersDir = path.join(rootDir, "public", "assets", "video-posters");
const mainFile = path.join(rootDir, "src", "main.jsx");
const contentOverridesFile = path.join(rootDir, "src", "content-overrides.json");

function sanitizeName(value) {
  return String(value || "project")
    .trim()
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function serializableProject(project) {
  const clean = {
    title: project.title,
    type: project.type,
    poster: project.poster,
    videoUrl: project.videoUrl,
    mediaWidth: project.mediaWidth,
    mediaHeight: project.mediaHeight,
    orientation: project.orientation,
    tag: project.tag,
    desc: project.desc,
  };

  return Object.fromEntries(Object.entries(clean).filter(([, value]) => value !== undefined));
}

async function saveProjects(projects) {
  const source = await fs.readFile(mainFile, "utf8");
  const marker = "const strengths = [";
  const start = source.indexOf("const initialProjects = [");
  const end = source.indexOf(marker);

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Could not find initialProjects block in src/main.jsx");
  }

  const formattedProjects = JSON.stringify(projects.map(serializableProject), null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/\n/g, "\n");
  const nextSource = `${source.slice(0, start)}const initialProjects = ${formattedProjects};\n\n${source.slice(end)}`;
  await fs.writeFile(mainFile, nextSource, "utf8");
}

function localAdminPlugin() {
  return {
    name: "local-project-admin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          if (req.method === "POST" && req.url === "/__local-admin/upload-video") {
            const title = sanitizeName(req.headers["x-project-title"]);
            const index = String(req.headers["x-project-index"] || "0").padStart(2, "0");
            const originalName = sanitizeName(req.headers["x-file-name"] || "video.mp4");
            const ext = path.extname(originalName).toLowerCase() || ".mp4";

            if (![".mp4", ".webm", ".mov"].includes(ext)) {
              sendJson(res, 400, { error: "Unsupported video format" });
              return;
            }

            await fs.mkdir(videosDir, { recursive: true });
            const fileName = `project-${index}-${title}${ext}`;
            const target = path.join(videosDir, fileName);
            await fs.writeFile(target, await readRequestBody(req));
            sendJson(res, 200, { videoUrl: `/assets/videos/${fileName}` });
            return;
          }

          if (req.method === "POST" && req.url === "/__local-admin/upload-poster") {
            const body = JSON.parse((await readRequestBody(req)).toString("utf8"));
            const match = String(body.dataUrl || "").match(/^data:image\/(png|jpeg|jpg);base64,(.+)$/);

            if (!match) {
              sendJson(res, 400, { error: "Invalid poster data" });
              return;
            }

            await fs.mkdir(postersDir, { recursive: true });
            const title = sanitizeName(body.title);
            const index = String(body.index || "0").padStart(2, "0");
            const ext = match[1] === "png" ? "png" : "jpg";
            const fileName = `project-${index}-${title}.${ext}`;
            await fs.writeFile(path.join(postersDir, fileName), Buffer.from(match[2], "base64"));
            sendJson(res, 200, { poster: `/assets/video-posters/${fileName}` });
            return;
          }

          if (req.method === "POST" && req.url === "/__local-admin/save-projects") {
            const body = JSON.parse((await readRequestBody(req)).toString("utf8"));
            await saveProjects(body.projects || []);
            sendJson(res, 200, { ok: true });
            return;
          }

          if (req.method === "POST" && req.url === "/__local-admin/save-texts") {
            const body = JSON.parse((await readRequestBody(req)).toString("utf8"));
            await fs.writeFile(
              contentOverridesFile,
              `${JSON.stringify(body.texts || {}, null, 2)}\n`,
              "utf8",
            );
            sendJson(res, 200, { ok: true });
            return;
          }
        } catch (error) {
          sendJson(res, 500, { error: error.message });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localAdminPlugin()],
});
