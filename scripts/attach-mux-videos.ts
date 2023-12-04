export {};

const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

// Load .env for local scripts (same pattern as prisma db seed).
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

const database = new PrismaClient();

const playbackId = process.env.MUX_SEED_PLAYBACK_ID;
const assetId =
  process.env.MUX_SEED_ASSET_ID ||
  (playbackId ? `seed-${playbackId}` : null);

async function main() {
  if (!playbackId) {
    console.log(
      "Missing MUX_SEED_PLAYBACK_ID in .env\n" +
        "Find it in Mux dashboard -> your asset -> Playback ID"
    );
    process.exit(1);
  }

  const videoUrl = `https://stream.mux.com/${playbackId}.m3u8`;
  const chapters = await database.chapter.findMany({
    select: { id: true, title: true },
  });

  let updated = 0;

  for (const chapter of chapters) {
    await database.chapter.update({
      where: { id: chapter.id },
      data: {
        videoUrl,
        muxData: {
          upsert: {
            create: { assetId, playbackId },
            update: { assetId, playbackId },
          },
        },
      },
    });
    updated++;
  }

  console.log(
    `Attached Mux playback "${playbackId}" to ${updated} chapters.`
  );
}

main()
  .catch((error) => {
    console.error("Error attaching Mux videos", error);
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });
